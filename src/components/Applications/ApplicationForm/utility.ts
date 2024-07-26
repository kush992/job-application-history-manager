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

export const formSchema = z.object({
	userId: z.string().optional().default(' '),
	jobTitle: z.string().nonempty('Job title is required'),
	jobDescription: z.string().nonempty('Job description is required').optional(),
	salary: z.string().optional(),
	salaryType: z.enum([SalaryType.MONTHLY, SalaryType.PER_ANUM]).optional(),
	salaryCurrency: z.enum([SalaryCurrency.EUR, SalaryCurrency.PLN, SalaryCurrency.INR, SalaryCurrency.GBP, SalaryCurrency.USD]).optional(),
	applicationStatus: z
		.enum([
			ApplicationStatus.APPLIED,
			ApplicationStatus.IN_PROGRESS,
			ApplicationStatus.NO_REPLY,
			ApplicationStatus.REJECTED_NO_FEEDBACK,
			ApplicationStatus.REJECTED_WITH_FEEDBACK,
			ApplicationStatus.SUCCESS,
		])
		.default(ApplicationStatus.APPLIED)
		.optional(),
	rejectionReason: z.string().optional(),
	companyName: z.string().optional(),
	companyDomain: z.string().optional(),
	interviewDate: z.string().datetime().optional(),
});
