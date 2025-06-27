export interface Profile {
	id: string;
	email: string | null;
	full_name: string | null;
	avatar_url: string | null;
	created_at: string;
	updated_at: string;
	user_metadata?: {
		full_name?: string;
		avatar_url?: string;
		theme?: 'light' | 'dark';
	};
}

export interface CreateProfileData {
	id: string;
	email: string;
	full_name: string;
}

export interface UpdateProfileData {
	full_name?: string;
	avatar_url?: string;
}
