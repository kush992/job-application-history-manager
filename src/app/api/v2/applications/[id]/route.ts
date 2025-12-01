import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { jobApplicationSchema } from '@/lib/supabase/schema';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

// GET /api/v2/applications/[id] - Get a single application
export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } },
) {
	try {
		// Create Supabase client
		const supabase = createClient();

		// Check authentication
		const {
			data: { user },
			error: authError,
		} = await supabase.auth.getUser();

		if (authError || !user) {
			return NextResponse.json(
				{ error: 'Unauthorized', details: authError ? JSON.stringify(authError) : 'User not found' },
				{ status: 401 },
			);
		}

		const applicationId = params.id;

		if (!applicationId) {
			return NextResponse.json({ error: 'Application ID is required' }, { status: 400 });
		}

		// Fetch the job application
		const { data: application, error } = await supabase
			.from('job_applications')
			.select()
			.eq('id', applicationId)
			.eq('user_id', user.id) // Ensure user can only access their own applications
			.single();

		if (error) {
			console.error('Supabase error:', error);

			if (error.code === 'PGRST116') {
				return NextResponse.json(
					{ error: 'Application not found', details: JSON.stringify(error) },
					{ status: 404 },
				);
			}

			return NextResponse.json(
				{
					error: 'Failed to fetch application',
					details: JSON.stringify(error),
				},
				{ status: 500 },
			);
		}

		if (!application) {
			return NextResponse.json({ error: 'Application not found' }, { status: 404 });
		}

		return NextResponse.json(application, { status: 200 });
	} catch (error) {
		console.error('Application fetch error:', error);
		return NextResponse.json(
			{
				error: 'An unexpected error occurred',
			},
			{ status: 500 },
		);
	}
}

// PUT /api/v2/applications/[id] - Update an application
export async function PUT(
	request: NextRequest,
	{ params }: { params: { id: string } },
) {
	try {
		// Create Supabase client
		const supabase = createClient();

		// Check authentication
		const {
			data: { user },
			error: authError,
		} = await supabase.auth.getUser();

		if (authError || !user) {
			return NextResponse.json(
				{ error: 'Unauthorized', details: authError ? JSON.stringify(authError) : 'User not found' },
				{ status: 401 },
			);
		}

		const applicationId = params.id;

		if (!applicationId) {
			return NextResponse.json({ error: 'Application ID is required' }, { status: 400 });
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
			.eq('id', applicationId)
			.eq('user_id', user.id)
			.select()
			.single();

		if (error) {
			console.error('Supabase update error:', error);
			return NextResponse.json(
				{
					error: 'Failed to update application',
					details: JSON.stringify(error),
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

		return NextResponse.json(
			{
				error: error instanceof SyntaxError ? 'Invalid JSON format' : 'An unexpected error occurred',
				details: JSON.stringify(error),
			},
			{ status: error instanceof SyntaxError ? 400 : 500 },
		);
	}
}

// DELETE /api/v2/applications/[id] - Delete an application
export async function DELETE(
	request: NextRequest,
	{ params }: { params: { id: string } },
) {
	try {
		// Create Supabase client
		const supabase = createClient();

		// Check authentication
		const {
			data: { user },
			error: authError,
		} = await supabase.auth.getUser();

		if (authError || !user) {
			return NextResponse.json(
				{ error: 'Unauthorized', details: authError ? JSON.stringify(authError) : 'User not found' },
				{ status: 401 },
			);
		}

		const applicationId = params.id;

		if (!applicationId) {
			return NextResponse.json({ error: 'Application ID is required' }, { status: 400 });
		}

		// Check if the application exists and belongs to the user
		const { data: existingApplication, error: fetchError } = await supabase
			.from('job_applications')
			.select('id')
			.eq('id', applicationId)
			.eq('user_id', user.id)
			.single();

		// We can treat this as a successful deletion if the application does not exist,
		// meaning it has already been deleted or never existed.
		if (fetchError || !existingApplication) {
			return NextResponse.json(
				{ message: 'Application deleted successfully' },
				{ status: 200 },
			);
		}

		// Delete the record
		const { error: deleteError } = await supabase
			.from('job_applications')
			.delete()
			.eq('id', applicationId)
			.eq('user_id', user.id);

		if (deleteError) {
			console.error('Supabase delete error:', deleteError);
			return NextResponse.json(
				{
					error: 'Failed to delete application',
					details: JSON.stringify(deleteError),
				},
				{ status: 500 },
			);
		}

		return NextResponse.json(
			{
				message: 'Application deleted successfully',
			},
			{ status: 200 },
		);
	} catch (error) {
		console.error('Application deletion error:', error);
		return NextResponse.json(
			{
				error: 'An unexpected error occurred',
				details: JSON.stringify(error),
			},
			{ status: 500 },
		);
	}
}

