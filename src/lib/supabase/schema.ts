import { z } from 'zod';
import { SalaryType, SalaryCurrency, ApplicationStatus, JobSites, WorkMode, ContractType } from '@/types/schema';

export const journeySchema = z.object({
	title: z.string().nonempty('Journey title is required'),
	description: z.string().optional().nullable(),
	start_date: z.date().default(() => new Date()),
	end_date: z.date().optional().nullable(),
	is_active: z.boolean().default(true),
});

export const jobApplicationSchema = z.object({
	journey_id: z.string().uuid('Invalid journey ID'),
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
	applied_at: z.date().default(() => new Date()),
});

export const profileSchema = z.object({
	full_name: z.string().optional().nullable(),
	avatar_url: z.string().url().optional().nullable(),
});
