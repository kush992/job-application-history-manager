import Loader from '@/components/Loader';
import ApplicationView from '@/components/ApplicationView';
import { appRoutes, QueryKeys } from '@/utils/constants';
import { Analytics } from '@vercel/analytics/next';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { applicationDataQueries } from '@/lib/server/application-queries';
import { getLoggedInUser } from '@/lib/supabase/user';

type Params = {
	documentId: string;
};

export default async function ViewApplication({ params }: { params: Params }) {
	const user = await getLoggedInUser();

	const queryClient = new QueryClient();
	await queryClient.prefetchQuery({
		queryKey: [QueryKeys.APPLICATION_BY_ID, params.documentId, user?.id],
		queryFn: () => applicationDataQueries.getOne(params.documentId),
	});

	return (
		<Suspense fallback={<Loader />}>
			<main className="flex min-h-screen flex-col gap-8 mx-auto">
				<Analytics />
				<HydrationBoundary state={dehydrate(queryClient)}>
					<ApplicationView documentId={params.documentId} userId={String(user?.id)} />
				</HydrationBoundary>
			</main>
		</Suspense>
	);
}
