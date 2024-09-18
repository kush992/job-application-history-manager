import Application from '@/components/Applications';
import ApplicationForm from '@/components/ApplicationForm';
import { Analytics } from '@vercel/analytics/next';
import { Suspense } from 'react';
import Loader from '@/components/Loader';
import { getLoggedInUser } from '@/lib/server/appwrite';
import { redirect } from 'next/navigation';

export default async function AddApplication() {
	const user = await getLoggedInUser();

	if (!user) redirect('/login');

	return (
		<Suspense fallback={<Loader />}>
			<main className='flex min-h-screen flex-col gap-8 max-w-6xl mx-auto p-4 '>
				<Analytics />
				<ApplicationForm userId={user.$id} />
			</main>
		</Suspense>
	);
}
