// get existing journey insights for a journey

import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	try {
		const supabase = await createClient();

		const searchParams = request.nextUrl.searchParams;
		const statistics_id = searchParams.get('statistics_id');

		if (!statistics_id) {
			return NextResponse.json({ error: 'Missing journey_id' }, { status: 400 });
		}

		const user = await supabase.auth.getUser();
		if (user.error || !user.data.user) {
			return NextResponse.json(
				{ error: 'Unauthorized', details: user.error ? JSON.stringify(user.error) : 'User not found' },
				{ status: 401 },
			);
		}

		const { data, error } = await supabase
			.from('journey_insights')
			.select('*')
			.eq('statistics_demo_id', statistics_id)
			.single();

		if (error) {
			console.error('Supabase error fetching journey insights:', error);
			return NextResponse.json(
				{ error: 'Failed to fetch journey insights', details: JSON.stringify(error) },
				{ status: 500 },
			);
		}

		return NextResponse.json({ data });
	} catch (error) {
		console.error('Unexpected error fetching journey insights:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch journey insights', details: JSON.stringify(error) },
			{ status: 500 },
		);
	}
}
