import React, { Suspense } from 'react';
import Loader from '@/components/Loader';
import { Analytics } from '@vercel/analytics/next';
import { getLoggedInUser } from '@/lib/server/appwrite';
import { redirect } from 'next/navigation';
import { appRoutes, QueryKeys } from '@/utils/constants';
import ApplicationPage from '@/components/ApplicationPage';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchApplicationData } from '@/lib/server/appwrite-queries';

const ApplicationsPage = async () => {
	const user = await getLoggedInUser();

	if (!user) redirect(appRoutes.signUpPage);

	const queryClient = new QueryClient();
	await queryClient.prefetchQuery({
		queryKey: [QueryKeys.APPLICATIONS_PAGE],
		queryFn: () => fetchApplicationData(user.$id),
	});

	return (
		<Suspense fallback={<Loader />}>
			<main className='flex min-h-screen flex-col gap-8 max-w-6xl mx-auto p-4 '>
				<Analytics />
				<HydrationBoundary state={dehydrate(queryClient)}>
					<ApplicationPage userId={user.$id} />
				</HydrationBoundary>
			</main>
		</Suspense>
	);
};

export default ApplicationsPage;
