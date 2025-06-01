import React, { Suspense } from 'react';
import { getLoggedInUser } from '@/lib/server/appwrite';
import { redirect } from 'next/navigation';
import Loader from '@/components/Loader';
import { appRoutes, QueryKeys } from '@/utils/constants';
import { JobApplicationDashboard } from '@/components/Dashboard';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { applicationDataQueries } from '@/lib/server/application-queries';
import { DashboardSkeleton } from '@/components/Dashboard/dashboard-skeleton';

const DashboardPage: React.FC = async () => {
	const user = await getLoggedInUser();

	if (!user) {
		redirect(appRoutes.signUp);
	}

	const queryClient = new QueryClient();
	await queryClient.prefetchQuery({
		queryKey: [QueryKeys.APPLICATIONS_PAGE, user.$id],
		queryFn: () => applicationDataQueries.getAll(undefined, undefined, undefined),
	});

	return (
		<Suspense fallback={<DashboardSkeleton />}>
			<div className="flex min-h-screen flex-col gap-8 container mx-auto p-4">
				<HydrationBoundary state={dehydrate(queryClient)}>
					<JobApplicationDashboard userId={user.$id} />
				</HydrationBoundary>
			</div>
		</Suspense>
	);
};

export default DashboardPage;
