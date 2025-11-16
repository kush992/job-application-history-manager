import { BadgeProps } from '@/components/ui/badge';
import { ApiError } from '@/types/apiError';
import { ApplicationStatus, ContractType, WorkMode } from '@/types/schema';

export const baseUrl = () => {
	if (process.env.VERCEL_URL) {
		return `https://${process.env.VERCEL_URL}`;
	}

	if (process.env.NEXT_PUBLIC_VERCEL_URL) {
		return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
	}

	// Fallback to localhost if environment variables are not available
	return process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
};

export const getFieldValue = (field: string | string[] | undefined): string => {
	if (Array.isArray(field)) {
		return field[0] || '';
	}
	return field || '';
};

export const backgroundImageUrl =
	'url(data:image/png;base64,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)';

export const jsonParseString = (data: Object | unknown) => JSON?.parse(JSON?.stringify(data));

export const purifyFileName = (fileName: string) => {
	return fileName.replace(/[^a-zA-Z0-9.]/g, '-');
};

export const getFileName = (link: string) => {
	return link.split('/')?.slice(-1)?.toString();
};

export const getApplicationStatusColor = (status: ApplicationStatus): BadgeProps['variant'] => {
	switch (status) {
		case ApplicationStatus.INTERVIEW:
		case ApplicationStatus.IN_REVIEW:
		case ApplicationStatus.APPTITUDE_INTERVIEW:
		case ApplicationStatus.LIVE_CODING_INTERVIEW:
		case ApplicationStatus.TECHNICAL_INTERVIEW:
		case ApplicationStatus.SYSTEM_DESIGN_INTERVIEW:
		case ApplicationStatus.MANAGER_INTERVIEW:
		case ApplicationStatus.IN_PROGRESS:
			return 'status-in-progress';
		case ApplicationStatus.OFFER_ACCEPTED:
		case ApplicationStatus.SUCCESS:
			return 'status-success';
		case ApplicationStatus.REJECTED_WITH_FEEDBACK:
		case ApplicationStatus.REJECTED_NO_FEEDBACK:
		case ApplicationStatus.NO_REPLY:
		case ApplicationStatus.OFFER_REJECTED:
			return 'status-failure';
		case ApplicationStatus.APPLIED:
			return 'status-default';
	}
};

export const applicationStatusMapping = {
	[ApplicationStatus.INTERVIEW]: 'In Progress',
	[ApplicationStatus.OFFER_ACCEPTED]: 'Offer Accepted',
	[ApplicationStatus.OFFER_REJECTED]: 'Offer Rejected',
	[ApplicationStatus.REJECTED_NO_FEEDBACK]: 'Rejected (No Feedback)',
	[ApplicationStatus.REJECTED_WITH_FEEDBACK]: 'Rejected (With Feedback)',
	[ApplicationStatus.NO_REPLY]: 'No Reply',
	[ApplicationStatus.APPLIED]: 'Applied',
	[ApplicationStatus.SUCCESS]: 'Success',
	[ApplicationStatus.IN_REVIEW]: 'In Review',
	[ApplicationStatus.APPTITUDE_INTERVIEW]: 'Aptitude Interview',
	[ApplicationStatus.LIVE_CODING_INTERVIEW]: 'Live Coding Interview',
	[ApplicationStatus.TECHNICAL_INTERVIEW]: 'Technical Interview',
	[ApplicationStatus.SYSTEM_DESIGN_INTERVIEW]: 'System Design Interview',
	[ApplicationStatus.MANAGER_INTERVIEW]: 'Manager Interview',
	[ApplicationStatus.IN_PROGRESS]: 'In Progress',
};

export const getWorkModeColor = (workMode: WorkMode): BadgeProps['variant'] => {
	switch (workMode) {
		case WorkMode.REMOTE:
			return 'status-success';
		case WorkMode.HYBRID:
			return 'status-in-progress';
		case WorkMode.ONSITE:
			return 'status-default';
		default:
			return 'status-default';
	}
};

export const workModeMapping = {
	[WorkMode.REMOTE]: 'Remote',
	[WorkMode.HYBRID]: 'Hybrid',
	[WorkMode.ONSITE]: 'On Site',
};

export const contractTypeMapping = {
	[ContractType.FULL_TIME]: 'Full Time',
	[ContractType.PART_TIME]: 'Part Time',
	[ContractType.CONTRACT]: 'Contract',
	[ContractType.INTERNSHIP]: 'Internship',
	[ContractType.FREELANCE]: 'Freelance',
	[ContractType.B2B]: 'B2B',
};

export const handleApiError = async (response: Response) => {
	let errorData: ApiError;
	try {
		const json = await response?.json();
		errorData = {
			error: json?.error || 'An error occurred',
			details: JSON.parse(json?.details),
			fieldErrors: json?.fieldErrors ? JSON.parse(json?.fieldErrors) : null,
			status: response?.status,
			endpoint: response.url,
		};
	} catch (err) {
		console.error('Error parsing API error response as JSON:', err);
		// If response body is not JSON, use status text
		errorData = {
			error: response.statusText || 'An error occurred',
			details: JSON.stringify(response),
			status: response.status,
			endpoint: response.url,
		};
	}

	throw errorData;
};
