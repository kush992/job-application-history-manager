import { type NextRequest, NextResponse } from 'next/server';

import { logger } from '@/lib/logger';
import { journeySchema } from '@/lib/supabase/schema';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

async function withAuth(request: NextRequest, handler: (supabase: any, user: any) => Promise<NextResponse>) {
	try {
		const supabase = await createClient();
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

		return await handler(supabase, user);
	} catch (error) {
		logger.error({ message: 'API error in withAuth', error, meta: { function: 'withAuth' } });
		return NextResponse.json({ error: 'Internal server error', details: JSON.stringify(error) }, { status: 500 });
	}
}

// GET /api/v2/journeys - List all journeys
export async function GET(request: NextRequest) {
	return withAuth(request, async (supabase, user) => {
		const query = supabase
			.from('journeys')
			.select(
				`
				id,
				title,
				description,
				created_at,
				is_active,
				start_date,
				end_date,
				applications_count:job_applications(count)
			`,
			)
			.eq('user_id', user.id)
			.order('created_at', { ascending: false });

		const { data: journeys, error } = await query;

		if (error) {
			logger.error({ request, userId: user.id, message: 'Error fetching journeys', error });
			return NextResponse.json(
				{ error: 'Failed to fetch journeys', details: JSON.stringify(error) },
				{ status: 500 },
			);
		}

		const transformedJourneys = journeys?.map((journey: any) => ({
			...journey,
			applications_count: journey.applications_count?.[0]?.count || 0,
		}));

		return NextResponse.json({ journeys: transformedJourneys });
	});
}

// POST /api/v2/journeys - Create a new journey
export async function POST(request: NextRequest) {
	return withAuth(request, async (supabase, user) => {
		const body = await request.json();
		const validatedFields = journeySchema.safeParse(body);

		if (!validatedFields.success) {
			return NextResponse.json(
				{
					error: 'Invalid form data',
					fieldErrors: validatedFields.error.flatten().fieldErrors,
				},
				{ status: 400 },
			);
		}

		const { data: activeJourney, error: activeJourneyError } = await supabase
			.from('journeys')
			.select('id')
			.eq('user_id', user.id)
			.eq('is_active', true)
			.single();

		if (activeJourneyError && activeJourneyError.code !== 'PGRST116') {
			logger.error({ request, userId: user.id, message: 'Error checking active journey', error: activeJourneyError });
			return NextResponse.json(
				{ error: 'Failed to check active journey', details: JSON.stringify(activeJourneyError) },
				{ status: 500 },
			);
		}
		if (activeJourney) {
			return NextResponse.json(
				{ error: 'An active journey already exists. Please deactivate it before creating a new one.' },
				{ status: 400 },
			);
		}

		const { data: journey, error } = await supabase
			.from('journeys')
			.insert({
				user_id: user.id,
				...validatedFields.data,
			})
			.select()
			.single();

		if (error) {
			return NextResponse.json(
				{ error: 'Failed to create journey', details: JSON.stringify(error) },
				{ status: 500 },
			);
		}

		return NextResponse.json({ success: 'Journey created successfully', journey }, { status: 201 });
	});
}

