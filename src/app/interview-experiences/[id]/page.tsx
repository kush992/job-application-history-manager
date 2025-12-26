import { HydrationBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';

import InterviewExperienceDetailView from '@/components/InterviewExperiences/InterviewExperienceDetailView';
import Loader from '@/components/ui/loader';

type Params = {
	id: string;
};

export default async function ViewInterviewExperience({ params }: { params: Params }) {
	return (
		<Suspense fallback={<Loader />}>
			<main className="flex min-h-screen flex-col gap-8 mx-auto py-8">
				<HydrationBoundary>
					<InterviewExperienceDetailView experienceId={params.id} />
				</HydrationBoundary>
			</main>
		</Suspense>
	);
}

