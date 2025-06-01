export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
	public: {
		Tables: {
			profiles: {
				Row: {
					id: string;
					email: string;
					full_name: string | null;
					avatar_url: string | null;
					created_at: string;
					updated_at: string;
				};
				Insert: {
					id: string;
					email: string;
					full_name?: string | null;
					avatar_url?: string | null;
					created_at?: string;
					updated_at?: string;
				};
				Update: {
					id?: string;
					email?: string;
					full_name?: string | null;
					avatar_url?: string | null;
					created_at?: string;
					updated_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'profiles_id_fkey';
						columns: ['id'];
						referencedRelation: 'users';
						referencedColumns: ['id'];
					},
				];
			};
			journeys: {
				Row: {
					id: string;
					user_id: string;
					title: string;
					description: string | null;
					start_date: string;
					end_date: string | null;
					is_active: boolean;
					created_at: string;
					updated_at: string;
				};
				Insert: {
					id?: string;
					user_id: string;
					title: string;
					description?: string | null;
					start_date?: string;
					end_date?: string | null;
					is_active?: boolean;
					created_at?: string;
					updated_at?: string;
				};
				Update: {
					id?: string;
					user_id?: string;
					title?: string;
					description?: string | null;
					start_date?: string;
					end_date?: string | null;
					is_active?: boolean;
					created_at?: string;
					updated_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'journeys_user_id_fkey';
						columns: ['user_id'];
						referencedRelation: 'profiles';
						referencedColumns: ['id'];
					},
				];
			};
			job_applications: {
				Row: {
					id: string;
					user_id: string;
					journey_id: string;
					job_title: string;
					notes: string | null;
					salary: string | null;
					salary_type: string | null;
					salary_currency: string | null;
					application_status: string;
					company_name: string;
					company_domain: string | null;
					interview_date: string | null;
					links: string | null;
					location: string | null;
					job_link: string | null;
					job_posted_on: string | null;
					work_mode: string | null;
					contract_type: string | null;
					applied_at: string;
					created_at: string;
					updated_at: string;
				};
				Insert: {
					id?: string;
					user_id: string;
					journey_id: string;
					job_title: string;
					notes?: string | null;
					salary?: string | null;
					salary_type?: string | null;
					salary_currency?: string | null;
					application_status?: string;
					company_name: string;
					company_domain?: string | null;
					interview_date?: string | null;
					links?: string | null;
					location?: string | null;
					job_link?: string | null;
					job_posted_on?: string | null;
					work_mode?: string | null;
					contract_type?: string | null;
					applied_at?: string;
					created_at?: string;
					updated_at?: string;
				};
				Update: {
					id?: string;
					user_id?: string;
					journey_id?: string;
					job_title?: string;
					notes?: string | null;
					salary?: string | null;
					salary_type?: string | null;
					salary_currency?: string | null;
					application_status?: string;
					company_name?: string;
					company_domain?: string | null;
					interview_date?: string | null;
					links?: string | null;
					location?: string | null;
					job_link?: string | null;
					job_posted_on?: string | null;
					work_mode?: string | null;
					contract_type?: string | null;
					applied_at?: string;
					created_at?: string;
					updated_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'job_applications_user_id_fkey';
						columns: ['user_id'];
						referencedRelation: 'profiles';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'job_applications_journey_id_fkey';
						columns: ['journey_id'];
						referencedRelation: 'journeys';
						referencedColumns: ['id'];
					},
				];
			};
			statistics: {
				Row: {
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
				};
				Insert: {
					id?: string;
					user_id: string;
					journey_id: string;
					applications_count?: number;
					interviews_count?: number;
					offers_count?: number;
					rejections_count?: number;
					average_response_time?: number | null;
					created_at?: string;
					updated_at?: string;
				};
				Update: {
					id?: string;
					user_id?: string;
					journey_id?: string;
					applications_count?: number;
					interviews_count?: number;
					offers_count?: number;
					rejections_count?: number;
					average_response_time?: number | null;
					created_at?: string;
					updated_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'statistics_user_id_fkey';
						columns: ['user_id'];
						referencedRelation: 'profiles';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'statistics_journey_id_fkey';
						columns: ['journey_id'];
						referencedRelation: 'journeys';
						referencedColumns: ['id'];
					},
				];
			};
		};
		Views: {
			journey_statistics: {
				Row: {
					journey_id: string;
					user_id: string;
					journey_title: string;
					total_applications: number | null;
					interviews: number | null;
					offers: number | null;
					rejections: number | null;
					start_date: string;
					end_date: string | null;
					is_active: boolean;
				};
				Relationships: [
					{
						foreignKeyName: 'journeys_user_id_fkey';
						columns: ['user_id'];
						referencedRelation: 'profiles';
						referencedColumns: ['id'];
					},
				];
			};
		};
		Functions: {
			handle_new_user: {
				Args: Record<PropertyKey, never>;
				Returns: unknown;
			};
			update_journey_statistics: {
				Args: Record<PropertyKey, never>;
				Returns: unknown;
			};
			update_updated_at_column: {
				Args: Record<PropertyKey, never>;
				Returns: unknown;
			};
		};
	};
}
