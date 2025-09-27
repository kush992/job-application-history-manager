import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { jobApplicationSchema } from '@/lib/supabase/schema';

export async function PUT(request: NextRequest) {
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

		// Get document ID from search params
		const documentId = request.nextUrl.searchParams.get('documentId');

		if (!documentId) {
			return NextResponse.json({ error: 'Document ID is required' }, { status: 400 });
		}

		// Parse and validate request body
		const body = await request.json();

		// Create a partial schema for updates (make journey_id optional)
		const updateSchema = jobApplicationSchema.partial().extend({
			journey_id: z.string().uuid().optional(),
		});

		const validatedData = updateSchema.parse(body);

		// Convert dates to ISO strings for database storage
		const updateData = {
			...validatedData,
			interview_date: validatedData.interview_date?.toISOString() || null,
			applied_at: validatedData.applied_at,
			updated_at: new Date().toISOString(),
		};

		// Remove undefined values
		Object.keys(updateData).forEach((key) => {
			if (updateData[key as keyof typeof updateData] === undefined) {
				delete updateData[key as keyof typeof updateData];
			}
		});

		// Update the job application
		const { data: updatedApplication, error } = await supabase
			.from('job_applications')
			.update(updateData)
			.eq('id', documentId)
			.eq('user_id', user.id)
			.select()
			.single();

		if (error) {
			console.error('Supabase update error:', error);
			return NextResponse.json(
				{
					error: 'Failed to update application',
					details: error.message,
				},
				{ status: 500 },
			);
		}

		return NextResponse.json(
			{
				message: 'Application updated successfully',
				data: updatedApplication,
			},
			{ status: 200 },
		);
	} catch (error) {
		console.error('Application update error:', error);

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
