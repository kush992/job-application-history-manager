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

		// Get search parameters
		const searchParams = request.nextUrl.searchParams;
		const lastId = searchParams.get('lastId');
		const limit = Number.parseInt(searchParams.get('limit') || '20');
		const searchQuery = searchParams.get('searchQuery');
		const statusFilter = searchParams.get('statusFilter');
		const workModeFilter = searchParams.get('workModeFilter');
		const contractTypeFilter = searchParams.get('contractTypeFilter');
		const journeyId = searchParams.get('journeyId');

		// Build the query
		let query = supabase
			.from('job_applications')
			.select(
				`
        *,
        journeys:journey_id (
          id,
          title,
          description,
          is_active
        )
      `,
			)
			.eq('user_id', user.id)
			.order('created_at', { ascending: false })
			.limit(limit);

		// Add filters
		if (lastId) {
			// For cursor-based pagination, we need to get applications created before the last one
			const { data: lastApplication } = await supabase
				.from('job_applications')
				.select('created_at')
				.eq('id', lastId)
				.single();

			if (lastApplication) {
				query = query.lt('created_at', lastApplication.created_at);
			}
		}

		if (searchQuery) {
			query = query.or(`company_name.ilike.%${searchQuery}%,job_title.ilike.%${searchQuery}%`);
		}

		if (statusFilter) {
			const statuses = statusFilter.split(',');
			query = query.in('application_status', statuses);
		}

		if (workModeFilter) {
			const workModes = workModeFilter.split(',');
			query = query.in('work_mode', workModes);
		}

		if (contractTypeFilter) {
			const contractTypes = contractTypeFilter.split(',');
			query = query.in('contract_type', contractTypes);
		}

		if (journeyId) {
			query = query.eq('journey_id', journeyId);
		}

		// Execute the query
		const { data: applications, error } = await query;

		if (error) {
			console.error('Supabase error:', error);
			return NextResponse.json(
				{
					error: 'Failed to fetch applications',
					details: error.message,
				},
				{ status: 500 },
			);
		}

		// Get total count for pagination info
		let countQuery = supabase
			.from('job_applications')
			.select('*', { count: 'exact', head: true })
			.eq('user_id', user.id);

		// Apply the same filters to count query
		if (searchQuery) {
			countQuery = countQuery.or(`company_name.ilike.%${searchQuery}%,job_title.ilike.%${searchQuery}%`);
		}
		if (statusFilter) {
			const statuses = statusFilter.split(',');
			countQuery = countQuery.in('application_status', statuses);
		}
		if (workModeFilter) {
			const workModes = workModeFilter.split(',');
			countQuery = countQuery.in('work_mode', workModes);
		}
		if (contractTypeFilter) {
			const contractTypes = contractTypeFilter.split(',');
			countQuery = countQuery.in('contract_type', contractTypes);
		}
		if (journeyId) {
			countQuery = countQuery.eq('journey_id', journeyId);
		}

		const { count, error: countError } = await countQuery;

		if (countError) {
			console.error('Count error:', countError);
		}

		return NextResponse.json(
			{
				documents: applications || [],
				total: count || 0,
				hasMore: applications ? applications.length === limit : false,
			},
			{ status: 200 },
		);
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
