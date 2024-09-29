import { NextRequest, NextResponse } from 'next/server';
import { Storage } from '@google-cloud/storage';

// Ensure environment variables are properly set
const storage = new Storage({
	projectId: process.env.PROJECT_ID,
	credentials: {
		client_email: process.env.CLIENT_EMAIL,
		private_key: process.env.PRIVATE_KEY, // Fix escaped newlines in private key
	},
});

const bucketName = String(process.env.BUCKET_NAME);

// Set expiration time for the signed URL
const expiresIn = 60 * 60; // 1 hour in seconds

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
			expires: Date.now() + expiresIn * 1000, // Expiration time in milliseconds
			contentType: contentType,
		});

		return NextResponse.json({ url: signedUrl }, { status: 200 });
	} catch (error) {
		console.error('Error generating signed URL:', error);
		return NextResponse.json({ error: 'Error generating signed URL' }, { status: 500 });
	}
}
