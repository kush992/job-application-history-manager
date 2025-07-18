import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { jobApplicationSchema } from '@/lib/supabase/schema';

export async function POST(request: NextRequest) {
	try {
		// Create Supabase client
		const supabase = createClient();

		// Check authentication
		const {
			data: { user },
			error: authError,
		} = await supabase.auth.getUser();

		if (authError || !user) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const { data: journey, error: journeryFetchError } = await supabase
			.from('journeys')
			.select('id')
			.eq('is_active', true)
			.single();

		if (journeryFetchError) {
			console.error('Supabase error:', journeryFetchError);
			return NextResponse.json(
				{
					error: 'Failed to fetch active journey',
					details: journeryFetchError.code + journeryFetchError.message + journeryFetchError.details,
				},
				{ status: 500 },
			);
		}

		if (!journey) {
			return NextResponse.json(
				{ error: 'No active journey found - A journey is required for adding an application' },
				{ status: 400, statusText: 'Bad Request' },
			);
		}

		// Parse and validate request body
		const body = await request.json();
		const validatedData = jobApplicationSchema.parse(body);

		// Convert dates to ISO strings for database storage
		const applicationData = {
			...validatedData,
			user_id: user.id,
			journey_id: journey.id,
			interview_date: validatedData.interview_date?.toISOString() || null,
			applied_at: validatedData.applied_at || new Date().toISOString(),
		};

		// Insert the job application into the database
		const { data: insertData, error } = await supabase
			.from('job_applications')
			.insert([applicationData])
			.select()
			.single();

		if (error) {
			console.error('Supabase error:', error);
			return NextResponse.json(
				{
					error: 'Failed to create application',
					details: error.message,
				},
				{ status: 500 },
			);
		}

		return NextResponse.json(
			{
				message: 'Application created successfully',
				data: insertData,
			},
			{ status: 201 },
		);
	} catch (error) {
		console.error('Application creation error:', error);

		// Handle validation errors
		if (error instanceof z.ZodError) {
			return NextResponse.json(
				{
					error: 'Invalid form data',
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
					error: 'Invalid JSON format',
				},
				{ status: 400 },
			);
		}

		// Handle unexpected errors
		return NextResponse.json(
			{
				error: 'An unexpected error occurred',
			},
			{ status: 500 },
		);
	}
}
