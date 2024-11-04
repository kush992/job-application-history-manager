import ApplicationForm from '@/components/ApplicationForm';
import Loader from '@/components/Loader';
import { getLoggedInUser } from '@/lib/server/appwrite';
import { fetchApplicationDataById } from '@/lib/server/appwrite-queries';
import { appRoutes, QueryKeys } from '@/utils/constants';
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from '@tanstack/react-query';
import { Analytics } from '@vercel/analytics/next';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

type Params = {
	documentId: string;
};

export default async function UpdateApplication({
	params,
}: {
	params: Params;
}) {
	const user = await getLoggedInUser();

	if (!user) redirect(appRoutes.signUp);

	const queryClient = new QueryClient();
	await queryClient.prefetchQuery({
		queryKey: [QueryKeys.APPLICATION_BY_ID, params.documentId, user.$id],
		queryFn: () => fetchApplicationDataById(params.documentId, user.$id),
	});

	return (
		<Suspense fallback={<Loader />}>
			<main className="flex min-h-screen flex-col gap-8 max-w-6xl mx-auto p-4 ">
				<Analytics />
				<HydrationBoundary state={dehydrate(queryClient)}>
					<ApplicationForm
						documentId={params.documentId}
						isUpdateForm
						userId={user.$id}
					/>
				</HydrationBoundary>
			</main>
		</Suspense>
	);
}
