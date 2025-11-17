import React, { Suspense } from 'react';
import Loader from '@/components/ui/loader';
import { Analytics } from '@vercel/analytics/next';
import ApplicationsListPage from '@/components/ApplicationsPages/ApplicationsListPage';
import { HydrationBoundary } from '@tanstack/react-query';
import { getLoggedInUser } from '@/lib/supabase/user';

const ApplicationsPage = async () => {
	const user = await getLoggedInUser();

	// const queryClient = new QueryClient();
	// await queryClient.prefetchQuery({
	// 	queryKey: [QueryKeys.APPLICATIONS_PAGE, user?.id],
	// 	queryFn: () => applicationDataQueries.getAll(undefined, undefined, undefined),
	// });

	return (
		<Suspense fallback={<Loader />}>
			<main className="flex min-h-screen flex-col gap-8 mx-auto px-4">
				<Analytics />
				<HydrationBoundary>
					<ApplicationsListPage />
				</HydrationBoundary>
			</main>
		</Suspense>
	);
};

export default ApplicationsPage;
