import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { appwriteDbConfig, database } from '@/appwrite/config';
import { denormaliseQuestionsAndAnswers, QnAFormData } from '@/components/QnAForm/utility';
import { InterviewQuestionsData } from '@/types/apiResponseTypes';

export const dynamic = 'force-dynamic';

// GET /api/v1/interview-questions/[id] - Get a single interview question
export async function GET(
	req: NextRequest,
	{ params }: { params: { id: string } },
) {
	try {
		if (!cookies().get('session')) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const documentId = params.id;

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

// PUT /api/v1/interview-questions/[id] - Update an interview question
export async function PUT(
	req: NextRequest,
	{ params }: { params: { id: string } },
) {
	try {
		if (!cookies().get('session')) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const documentId = params.id;

		if (!documentId) {
			return NextResponse.json({ error: 'Document ID is required' }, { status: 400 });
		}

		const formData = (await req.json()) as QnAFormData;

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
			return NextResponse.json({ message: 'QnA updated successfully', data: response }, { status: 200 });
		} else {
			return NextResponse.json({ error: 'Error updating QnA' }, { status: 500 });
		}
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error }, { status: 500 });
	}
}

// DELETE /api/v1/interview-questions/[id] - Delete an interview question
export async function DELETE(
	req: NextRequest,
	{ params }: { params: { id: string } },
) {
	try {
		if (!cookies().get('session')) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const documentId = params.id;

		if (!documentId) {
			return NextResponse.json({ error: 'Document ID is required' }, { status: 400 });
		}

		await database.deleteDocument(
			appwriteDbConfig.applicationDb,
			appwriteDbConfig.applicationDbInterviewQuestionsCollectionId,
			String(documentId),
		);

		return NextResponse.json({ message: 'QnA deleted successfully' }, { status: 200 });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: 'Error deleting data', reason: error }, { status: 500 });
	}
}

