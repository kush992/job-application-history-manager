import { withAuth } from '@/lib/supabase/withAuth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { action: string } }) {
	return withAuth(request, async (supabase, user) => {
		const { data: journeys, error } = await supabase
			.from('journeys')
			.select(
				`
					*,
					applications_count:job_applications(count)
				`,
			)
			.eq('user_id', user.id)
			.eq('is_active', true);

		if (error) {
			console.error('Error fetching journeys:', error);
			return NextResponse.json({ error: 'Failed to fetch journeys' }, { status: 500 });
		}

		const transformedJourneys = journeys?.map((journey: any) => ({
			...journey,
			applications_count: journey.applications_count?.[0]?.count || 0,
		}));

		return NextResponse.json({ journeys: transformedJourneys });
	});
}
