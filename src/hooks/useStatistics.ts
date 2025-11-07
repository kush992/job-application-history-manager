import { Statistics } from '@/types/schema';
import { apiRoutes, QueryKeys } from '@/utils/constants';
import { handleApiError } from '@/utils/utility';
import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

async function fetchStatistics(journeyId: string): Promise<Statistics> {
	const response = await fetch(`${apiRoutes.statistics}?journeyId=${journeyId}`);

	if (!response.ok) {
		await handleApiError(response);
	}

	return await response.json();
}

export function useStatistics(journeyId: string) {
	// Fetch journeys with React Query
	const {
		data: statistics,
		isLoading,
		error: queryError,
		refetch,
	} = useQuery({
		queryKey: [QueryKeys.STATISTICS, journeyId],
		queryFn: () => fetchStatistics(journeyId),
		staleTime: 5 * 60 * 1000, // 5 minutes
		gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
		retry: false,
	});

	const refreshStatistics = useCallback(() => {
		refetch();
	}, [refetch]);

	return {
		statistics,
		isLoading,
		error: queryError?.message || null,
		refreshJourneys: refreshStatistics,
		isFetching: isLoading,
	};
}
