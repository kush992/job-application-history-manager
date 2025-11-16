import React, { Suspense } from 'react';
import Loader from '@/components/ui/loader';
import { Analytics } from '@vercel/analytics/next';
import ApplicationsListPage from '@/components/ApplicationsPages/ApplicationsListPage';
import { HydrationBoundary } from '@tanstack/react-query';
import { getLoggedInUser } from '@/lib/supabase/user';

type Params = {
	journeyId: string;
};

const JourneyApplicationsListPage = async ({ params }: { params: Params }) => {
	const user = await getLoggedInUser();

	return (
		<Suspense fallback={<Loader />}>
			<main className="flex min-h-screen flex-col gap-8 container mx-auto p-4 ">
				<Analytics />
				<HydrationBoundary>
					<ApplicationsListPage journeyId={params.journeyId} />
				</HydrationBoundary>
			</main>
		</Suspense>
	);
};

export default JourneyApplicationsListPage;
