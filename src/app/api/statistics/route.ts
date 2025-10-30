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
			return NextResponse.json({ error: 'Unauthorized', details: authError ? JSON.stringify(authError) : 'User not found', }, { status: 401 });
		}

		// Get document ID from search params
		const journeyId = request.nextUrl.searchParams.get('journeyId');

		if (!journeyId) {
			return NextResponse.json({ error: 'Journey ID is required' }, { status: 400 });
		}

		// Fetch the job application with journey information
		const { data: statistics, error } = await supabase
			.from('statistics_demo')
			.select()
			.eq('user_id', user.id)
			.eq('journey_id', journeyId)
			.single();

		if (error) {
			console.error('Supabase error:', error);

			if (error.code === 'PGRST116') {
				return NextResponse.json({ error: 'Document not found' }, { status: 404 });
			}

			return NextResponse.json(
				{
					error: 'Failed to fetch application',
					details: JSON.stringify(error),
				},
				{ status: 500 },
			);
		}

		if (!statistics) {
			return NextResponse.json({ error: 'Document not found' }, { status: 404 });
		}

		return NextResponse.json(statistics, { status: 200 });
	} catch (error) {
		console.error('Application fetch error:', error);
		return NextResponse.json(
			{
				error: 'An unexpected error occurred',
				details: JSON.stringify(error),
			},
			{ status: 500 },
		);
	}
}
