import { appwriteDbConfig, database } from '@/appwrite/config';
import { QnAShowType } from '@/components/QnAPage/utility';
import { Response, InterviewQuestionsData } from '@/types/apiResponseTypes';
import { Query } from 'appwrite';

export const fetchQnAData = async (userId: string, showType: QnAShowType) => {
	const query =
		showType === QnAShowType.PUBLIC ? [Query.equal('isPrivate', false)] : [Query.equal('userId', userId), Query.equal('isPrivate', true)];

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
