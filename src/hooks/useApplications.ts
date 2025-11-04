'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { ApplicationStatus } from '@/components/ApplicationForm/utility';
import type {
	ContractType,
	JobApplication,
	JobApplicationFormData,
	JobApplicationsResponse,
	WorkMode,
} from '@/types/schema';
import { apiRoutes } from '@/utils/constants';
import { handleApiError } from '@/utils/utility';
import { ApiError } from '@/types/apiError';

// Query Keys
export const applicationKeys = {
	all: ['applications'] as const,
	lists: () => [...applicationKeys.all, 'list'] as const,
	list: (filters: ApplicationFilters) => [...applicationKeys.lists(), filters] as const,
	details: () => [...applicationKeys.all, 'detail'] as const,
	detail: (id: string) => [...applicationKeys.details(), id] as const,
};

// Types
export interface ApplicationFilters {
	query?: string;
	statusFilter?: ApplicationStatus;
	workModeFilter?: WorkMode;
	contractTypeFilter?: ContractType;
	journeyId?: string;
}

// API Functions
const fetchApplications = async (filters: ApplicationFilters = {}): Promise<JobApplicationsResponse> => {
	const { query, statusFilter, workModeFilter, contractTypeFilter, journeyId } = filters;
	const url = new URL(`${window.origin}${apiRoutes.applications.getAll}`);

	if (query) url.searchParams.append('searchQuery', query);
	if (statusFilter) url.searchParams.append('statusFilter', statusFilter);
	if (workModeFilter) url.searchParams.append('workModeFilter', workModeFilter);
	if (contractTypeFilter) url.searchParams.append('contractTypeFilter', contractTypeFilter);
	if (journeyId) url.searchParams.append('journey_id', journeyId);

	const response = await fetch(url.toString(), {
		method: 'GET',
	});

	if (response.redirected) {
		window.location.href = response.url;
		throw { error: 'Redirected', status: response.status } as ApiError;
	}

	if (!response.ok) {
		await handleApiError(response);
	}

	return response.json();
};

const fetchApplication = async (documentId: string): Promise<JobApplication> => {
	const url = new URL(`${window.origin}${apiRoutes.applications.getOne}?documentId=${documentId}`);

	const response = await fetch(url);

	if (!response.ok) {
		await handleApiError(response);
	}

	return response.json();
};

const addApplication = async (data: JobApplicationFormData): Promise<number> => {
	const response = await fetch(apiRoutes.applications.add, {
		method: 'POST',
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		await handleApiError(response);
	}

	return response.status;
};

const updateApplication = async ({
	data,
	documentId,
}: {
	data: JobApplicationFormData;
	documentId: string;
}): Promise<number> => {
	const response = await fetch(`${apiRoutes.applications.update}?documentId=${documentId}`, {
		method: 'PUT',
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		await handleApiError(response);
	}

	return response.status;
};

const deleteApplication = async (documentId: string): Promise<string> => {
	const response = await fetch(`${window.origin}${apiRoutes.applications.delete}?documentId=${documentId}`, {
		method: 'DELETE',
	});

	if (!response.ok) {
		await handleApiError(response);
	}

	return 'Deleted Successfully';
};

// Custom Hooks
export const useApplications = (options?: {
	filters?: ApplicationFilters;
	documentId?: string;
	enableSingle?: boolean;
}) => {
	const queryClient = useQueryClient();
	const { filters = {}, documentId, enableSingle = false } = options || {};

	// Query for fetching all applications
	const applicationsQuery = useQuery({
		queryKey: applicationKeys.list(filters),
		queryFn: () => fetchApplications(filters),
		retry: false,
	});

	// Query for fetching a single application
	const applicationQuery = useQuery({
		queryKey: applicationKeys.detail(documentId || ''),
		queryFn: () => fetchApplication(documentId!),
		enabled: enableSingle && !!documentId,
		retry: false,
	});

	// Mutation for adding an application
	const addMutation = useMutation({
		mutationFn: addApplication,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: applicationKeys.lists() });
		},
	});

	// Mutation for updating an application
	const updateMutation = useMutation({
		mutationFn: updateApplication,
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({ queryKey: applicationKeys.detail(variables.documentId) });
			queryClient.invalidateQueries({ queryKey: applicationKeys.lists() });
		},
	});

	// Mutation for deleting an application
	const deleteMutation = useMutation({
		mutationFn: deleteApplication,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: applicationKeys.lists() });
		},
	});

	return {
		// All applications query
		applications: applicationsQuery.data,
		isLoadingApplications: applicationsQuery.isLoading,
		isErrorApplications: applicationsQuery.isError,
		errorApplications: applicationsQuery.error as ApiError | null,
		isFetchingApplications: applicationsQuery.isFetching,
		refetchApplications: applicationsQuery.refetch,

		// Single application query
		application: applicationQuery.data,
		isLoadingApplication: applicationQuery.isLoading,
		isErrorApplication: applicationQuery.isError,
		errorApplication: applicationQuery.error as ApiError | null,
		isFetchingApplication: applicationQuery.isFetching,
		refetchApplication: applicationQuery.refetch,

		// Add mutation
		addApplication: addMutation.mutate,
		addApplicationAsync: addMutation.mutateAsync,
		isAddingApplication: addMutation.isPending,
		isAddSuccess: addMutation.isSuccess,
		isAddError: addMutation.isError,
		addError: addMutation.error as ApiError | null,
		resetAdd: addMutation.reset,

		// Update mutation
		updateApplication: updateMutation.mutate,
		updateApplicationAsync: updateMutation.mutateAsync,
		isUpdatingApplication: updateMutation.isPending,
		isUpdateSuccess: updateMutation.isSuccess,
		isUpdateError: updateMutation.isError,
		updateError: updateMutation.error as ApiError | null,
		resetUpdate: updateMutation.reset,

		// Delete mutation
		deleteApplication: deleteMutation.mutate,
		deleteApplicationAsync: deleteMutation.mutateAsync,
		isDeletingApplication: deleteMutation.isPending,
		isDeleteSuccess: deleteMutation.isSuccess,
		isDeleteError: deleteMutation.isError,
		deleteError: deleteMutation.error as ApiError | null,
		resetDelete: deleteMutation.reset,

		// Utility
		invalidateAll: () => queryClient.invalidateQueries({ queryKey: applicationKeys.all }),
	};
};
