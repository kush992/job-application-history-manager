import { appwriteDbConfig, database } from '@/appwrite/config';
import { NextRequest, NextResponse } from 'next/server';
import { getLoggedInUser } from '@/lib/server/appwrite';

export async function POST(req: NextRequest) {
	try {
		const user = await getLoggedInUser();

		if (!user?.$id) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const formData = (await req.json()) as {
			link: string;
		};
		const documentId = req.nextUrl.searchParams.get('documentId');

		if (!documentId) {
			return NextResponse.json({ error: 'Document ID is required' }, { status: 400 });
		}

		const response = await database.createDocument(
			appwriteDbConfig.applicationDb,
			appwriteDbConfig.applicationDbDocumentCollectionId,
			documentId,
			{ link: formData.link },
		);

		if (response.$id) {
			return NextResponse.json({ message: 'Application Documents updated successfully' }, { status: 200 });
		} else {
			return NextResponse.json({ error: 'Error updating application documents' }, { status: 500 });
		}
	} catch (error) {
		console.error('Error:', error);
		return NextResponse.json({ error }, { status: 500 });
	}
}
