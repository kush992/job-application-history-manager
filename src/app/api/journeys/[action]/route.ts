import { journeySchema } from '@/lib/supabase/schema';
import { createClient } from '@/lib/supabase/server';
import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const updateJourneySchema = journeySchema.partial().extend({
	journeyId: z.string().uuid('Invalid journey ID'),
});

const deleteJourneySchema = z.object({
	journeyId: z.string().uuid('Invalid journey ID'),
});

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

export async function POST(request: NextRequest, { params }: { params: { action: string } }) {
	if (params.action !== 'add') {
		return NextResponse.json({ error: 'Invalid action' }, { status: 404 });
	}

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
			console.error('Error checking active journey:', activeJourneyError);
			return NextResponse.json(
				{ error: 'Failed to check active journey', details: JSON.stringify(activeJourney) },
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

		return NextResponse.json({ success: 'Journey created successfully', journey });
	});
}

export async function PUT(request: NextRequest, { params }: { params: { action: string } }) {
	if (params.action !== 'update') {
		return NextResponse.json({ error: 'Invalid action' }, { status: 404 });
	}

	return withAuth(request, async (supabase, user) => {
		const body = await request.json();
		const validatedFields = updateJourneySchema.safeParse(body);

		if (!validatedFields.success) {
			return NextResponse.json(
				{
					error: 'Invalid form data',
					fieldErrors: validatedFields.error.flatten().fieldErrors,
				},
				{ status: 400 },
			);
		}

		const { journeyId, ...updateData } = validatedFields.data;

		const { data: journey, error } = await supabase
			.from('journeys')
			.update(updateData)
			.eq('id', journeyId)
			.eq('user_id', user.id)
			.select()
			.single();

		if (error) {
			return NextResponse.json(
				{ error: 'Failed to update journey', details: JSON.stringify(error) },
				{ status: 500 },
			);
		}

		return NextResponse.json({ success: 'Journey updated successfully', journey });
	});
}

export async function DELETE(request: NextRequest, { params }: { params: { action: string } }) {
	if (params.action !== 'delete') {
		return NextResponse.json({ error: 'Invalid action' }, { status: 404 });
	}

	return withAuth(request, async (supabase, user) => {
		const body = await request.json();
		const validatedFields = deleteJourneySchema.safeParse(body);

		if (!validatedFields.success) {
			return NextResponse.json(
				{
					error: 'Invalid request data',
					fieldErrors: validatedFields.error.flatten().fieldErrors,
				},
				{ status: 400 },
			);
		}

		const { journeyId } = validatedFields.data;

		const { data: journey, error: fetchError } = await supabase
			.from('journeys')
			.select('id, title')
			.eq('id', journeyId)
			.eq('user_id', user.id)
			.single();

		if (fetchError || !journey) {
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

export async function GET(request: NextRequest, { params }: { params: { action: string } }) {
	console.log('GET request for journeys with action:', params.action);
	if (params.action !== 'getAll') {
		return NextResponse.json({ error: 'Invalid action' }, { status: 404 });
	}

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
			.order('created_at', { ascending: false });

		if (error) {
			console.error('Error fetching journeys:', error);
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
