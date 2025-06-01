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
}

export interface JobApplication {
	id: string;
	user_id: string;
	journey_id: string;
	job_title: string;
	notes: string | null;
	salary: string | null;
	salary_type: SalaryType | null;
	salary_currency: SalaryCurrency | null;
	application_status: ApplicationStatus;
	company_name: string;
	company_domain: string | null;
	interview_date: string | null;
	links: string | null;
	location: string | null;
	job_link: string | null;
	job_posted_on: JobSites | null;
	work_mode: WorkMode | null;
	contract_type: ContractType | null;
	applied_at: string;
	created_at: string;
	updated_at: string;
}

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
