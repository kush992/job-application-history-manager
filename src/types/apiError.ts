export interface ApiError {
	error: string;
	details?: string;
	fieldErrors?: Record<string, string> | Object | unknown | string;
	status: number;
}
