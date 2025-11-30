import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Statistics } from '@/types/schema';

const genAI = new GoogleGenerativeAI(process.env.LLM_API_KEY!);

export const dynamic = 'force-dynamic';

// GET /api/v2/journeys/[id]/insights - Get insights for a journey
export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } },
) {
	try {
		const supabase = await createClient();

		const journeyId = params.id;

		if (!journeyId) {
			return NextResponse.json({ error: 'Journey ID is required' }, { status: 400 });
		}

		const user = await supabase.auth.getUser();
		if (user.error || !user.data.user) {
			return NextResponse.json(
				{ error: 'Unauthorized', details: user.error ? JSON.stringify(user.error) : 'User not found' },
				{ status: 401 },
			);
		}

		// First, get the statistics for this journey
		const { data: statistics, error: statsError } = await supabase
			.from('statistics_demo')
			.select('id')
			.eq('journey_id', journeyId)
			.eq('user_id', user.data.user.id)
			.single();

		if (statsError || !statistics) {
			return NextResponse.json(
				{ error: 'Statistics not found for this journey', details: JSON.stringify(statsError) },
				{ status: 404 },
			);
		}

		// Then fetch insights
		const { data, error } = await supabase
			.from('journey_insights')
			.select('*')
			.eq('statistics_demo_id', statistics.id)
			.single();

		if (error) {
			if (error.code === 'PGRST116') {
				return NextResponse.json({ error: 'Insights not found' }, { status: 404 });
			}
			console.error('Supabase error fetching journey insights:', error);
			return NextResponse.json(
				{ error: 'Failed to fetch journey insights', details: JSON.stringify(error) },
				{ status: 500 },
			);
		}

		return NextResponse.json(data, { status: 200 });
	} catch (error) {
		console.error('Unexpected error fetching journey insights:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch journey insights', details: JSON.stringify(error) },
			{ status: 500 },
		);
	}
}

// POST /api/v2/journeys/[id]/insights - Generate insights for a journey
export async function POST(
	request: NextRequest,
	{ params }: { params: { id: string } },
) {
	try {
		const journeyId = params.id;

		if (!journeyId) {
			return NextResponse.json({ error: 'Journey ID is required' }, { status: 400 });
		}

		const supabase = await createClient();
		const user = await supabase.auth.getUser();
		if (user.error || !user.data.user) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		// Get statistics for this journey
		const { data: statistics, error: statsError } = await supabase
			.from('statistics_demo')
			.select('*')
			.eq('journey_id', journeyId)
			.eq('user_id', user.data.user.id)
			.single();

		if (statsError || !statistics) {
			return NextResponse.json(
				{ error: 'Statistics not found for this journey', details: JSON.stringify(statsError) },
				{ status: 404 },
			);
		}

		const stats = statistics as Statistics;

		// Check for existing insights
		const { data: existingInsights, error: existingInsightsError } = await supabase
			.from('journey_insights')
			.select()
			.eq('journey_id', journeyId)
			.eq('user_id', user.data.user.id)
			.eq('statistics_demo_id', stats.id)
			.single();

		if (existingInsightsError && existingInsightsError.code !== 'PGRST116') {
			console.error('Supabase fetch error for existing insights:', existingInsightsError);
			return NextResponse.json(
				{ error: 'Supabase error', details: JSON.stringify(existingInsightsError) },
				{ status: 400 },
			);
		}

		// Build AI prompt
		const prompt = `
      You are an expert career analyst. 
      Here is the user's job statistics data:
      ${JSON.stringify(stats, null, 2)}

      Generate a textual insight that includes:
      1. Overview of applications, interviews, offers, and rejections.
      2. Response analysis and no-reply patterns.
      3. Interview insights by type.
      4. Offer & success insights.
      5. Salary insights (min, max, avg, type, currency). This should be studied carefully as there are per anum, hourly, weekly, daily or monthly salary types in different curriencies. Provide insights accordingly.
      6. Work mode insights (remote, hybrid, onsite).
      7. Contract type distribution.
      8. Observed patterns and recommendations.

      The output should be clear, structured, and readable, suitable for showing to the user in markdown.
    `;

		// Call Gemini API using Google Generative AI SDK
		const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });
		const result = await model.generateContent(prompt);
		const insights = result.response.text();

		// Save insights to Supabase
		if (existingInsights) {
			const { data, error } = await supabase
				.from('journey_insights')
				.update({ insights })
				.eq('id', existingInsights.id)
				.select()
				.single();

			if (error) {
				console.error('Supabase update error for journey_insights:', error);
				return NextResponse.json({ error: 'Supabase error', details: JSON.stringify(error) }, { status: 400 });
			}

			return NextResponse.json(data, { status: 200 });
		} else {
			const { data, error } = await supabase
				.from('journey_insights')
				.insert([{ journey_id: journeyId, user_id: user.data.user.id, statistics_demo_id: stats.id, insights }])
				.select()
				.single();

			if (error) {
				console.error('Supabase insert error for journey_insights:', error);
				return NextResponse.json({ error: 'Supabase error', details: JSON.stringify(error) }, { status: 400 });
			}

			return NextResponse.json(data, { status: 201 });
		}
	} catch (error) {
		console.error('Error generating insights:', error);
		return NextResponse.json({ error: 'Internal server error', details: JSON.stringify(error) }, { status: 500 });
	}
}

