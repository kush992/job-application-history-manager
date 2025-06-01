import { Redis } from '@upstash/redis';

// Create Redis client with error handling
export const redis = (() => {
	try {
		return Redis.fromEnv();
	} catch (error) {
		console.warn('Failed to initialize Redis client:', error);
		return null;
	}
})();

// Helper function to check if Redis is available
export const isRedisAvailable = async (): Promise<boolean> => {
	if (!redis) return false;

	try {
		await redis.ping();
		return true;
	} catch (error) {
		console.warn('Redis ping failed:', error);
		return false;
	}
};

// Helper function to safely execute Redis operations
export const safeRedisOperation = async <T>(operation: () => Promise<T>, fallback: T): Promise<T> => {
	try {
		if (!redis) return fallback;
		return await operation();
	} catch (error) {
		console.warn('Redis operation failed:', error);
		return fallback;
	}
};
