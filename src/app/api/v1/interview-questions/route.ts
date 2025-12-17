import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { Query } from 'node-appwrite';
import { ID } from 'node-appwrite';

import { appwriteDbConfig, database } from '@/appwrite/config';
import { denormaliseQuestionsAndAnswers, QnAFormData } from '@/components/InterviewQuestions/QnAForm/utility';
import { QnAShowType } from '@/components/InterviewQuestions/QnAPage/utility';
import { getLoggedInUser } from '@/lib/server/appwrite';
import { InterviewQuestionsData,Response } from '@/types/apiResponseTypes';

export const dynamic = 'force-dynamic';

// GET /api/v1/interview-questions - List all interview questions
export async function GET(req: NextRequest) {
	try {
		const user = await getLoggedInUser();

		if (!user?.$id) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const searchParams = req.nextUrl.searchParams;
		const showType = searchParams.get('showType');

		// default query
		const query = [Query.orderDesc('$createdAt')];

		if (showType === QnAShowType.PUBLIC) {
			query.push(Query.equal('isPrivate', false));
		} else {
			query.push(Query.equal('userId', user.$id));
		}

		const response: Response<InterviewQuestionsData> = await database.listDocuments(
			appwriteDbConfig.applicationDb,
			appwriteDbConfig.applicationDbInterviewQuestionsCollectionId,
			query,
		);

		if (response.documents && response.total) {
			return NextResponse.json(response, { status: 200, statusText: 'ok' });
		} else {
			return NextResponse.json({ error: 'No documents found' }, { status: 404 });
		}
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error }, { status: 500 });
	}
}

// POST /api/v1/interview-questions - Create a new interview question
export async function POST(req: NextRequest) {
	try {
		if (!cookies().get('session')) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const formData = (await req.json()) as QnAFormData;

		if (!formData.questionsAndAnswers) {
			return NextResponse.json({ error: 'Form completion is required' }, { status: 400 });
		}

		const response = await database.createDocument(
			appwriteDbConfig.applicationDb,
			appwriteDbConfig.applicationDbInterviewQuestionsCollectionId,
			ID.unique(),
			{
				...formData,
				// TODO: add jobApplications document ID here to link the QnA to the job application
				// jobApplications: '673f33e3000d16d0fa2b',
				questionsAndAnswers: denormaliseQuestionsAndAnswers(formData.questionsAndAnswers),
			},
		);

		if (response.$id) {
			return NextResponse.json({ message: 'QnA created successfully', data: response }, { status: 201 });
		} else {
			return NextResponse.json({ error: 'Error creating QnA' }, { status: 500 });
		}
	} catch (error) {
		console.error('Error:', error);
		return NextResponse.json({ error }, { status: 500 });
	}
}

