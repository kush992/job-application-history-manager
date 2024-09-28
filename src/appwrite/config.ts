import { config } from '@/config/config';
import { Account, Client, Databases } from 'appwrite';

const appwriteClient = new Client();

appwriteClient.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId);

export const database = new Databases(appwriteClient);

export const accounts = new Account(appwriteClient);

export const appwriteDatabaseConfig = {
	applicationDatabase: String(process.env.NEXT_PUBLIC_APPLICATION_DB),
	applicationDatabaseCollectionId: String(process.env.NEXT_PUBLIC_APPLICATION_DB_COLLECTION_ID),
	applicationDatabaseDocumentCollectionId: String(process.env.NEXT_PUBLIC_APPLICATION_DB_DOCUMENTS_COLLECTION_ID),
};
