import { useMutation, useQuery } from '@tanstack/react-query';

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
		gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
		retry: false,
		enabled: !!journeyId,
	});

	return {
		insights,
		error,
		isLoading,
		isError,
	};
}

export function usePostInsights() {
	// Fetch journeys with React Query
	const {
		data: insights,
		error,
		mutate,
	} = useMutation({
		mutationFn: (statistics: Statistics) => postJourneyInsights(statistics),
		gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
		retry: false,
	});

	return {
		insights,
		// insightsLoading: isLoading,
		error,
		mutate,
		// refreshInsights: refreshInsights,
		// insightsFetching: isLoading,
	};
}
