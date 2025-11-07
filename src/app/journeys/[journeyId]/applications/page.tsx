import React, { Suspense } from 'react';
import Loader from '@/components/ui/loader';
import { Analytics } from '@vercel/analytics/next';
import { QueryKeys } from '@/utils/constants';
import ApplicationsListPage from '@/components/ApplicationsPages/ApplicationsListPage';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { applicationDataQueries } from '@/lib/server/application-queries';
import { getLoggedInUser } from '@/lib/supabase/user';

type Params = {
	journeyId: string;
};

const JourneyApplicationsListPage = async ({ params }: { params: Params }) => {
	const user = await getLoggedInUser();

	const queryClient = new QueryClient();
	await queryClient.prefetchQuery({
		queryKey: [QueryKeys.APPLICATIONS_PAGE, user?.id, params.journeyId],
		queryFn: () => applicationDataQueries.getAll(undefined, undefined, undefined),
	});

	return (
		<Suspense fallback={<Loader />}>
			<main className="flex min-h-screen flex-col gap-8 container mx-auto p-4 ">
				<Analytics />
				<HydrationBoundary state={dehydrate(queryClient)}>
					<ApplicationsListPage journeyId={params.journeyId} />
				</HydrationBoundary>
			</main>
		</Suspense>
	);
};

export default JourneyApplicationsListPage;
