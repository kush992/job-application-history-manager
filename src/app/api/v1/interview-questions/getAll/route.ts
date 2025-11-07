import { appwriteDbConfig, database } from '@/appwrite/config';
import { QnAShowType } from '@/components/QnAPage/utility';
import { getLoggedInUser } from '@/lib/server/appwrite';
import { Response, InterviewQuestionsData } from '@/types/apiResponseTypes';
import { Query } from 'node-appwrite';
import { NextRequest, NextResponse } from 'next/server';

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
