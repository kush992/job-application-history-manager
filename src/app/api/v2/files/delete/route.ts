import { Storage } from '@google-cloud/storage';
import { NextRequest, NextResponse } from 'next/server';

const storage = new Storage({
	projectId: process.env.PROJECT_ID,
	credentials: {
		client_email: process.env.CLIENT_EMAIL,
		private_key: process.env.PRIVATE_KEY?.split(String.raw`\n`).join('\n'),
	},
});

const bucketName = String(process.env.BUCKET_NAME);

export async function POST(request: NextRequest) {
	try {
		const { fileName } = await request.json();

		if (!fileName) {
			return NextResponse.json({ error: 'fileName is required' }, { status: 400 });
		}

		const bucket = storage.bucket(bucketName);
		const file = bucket.file(fileName);

		await file.delete();

		return NextResponse.json({ status: 'success' }, { status: 200 });
	} catch (error) {
		console.error('Error deleting file:', error);
		return NextResponse.json({ error: 'Error deleting file', details: JSON.stringify(error) }, { status: 500 });
	}
}
