import React, { Suspense } from 'react';
import Loader from '@/components/ui/loader';
import { Analytics } from '@vercel/analytics/next';
import { getLoggedInUser } from '@/lib/server/appwrite';
import { redirect } from 'next/navigation';
import { appRoutes, QueryKeys } from '@/utils/constants';
import QnAPage from '@/components/QnAPage';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { QnAShowType } from '@/components/QnAPage/utility';
import { interviewQuestionsQueries } from '@/lib/server/interview-questions-queries';

const QuestionsAndAnswersPage = async () => {
	const user = await getLoggedInUser();

	if (!user) redirect(appRoutes.signUp);

	const queryClient = new QueryClient();
	await queryClient.prefetchQuery({
		queryKey: [QueryKeys.QUESTIONS_AND_ANSWERS_PAGE, user.$id, QnAShowType.PUBLIC],
		queryFn: () => interviewQuestionsQueries.getAll(QnAShowType.PUBLIC),
	});

	return (
		<Suspense fallback={<Loader />}>
			<main className="flex min-h-screen flex-col gap-8 container mx-auto p-4 ">
				<Analytics />

				<HydrationBoundary state={dehydrate(queryClient)}>
					<QnAPage userId={user.$id} />
				</HydrationBoundary>
			</main>
		</Suspense>
	);
};

export default QuestionsAndAnswersPage;
