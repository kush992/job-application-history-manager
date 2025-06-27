import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { journeySchema } from '@/lib/supabase/schema';

// GET all journeys for the authenticated user
export async function GET(request: NextRequest) {
	try {
		const supabase = createClient();

		const {
			data: { user },
			error: authError,
		} = await supabase.auth.getUser();

		if (authError || !user) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const { data: journeys, error } = await supabase
			.from('journeys')
			.select(
				`
        *,
        job_applications(count),
        statistics(*)
      `,
			)
			.eq('user_id', user.id)
			.order('created_at', { ascending: false });

		if (error) {
			console.error('Supabase error:', error);
			return NextResponse.json(
				{
					error: 'Failed to fetch journeys',
					details: error.message,
				},
				{ status: 500 },
			);
		}

		return NextResponse.json({ journeys }, { status: 200 });
	} catch (error) {
		console.error('Journeys fetch error:', error);
		return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
	}
}

// POST create a new journey
export async function POST(request: NextRequest) {
	try {
		const supabase = createClient();

		const {
			data: { user },
			error: authError,
		} = await supabase.auth.getUser();

		if (authError || !user) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const body = await request.json();
		const validatedData = journeySchema.parse(body);

		const journeyData = {
			...validatedData,
			user_id: user.id,
			start_date: validatedData.start_date?.toISOString() || new Date().toISOString(),
			end_date: validatedData.end_date?.toISOString() || null,
		};

		const { data: journey, error } = await supabase.from('journeys').insert([journeyData]).select().single();

		if (error) {
			console.error('Supabase error:', error);
			return NextResponse.json(
				{
					error: 'Failed to create journey',
					details: error.message,
				},
				{ status: 500 },
			);
		}

		return NextResponse.json(
			{
				message: 'Journey created successfully',
				data: journey,
			},
			{ status: 201 },
		);
	} catch (error) {
		console.error('Journey creation error:', error);

		if (error instanceof z.ZodError) {
			return NextResponse.json(
				{
					error: 'Invalid form data',
					details: error.errors.map((err) => ({
						field: err.path.join('.'),
						message: err.message,
					})),
				},
				{ status: 400 },
			);
		}

		return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
	}
}
