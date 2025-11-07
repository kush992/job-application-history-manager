import { appwriteDbConfig, database } from '@/appwrite/config';
import { NextRequest, NextResponse } from 'next/server';
import { ID } from 'node-appwrite';
import { getLoggedInUser } from '@/lib/server/appwrite';

export async function POST(req: NextRequest) {
	try {
		const user = await getLoggedInUser();

		if (!user?.$id) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const formData = (await req.json()) as {
			link: string;
			applicationId: string;
		};

		if (!formData.applicationId || !formData.link) {
			return NextResponse.json({ error: 'Form completion is required' }, { status: 400 });
		}

		const response = await database.createDocument(
			appwriteDbConfig.applicationDb,
			appwriteDbConfig.applicationDbDocumentCollectionId,
			ID.unique(),
			{ link: formData.link, userId: user?.$id, jobApplications: [formData.applicationId] },
		);

		if (response.$id) {
			return NextResponse.json({ message: 'Application Documents added successfully' }, { status: 200 });
		} else {
			return NextResponse.json(
				{ error: 'Error adding application documents', details: JSON.stringify(response) },
				{ status: 500 },
			);
		}
	} catch (error) {
		console.error('Error:', error);
		return NextResponse.json({ error: 'Internal server error', details: JSON.stringify(error) }, { status: 500 });
	}
}
