import { type NextRequest, NextResponse } from 'next/server';

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
		console.error('API error:', error);
		return NextResponse.json({ error: 'Internal server error', details: JSON.stringify(error) }, { status: 500 });
	}
}

// GET /api/v2/journeys/[id] - Get a single journey
export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } },
) {
	return withAuth(request, async (supabase, user) => {
		const journeyId = params.id;

		if (!journeyId) {
			return NextResponse.json({ error: 'Journey ID is required' }, { status: 400 });
		}

		const { data: journey, error } = await supabase
			.from('journeys')
			.select(
				`
				*,
				applications_count:job_applications(count)
			`,
			)
			.eq('id', journeyId)
			.eq('user_id', user.id)
			.single();

		if (error) {
			console.error('Error fetching journey:', error);
			if (error.code === 'PGRST116') {
				return NextResponse.json(
					{ error: 'Journey not found', details: JSON.stringify(error) },
					{ status: 404 },
				);
			}
			return NextResponse.json(
				{ error: 'Failed to fetch journey', details: JSON.stringify(error) },
				{ status: 500 },
			);
		}

		const transformedJourney = {
			...journey,
			applications_count: journey.applications_count?.[0]?.count || 0,
		};

		return NextResponse.json(transformedJourney);
	});
}

// PUT /api/v2/journeys/[id] - Update a journey
export async function PUT(
	request: NextRequest,
	{ params }: { params: { id: string } },
) {
	return withAuth(request, async (supabase, user) => {
		const journeyId = params.id;

		if (!journeyId) {
			return NextResponse.json({ error: 'Journey ID is required' }, { status: 400 });
		}

		const body = await request.json();
		const updateSchema = journeySchema.partial();
		const validatedFields = updateSchema.safeParse(body);

		const updateFields = {
			...validatedFields.data,
			end_date: validatedFields?.data?.end_date ? validatedFields.data.end_date.toISOString() : null,
		};

		if (!validatedFields.success) {
			return NextResponse.json(
				{
					error: 'Invalid form data',
					fieldErrors: validatedFields.error.flatten().fieldErrors,
				},
				{ status: 400 },
			);
		}

		const { data: journey, error } = await supabase
			.from('journeys')
			.update(updateFields)
			.eq('id', journeyId)
			.eq('user_id', user.id)
			.select()
			.single();

		if (error) {
			if (error.code === 'PGRST116') {
				return NextResponse.json(
					{ error: 'Journey not found', details: JSON.stringify(error) },
					{ status: 404 },
				);
			}
			return NextResponse.json(
				{ error: 'Failed to update journey', details: JSON.stringify(error) },
				{ status: 500 },
			);
		}

		return NextResponse.json({ success: 'Journey updated successfully', journey });
	});
}

// DELETE /api/v2/journeys/[id] - Delete a journey
export async function DELETE(
	request: NextRequest,
	{ params }: { params: { id: string } },
) {
	return withAuth(request, async (supabase, user) => {
		const journeyId = params.id;

		if (!journeyId) {
			return NextResponse.json({ error: 'Journey ID is required' }, { status: 400 });
		}

		const { data: journey, error: fetchError } = await supabase
			.from('journeys')
			.select('id, title')
			.eq('id', journeyId)
			.eq('user_id', user.id)
			.single();

		if (fetchError || !journey) {
			if (fetchError?.code === 'PGRST116') {
				return NextResponse.json(
					{ error: 'Journey not found', details: JSON.stringify(fetchError) },
					{ status: 404 },
				);
			}
			return NextResponse.json(
				{ error: 'Journey not found', details: JSON.stringify(fetchError) },
				{ status: 404 },
			);
		}

		const { error: deleteError } = await supabase
			.from('journeys')
			.delete()
			.eq('id', journeyId)
			.eq('user_id', user.id);

		if (deleteError) {
			return NextResponse.json(
				{ error: 'Failed to delete journey', details: JSON.stringify(deleteError) },
				{ status: 500 },
			);
		}

		return NextResponse.json({ success: 'Journey and all associated applications deleted successfully' });
	});
}

