import { appwriteDbConfig, database } from '@/appwrite/config';
import { ApplicationStatus, JobApplicationFormData } from '@/components/ApplicationForm/utility';
import { QnAShowType } from '@/components/QnAPage/utility';
import { Response, InterviewQuestionsData, JobApplicationData } from '@/types/apiResponseTypes';
import { ID, Query } from 'node-appwrite';

export const fetchQnAData = async (userId: string, showType: QnAShowType) => {
	const query =
		showType === QnAShowType.PUBLIC
			? [Query.equal('isPrivate', false)]
			: [Query.equal('userId', userId), Query.equal('isPrivate', true)];

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
	const queries = [
		// Query.limit(20),
		Query.equal('isSoftDelete', false),
		Query.equal('userId', userId),
		Query.orderDesc('$createdAt'),
	];

	// if (lastId) {
	// 	queries.push(Query.cursorAfter(lastId));
	// }

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
		const response = await database.getDocument(
			appwriteDbConfig.applicationDb,
			appwriteDbConfig.applicationDbCollectionId,
			String(documentId),
			[],
		);

		return response as JobApplicationData;
	} catch (errors) {
		console.error(errors);
		return {} as JobApplicationData;
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
