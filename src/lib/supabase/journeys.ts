import { createClient } from '@/lib/supabase/server';
import { Journey, JourneyFormData } from '@/types/schema';

export async function getJourneys(): Promise<{ journeys?: Journey[]; error?: string }> {
	try {
		const supabase = await createClient();
		const {
			data: { user },
			error: authError,
		} = await supabase.auth.getUser();

		if (authError || !user) {
			return { error: 'Unauthorized' };
		}

		const { data: journeys, error } = await supabase
			.from('journeys')
			.select(
				`
        *,
        applications_count:applications(count)
      `,
			)
			.eq('user_id', user.id)
			.order('created_at', { ascending: false });

		if (error) {
			console.error('Error fetching journeys:', error);
			return { error: error.message };
		}

		const transformedJourneys = journeys?.map((journey: any) => ({
			...journey,
			applications_count: journey.applications_count?.[0]?.count || 0,
		}));

		return { journeys: transformedJourneys };
	} catch (error) {
		console.error('Unexpected error fetching journeys:', error);
		return { error: 'Failed to fetch journeys' };
	}
}

export async function getJourney(journeyId: string): Promise<{ journey?: Journey; error?: string }> {
	try {
		const supabase = await createClient();
		const {
			data: { user },
			error: authError,
		} = await supabase.auth.getUser();

		if (authError || !user) {
			return { error: 'Unauthorized' };
		}

		const { data: journey, error } = await supabase
			.from('journeys')
			.select(
				`
        *,
        applications_count:applications(count)
      `,
			)
			.eq('id', journeyId)
			.eq('user_id', user.id)
			.single();

		if (error) {
			if (error.code === 'PGRST116') {
				return { error: 'Journey not found' };
			}
			console.error('Error fetching journey:', error);
			return { error: error.message };
		}

		const transformedJourney = {
			...journey,
			applications_count: journey.applications_count?.[0]?.count || 0,
		};

		return { journey: transformedJourney };
	} catch (error) {
		console.error('Unexpected error fetching journey:', error);
		return { error: 'Failed to fetch journey' };
	}
}

async function executeJourneyOperation<T>(
	operation: (supabase: any, userId: string) => Promise<{ data: T; error: any }>,
): Promise<{ data?: T; error?: string }> {
	try {
		const supabase = await createClient();
		const {
			data: { user },
			error: authError,
		} = await supabase.auth.getUser();

		if (authError || !user) {
			return { error: 'Unauthorized' };
		}

		const { data, error } = await operation(supabase, user.id);

		if (error) {
			console.error('Journey operation error:', error);
			return { error: error.message };
		}

		return { data };
	} catch (error) {
		console.error('Unexpected journey operation error:', error);
		return { error: 'Operation failed' };
	}
}

export async function createJourney(data: JourneyFormData): Promise<{ journey?: Journey; error?: string }> {
	const result = await executeJourneyOperation(async (supabase, userId) => {
		return await supabase
			.from('journeys')
			.insert({
				user_id: userId,
				...data,
			})
			.select()
			.single();
	});

	return { journey: result.data as Journey, error: result.error };
}

export async function updateJourney(
	journeyId: string,
	data: JourneyFormData,
): Promise<{ journey?: Journey; error?: string }> {
	const result = await executeJourneyOperation(async (supabase, userId) => {
		return await supabase.from('journeys').update(data).eq('id', journeyId).eq('user_id', userId).select().single();
	});

	return { journey: result.data as Journey, error: result.error };
}

export async function deleteJourney(journeyId: string): Promise<{ success?: boolean; error?: string }> {
	const result = await executeJourneyOperation(async (supabase, userId) => {
		return await supabase.from('journeys').delete().eq('id', journeyId).eq('user_id', userId);
	});

	return { success: !!result.data, error: result.error };
}
