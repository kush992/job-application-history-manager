import { type NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { appRoutes } from '@/utils/constants';

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

		// Get search parameters
		const searchParams = request.nextUrl.searchParams;
		const limit = Number.parseInt(searchParams.get('limit') || '20');
		const search_query = searchParams.get('search_query');
		const status_filter = searchParams.get('status_filter');
		const work_mode_filter = searchParams.get('work_mode_filter');
		const contract_type_filter = searchParams.get('contract_type_filter');
		const journey_id = searchParams.get('journey_id');

		// Fetch active journey to get all applications under it by default for applications list page.
		// If journey_id is provided in search params, we need to use that instead as it can be a different page on UI.
		let journeyId = journey_id;

		if (!journeyId) {
			const { data, error: journeryFetchError } = await supabase
				.from('journeys')
				.select('id')
				.eq('is_active', true)
				.single();

			if (journeryFetchError) {
				console.error('Supabase error:', journeryFetchError);

				if (journeryFetchError.code === 'PGRST116') {
					console.log('No active journey found, redirecting to create journey page.');
					return NextResponse.redirect(`${request.nextUrl.origin}${appRoutes.journeys}`); // Redirect to create journey if no active journey found
				}

				return NextResponse.json(
					{
						error: 'Failed to fetch active journey',
						details: JSON.stringify(journeryFetchError),
					},
					{ status: 500 },
				);
			}

			journeyId = data.id;
		}

		// Build the query
		let query = supabase
			.from('job_applications')
			.select(
			// 	`
			// 	*,
			// 	journeys:journey_id (
			// 	id,
			// 	title,
			// 	description,
			// 	is_active
			// 	)
			// `,
			)
			.eq('user_id', user.id)
			.order('created_at', { ascending: false })
			.limit(limit);

		// Add filters
		if (search_query) {
			query = query.or(`company_name.ilike.%${search_query}%,job_title.ilike.%${search_query}%`);
		}

		if (status_filter) {
			const statuses = status_filter.split(',');
			query = query.in('application_status', statuses);
		}

		if (work_mode_filter) {
			const workModes = work_mode_filter.split(',');
			query = query.in('work_mode', workModes);
		}

		if (contract_type_filter) {
			const contractTypes = contract_type_filter.split(',');
			query = query.in('contract_type', contractTypes);
		}

		query = query.eq('journey_id', journeyId);

		// Execute the query
		const { data: applications, error } = await query;

		if (error) {
			console.error('Supabase error:', error);
			return NextResponse.json(
				{
					error: 'Failed to fetch applications',
					details: JSON.stringify(error),
				},
				{ status: 500 },
			);
		}

		return NextResponse.json(applications || [], { status: 200 });
	} catch (error) {
		console.error('Applications fetch error:', error);
		return NextResponse.json(
			{
				error: 'An unexpected error occurred',
			},
			{ status: 500 },
		);
	}
}
