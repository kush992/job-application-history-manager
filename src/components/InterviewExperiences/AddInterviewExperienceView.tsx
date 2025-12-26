'use client';

import React from 'react';

import { useToast } from '@/hooks/use-toast';
import { useInterviewExperiences } from '@/hooks/useInterviewExperiences';
import { appRoutes } from '@/utils/constants';

import { Breadcrumb, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../ui/breadcrumb';
import InterviewExperienceForm from './InterviewExperienceForm';

const AddInterviewExperienceView = () => {
	const { addExperience, isMutationPending, isMutationSuccess } = useInterviewExperiences();
	const { toast } = useToast();

	const isLoading = isMutationPending && !isMutationSuccess;

	const handleSubmit = async (data: any) => {
		try {
			await addExperience(data);
			toast({
				title: 'Success',
				description: 'Interview experience added successfully',
			});
			// Navigate to interview experiences page after success
			window.location.href = appRoutes.interviewExperiences;
		} catch (error) {
			toast({
				title: 'Error',
				description: 'Failed to add interview experience',
				variant: 'destructive',
			});
		}
	};

	return (
		<div className="md:container">
			<Breadcrumb>
				<BreadcrumbList className="overflow-x-scroll flex-nowrap no-scrollbar">
					<BreadcrumbLink href={appRoutes.home}>Home</BreadcrumbLink>
					<BreadcrumbSeparator />
					<BreadcrumbPage>Add interview experience</BreadcrumbPage>
				</BreadcrumbList>
			</Breadcrumb>
			<div className="mb-8 motion-preset-fade-md">
				<h1 className="text-4xl font-bold tracking-tight">Add interview experience</h1>
			</div>

			<InterviewExperienceForm
				onSubmit={handleSubmit}
				isLoading={isLoading}
				title="Add Interview Experience"
				description="Share your interview experience to help others prepare"
				submitText="Add"
			/>
		</div>
	);
};

export default AddInterviewExperienceView;
