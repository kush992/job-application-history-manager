import React, { Suspense } from 'react';
import Loader from '@/components/Loader';
import { Analytics } from '@vercel/analytics/next';
import { getLoggedInUser } from '@/lib/server/appwrite';
import { redirect } from 'next/navigation';
import { appRoutes, QueryKeys } from '@/utils/constants';
import QnAPage from '@/components/QnAPage';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchQnAData } from '@/lib/server/appwrite-queries';
import { QnAShowType } from '@/components/QnAPage/utility';

const QuestionsAndAnswersPage = async () => {
	const user = await getLoggedInUser();

	if (!user) redirect(appRoutes.signUpPage);

	const queryClient = new QueryClient();
	await queryClient.prefetchQuery({
		queryKey: [QueryKeys.QUESTIONS_AND_ANSWERS_PAGE, user.$id, QnAShowType.PUBLIC],
		queryFn: () => fetchQnAData(user.$id, QnAShowType.PUBLIC),
	});

	return (
		<Suspense fallback={<Loader />}>
			<main className='flex min-h-screen flex-col gap-8 max-w-6xl mx-auto p-4 '>
				<Analytics />

				<HydrationBoundary state={dehydrate(queryClient)}>
					<QnAPage userId={user.$id} />
				</HydrationBoundary>
			</main>
		</Suspense>
	);
};

export default QuestionsAndAnswersPage;
