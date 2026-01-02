import { type NextRequest, NextResponse } from 'next/server';

import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

// GET /api/v2/journeys/[id]/statistics - Get statistics for a journey
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
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

		const journeyId = params.id;

		if (!journeyId) {
			return NextResponse.json({ error: 'Journey ID is required' }, { status: 400 });
		}

		// Fetch the statistics
		const { data: statistics, error } = await supabase
			.from('statistics')
			.select()
			.eq('user_id', user.id)
			.eq('journey_id', journeyId)
			.single();

		// Fetch time-series data from statistics_applications_time (if present)
		const { data: applications_time, error: timeError } = await supabase
			.from('statistics_applications_time')
			.select()
			.eq('user_id', user.id)
			.eq('journey_id', journeyId)
			.order('year', { ascending: true })
			.order('month', { ascending: true });

		if (error) {
			logger.error({ request, userId: user.id, message: 'Supabase error fetching statistics', error });

			if (error.code === 'PGRST116') {
				return NextResponse.json({ error: 'Statistics not found' }, { status: 404 });
			}

			return NextResponse.json(
				{
					error: 'Failed to fetch statistics',
					details: JSON.stringify(error),
				},
				{ status: 500 },
			);
		}

		if (timeError) {
			logger.warn({ request, userId: user.id, message: 'Supabase warning fetching statistics_applications_time', timeError });
			// We don't fail the whole request if time-series isn't available; just omit it
		}

		if (!statistics) {
			return NextResponse.json({ error: 'Statistics not found' }, { status: 404 });
		}

		// Combine the main statistics with optional time-series data
		const payload = {
			...statistics,
			applications_time: applications_time ?? [],
		};

		return NextResponse.json(payload, { status: 200 });
	} catch (error) {
		logger.error({ request, message: 'Statistics fetch error', error });
		return NextResponse.json(
			{
				error: 'An unexpected error occurred',
				details: JSON.stringify(error),
			},
			{ status: 500 },
		);
	}
}
