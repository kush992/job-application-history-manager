import { HydrationBoundary } from '@tanstack/react-query';
import { Analytics } from '@vercel/analytics/next';
import React, { Suspense } from 'react';

import ApplicationsView from '@/components/Applications/ApplicationsView';
import Loader from '@/components/ui/loader';

type Params = {
	journeyId: string;
};

const JourneyApplicationsPage = async ({ params }: { params: Params }) => {
	return (
		<Suspense fallback={<Loader />}>
			<main className="flex min-h-screen flex-col gap-8 md:container mx-auto p-4 ">
				<Analytics />
				<HydrationBoundary>
					<ApplicationsView journeyId={params.journeyId} />
				</HydrationBoundary>
			</main>
		</Suspense>
	);
};

export default JourneyApplicationsPage;
