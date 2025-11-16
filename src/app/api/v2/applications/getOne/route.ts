import { type NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
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

		// Get document ID from search params
		const applicationId = request.nextUrl.searchParams.get('applicationId');

		if (!applicationId) {
			return NextResponse.json({ error: 'Application ID is required' }, { status: 400 });
		}

		// Fetch the job application with journey information
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
					{ error: 'Document not found', details: JSON.stringify(error) },
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
			return NextResponse.json({ error: 'Document not found' }, { status: 404 });
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
