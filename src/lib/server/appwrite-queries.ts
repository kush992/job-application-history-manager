import { appwriteDbConfig, database } from '@/appwrite/config';
import { ApplicationStatus, JobApplicationFormData } from '@/components/ApplicationForm/utility';
import { QnAShowType } from '@/components/QnAPage/utility';
import { config } from '@/config/config';
import { Response, InterviewQuestionsData, JobApplicationData } from '@/types/apiResponseTypes';
import { ID, Query } from 'node-appwrite';
import { UserPreferences } from '@/types/user';
import { apiRoutes } from '@/utils/constants';

export const fetchQnAData = async (userId: string, showType: QnAShowType) => {
	const query = showType === QnAShowType.PUBLIC ? [Query.equal('isPrivate', false)] : [Query.equal('userId', userId)];

	try {
		const response: Response<InterviewQuestionsData> = await database.listDocuments(
			appwriteDbConfig.applicationDb,
			appwriteDbConfig.applicationDbInterviewQuestionsCollectionId,
			query,
		);

		if (!!response.documents) {
			return response;
		} else {
			console.error('No documents found');
			return {} as Response<InterviewQuestionsData>;
		}
	} catch (error) {
		console.error(error);
		return {} as Response<InterviewQuestionsData>;
	}
};

export const updateAccountSettings = async (data: UserPreferences) => {
	try {
		const response = await fetch(apiRoutes.usersPrefs.update, {
			method: 'POST',
			body: JSON.stringify(data),
		});

		if (response.ok) {
			return response.status;
		}
	} catch (error) {
		console.error(error);
		return error;
	}
};
