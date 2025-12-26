'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { useToast } from '@/hooks/use-toast';
import { useInterviewExperiences } from '@/hooks/useInterviewExperiences';
import { appRoutes } from '@/utils/constants';

import { Breadcrumb, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../../ui/breadcrumb';
import ErrorDisplay from '../../ui/error-display';
import Loader from '../../ui/loader';
import InterviewExperienceForm from '../InterviewExperienceForm';

type Props = {
	experienceId: string;
};

const EditInterviewExperienceView: React.FC<Props> = ({ experienceId }) => {
	const { interviewExperience, interviewExperienceLoading, interviewExperienceError, updateExperience, isMutationPending } =
		useInterviewExperiences({ id: experienceId });
	const { toast } = useToast();
	const router = useRouter();

	const isLoading = isMutationPending;

	const handleSubmit = async (data: any) => {
		try {
			updateExperience(
				{ id: experienceId, experience: data },
				{
					onSuccess: () => {
						toast({
							title: 'Success',
							description: 'Interview experience updated successfully',
						});
						router.push(appRoutes.interviewExperiences);
					},
					onError: () => {
						toast({
							title: 'Error',
							description: 'Failed to update interview experience',
							variant: 'destructive',
						});
					},
				},
			);
		} catch (error) {
			toast({
				title: 'Error',
				description: 'Failed to update interview experience',
				variant: 'destructive',
			});
		}
	};

	if (interviewExperienceLoading) {
		return <Loader />;
	}

	if (interviewExperienceError) {
		return (
			<div className="p-4">
				<ErrorDisplay error={interviewExperienceError} />
			</div>
		);
	}

	if (!interviewExperience) {
		return <div className="p-4">Interview experience not found</div>;
	}

	return (
		<div className="md:container">
			<Breadcrumb>
				<BreadcrumbList className="overflow-x-scroll flex-nowrap no-scrollbar">
					<BreadcrumbLink href={appRoutes.home}>Home</BreadcrumbLink>
					<BreadcrumbSeparator />
					<BreadcrumbLink href={appRoutes.interviewExperiences}>Interview Experiences</BreadcrumbLink>
					<BreadcrumbSeparator />
					<BreadcrumbPage>Edit interview experience</BreadcrumbPage>
				</BreadcrumbList>
			</Breadcrumb>
			<div className="mb-8 motion-preset-fade-md">
				<h1 className="text-4xl font-bold tracking-tight">Edit interview experience</h1>
			</div>

			<InterviewExperienceForm
				onSubmit={handleSubmit}
				isLoading={isLoading}
				title="Edit Interview Experience"
				description="Update your interview experience details"
				submitText="Update"
				isEditMode={true}
				defaultValues={{
					job_application_id: interviewExperience.job_application_id || null,
					company_name: interviewExperience.company_name || '',
					job_title: interviewExperience.job_title || '',
					interview_stage: interviewExperience.interview_stage || null,
					rating: interviewExperience.rating ?? 0,
					category: interviewExperience.category,
					content: interviewExperience.content || '',
					is_public: interviewExperience.is_public ?? true,
				}}
			/>
		</div>
	);
};

export default EditInterviewExperienceView;

