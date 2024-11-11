import { database } from '@/appwrite/config';
import { JobApplicationFormData } from '@/components/ApplicationForm/utility';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ID } from 'node-appwrite';

export async function POST(req: NextRequest) {
	try {
		if (!cookies().get('session')) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const formData = (await req.json()) as JobApplicationFormData;

		if (!formData.jobTitle) {
			return NextResponse.json({ error: 'Form completion is required' }, { status: 400 });
		}

		const response = await database.createDocument(
			String(process.env.NEXT_PUBLIC_APPLICATION_DB),
			String(process.env.NEXT_PUBLIC_APPLICATION_DB_COLLECTION_ID),
			ID.unique(),
			formData,
		);

		if (response.$id) {
			return NextResponse.json({ message: 'Application created successfully' }, { status: 200 });
		} else {
			return NextResponse.json({ error: 'Error creating application' }, { status: 500 });
		}
	} catch (error) {
		console.error('Error:', error);
		return NextResponse.json({ error }, { status: 500 });
	}
}
