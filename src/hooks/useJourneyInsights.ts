import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { JourneyInsight, Statistics } from '@/types/schema';
import { apiRoutes } from '@/utils/constants';
import { handleApiError } from '@/utils/utility';

async function postJourneyInsights(statistics: Statistics): Promise<JourneyInsight> {
	const response = await fetch(`${window.origin}${apiRoutes.journeys.insights(statistics.journey_id)}`, {
		body: JSON.stringify(statistics),
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
	});

	if (!response.ok) {
		await handleApiError(response);
	}

	return await response.json();
}

async function getJourneyInsights(journeyId: string): Promise<JourneyInsight> {
	const response = await fetch(`${window.origin}${apiRoutes.journeys.insights(journeyId)}`);

	if (!response.ok) {
		await handleApiError(response);
	}

	return await response.json();
}

export function useGetJourneyInsights(journeyId: string | undefined) {
	const {
		data: insights,
		error,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['journey-insights', journeyId],
		queryFn: () => getJourneyInsights(journeyId as string),
		gcTime: 10 * 60 * 1000, // 10 minutes
		retry: false,
		enabled: !!journeyId,
		staleTime: 10 * 60 * 1000, // 10 minutes
	});

	return {
		insights,
		error,
		isLoading,
		isError,
	};
}

export function usePostInsights() {
	const queryClient = useQueryClient();

	// Fetch journeys with React Query
	const {
		data: insights,
		error,
		mutate,
		isPending,
	} = useMutation({
		mutationFn: (statistics: Statistics) => postJourneyInsights(statistics),
		gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
		retry: false,
		onSuccess: () => {
			// Invalidate queries or perform any additional actions on success if needed
			// For example, you might want to refetch the insights data
			queryClient.invalidateQueries({ queryKey: ['journey-insights'] });
		},
	});

	return {
		insights,
		error,
		mutate,
		isPending
	};
}
