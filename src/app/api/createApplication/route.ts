import { database } from '@/appwrite/config';
import { FormData } from '@/components/ApplicationForm/utility';
import { NextRequest, NextResponse } from 'next/server';
import { IncomingMessage } from 'http';
import formidable from 'formidable';

export async function POST(req: NextRequest) {
	return new Promise(async (resolve, reject) => {
		// Convert NextRequest to IncomingMessage
		const incomingReq = new IncomingMessage(req.body as any);
		incomingReq.headers = Object.fromEntries(req.headers.entries());
		incomingReq.method = req.method;
		incomingReq.url = req.url;

		if (req.body) {
			const reader = req.body.getReader();
			const chunks: Uint8Array[] = [];
			let done = false;

			while (!done) {
				const { value, done: readerDone } = await reader.read();
				if (value) {
					chunks.push(value);
				}
				done = readerDone;
			}

			const body = Buffer.concat(chunks);
			incomingReq.push(body);
		} else {
			incomingReq.push(null);
		}

		const form = formidable();

		form.parse(incomingReq, async (err, fields, files) => {
			if (err) {
				console.error('Form parse error:', err);
				return resolve(NextResponse.json({ status: 500, body: { error: 'Error parsing form data' } }));
			}

			console.log('Parsed fields:', fields);

			const getFieldValue = (field: string | string[] | undefined): string => {
				if (Array.isArray(field)) {
					return field[0] || '';
				}
				return field || '';
			};

			const formData: FormData = {
				jobTitle: getFieldValue(fields.jobTitle),
				jobDescription: getFieldValue(fields.jobDescription),
				companyName: getFieldValue(fields.companyName),
				companyDomain: getFieldValue(fields.companyDomain),
				applicationStatus: getFieldValue(fields.applicationStatus),
				salary: getFieldValue(fields.salary),
				salaryCurrency: getFieldValue(fields.salaryCurrency),
				salaryType: getFieldValue(fields.salaryType),
				interviewDate: getFieldValue(fields.interviewDate),
				userId: getFieldValue(fields.userId),
				feedbackFromCompany: getFieldValue(fields.feedbackFromCompany),
			};

			console.log('Form data:', formData);

			try {
				const response = await database.createDocument(
					String(process.env.NEXT_PUBLIC_APPLICATION_DB),
					String(process.env.NEXT_PUBLIC_APPLICATION_DB_COLLECTION_ID),
					String(process.env.NEXT_PUBLIC_APPLICATION_DB_DOCUMENTS_COLLECTION_ID),
					formData,
				);

				console.log('Response:', response);

				resolve(NextResponse.json(response));
			} catch (error) {
				console.error('Error:', error);
				resolve(NextResponse.json({ status: 500, body: { error: 'Error creating application' } }));
			}
		});
	});
}
