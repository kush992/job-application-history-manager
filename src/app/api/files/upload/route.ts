import { Storage } from '@google-cloud/storage';
import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
	try {
		const contentType = req.headers.get('content-type') || '';
		const boundary = contentType.split('boundary=')[1];
		if (!boundary) {
			console.error('Missing boundary in content-type');
			return NextResponse.json({ error: 'Bad Request: Missing boundary in content-type' }, { status: 400 });
		}

		const buffer = await req.arrayBuffer();
		const parts = new TextDecoder().decode(buffer).split(`--${boundary}`);
		const filePart = parts.find((part) => part.includes('Content-Disposition: form-data; name="file"'));
		if (!filePart) {
			console.error('Missing file data');
			return NextResponse.json({ error: 'Bad Request: Missing file data' }, { status: 400 });
		}

		const contentDisposition = filePart.split('\r\n')[1];
		const fileNameMatch = contentDisposition.match(/filename="(.+?)"/);
		const fileName = fileNameMatch ? fileNameMatch[1] : `uploaded-file-${nanoid(12)}`;

		const fileContent = filePart.split('\r\n\r\n')[1].split('\r\n--')[0];

		const storage = new Storage({
			projectId: process.env.PROJECT_ID,
			credentials: {
				client_email: process.env.CLIENT_EMAIL,
				private_key: process.env.PRIVATE_KEY,
			},
		});

		const bucket = storage.bucket(String(process.env.BUCKET_NAME));
		const fileObject = bucket.file(fileName);
		const options = {
			expires: Date.now() + 5 * 60 * 1000, // 5 minutes,
			fields: { 'x-goog-meta-source': 'job-application-manager' },
		};

		const [response] = await fileObject.generateSignedPostPolicyV4(options);

		console.log('File uploaded successfully:', fileName);
		return NextResponse.json(response);
	} catch (error) {
		console.error('Error in upload files API route:', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}
