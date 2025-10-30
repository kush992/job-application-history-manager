import { NextRequest, NextResponse } from 'next/server';
import { Storage } from '@google-cloud/storage';

const storage = new Storage({
	projectId: process.env.PROJECT_ID,
	credentials: {
		client_email: process.env.CLIENT_EMAIL,
		private_key: process.env.PRIVATE_KEY?.split(String.raw`\n`).join('\n'),
	},
});

const bucketName = String(process.env.BUCKET_NAME);
const expiresIn = 5 * 60 * 1000;

export async function POST(request: NextRequest) {
	try {
		const { fileName, contentType } = await request.json();

		if (!fileName || !contentType) {
			return NextResponse.json({ error: 'fileName and contentType are required' }, { status: 400 });
		}

		const bucket = storage.bucket(bucketName);
		const file = bucket.file(fileName);

		const [signedUrl] = await file.getSignedUrl({
			version: 'v4',
			action: 'write',
			expires: Date.now() + expiresIn * 1000,
			contentType: contentType,
		});

		const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;

		return NextResponse.json({ url: signedUrl, publicUrl }, { status: 200 });
	} catch (error) {
		console.error('Error generating signed URL:', error);
		return NextResponse.json(
			{ error: 'Error generating signed URL', details: JSON.stringify(error) },
			{ status: 500 },
		);
	}
}
