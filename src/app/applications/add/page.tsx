import { Analytics } from '@vercel/analytics/next';
import { Suspense } from 'react';

import ApplicationForm from '@/components/Applications/ApplicationForm';
import Loader from '@/components/ui/loader';
import { getLoggedInUser } from '@/lib/supabase/user';

export default async function AddApplication() {
	const user = await getLoggedInUser();

	return (
		<Suspense fallback={<Loader />}>
			<main className="flex min-h-screen flex-col gap-8 mx-auto py-8">
				<Analytics />
				<ApplicationForm userId={String(user?.id)} />
			</main>
		</Suspense>
	);
}
