'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { handleApiError } from '@/utils/utility';
import ErrorDisplay from '@/components/ui/error-display';
import { useToast } from './use-toast';
import { JobApplication } from '@/types/schema';

const postDataWithAi = async (endpoint: string, rawText: string) => {
	const response = await fetch(endpoint, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ text: rawText }),
	});

	if (!response.ok) {
		await handleApiError(response);
	}

	return await response.json();
};

export const useAddWithAi = () => {
	const queryClient = useQueryClient();
	const { toast } = useToast();

	const addMutation = useMutation<any, unknown, { endpoint: string; rawText: string }>({
		mutationFn: (params: { endpoint: string; rawText: string }) => postDataWithAi(params.endpoint, params.rawText),
		onSuccess: (data) => {
			toast({
				title: 'Success',
				description: 'Job application added successfully',
				variant: 'success',
			});
			return data;
		},
		onError: (error) => {
			toast({
				title: 'Failure',
				description: 'Something went wrong',
				variant: 'destructive',
			});
			console.error(error);
		},
	});

	return {
		isLoading: addMutation.isPending,
		isSuccess: addMutation.isSuccess,
		data: addMutation.data as Pick<
			JobApplication,
			| 'application_status'
			| 'applied_at'
			| 'company_domain'
			| 'company_name'
			| 'contract_type'
			| 'job_link'
			| 'job_posted_on'
			| 'job_title'
			| 'links'
			| 'notes'
			| 'salary'
			| 'salary_currency'
			| 'salary_type'
			| 'location'
			| 'work_mode'
		>,
		error: addMutation.error as any,
		addMutation: addMutation.mutate,
	};
};
