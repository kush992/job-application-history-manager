import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react';

import QnAPage from '@/components/InterviewQuestions/QnAPage';
import { QnAShowType } from '@/components/InterviewQuestions/QnAPage/utility';
import Loader from '@/components/ui/loader';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { interviewQuestionsQueries } from '@/lib/server/interview-questions-queries';
import { getLoggedInUser } from '@/lib/supabase/user';
import { appRoutes, QueryKeys } from '@/utils/constants';

export const metadata: Metadata = generateSEOMetadata({
	title: 'Interview Questions & Answers',
	description:
		'Browse and share interview questions and answers from the JobJourney community. Learn from others and contribute your own interview experiences to help fellow job seekers prepare.',
	keywords: [
		'interview questions',
		'interview preparation',
		'interview answers',
		'common interview questions',
		'job interview tips',
		'interview questions database',
	],
	url: '/interview-questions',
});

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
