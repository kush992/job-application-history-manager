import { z } from 'zod';

import {
	ApplicationStatus,
	ContractType,
	InterviewExperienceCategory,
	JobSites,
	SalaryCurrency,
	SalaryType,
	WorkMode,
} from '@/types/schema';

export const journeySchema = z.object({
	title: z.string().nonempty('Journey title is required'),
	description: z.string().optional().nullable(),
	start_date: z.string(),
	end_date: z.string().optional().nullable(),
	is_active: z.boolean().default(true),
});

export const jobApplicationSchema = z.object({
	job_title: z.string().nonempty('Job title is a required field'),
	notes: z.string().optional().nullable(),
	salary: z.string().optional().nullable(),
	salary_type: z.nativeEnum(SalaryType).default(SalaryType.MONTHLY).optional().nullable(),
	salary_currency: z.nativeEnum(SalaryCurrency).default(SalaryCurrency.PLN).optional().nullable(),
	application_status: z.nativeEnum(ApplicationStatus).default(ApplicationStatus.APPLIED).optional().nullable(),
	company_name: z.string().nonempty('Company name is a required field'),
	company_domain: z.string().optional().nullable(),
	interview_date: z.date().optional().nullable(),
	links: z.string().optional().nullable(),
	location: z.string().optional().nullable(),
	job_link: z.string().optional().nullable(),
	job_posted_on: z.nativeEnum(JobSites).default(JobSites.LINKEDIN).optional().nullable(),
	work_mode: z.nativeEnum(WorkMode).default(WorkMode.REMOTE).optional().nullable(),
	contract_type: z.nativeEnum(ContractType).default(ContractType.FULL_TIME).optional().nullable(),
	applied_at: z.string().default(() => new Date().toISOString()),
});

export const jobApplicationSchemaAddWithAi = z.object({
	job_application_data: z.string().nonempty('Job Application data is required.'),
	links: z.string().optional().nullable(),
});

export const profileSchema = z.object({
	full_name: z.string().optional().nullable(),
	avatar_url: z.string().url().optional().nullable(),
});

export const interviewExperienceFormSchema = z
	.object({
		job_application_id: z.string().optional().nullable(),
		company_name: z.string().optional().nullable(),
		job_title: z.string().optional().nullable(),
		interview_stage: z.nativeEnum(ApplicationStatus).optional().nullable(),
		rating: z.number().min(0).max(2, 'Invalid rating'),
		category: z.nativeEnum(InterviewExperienceCategory).default(InterviewExperienceCategory.INTERVIEW),
		content: z.string().optional(),
		is_public: z.boolean().default(true),
	})
	.refine(
		(data) => {
			// If linked to application, company_name and job_title are optional
			if (data.job_application_id) {
				return true;
			}
			// If not linked, both company_name and job_title are required
			return !!(data.company_name && data.job_title);
		},
		{
			message: 'Company name and job title are required when not linked to an application',
			path: ['company_name'],
		},
	)
	.refine(
		(data) => {
			// If linked to application, company_name and job_title are optional
			if (data.job_application_id) {
				return true;
			}
			// If not linked, both company_name and job_title are required
			return !!(data.company_name && data.job_title);
		},
		{
			message: 'Company name and job title are required when not linked to an application',
			path: ['job_title'],
		},
	);
