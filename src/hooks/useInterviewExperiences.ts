// write hook for interview experiences management with react-query

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { InterviewExperience, InterviewExperienceFormData } from '@/types/schema';
import { apiRoutes, QueryKeys } from '@/utils/constants';
import { handleApiError } from '@/utils/utility';

const fetchInterviewExperiences = async (
	applicationId?: string,
	publicOnly?: boolean,
): Promise<InterviewExperience[]> => {
	const params = new URLSearchParams();
	if (applicationId) {
		params.append('application_id', applicationId);
	}
	if (publicOnly) {
		params.append('public_only', 'true');
	}

	const url = `${apiRoutes.interviewExperiences.getAll}${params.toString() ? `?${params.toString()}` : ''}`;
	const response = await fetch(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (!response.ok) {
		return handleApiError(response);
	}
	const data = await response.json();
	return data.experiences || [];
};

const fetchInterviewExperience = async (id: string): Promise<InterviewExperience> => {
	const response = await fetch(apiRoutes.interviewExperiences.getOne(id), {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (!response.ok) {
		return handleApiError(response);
	}
	const data = await response.json();
	return data.experience;
};

const addInterviewExperience = async (experience: InterviewExperienceFormData): Promise<InterviewExperience> => {
	const response = await fetch(apiRoutes.interviewExperiences.add, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(experience),
	});

	if (!response.ok) {
		return handleApiError(response);
	}
	const data = await response.json();
	return data.experience;
};

const updateInterviewExperience = async (
	id: string,
	experience: InterviewExperienceFormData,
): Promise<InterviewExperience> => {
	const response = await fetch(apiRoutes.interviewExperiences.update(id), {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(experience),
	});

	if (!response.ok) {
		return handleApiError(response);
	}
	const data = await response.json();
	return data.experience;
};

const deleteInterviewExperience = async (id: string): Promise<void> => {
	const response = await fetch(apiRoutes.interviewExperiences.delete(id), {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (!response.ok) {
		return handleApiError(response);
	}
};

const upvoteInterviewExperience = async (id: string): Promise<{ likes_count: number }> => {
	const response = await fetch(apiRoutes.interviewExperiences.upvote(id), {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (!response.ok) {
		return handleApiError(response);
	}
	const data = await response.json();
	return { likes_count: data.likes_count || 0 };
};

type UseInterviewExperiencesOptions = {
	id?: string;
	applicationId?: string;
	publicOnly?: boolean;
};

export const useInterviewExperiences = (options?: UseInterviewExperiencesOptions) => {
	const { id, applicationId, publicOnly } = options || {};
	const queryClient = useQueryClient();

	const {
		data: experiences,
		error: experiencesError,
		isLoading: experiencesLoading,
	} = useQuery<InterviewExperience[]>({
		queryKey: [QueryKeys.INTERVIEW_EXPERIENCES, applicationId, publicOnly],
		queryFn: () => fetchInterviewExperiences(applicationId, publicOnly),
		enabled: publicOnly !== undefined || !!applicationId,
		retry: false,
	});

	const {
		data: interviewExperience,
		error: interviewExperienceError,
		isLoading: interviewExperienceLoading,
	} = useQuery<InterviewExperience, Error>({
		queryKey: [QueryKeys.INTERVIEW_EXPERIENCES, 'single', id],
		queryFn: () => fetchInterviewExperience(id!),
		enabled: !!id,
		retry: false,
	});

	const addExperienceMutation = useMutation({
		mutationFn: addInterviewExperience,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QueryKeys.INTERVIEW_EXPERIENCES] });
		},
	});

	const updateExperienceMutation = useMutation({
		mutationFn: ({ id, experience }: { id: string; experience: InterviewExperienceFormData }) =>
			updateInterviewExperience(id, experience),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QueryKeys.INTERVIEW_EXPERIENCES] });
		},
	});

	const deleteExperienceMutation = useMutation({
		mutationFn: deleteInterviewExperience,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QueryKeys.INTERVIEW_EXPERIENCES] });
		},
	});

	const upvoteExperienceMutation = useMutation({
		mutationFn: upvoteInterviewExperience,
		onSuccess: (_, experienceId) => {
			queryClient.invalidateQueries({ queryKey: [QueryKeys.INTERVIEW_EXPERIENCES] });
			if (experienceId) {
				queryClient.invalidateQueries({ queryKey: [QueryKeys.INTERVIEW_EXPERIENCES, 'single', experienceId] });
			}
		},
	});

	const addExperience = async (experience: InterviewExperienceFormData) => {
		addExperienceMutation.mutateAsync(experience);
	};

	return {
		experiences,
		experiencesError,
		experiencesLoading,
		interviewExperience,
		interviewExperienceLoading,
		interviewExperienceError,
		addExperience,
		isMutationSuccess:
			addExperienceMutation.isSuccess ||
			updateExperienceMutation.isSuccess ||
			deleteExperienceMutation.isSuccess ||
			upvoteExperienceMutation.isSuccess,
		isMutationPending:
			addExperienceMutation.isPending ||
			updateExperienceMutation.isPending ||
			deleteExperienceMutation.isPending ||
			upvoteExperienceMutation.isPending,
		updateExperience: updateExperienceMutation.mutate,
		deleteExperience: deleteExperienceMutation.mutate,
		upvoteExperience: upvoteExperienceMutation.mutate,
		upvoteExperienceAsync: upvoteExperienceMutation.mutateAsync,
	};
};
