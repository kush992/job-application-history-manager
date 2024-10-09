import Application from '@/components/Applications';
import ApplicationForm from '@/components/ApplicationForm';
import { Analytics } from '@vercel/analytics/next';
import { Suspense } from 'react';
import Loader from '@/components/Loader';
import { getLoggedInUser } from '@/lib/server/appwrite';
import { redirect } from 'next/navigation';
import { appRoutes } from '@/utils/constants';
import { InterviewQuestions } from '@/components/InterviewQuestions';
import InterviewQuestionsForm from '@/components/InterviewQuestionsForm';

export default async function AddInterviewQuestions() {
	const user = await getLoggedInUser();

	if (!user) redirect(appRoutes.signUpPage);

	return (
		<Suspense fallback={<Loader />}>
			<main className='flex min-h-screen flex-col gap-8 max-w-6xl mx-auto '>
				<Analytics />
				<InterviewQuestionsForm userId={user.$id} isUpdateForm documentId='67055848003313fd32cf' />
			</main>
		</Suspense>
	);
}
