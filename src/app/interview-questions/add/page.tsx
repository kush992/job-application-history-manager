import { Analytics } from '@vercel/analytics/next';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import QnAForm from '@/components/QnAForm';
import Loader from '@/components/ui/loader';
import { getLoggedInUser } from '@/lib/server/appwrite';
import { appRoutes } from '@/utils/constants';

export default async function AddInterviewQuestions() {
	const user = await getLoggedInUser();

	if (!user) redirect(appRoutes.signUp);

	return (
		<Suspense fallback={<Loader />}>
			<main className="flex min-h-screen flex-col gap-8 container mx-auto ">
				<Analytics />
				<QnAForm userId={user.$id} />
			</main>
		</Suspense>
	);
}
