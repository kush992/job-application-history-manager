import { Analytics } from '@vercel/analytics/next';
import { Suspense } from 'react';
import Loader from '@/components/ui/loader';
import { getLoggedInUser } from '@/lib/supabase/user';
import AddApplicationWithAi from '@/components/ApplicationsPages/AddApplicationWithAi';

export default async function AddApplication() {
	const user = await getLoggedInUser();

	return (
		<Suspense fallback={<Loader />}>
			<main className="flex min-h-screen flex-col gap-8 mx-auto py-12">
				<Analytics />
				<AddApplicationWithAi userId={user?.id ?? ''} />
			</main>
		</Suspense>
	);
}
