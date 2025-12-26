'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

import InterviewExperienceCardMinimal from '@/components/InterviewExperiences/InterviewExperienceCard/InterviewExperienceCardMinimal';
import InterviewExperienceCardSkeleton from '@/components/InterviewExperiences/InterviewExperienceCard/InterviewExperienceCardSkeleton';
import ErrorDisplay from '@/components/ui/error-display';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useInterviewExperiences } from '@/hooks/useInterviewExperiences';
import { InterviewExperience } from '@/types/schema';

const InterviewExperiencesPage = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const tab = searchParams.get('tab') || 'public';

	const { experiences: publicExperiences, experiencesLoading: publicLoading, experiencesError: publicError } =
		useInterviewExperiences({ publicOnly: true });
	const { experiences: privateExperiences, experiencesLoading: privateLoading, experiencesError: privateError } =
		useInterviewExperiences({ publicOnly: false });

	const handleTabChange = (value: string) => {
		const params = new URLSearchParams(searchParams.toString());
		if (value === 'public') {
			params.set('tab', 'public');
		} else {
			params.set('tab', 'private');
		}
		router.push(`/interview-experiences?${params.toString()}`);
	};

	return (
		<div className="md:container py-8">
			<div className="mb-8">
				<h1 className="text-4xl font-bold tracking-tight">Interview Experiences</h1>
				<p className="text-muted-foreground mt-2">
					{tab === 'public'
						? 'Browse public interview experiences shared by our community'
						: 'Your private interview experiences'}
				</p>
			</div>

			<Tabs value={tab} onValueChange={handleTabChange} className="w-full">
				<TabsList>
					<TabsTrigger value="public">Public</TabsTrigger>
					<TabsTrigger value="private">Private</TabsTrigger>
				</TabsList>

				<TabsContent value="public" className="mt-6">
					{publicLoading ? (
						<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
							{Array.from({ length: 6 }).map((_, i) => (
								<InterviewExperienceCardSkeleton key={i} />
							))}
						</div>
					) : publicError ? (
						<div className="p-4">
							<ErrorDisplay error={publicError} />
						</div>
					) : publicExperiences && publicExperiences.length > 0 ? (
						<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
							{publicExperiences.map((experience: InterviewExperience) => (
								<InterviewExperienceCardMinimal
									key={experience.id}
									interviewExperience={experience}
									showUpvote={true}
								/>
							))}
						</div>
					) : (
						<div className="text-center py-12">
							<p className="text-muted-foreground">No public interview experiences available yet.</p>
						</div>
					)}
				</TabsContent>

				<TabsContent value="private" className="mt-6">
					{privateLoading ? (
						<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
							{Array.from({ length: 6 }).map((_, i) => (
								<InterviewExperienceCardSkeleton key={i} />
							))}
						</div>
					) : privateError ? (
						<div className="p-4">
							<ErrorDisplay error={privateError} />
						</div>
					) : privateExperiences && privateExperiences.length > 0 ? (
						<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
							{privateExperiences.map((experience: InterviewExperience) => (
								<InterviewExperienceCardMinimal
									key={experience.id}
									interviewExperience={experience}
									showUpvote={false}
								/>
							))}
						</div>
					) : (
						<div className="text-center py-12">
							<p className="text-muted-foreground">No private interview experiences yet.</p>
						</div>
					)}
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default InterviewExperiencesPage;
