import { appwriteDbConfig, database } from '@/appwrite/config';
import { Response, JobApplicationData } from '@/types/apiResponseTypes';
import { Query } from 'appwrite';
import { NextResponse } from 'next/server';

export async function GET() {
	try {
		const response = (await database.listDocuments(
			appwriteDbConfig.applicationDb,
			appwriteDbConfig.applicationDbCollectionId,
			[Query.equal('isSoftDelete', false), Query.orderDesc('$createdAt')],
		)) as Response<JobApplicationData>;

		// console.log('response', response);

		if (response.documents.length) {
			return NextResponse.json(response);
		}
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
	}
}
