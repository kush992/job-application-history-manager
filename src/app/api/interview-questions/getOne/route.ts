import { appwriteDbConfig, database } from '@/appwrite/config';
import { InterviewQuestionsData } from '@/types/apiResponseTypes';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	try {
		if (!cookies().get('session')) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const documentId = req.nextUrl.searchParams.get('documentId');

		if (!documentId) {
			return NextResponse.json({ error: 'Document ID is required' }, { status: 400 });
		}

		const response: InterviewQuestionsData = await database.getDocument(
			appwriteDbConfig.applicationDb,
			appwriteDbConfig.applicationDbInterviewQuestionsCollectionId,
			String(documentId),
		);

		if (response.$id) {
			return NextResponse.json(response, { status: 200, statusText: 'ok' });
		} else {
			return NextResponse.json({ error: 'Document not found' }, { status: 404 });
		}
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: 'Error fetching data', reason: error }, { status: 500 });
	}
}
