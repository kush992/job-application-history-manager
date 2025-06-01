import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Create Redis client
const redis = Redis.fromEnv();

// Create rate limiter with Redis backend
export const ratelimit = new Ratelimit({
	redis: redis,
	limiter: Ratelimit.slidingWindow(5, '1 m'), // 5 requests per minute
	analytics: true,
	prefix: '@upstash/ratelimit:contact-form',
});

// Fallback in-memory rate limiting for development without Redis
interface RateLimitEntry {
	count: number;
	resetTime: number;
}

class InMemoryRateLimit {
	private cache = new Map<string, RateLimitEntry>();
	private readonly maxRequests: number;
	private readonly windowMs: number;

	constructor(maxRequests = 5, windowMs: number = 60 * 1000) {
		this.maxRequests = maxRequests;
		this.windowMs = windowMs;

		// Clean up expired entries every 5 minutes
		setInterval(() => this.cleanup(), 5 * 60 * 1000);
	}

	async limit(identifier: string): Promise<{ success: boolean; limit: number; remaining: number; reset: Date }> {
		const now = Date.now();
		const key = `contact-form:${identifier}`;

		// Clean up expired entry if exists
		const existing = this.cache.get(key);
		if (existing && now >= existing.resetTime) {
			this.cache.delete(key);
		}

		// Get or create entry
		const entry = this.cache.get(key) || {
			count: 0,
			resetTime: now + this.windowMs,
		};

		// Check if limit exceeded
		if (entry.count >= this.maxRequests) {
			return {
				success: false,
				limit: this.maxRequests,
				remaining: 0,
				reset: new Date(entry.resetTime),
			};
		}

		// Increment count and update cache
		entry.count++;
		this.cache.set(key, entry);

		return {
			success: true,
			limit: this.maxRequests,
			remaining: this.maxRequests - entry.count,
			reset: new Date(entry.resetTime),
		};
	}

	private cleanup(): void {
		const now = Date.now();
		for (const [key, entry] of Array.from(this.cache.entries())) {
			if (now >= entry.resetTime) {
				this.cache.delete(key);
			}
		}
	}
}

// Fallback rate limiter for when Redis is not available
const fallbackRateLimit = new InMemoryRateLimit(5, 60 * 1000);

// Export a unified rate limiter that tries Redis first, falls back to in-memory
export const rateLimiter = {
	limit: async (identifier: string) => {
		try {
			// Try Redis-based rate limiting first
			const result = await ratelimit.limit(identifier);
			return {
				success: result.success,
				limit: result.limit,
				remaining: result.remaining,
				reset: result.reset,
			};
		} catch (error) {
			console.warn('Redis rate limiting failed, falling back to in-memory:', error);
			// Fall back to in-memory rate limiting
			return await fallbackRateLimit.limit(identifier);
		}
	},
};
