import { appwriteDbConfig, database } from '@/appwrite/config';
import { getLoggedInUser } from '@/lib/server/appwrite';
// import { Response, JobApplicationData } from '@/types/apiResponseTypes';
import { AppwriteException, Models, Query } from 'node-appwrite';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	// try {
	// 	const user = await getLoggedInUser();

	// 	if (!user?.$id) {
	// 		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	// 	}

	// 	const searchParams = req.nextUrl.searchParams;

	// 	const lastId = searchParams.get('lastId');
	// 	const limit = searchParams.get('limit');
	// 	const searchQuery = searchParams.get('searchQuery');
	// 	const statusFilter = searchParams.get('statusFilter');
	// 	const workModeFilter = searchParams.get('workModeFilter');
	// 	const contractTypeFilter = searchParams.get('contractTypeFilter');

	// 	const query = [
	// 		Query.equal('isSoftDelete', false),
	// 		Query.equal('userId', String(user?.$id)),
	// 		Query.orderDesc('$createdAt'),
	// 	];

	// 	if (lastId) {
	// 		query.push(Query.cursorAfter(lastId));
	// 	}

	// 	if (limit) {
	// 		query.push(Query.limit(parseInt(limit)));
	// 	}

	// 	if (searchQuery) {
	// 		query.push(Query.contains('companyName', searchQuery));
	// 	}

	// 	if (statusFilter) {
	// 		query.push(Query.contains('applicationStatus', statusFilter.split(',')));
	// 	}

	// 	if (contractTypeFilter) {
	// 		query.push(Query.contains('contractType', contractTypeFilter.split(',')));
	// 	}
	// 	if (workModeFilter) {
	// 		query.push(Query.contains('workMode', workModeFilter.split(',')));
	// 	}

	// 	const response = (await database.listDocuments(
	// 		appwriteDbConfig.applicationDb,
	// 		appwriteDbConfig.applicationDbCollectionId,
	// 		query,
	// 	)) as Models.DocumentList<JobApplicationData>;

	// 	return NextResponse.json(response, { status: 200, statusText: 'ok' });
	// } catch (error) {
	// 	console.error(error);

	// 	if (error instanceof AppwriteException) {
	// 		return NextResponse.json(error, { status: error.code });
	// 	}

	// 	return NextResponse.json({ error }, { status: 500 });
	// }
	return NextResponse.json({ error: 'This endpoint is deprecated. Please use the new API endpoints.' }, { status: 410 });
}
