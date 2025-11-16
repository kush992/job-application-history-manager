import { QnAFormData } from '@/components/QnAForm/utility';
import { QnAShowType } from '@/components/QnAPage/utility';
import { InterviewQuestionsData, Response } from '@/types/apiResponseTypes';
import { apiRoutes } from '@/utils/constants';
import { handleApiError } from '@/utils/utility';

export const interviewQuestionsQueries = {
	getAll: async (showType: QnAShowType): Promise<Response<InterviewQuestionsData>> => {
		// const url = new URL(`${origin}${apiRoutes.interviewQuestions.getAll}?showType=${showType}`);
		// try {
		// 	const response = await fetch(url);

		// 	if (response.ok) {
		// 		return await response.json();
		// 	} else {
		// 		throw new Error(
		// 			`Error fetching Interview Questions data | ${response.status} - ${response.statusText}`,
		// 		);
		// 	}
		// } catch (error) {
		// 	console.error(error);
		// 	throw new Error(`Error fetching Interview Questions data: ${error}`);
		// }

		throw new Error('New version coming soon!');
	},
	getOne: async (documentId: string): Promise<InterviewQuestionsData> => {
		const url = new URL(`${origin}${apiRoutes.interviewQuestions.getOne}?documentId=${documentId}`);
		try {
			const response = await fetch(url);

			if (response.ok) {
				return await response.json();
			} else {
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
		const url = new URL(`${origin}${apiRoutes.interviewQuestions.add}`);
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
				throw new Error(`Error adding Interview Questions data | ${response.status} - ${response.statusText}`);
			}
		} catch (error) {
			console.error(error);
			throw new Error(`Error adding Interview Questions data: ${error}`);
		}
	},
	update: async (formData: QnAFormData, documentId: string) => {
		const url = new URL(`${origin}${apiRoutes.interviewQuestions.update}?documentId=${documentId}`);
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
				throw new Error(`Error adding Interview Questions data | ${response.status} - ${response.statusText}`);
			}
		} catch (error) {
			console.error(error);
			throw new Error(`Error adding Interview Questions data: ${error}`);
		}
	},
};
