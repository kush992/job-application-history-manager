import Loader from '@/components/Loader';
import { getLoggedInUser } from '@/lib/server/appwrite';
import ApplicationView from '@/components/ApplicationView';
import { appRoutes } from '@/utils/constants';
import { Analytics } from '@vercel/analytics/next';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchApplicationDataById } from '@/lib/server/appwrite-queries';

type Params = {
	documentId: string;
};

export default async function ViewApplication({ params }: { params: Params }) {
	const user = await getLoggedInUser();

	if (!user) redirect(appRoutes.signUpPage);

	const queryClient = new QueryClient();
	await queryClient.prefetchQuery({
		queryKey: ['applicationDataById', params.documentId, user.$id],
		queryFn: () => fetchApplicationDataById(params.documentId, user.$id),
	});

	return (
		<Suspense fallback={<Loader />}>
			<main className='flex min-h-screen flex-col gap-8 max-w-6xl mx-auto md:p-4'>
				<Analytics />
				<HydrationBoundary state={dehydrate(queryClient)}>
					<ApplicationView documentId={params.documentId} userId={user.$id} />
				</HydrationBoundary>
			</main>
		</Suspense>
	);
}
