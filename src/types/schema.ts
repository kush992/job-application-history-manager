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
	IN_REVIEW = 'IN_REVIEW',
	INTERVIEW = 'INTERVIEW',
	APPTITUDE_INTERVIEW = 'APPTITUDE_INTERVIEW',
	LIVE_CODING_INTERVIEW = 'LIVE_CODING_INTERVIEW',
	TECHNICAL_INTERVIEW = 'TECHNICAL_INTERVIEW',
	SYSTEM_DESIGN_INTERVIEW = 'SYSTEM_DESIGN_INTERVIEW',
	MANAGER_INTERVIEW = 'MANAGER_INTERVIEW',
	IN_PROGRESS = 'IN_PROGRESS',
	REJECTED_NO_FEEDBACK = 'REJECTED_NO_FEEDBACK',
	REJECTED_WITH_FEEDBACK = 'REJECTED_WITH_FEEDBACK',
	NO_REPLY = 'NO_REPLY',
	OFFER_REJECTED = 'OFFER_REJECTED',
	OFFER_ACCEPTED = 'OFFER_ACCEPTED',
	SUCCESS = 'SUCCESS',
}

export enum JobSites {
	LINKEDIN = 'LINKEDIN',
	INDEED = 'INDEED',
	GLASSDOOR = 'GLASSDOOR',
	MONSTER = 'MONSTER',
	COMPANY_WEBSITE = 'COMPANY_WEBSITE',
	REFERRAL = 'REFERRAL',
	OTHER = 'OTHER',
	JUST_JOIN_IT = 'JUST_JOIN_IT',
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
	B2B = 'B2B',
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
	no_reply_count: number;
	interview_count: number;
	technical_interview_count: number;
	system_design_interview_count: number;
	manager_interview_count: number;
	rejected_no_feedback_count: number;
	rejected_with_feedback_count: number;
	offer_rejected_count: number;
	offer_accepted_count: number;
	success_count: number;
	avg_salary: string;
	min_salary: string;
	max_salary: string;
	remote_count: number;
	hybrid_count: number;
	onsite_count: number;
	full_time_count: number;
	part_time_count: number;
	contract_count: number;
	freelance_count: number;
	internship_count: number;
	b2b_count: number;
	updated_at: string;

	// Salary types
	hourly_salary_count: 0;
	daily_salary_count: 0;
	weekly_salary_count: 0;
	monthly_salary_count: 38;
	yearly_salary_count: 10;
	hourly_salary_sum: 0;
	daily_salary_sum: 0;
	weekly_salary_sum: 0;
	monthly_salary_sum: 422500;
	yearly_salary_sum: 75180;

	// Currencies
	usd_salary_count: 6;
	eur_salary_count: 16;
	pln_salary_count: 27;
	inr_salary_count: 0;
	gbp_salary_count: 1;
	cad_salary_count: 0;
	aud_salary_count: 0;
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
