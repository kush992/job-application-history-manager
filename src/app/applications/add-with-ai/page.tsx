import ApplicationForm from '@/components/ApplicationForm';
import { Analytics } from '@vercel/analytics/next';
import { Suspense } from 'react';
import Loader from '@/components/Loader';
import { getLoggedInUser } from '@/lib/supabase/user';
import ErrorBoundary from '@/components/ErrorBoundary';
import AddApplicationWithAi from '@/components/AddApplicationWithAi';

export default async function AddApplication() {
	const user = await getLoggedInUser();

	return (
		<Suspense fallback={<Loader />}>
			<main className="flex min-h-screen flex-col gap-8 mx-auto ">
				<Analytics />
				<AddApplicationWithAi userId={user?.id ?? ''} />
			</main>
		</Suspense>
	);
}
