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
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		// Get document ID from search params
		const documentId = request.nextUrl.searchParams.get('documentId');

		if (!documentId) {
			return NextResponse.json({ error: 'Document ID is required' }, { status: 400 });
		}

		// Fetch the job application with journey information
		const { data: application, error } = await supabase
			.from('job_applications')
			.select(
				`
					*,
					journeys:journey_id (
					id,
					title,
					description,
					start_date,
					end_date,
					is_active
					)
				`,
			)
			.eq('id', documentId)
			.eq('user_id', user.id) // Ensure user can only access their own applications
			.single();

		if (error) {
			console.error('Supabase error:', error);

			if (error.code === 'PGRST116') {
				return NextResponse.json({ error: 'Document not found' }, { status: 404 });
			}

			return NextResponse.json(
				{
					error: 'Failed to fetch application',
					details: error.message,
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
