import { ContractType, JobSites, WorkMode } from '@/types/apiResponseTypes';
import { z } from 'zod';

export enum SalaryType {
	MONTHLY = 'MONTHLY',
	PER_ANUM = 'PER_ANUM',
	HOURLY = 'HOURLY',
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
	user_id: z.string().optional().default(' '),
	job_title: z.string().nonempty('Job title is a required field'),
	notes: z.string().nonempty('Job description is a required field').optional(),
	salary: z.string().optional(),
	salary_type: z
		.enum(Object.values(SalaryType) as [string, ...string[]], {
			description: 'Salary type is a required field',
		})
		.default(SalaryType.MONTHLY)
		.optional()
		.nullable(),
	// salaryCurrency: z.string().default(SalaryCurrency.PLN).optional().nullable(),
	salary_currency: z
		.enum(Object.values(SalaryCurrency) as [string, ...string[]], {
			description: 'Salary currency is a required field',
		})
		.default(SalaryCurrency.PLN)
		.optional()
		.nullable(),
	// applicationStatus: z.string().default(ApplicationStatus.APPLIED).optional().nullable(),
	application_status: z
		.enum(Object.values(ApplicationStatus) as [string, ...string[]], {
			description: 'Application status is a required field',
		})
		.default(ApplicationStatus.IN_PROGRESS)
		.optional()
		.nullable(),
	company_name: z.string().nonempty('Company name is a required field'),
	company_domain: z.string().optional(),
	interview_date: z.date().optional(),
	links: z.string().optional(),
	location: z.string().optional(),
	job_link: z.string().optional().nullable(),
	// jobPostedOn: z.string().default(JobSites.LINKEDIN).optional().nullable(),
	job_posted_on: z
		.enum(Object.values(JobSites) as [string, ...string[]], {
			description: 'Job posted on is a required field',
		})
		.default(JobSites.LINKEDIN)
		.optional()
		.nullable(),
	// workMode: z.string().default(WorkMode.REMOTE).optional().nullable(),
	work_mode: z
		.enum(Object.values(WorkMode) as [string, ...string[]], {
			description: 'Work mode is a required field',
		})
		.default(WorkMode.REMOTE)
		.optional()
		.nullable(),
	// contractType: z.string().default(ContractType.FULL_TIME).optional().nullable(),
	contract_type: z
		.enum(Object.values(ContractType) as [string, ...string[]], {
			description: 'Contract type is a required field',
		})
		.default(ContractType.FULL_TIME)
		.optional()
		.nullable(),
});

export type JobApplicationFormData = z.infer<typeof formSchema>;

export const FILES_SEPARATOR = ',____,';
