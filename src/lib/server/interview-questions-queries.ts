import { QnAShowType } from '@/components/QnAPage/utility';
import { InterviewQuestionsData, Response } from '@/types/apiResponseTypes';
import { apiRoutes } from '@/utils/constants';

export const interviewQuestionsQueries = {
	getAll: async (showType: QnAShowType): Promise<Response<InterviewQuestionsData>> => {
		const url = new URL(`${origin}${apiRoutes.interviewQuestions.getAll}?showType=${showType}`);
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
};
