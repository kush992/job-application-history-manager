import React, { Suspense } from 'react';
import Loader from '@/components/Loader';
import { Analytics } from '@vercel/analytics/next';
import { getLoggedInUser } from '@/lib/server/appwrite';
import { redirect } from 'next/navigation';
import { appRoutes, QueryKeys } from '@/utils/constants';
import ApplicationsListPage from '@/components/ApplicationsListPage';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { applicationDataQueries } from '@/lib/server/application-queries';

const ApplicationsPage = async () => {
	const user = await getLoggedInUser();

	if (!user) redirect(appRoutes.signUp);

	const queryClient = new QueryClient();
	await queryClient.prefetchQuery({
		queryKey: [QueryKeys.APPLICATIONS_PAGE, user.$id],
		queryFn: () => applicationDataQueries.getAll(undefined, undefined, undefined),
	});

	return (
		<Suspense fallback={<Loader />}>
			<main className="flex min-h-screen flex-col gap-8 container mx-auto p-4 ">
				<Analytics />
				<HydrationBoundary state={dehydrate(queryClient)}>
					<ApplicationsListPage userId={user.$id} />
				</HydrationBoundary>
			</main>
		</Suspense>
	);
};

export default ApplicationsPage;
