import Loader from '@/components/Loader';
import { getLoggedInUser } from '@/lib/server/appwrite';
import ApplicationView from '@/components/ApplicationView';
import { appRoutes } from '@/utils/constants';
import { Analytics } from '@vercel/analytics/next';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

type Params = {
	documentId: string;
};

export default async function ViewApplication({ params }: { params: Params }) {
	const user = await getLoggedInUser();

	if (!user) redirect(appRoutes.signUpPage);

	return (
		<Suspense fallback={<Loader />}>
			<main className='flex min-h-screen flex-col gap-8 max-w-6xl mx-auto md:p-4'>
				<Analytics />
				<ApplicationView documentId={params.documentId} />
			</main>
		</Suspense>
	);
}
