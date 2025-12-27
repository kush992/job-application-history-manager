import { HydrationBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';

import EditInterviewExperienceView from '@/components/InterviewExperiences/EditInterviewExperienceView';
import Loader from '@/components/ui/loader';

type Params = {
	id: string;
};

export default async function EditInterviewExperiencePage({ params }: { params: Params }) {
	return (
		<Suspense fallback={<Loader />}>
			<main className="flex min-h-screen flex-col gap-8 mx-auto py-8">
				<HydrationBoundary>
					<EditInterviewExperienceView experienceId={params.id} />
				</HydrationBoundary>
			</main>
		</Suspense>
	);
}
