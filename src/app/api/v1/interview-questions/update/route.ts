import { appwriteDbConfig, database } from '@/appwrite/config';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { denormaliseQuestionsAndAnswers, QnAFormData } from '@/components/QnAForm/utility';

export async function PUT(req: NextRequest) {
	try {
		if (!cookies().get('session')) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const formData = (await req.json()) as QnAFormData;
		const documentId = req.nextUrl.searchParams.get('documentId');

		if (!documentId) {
			return NextResponse.json({ error: 'Document ID is required' }, { status: 400 });
		}

		const response = await database.updateDocument(
			appwriteDbConfig.applicationDb,
			appwriteDbConfig.applicationDbInterviewQuestionsCollectionId,
			String(documentId),
			{
				...formData,
				questionsAndAnswers: denormaliseQuestionsAndAnswers(formData.questionsAndAnswers),
			},
		);

		if (response.$id) {
			return NextResponse.json({ message: 'QnA updated successfully' }, { status: 200 });
		} else {
			return NextResponse.json({ error: 'Error updating QnA' }, { status: 500 });
		}
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error }, { status: 500 });
	}
}
