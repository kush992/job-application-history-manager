import { QnAFormData } from '@/components/InterviewQuestions/QnAForm/utility';
import { QnAShowType } from '@/components/InterviewQuestions/QnAPage/utility';
import { InterviewQuestionsData, Response } from '@/types/apiResponseTypes';
import { apiRoutes } from '@/utils/constants';
import { handleApiError } from '@/utils/utility';

export const interviewQuestionsQueries = {
	getAll: async (showType: QnAShowType): Promise<Response<InterviewQuestionsData>> => {
		const url = new URL(`${window.origin}${apiRoutes.interviewQuestions.getAll}`);
		url.searchParams.append('showType', showType);
		try {
			const response = await fetch(url.toString());

			if (response.ok) {
				return await response.json();
			} else {
				await handleApiError(response);
				throw new Error(
					`Error fetching Interview Questions data | ${response.status} - ${response.statusText}`,
				);
			}
		} catch (error) {
			console.error(error);
			throw new Error(`Error fetching Interview Questions data: ${error}`);
		}
	},
	getOne: async (documentId: string): Promise<InterviewQuestionsData> => {
		const url = `${window.origin}${apiRoutes.interviewQuestions.getOne(documentId)}`;
		try {
			const response = await fetch(url);

			if (response.ok) {
				return await response.json();
			} else {
				await handleApiError(response);
				throw new Error(
					`Error fetching Interview Questions data | ${response.status} - ${response.statusText}`,
				);
			}
		} catch (error) {
			console.error(error);
			throw new Error(`Error fetching Interview Questions data: ${error}`);
		}
	},
	add: async (formData: QnAFormData) => {
		const url = `${window.origin}${apiRoutes.interviewQuestions.add}`;
		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				return await response.json();
			} else {
				await handleApiError(response);
				throw new Error(`Error adding Interview Questions data | ${response.status} - ${response.statusText}`);
			}
		} catch (error) {
			console.error(error);
			throw new Error(`Error adding Interview Questions data: ${error}`);
		}
	},
	update: async (formData: QnAFormData, documentId: string) => {
		const url = `${window.origin}${apiRoutes.interviewQuestions.update(documentId)}`;
		try {
			const response = await fetch(url, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				return await response.json();
			} else {
				await handleApiError(response);
				throw new Error(
					`Error updating Interview Questions data | ${response.status} - ${response.statusText}`,
				);
			}
		} catch (error) {
			console.error(error);
			throw new Error(`Error updating Interview Questions data: ${error}`);
		}
	},
};
