import { Client, Databases } from 'node-appwrite';

import { config } from '@/config/config';

const appwriteClient = new Client();

appwriteClient.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId);

export const database = new Databases(appwriteClient);

export const appwriteDbConfig = {
	applicationDb: String(process.env.NEXT_PUBLIC_APPLICATION_DB),
	applicationDbCollectionId: String(process.env.NEXT_PUBLIC_APPLICATION_DB_COLLECTION_ID),
	applicationDbDocumentCollectionId: String(process.env.NEXT_PUBLIC_APPLICATION_DB_DOCUMENTS_COLLECTION_ID),
	applicationDbInterviewQuestionsCollectionId: String(
		process.env.NEXT_PUBLIC_APPLICATION_DB_INTERVIEW_QUESTIONS_COLLECTION_ID,
	),
};
