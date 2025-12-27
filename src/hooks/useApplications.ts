'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { ApiError } from '@/types/apiError';
import type {
	ApplicationStatus,
	ContractType,
	JobApplication,
	JobApplicationFormData,
	JobApplicationsResponse,
	WorkMode,
} from '@/types/schema';
import { apiRoutes } from '@/utils/constants';
import { handleApiError } from '@/utils/utility';

import { useToast } from './use-toast';

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
	statusFilter?: ApplicationStatus | ApplicationStatus[];
	workModeFilter?: WorkMode | WorkMode[];
	contractTypeFilter?: ContractType | ContractType[];
	journeyId?: string;
}

// API Functions
const fetchApplications = async (filters: ApplicationFilters = {}): Promise<JobApplicationsResponse> => {
	const { query, statusFilter, workModeFilter, contractTypeFilter, journeyId } = filters;
	const url = new URL(`${window.origin}${apiRoutes.applications.getAll}`);

	if (query) url.searchParams.append('search_query', query);
	if (statusFilter) {
		const statuses = Array.isArray(statusFilter) ? statusFilter.join(',') : statusFilter;
		url.searchParams.append('status_filter', statuses);
	}
	if (workModeFilter) {
		const workModes = Array.isArray(workModeFilter) ? workModeFilter.join(',') : workModeFilter;
		url.searchParams.append('work_mode_filter', workModes);
	}
	if (contractTypeFilter) {
		const contractTypes = Array.isArray(contractTypeFilter) ? contractTypeFilter.join(',') : contractTypeFilter;
		url.searchParams.append('contract_type_filter', contractTypes);
	}
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

const fetchApplication = async (applicationId: string): Promise<JobApplication> => {
	const url = `${window.origin}${apiRoutes.applications.getOne(applicationId)}`;

	const response = await fetch(url);

	if (!response.ok) {
		await handleApiError(response);
	}

	return response.json();
};

const addApplication = async (data: JobApplicationFormData): Promise<number> => {
	const response = await fetch(`${window.origin}${apiRoutes.applications.add}`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		await handleApiError(response);
	}

	return response.status;
};

const updateApplication = async ({
	data,
	applicationId,
}: {
	data: JobApplicationFormData;
	applicationId: string;
}): Promise<number> => {
	const response = await fetch(`${window.origin}${apiRoutes.applications.edit(applicationId)}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		await handleApiError(response);
	}

	return response.status;
};

const deleteApplication = async (documentId: string): Promise<string> => {
	const response = await fetch(`${window.origin}${apiRoutes.applications.delete(documentId)}`, {
		method: 'DELETE',
	});

	if (!response.ok) {
		await handleApiError(response);
	}

	return 'Deleted Successfully';
};

const searchApplications = async (
	query: string,
): Promise<Array<{ id: string; company_name: string; job_title: string }>> => {
	if (!query || query.trim().length === 0) {
		return [];
	}

	const response = await fetch(`${window.origin}${apiRoutes.applications.search}?q=${encodeURIComponent(query)}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (!response.ok) {
		await handleApiError(response);
	}

	const data = await response.json();
	return data.applications || [];
};

// Custom Hooks
export const useApplications = (options?: {
	filters?: ApplicationFilters;
	applicationId?: string;
	enableSingle?: boolean;
}) => {
	const queryClient = useQueryClient();
	const { toast } = useToast();
	const router = useRouter();
	const { filters = {}, applicationId, enableSingle = false } = options || {};

	// Query for fetching all applications
	// Note: we set a short staleTime and disable automatic refetches on mount/focus/reconnect
	// to avoid duplicate network calls (especially in React Strict Mode / during hydration).
	const applicationsQuery = useQuery({
		queryKey: applicationKeys.list(filters),
		queryFn: () => fetchApplications(filters),
		// Keep results fresh for a short period to prevent immediate duplicate refetches
		staleTime: 1000 * 60 * 2, // 2 minutes
		retry: false,
		enabled: !enableSingle || !applicationId,
	});

	// Query for fetching a single application
	const applicationQuery = useQuery({
		queryKey: applicationKeys.detail(applicationId || ''),
		queryFn: () => fetchApplication(applicationId!),
		enabled: enableSingle && !!applicationId,
		retry: false,
	});

	// Mutation for adding an application
	const addMutation = useMutation({
		mutationFn: addApplication,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: applicationKeys.lists() });
			toast({
				title: 'Success',
				description: 'Application added successfully',
				variant: 'success',
			});
			router.back();
		},
		onError: (error) => {
			toast({
				title: 'Error',
				description: 'Failed to add new application',
				variant: 'destructive',
			});
			console.error(error);
		},
	});

	// Mutation for updating an application
	const updateMutation = useMutation({
		mutationFn: updateApplication,
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({ queryKey: applicationKeys.detail(variables.applicationId) });
			queryClient.invalidateQueries({ queryKey: applicationKeys.lists() });
			toast({
				title: 'Success',
				description: 'Application updated successfully',
				variant: 'success',
			});
			router.back();
		},
		onError: (error) => {
			toast({
				title: 'Error',
				description: 'Failed to update application',
				variant: 'destructive',
			});
			console.error(error);
		},
	});

	// Mutation for deleting an application
	const deleteMutation = useMutation({
		mutationFn: deleteApplication,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: applicationKeys.lists() });
			toast({
				title: 'Success',
				description: 'Application deleted successfully',
				variant: 'success',
			});
		},
		onError: (error) => {
			toast({
				title: 'Error',
				description: 'Failed to delete application',
				variant: 'destructive',
			});
			console.error(error);
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

		// Search function
		searchApplications,
	};
};
