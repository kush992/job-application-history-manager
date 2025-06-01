export interface ContactSubmission {
	id: string;
	name: string;
	email: string;
	message: string;
	privacy_policy_accepted: boolean;
	status: 'new' | 'in_progress' | 'resolved' | 'closed';
	ip_address?: string | null;
	user_agent?: string | null;
	submitted_at: string;
	created_at: string;
	updated_at: string;
}

export interface ContactFormData {
	name: string;
	email: string;
	message: string;
	privacyPolicy: boolean;
}

export interface ApiResponse {
	success: boolean;
	message?: string;
	error?: string;
	code?: string;
	data?: {
		id: string;
		submittedAt: string;
	};
	details?: Array<{
		field: string;
		message: string;
	}>;
}
