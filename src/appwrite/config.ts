import { config } from '@/config/config';
import { Client, Databases } from 'appwrite';

const appwriteClient = new Client();

appwriteClient.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId);

export const database = new Databases(appwriteClient);

export const appwriteDatabaseConfig = {
	applicationDatabase: String(process.env.NEXT_PUBLIC_APPLICATION_DB),
	applicationDatabaseCollectionId: String(process.env.NEXT_PUBLIC_APPLICATION_DB_COLLECTION_ID),
};
