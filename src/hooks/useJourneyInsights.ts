import { JourneyInsight, Statistics } from '@/types/schema';
import { apiRoutes } from '@/utils/constants';
import { handleApiError } from '@/utils/utility';
import { useMutation, useQuery } from '@tanstack/react-query';

async function postJourneyInsights(statistics: Statistics): Promise<any> {
	const response = await fetch(apiRoutes.ai.generateJourneyInsight, {
		body: JSON.stringify(statistics),
		method: 'POST',
	});
	
	if (!response.ok) {
		await handleApiError(response);
	}

	return await response.json();
}

async function getJourneyInsights(statisticsId: string): Promise<JourneyInsight> {
	const response = await fetch(`${apiRoutes.journeyInsights}?statistics_id=${statisticsId}`);

	if (!response.ok) {
		await handleApiError(response);
	}

	return await response.json();
}

export function useGetJourneyInsights(statisticsId: string | undefined) {
	const {
		data: insights,
		error,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['journey-insights'],
		queryFn: () => getJourneyInsights(statisticsId as string),
		gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
		retry: false,
		enabled: !!statisticsId,
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
