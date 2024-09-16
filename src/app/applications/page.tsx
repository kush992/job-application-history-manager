import React, { Suspense } from 'react';
import Application from '@/components/Applications';
import Loader from '@/components/Loader';
import { Analytics } from '@vercel/analytics/next';
import { getLoggedInUser } from '@/lib/server/appwrite';
import { redirect } from 'next/navigation';

const ApplicationPage = async () => {
	const user = await getLoggedInUser();

	if (!user) redirect('/signup');

	return (
		<Suspense fallback={<Loader />}>
			<main className='flex min-h-screen flex-col gap-8 max-w-6xl mx-auto p-4 '>
				<Analytics />
				<Application userId={user.$id} />
			</main>
		</Suspense>
	);
};

export default ApplicationPage;
