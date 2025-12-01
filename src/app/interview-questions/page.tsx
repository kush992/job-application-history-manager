import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Analytics } from '@vercel/analytics/next';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react';

import QnAPage from '@/components/QnAPage';
import { QnAShowType } from '@/components/QnAPage/utility';
import Loader from '@/components/ui/loader';
import { interviewQuestionsQueries } from '@/lib/server/interview-questions-queries';
import { getLoggedInUser } from '@/lib/supabase/user';
import { appRoutes, QueryKeys } from '@/utils/constants';

const QuestionsAndAnswersPage = async () => {
	const user = await getLoggedInUser();

	if (!user) redirect(appRoutes.signUp);

	const queryClient = new QueryClient();
	await queryClient.prefetchQuery({
		queryKey: [QueryKeys.QUESTIONS_AND_ANSWERS_PAGE, user.id, QnAShowType.PUBLIC],
		queryFn: () => interviewQuestionsQueries.getAll(QnAShowType.PUBLIC),
	});

	return (
		<Suspense fallback={<Loader />}>
			<main className="flex min-h-screen flex-col gap-8 container mx-auto p-4 ">
				<Analytics />

				<HydrationBoundary state={dehydrate(queryClient)}>
					<QnAPage userId={user.id as string} />
				</HydrationBoundary>
			</main>
		</Suspense>
	);
};

export default QuestionsAndAnswersPage;
