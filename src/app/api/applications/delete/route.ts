import { appwriteDbConfig, database } from '@/appwrite/config';
import { NextRequest, NextResponse } from 'next/server';
import { JobApplicationFormData } from '@/components/ApplicationForm/utility';
import { cookies } from 'next/headers';

export async function DELETE(req: NextRequest) {
	try {
		if (!cookies().get('session')) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const documentId = req.nextUrl.searchParams.get('documentId');

		if (!documentId) {
			return NextResponse.json({ error: 'Document ID is required' }, { status: 400 });
		}

		const response = await database.updateDocument(
			appwriteDbConfig.applicationDb,
			appwriteDbConfig.applicationDbCollectionId,
			documentId,
			{
				isSoftDelete: true,
				softDeleteDateAndTime: new Date(),
			},
		);

		if (response.$id) {
			return NextResponse.json({ message: 'Application deleted successfully' }, { status: 200 });
		} else {
			return NextResponse.json({ error: 'Error deleting application' }, { status: 500 });
		}
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error }, { status: 500 });
	}
}
