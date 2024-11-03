import ApplicationForm from '@/components/ApplicationForm';
import { Analytics } from '@vercel/analytics/next';
import { Suspense } from 'react';
import Loader from '@/components/Loader';
import { getLoggedInUser } from '@/lib/server/appwrite';
import { redirect } from 'next/navigation';
import { appRoutes } from '@/utils/constants';

export default async function AddApplication() {
	const user = await getLoggedInUser();

	if (!user) redirect(appRoutes.signUp);

	return (
		<Suspense fallback={<Loader />}>
			<main className="flex min-h-screen flex-col gap-8 max-w-6xl mx-auto ">
				<Analytics />
				<ApplicationForm userId={user.$id} />
			</main>
		</Suspense>
	);
}
