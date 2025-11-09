import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
// import OpenAI, { OpenAIError } from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Statistics } from '@/types/schema';

// const openai = new OpenAI({
// 	apiKey: process.env.OPENAI_API_KEY, // Gemini API key
// });

const genAI = new GoogleGenerativeAI(process.env.LLM_API_KEY!);

export async function POST(req: NextRequest) {
	try {
		const stats = await req.json();

		const { journey_id, user_id, id } = stats as Statistics;

		if (!journey_id || !user_id) {
			return NextResponse.json({ error: 'Missing journey_id or user_id' }, { status: 400 });
		}

		const supabase = await createClient();
		const user = await supabase.auth.getUser();
		if (!user) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const { data: existingInsights, error: existingInsightsError } = await supabase
			.from('journey_insights')
			.select()
			.eq('journey_id', journey_id)
			.eq('user_id', user_id)
			.eq('statistics_demo_id', id)
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

			return NextResponse.json(data, { status: 201 });
		} else {
			const { data, error } = await supabase
				.from('journey_insights')
				.insert([{ journey_id, user_id, statistics_demo_id: id, insights }])
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
