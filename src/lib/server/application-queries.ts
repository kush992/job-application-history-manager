import { ApplicationStatus, JobApplicationFormData } from '@/components/ApplicationForm/utility';
import { config } from '@/config/config';
import { JobApplicationData, Response } from '@/types/apiResponseTypes';
import { apiRoutes } from '@/utils/constants';

export const applicationDataQueries = {
	getAll: async (lastId?: string, query?: string, statusFilter?: ApplicationStatus) => {
		const url = new URL(`${origin}${apiRoutes.applications.getAll}`);

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
		const url = new URL(`${origin}${apiRoutes.applications.getOne}?documentId=${documentId}`);

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
	create: async (data: JobApplicationFormData) => {
		try {
			const response = await fetch(apiRoutes.applications.create, {
				method: 'POST',
				body: JSON.stringify(data),
			});

			if (response.ok) {
				return response.status;
			} else {
				throw new Error(`Error creating application: ${response.statusText} | ${response.status}`);
			}
		} catch (error) {
			console.error(error);
			throw new Error(`Error creating application: ${error}`);
		}
	},
	update: async (data: JobApplicationFormData, documentId: string) => {
		try {
			const response = await fetch(`${apiRoutes.applications.update}?documentId=${documentId}`, {
				method: 'PUT',
				body: JSON.stringify(data),
			});

			if (response.ok) {
				return response.status;
			} else {
				throw new Error(`Error updating application: ${response.statusText} | ${response.status}`);
			}
		} catch (error) {
			console.error(error);
			throw new Error(`Error updating application: ${error}`);
		}
	},
};
