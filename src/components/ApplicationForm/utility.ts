import { z } from 'zod';

export enum SalaryType {
	MONTHLY = 'MONTHLY',
	PER_ANUM = 'PER_ANUM',
}

export enum SalaryCurrency {
	PLN = 'PLN',
	USD = 'USD',
	INR = 'INR',
	EUR = 'EUR',
	GBP = 'GBP',
}

export enum ApplicationStatus {
	IN_PROGRESS = 'IN_PROGRESS',
	APPLIED = 'APPLIED',
	NO_REPLY = 'NO_REPLY',
	SUCCESS = 'SUCCESS',
	REJECTED_NO_FEEDBACK = 'REJECTED_NO_FEEDBACK',
	REJECTED_WITH_FEEDBACK = 'REJECTED_WITH_FEEDBACK',
}

export enum RoleType {
	REMOTE = 'REMOTE',
	HYBRID = 'HYBRID',
	ON_SITE = 'ON_SITE',
}

export const formSchema = z.object({
	userId: z.string().optional().default(' '),
	jobTitle: z.string().nonempty('Job title is a required field'),
	jobDescription: z.string().nonempty('Job description is a required field').optional(),
	salary: z.string().optional(),
	salaryType: z.string().default(SalaryType.MONTHLY).optional().nullable(),
	salaryCurrency: z.string().default(SalaryCurrency.PLN).optional().nullable(),
	applicationStatus: z.string().default(ApplicationStatus.APPLIED).optional().nullable(),
	feedbackFromCompany: z.string().optional().nullable().default(''),
	companyName: z.string().nonempty('Company name is a required field'),
	companyDomain: z.string().optional(),
	interviewDate: z.date().optional(),
	links: z.string().optional(),
});

export type FormData = z.infer<typeof formSchema>;

export const FILES_SEPARATOR = ',____,';

export const uploadFile = async (file: File) => {
	// Step 1: Get the signed URL
	const res = await fetch('/api/files/newUpload', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			fileName: file.name,
			contentType: file.type,
		}),
	});

	const { url } = await res.json();

	// Step 2: Upload the file using the signed URL
	const uploadRes = await fetch(url, {
		method: 'PUT',
		headers: {
			'Content-Type': file.type,
		},
		body: file,
	});

	if (uploadRes.ok) {
		console.log('File uploaded successfully');
		return uploadRes;
	} else {
		console.error('Upload failed');
	}
};
