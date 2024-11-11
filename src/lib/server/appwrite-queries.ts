import { appwriteDbConfig, database } from '@/appwrite/config';
import { ApplicationStatus, JobApplicationFormData } from '@/components/ApplicationForm/utility';
import { QnAShowType } from '@/components/QnAPage/utility';
import { config } from '@/config/config';
import { Response, InterviewQuestionsData, JobApplicationData } from '@/types/apiResponseTypes';
import { ID, Query } from 'node-appwrite';
import { createSessionClient } from './appwrite';
import { UserPreferences } from '@/types/user';

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

export const fetchApplicationData = async (
	userId: string,
	lastId?: string,
	query?: string,
	statusFilter?: ApplicationStatus,
) => {
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
};

export const fetchApplicationDataById = async (documentId: string, userId: string) => {
	const url = new URL(`${origin}/api/applications/getOne?documentId=${documentId}`);

	try {
		const response = await fetch(url);

		if (response.ok) {
			console.log('response', response);
			return (await response.json()) as JobApplicationData;
		}
	} catch (error) {
		console.error(error);
		return error;
	}
};

export const addDocument = async (data: JobApplicationFormData) => {
	const documentId = ID.unique();
	try {
		const response = await database.createDocument(
			appwriteDbConfig.applicationDb,
			appwriteDbConfig.applicationDbCollectionId,
			documentId,
			data,
		);

		return response;
	} catch (error) {
		console.error(error);
		return {} as InterviewQuestionsData;
	}
};

export const updateDocument = async (data: JobApplicationFormData, documentId: string) => {
	try {
		const response = await database.updateDocument(
			appwriteDbConfig.applicationDb,
			appwriteDbConfig.applicationDbCollectionId,
			documentId,
			data,
		);

		return response;
	} catch (error) {
		console.error(error);
		return {} as InterviewQuestionsData;
	}
};

export const addLinks = async (links: string, applicationDocumentId: string, userId: string) => {
	if (links) {
		const documentId = applicationDocumentId;

		try {
			await database.updateDocument(
				appwriteDbConfig.applicationDb,
				appwriteDbConfig.applicationDbDocumentCollectionId,
				documentId,
				{
					link: links,
				},
			);
			return;
		} catch (error) {
			console.error(error);
		}
	}

	try {
		await database.createDocument(
			appwriteDbConfig.applicationDb,
			appwriteDbConfig.applicationDbDocumentCollectionId,
			ID.unique(),
			{
				link: links,
				userId: userId,
				jobApplications: [applicationDocumentId],
			},
		);
	} catch (error) {
		console.error(error);
	}
};

export const softDeleteData = async (documentId: string, refetch: () => void) => {
	database
		.updateDocument(
			appwriteDbConfig.applicationDb,
			appwriteDbConfig.applicationDbCollectionId,
			String(documentId),
			{
				isSoftDelete: true,
				softDeleteDateAndTime: new Date(),
			},
		)
		.then(() => {
			refetch();
		})
		.catch((error) => {
			console.error(error);
		});
};

export const updateAccountSettings = async (data: UserPreferences) => {
	try {
		const response = await fetch('/api/updateUserSettings', {
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
