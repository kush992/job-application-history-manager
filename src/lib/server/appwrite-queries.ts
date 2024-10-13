'use server';

import { appwriteDbConfig, database } from '@/appwrite/config';
import { ApplicationStatus } from '@/components/ApplicationForm/utility';
import { QnAShowType } from '@/components/QnAPage/utility';
import { Response, InterviewQuestionsData, JobApplicationData } from '@/types/apiResponseTypes';
import { Query } from 'node-appwrite';

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

export const fetchApplicationData = async (userId: string, lastId?: string, query?: string, statusFilter?: ApplicationStatus) => {
	const queries = [Query.limit(20), Query.equal('isSoftDelete', false), Query.equal('userId', userId), Query.orderDesc('$createdAt')];

	if (lastId) {
		queries.push(Query.cursorAfter(lastId));
	}

	if (query) {
		queries.push(Query.contains('companyName', query));
	}

	if (statusFilter) {
		queries.push(Query.contains('applicationStatus', statusFilter));
	}

	try {
		const response = (await database.listDocuments(
			appwriteDbConfig.applicationDb,
			appwriteDbConfig.applicationDbCollectionId,
			queries,
		)) as Response<JobApplicationData>;

		return response;
	} catch (error) {
		console.error(error);
		return {} as Response<JobApplicationData>;
	}
};

export const fetchApplicationDataById = async (documentId: string, userId: string) => {
	try {
		const response = await database.getDocument(appwriteDbConfig.applicationDb, appwriteDbConfig.applicationDbCollectionId, String(documentId), [
			Query.equal('userId', userId),
			Query.equal('isSoftDelete', false),
		]);

		return response as JobApplicationData;
	} catch (errors) {
		console.error(errors);
		return {} as JobApplicationData;
	}
};

export const softDeleteData = async (documentId: string, refetch: () => void) => {
	database
		.updateDocument(appwriteDbConfig.applicationDb, appwriteDbConfig.applicationDbCollectionId, String(documentId), {
			isSoftDelete: true,
			softDeleteDateAndTime: new Date(),
		})
		.then(() => {
			refetch();
		})
		.catch((error) => {
			console.error(error);
		});
};
