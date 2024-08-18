import { appwriteDatabaseConfig, database } from '@/appwrite/config';
import { JobApplicationData } from '@/types/apiResponseTypes';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	try {
		const documentId = req.nextUrl.searchParams.get('documentId');

		if (!documentId) {
			return NextResponse.json({ error: 'Document ID is required' }, { status: 400 });
		}

		const response: JobApplicationData = await database.getDocument(
			appwriteDatabaseConfig.applicationDatabase,
			appwriteDatabaseConfig.applicationDatabaseCollectionId,
			documentId,
		);

		return NextResponse.json(response);
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
	}
}
