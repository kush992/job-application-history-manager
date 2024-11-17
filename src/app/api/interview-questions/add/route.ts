import { appwriteDbConfig, database } from '@/appwrite/config';
import { JobApplicationFormData } from '@/components/ApplicationForm/utility';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ID } from 'node-appwrite';
import { denormaliseQuestionsAndAnswers, QnAFormData } from '@/components/QnAForm/utility';

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
				questionsAndAnswers: denormaliseQuestionsAndAnswers(formData.questionsAndAnswers),
			},
		);

		if (response.$id) {
			return NextResponse.json({ message: 'QnA created successfully' }, { status: 200 });
		} else {
			return NextResponse.json({ error: 'Error creating QnA' }, { status: 500 });
		}
	} catch (error) {
		console.error('Error:', error);
		return NextResponse.json({ error }, { status: 500 });
	}
}
