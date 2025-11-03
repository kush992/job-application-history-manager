import { JourneyInsight, Statistics } from '@/types/schema';
import { apiRoutes } from '@/utils/constants';
import { handleApiError } from '@/utils/utility';
import { useMutation, useQuery } from '@tanstack/react-query';

async function postJourneyInsights(statistics: Statistics): Promise<any> {
	const response = await fetch(apiRoutes.ai.generateJourneyInsight, {
		body: JSON.stringify(statistics),
		method: 'POST',
	});
	const result = await response.json();

	if (!response.ok) {
		console.log('API error response:', result);
		throw await handleApiError(response);
	}

	return result;
}

async function getJourneyInsights(statisticsId: string): Promise<JourneyInsight> {
	const response = await fetch(`${apiRoutes.journeyInsights}?statistics_id=${statisticsId}`);
	const result = await response.json();

	if (!response.ok) {
		console.log('API error response:', result);
		throw await handleApiError(response);
	}

	return result;
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
