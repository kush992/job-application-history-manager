import ApplicationForm from '@/components/ApplicationsPages/ApplicationForm';
import Loader from '@/components/ui/loader';
import { applicationDataQueries } from '@/lib/server/application-queries';
import { getLoggedInUser } from '@/lib/supabase/user';
import { appRoutes, QueryKeys } from '@/utils/constants';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Analytics } from '@vercel/analytics/next';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

type Params = {
	documentId: string;
};

export default async function UpdateApplication({ params }: { params: Params }) {
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
					<ApplicationForm documentId={params.documentId} isUpdateForm userId={String(user?.id)} />
				</HydrationBoundary>
			</main>
		</Suspense>
	);
}
