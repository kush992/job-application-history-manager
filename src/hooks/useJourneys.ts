'use client';

import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Journey, JourneyFormData } from '@/types/schema';
import { apiRoutes, QueryKeys } from '@/utils/constants';
import { handleApiError } from '@/utils/utility';

async function fetchJourneys(): Promise<Journey[]> {
	const response = await fetch(apiRoutes.journeys.getAll);
	const result = await response.json();

	if (!response.ok) {
		await handleApiError(response);
	}

	return result.journeys || [];
}

async function fetchJourney(id: string): Promise<Journey> {
	const response = await fetch(apiRoutes.journeys.getOne);
	const result = await response.json();

	if (!response.ok) {
		await handleApiError(response);
	}

	return result.journeys || {};
}

async function createJourneyApi(data: JourneyFormData): Promise<Journey> {
	const response = await fetch(apiRoutes.journeys.add, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	});

	const result = await response.json();

	if (!response.ok) {
		await handleApiError(response);
	}

	return result.journey;
}

async function updateJourneyApi(journeyId: string, data: JourneyFormData): Promise<Journey> {
	const response = await fetch(apiRoutes.journeys.update, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ journeyId, ...data }),
	});

	const result = await response.json();

	if (!response.ok) {
		await handleApiError(response);
	}

	return result.journey;
}

async function deleteJourneyApi(journeyId: string): Promise<void> {
	const response = await fetch(apiRoutes.journeys.delete, {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ journeyId }),
	});

	const result = await response.json();

	if (!response.ok) {
		await handleApiError(response);
	}
}

export function useJourneys(id?: string) {
	const queryClient = useQueryClient();
	const [error, setError] = useState<string | null>(null);

	// Fetch journeys with React Query
	const {
		data: journeys = [],
		isLoading,
		error: queryError,
		refetch,
	} = useQuery({
		queryKey: [QueryKeys.JOURNEYS_PAGE],
		queryFn: fetchJourneys,
		staleTime: 5 * 60 * 1000, // 5 minutes
		gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
	});

	const {
		data: journey = {},
		isLoading: isSingleFetchReqLoading,
		error: singleFetchReqError,
		refetch: refetchSingleJourney,
	} = useQuery({
		queryKey: [QueryKeys.JOURNEYS_PAGE, id],
		queryFn: () => fetchJourney(id as string),
		enabled: !!id, // Only run this query if id is available
	});

	// Create journey mutation
	const createMutation = useMutation({
		mutationFn: createJourneyApi,
		onSuccess: (newJourney) => {
			// Optimistically update the cache
			queryClient.setQueryData([QueryKeys.JOURNEYS_PAGE], (old: Journey[] = []) => [newJourney, ...old]);
			setError(null);
		},
		onError: (error: Error) => {
			setError(error.message);
		},
	});

	// Update journey mutation
	const updateMutation = useMutation({
		mutationFn: ({ journeyId, data }: { journeyId: string; data: JourneyFormData }) =>
			updateJourneyApi(journeyId, data),
		onSuccess: (updatedJourney) => {
			// Optimistically update the cache
			queryClient.setQueryData([QueryKeys.JOURNEYS_PAGE], (old: Journey[] = []) =>
				old.map((journey) => (journey.id === updatedJourney.id ? updatedJourney : journey)),
			);
			setError(null);
		},
		onError: (error: Error) => {
			setError(error.message);
		},
	});

	// Delete journey mutation
	const deleteMutation = useMutation({
		mutationFn: deleteJourneyApi,
		onSuccess: (_, journeyId) => {
			// Optimistically update the cache
			queryClient.setQueryData([QueryKeys.JOURNEYS_PAGE], (old: Journey[] = []) =>
				old.filter((journey) => journey.id !== journeyId),
			);
			setError(null);
		},
		onError: (error: Error) => {
			setError(error.message);
		},
	});

	const createJourney = useCallback(
		async (data: JourneyFormData) => {
			try {
				setError(null);
				const result = await createMutation.mutateAsync(data);
				return result;
			} catch (error) {
				return null;
			}
		},
		[createMutation],
	);

	const updateJourney = useCallback(
		async (journeyId: string, data: JourneyFormData) => {
			try {
				setError(null);
				const result = await updateMutation.mutateAsync({ journeyId, data });
				return result;
			} catch (error) {
				return null;
			}
		},
		[updateMutation],
	);

	const deleteJourney = useCallback(
		async (journeyId: string) => {
			try {
				setError(null);
				await deleteMutation.mutateAsync(journeyId);
				return true;
			} catch (error) {
				return false;
			}
		},
		[deleteMutation],
	);

	const refreshJourneys = useCallback(() => {
		refetch();
	}, [refetch]);

	return {
		journeys,
		journey,
		isLoading:
			isLoading ||
			createMutation.isPending ||
			updateMutation.isPending ||
			deleteMutation.isPending ||
			isSingleFetchReqLoading,
		error: error || queryError?.message || singleFetchReqError?.message || null,
		createJourney,
		updateJourney,
		deleteJourney,
		refreshJourneys,
		// Individual loading states for more granular control
		isCreating: createMutation.isPending,
		isUpdating: updateMutation.isPending,
		isDeleting: deleteMutation.isPending,
		isFetching: isLoading,
	};
}
