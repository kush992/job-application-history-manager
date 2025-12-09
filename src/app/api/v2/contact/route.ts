import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { contactFormSchema } from '@/components/StaticPages/ContactPage/utility';
import { logger } from '@/lib/logger';
import { rateLimiter } from '@/lib/ratelimit';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
	try {
		// Get client IP for rate limiting
		const forwarded = request.headers.get('x-forwarded-for');
		const ip = forwarded ? forwarded.split(',')[0] : (request.ip ?? '127.0.0.1');

		// Rate limiting check
		const rateLimitResult = await rateLimiter.limit(ip);

		if (!rateLimitResult.success) {
			return NextResponse.json(
				{
					success: false,
					error: 'Too many requests. Please try again later.',
					code: 'RATE_LIMIT_EXCEEDED',
					retryAfter: Math.ceil(
						((rateLimitResult.reset instanceof Date
							? rateLimitResult.reset.getTime()
							: rateLimitResult.reset) -
							Date.now()) /
							1000,
					),
				},
				{
					status: 429,
					headers: {
						'X-RateLimit-Limit': rateLimitResult.limit.toString(),
						'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
						'X-RateLimit-Reset':
							rateLimitResult.reset instanceof Date
								? rateLimitResult.reset.toISOString()
								: new Date(rateLimitResult.reset).toISOString(),
						'Retry-After': Math.ceil(
							((rateLimitResult.reset instanceof Date
								? rateLimitResult.reset.getTime()
								: rateLimitResult.reset) -
								Date.now()) /
								1000,
						).toString(),
					},
				},
			);
		}

		// Parse and validate request body
		const body = await request.json();
		const validatedData = contactFormSchema.parse(body);

		// Create Supabase client
		const supabase = createClient();

		// Insert the contact form submission into the database
		const { data: insertData, error } = await supabase
			.from('contact_submissions')
			.insert([
				{
					name: validatedData.name,
					email: validatedData.email,
					message: validatedData.message,
					privacy_policy_accepted: validatedData.privacyPolicy,
					submitted_at: new Date().toISOString(),
					status: 'new',
					ip_address: ip,
					user_agent: request.headers.get('user-agent') || null,
				},
			])
			.select()
			.single();

		if (error) {
			logger.error({ request, message: 'Supabase error inserting contact submission', error });
			return NextResponse.json(
				{
					success: false,
					error: 'Failed to submit your message. Please try again.',
					code: 'DATABASE_ERROR',
					details: JSON.stringify(error),
				},
				{ status: 500 },
			);
		}

	// Log successful submission
	logger.info({ request, message: 'Contact form submitted successfully', meta: { id: insertData.id } });

		return NextResponse.json(
			{
				success: true,
				message: "Your message has been sent successfully. We'll get back to you soon!",
				data: {
					id: insertData.id,
					submittedAt: insertData.submitted_at,
				},
			},
			{
				status: 201,
				headers: {
					'X-RateLimit-Limit': rateLimitResult.limit.toString(),
					'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
					'X-RateLimit-Reset':
						rateLimitResult.reset instanceof Date
							? rateLimitResult.reset.toISOString()
							: new Date(rateLimitResult.reset).toISOString(),
				},
			},
		);
	} catch (error) {
		logger.error({ request, message: 'Contact form submission error', error });

		// Handle validation errors
		if (error instanceof z.ZodError) {
			return NextResponse.json(
				{
					success: false,
					error: 'Invalid form data. Please check your inputs.',
					code: 'VALIDATION_ERROR',
					details: error.errors.map((err) => ({
						field: err.path.join('.'),
						message: err.message,
					})),
				},
				{ status: 400 },
			);
		}

		// Handle JSON parsing errors
		if (error instanceof SyntaxError) {
			return NextResponse.json(
				{
					success: false,
					error: 'Invalid JSON format.',
					code: 'INVALID_JSON',
					details: JSON.stringify(error),
				},
				{ status: 400 },
			);
		}

		// Handle unexpected errors
		return NextResponse.json(
			{
				success: false,
				error: 'An unexpected error occurred. Please try again later.',
				code: 'INTERNAL_ERROR',
				details: JSON.stringify(error),
			},
			{ status: 500 },
		);
	}
}

// Handle unsupported methods
export async function GET() {
	return NextResponse.json(
		{
			success: false,
			error: 'Method not allowed. Use POST to submit contact form.',
			code: 'METHOD_NOT_ALLOWED',
		},
		{ status: 405 },
	);
}

export async function PUT() {
	return NextResponse.json(
		{
			success: false,
			error: 'Method not allowed. Use POST to submit contact form.',
			code: 'METHOD_NOT_ALLOWED',
		},
		{ status: 405 },
	);
}

export async function DELETE() {
	return NextResponse.json(
		{
			success: false,
			error: 'Method not allowed. Use POST to submit contact form.',
			code: 'METHOD_NOT_ALLOWED',
		},
		{ status: 405 },
	);
}
