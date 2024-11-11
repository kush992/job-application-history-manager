import { ApplicationStatus } from '@/components/ApplicationForm/utility';
import { config } from '@/config/config';
import { JobApplicationData, Response } from '@/types/apiResponseTypes';

export const applicationDataQueries = {
	getAll: async (lastId?: string, query?: string, statusFilter?: ApplicationStatus) => {
		const url = new URL(`${origin}/api/applications/get`);

		if (lastId) url.searchParams.append('lastId', lastId);
		if (query) url.searchParams.append('searchQuery', query);
		if (statusFilter) url.searchParams.append('statusFilter', statusFilter);

		url.searchParams.append('limit', config.dataFetchingLimitForAppwrite.toString());

		try {
			const response = await fetch(url.toString(), {
				method: 'GET',
			});

			if (response.ok) {
				return (await response.json()) as Response<JobApplicationData>;
			} else {
				throw new Error('Failed to fetch application data');
			}
		} catch (error) {
			console.error(error);
			throw new Error('Failed to fetch application data');
		}
	},
	getOne: async (documentId: string) => {
		const url = new URL(`${origin}/api/applications/getOne?documentId=${documentId}`);

		try {
			const response = await fetch(url);

			if (response.ok) {
				console.log('response', response);
				return (await response.json()) as JobApplicationData;
			} else {
				throw new Error('Failed to fetch application data');
			}
		} catch (error) {
			console.error(error);
			throw new Error('Failed to fetch application data');
		}
	},
};
