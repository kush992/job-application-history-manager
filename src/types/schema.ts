import { jobApplicationSchema, journeySchema } from '@/lib/supabase/schema';
import { z } from 'zod';

export enum SalaryType {
	HOURLY = 'HOURLY',
	DAILY = 'DAILY',
	WEEKLY = 'WEEKLY',
	MONTHLY = 'MONTHLY',
	YEARLY = 'YEARLY',
}

export enum SalaryCurrency {
	USD = 'USD',
	EUR = 'EUR',
	GBP = 'GBP',
	PLN = 'PLN',
	CAD = 'CAD',
	AUD = 'AUD',
	INR = 'INR',
}

export enum ApplicationStatus {
	APPLIED = 'APPLIED',
	INTERVIEW = 'INTERVIEW',
	OFFER = 'OFFER',
	REJECTED = 'REJECTED',
	WITHDRAWN = 'WITHDRAWN',
}

export enum JobSites {
	LINKEDIN = 'LINKEDIN',
	INDEED = 'INDEED',
	GLASSDOOR = 'GLASSDOOR',
	MONSTER = 'MONSTER',
	COMPANY_WEBSITE = 'COMPANY_WEBSITE',
	REFERRAL = 'REFERRAL',
	OTHER = 'OTHER',
}

export enum WorkMode {
	REMOTE = 'REMOTE',
	HYBRID = 'HYBRID',
	ONSITE = 'ONSITE',
}

export enum ContractType {
	FULL_TIME = 'FULL_TIME',
	PART_TIME = 'PART_TIME',
	CONTRACT = 'CONTRACT',
	FREELANCE = 'FREELANCE',
	INTERNSHIP = 'INTERNSHIP',
}

export interface Journey {
	id: string;
	user_id: string;
	title: string;
	description: string | null;
	start_date: string;
	end_date: string | null;
	is_active: boolean;
	created_at: string;
	updated_at: string;
	applications_count?: number;
}

export type JourneyFormData = z.infer<typeof journeySchema>;

export interface JobApplication {
	id: string;
	user_id: string;
	journey_id: string;
	job_title: string;
	notes: string | undefined;
	salary?: string;
	salary_type?: SalaryType;
	salary_currency?: SalaryCurrency;
	application_status?: ApplicationStatus;
	company_name: string;
	company_domain?: string | undefined;
	interview_date: string;
	links?: string;
	location?: string;
	job_link?: string;
	job_posted_on?: JobSites;
	work_mode?: WorkMode;
	contract_type?: ContractType;
	applied_at: string;
	created_at: string;
	updated_at: string;
}

export type JobApplicationFormData = z.infer<typeof jobApplicationSchema>;
export interface Statistics {
	id: string;
	user_id: string;
	journey_id: string;
	applications_count: number;
	interviews_count: number;
	offers_count: number;
	rejections_count: number;
	average_response_time: number | null;
	created_at: string;
	updated_at: string;
}

export interface JourneyStatistics {
	journey_id: string;
	user_id: string;
	journey_title: string;
	total_applications: number;
	interviews: number;
	offers: number;
	rejections: number;
	start_date: string;
	end_date: string | null;
	is_active: boolean;
}

export interface Profile {
	id: string;
	email: string;
	full_name: string | null;
	avatar_url: string | null;
	created_at: string;
	updated_at: string;
}
