import React, { Suspense } from 'react';
import Loader from '@/components/Loader';
import { Analytics } from '@vercel/analytics/next';
import { getLoggedInUser } from '@/lib/server/appwrite';
import { redirect } from 'next/navigation';
import { appRoutes } from '@/utils/constants';
import ApplicationPage from '@/components/ApplicationPage';

const ApplicationsPage = async () => {
	const user = await getLoggedInUser();

	if (!user) redirect(appRoutes.signUpPage);

	return (
		<Suspense fallback={<Loader />}>
			<main className="flex min-h-screen flex-col gap-8 max-w-6xl mx-auto p-4 ">
				<Analytics />
				<ApplicationPage userId={user.$id} />
			</main>
		</Suspense>
	);
};

export default ApplicationsPage;
