import { appwriteDbConfig, database } from '@/appwrite/config';
import { getLoggedInUser } from '@/lib/server/appwrite';
import { Response, JobApplicationData } from '@/types/apiResponseTypes';
import { Query } from 'node-appwrite';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	try {
		const user = await getLoggedInUser();

		if (!user?.$id) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const searchParams = req.nextUrl.searchParams;

		const lastId = searchParams.get('lastId');
		const limit = searchParams.get('limit');
		const searchQuery = searchParams.get('searchQuery');
		const statusFilter = searchParams.get('statusFilter');
		const workModeFilter = searchParams.get('workModeFilter');
		const contractTypeFilter = searchParams.get('contractTypeFilter');

		const query = [
			Query.equal('isSoftDelete', false),
			Query.equal('userId', String(user?.$id)),
			Query.orderDesc('$createdAt'),
		];

		if (lastId) {
			query.push(Query.cursorAfter(lastId));
		}

		if (limit) {
			query.push(Query.limit(parseInt(limit)));
		}

		if (searchQuery) {
			query.push(Query.contains('companyName', searchQuery));
		}

		if (statusFilter) {
			query.push(Query.contains('applicationStatus', statusFilter));
		}

		if (contractTypeFilter) {
			query.push(Query.contains('contractType', contractTypeFilter));
		}
		if (workModeFilter) {
			query.push(Query.contains('workMode', workModeFilter));
		}

		const response = (await database.listDocuments(
			appwriteDbConfig.applicationDb,
			appwriteDbConfig.applicationDbCollectionId,
			query,
		)) as Response<JobApplicationData>;

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
