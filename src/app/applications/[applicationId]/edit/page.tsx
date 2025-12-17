import { HydrationBoundary } from '@tanstack/react-query';
import { Analytics } from '@vercel/analytics/next';
import { Suspense } from 'react';

import ApplicationForm from '@/components/Applications/ApplicationForm';
import Loader from '@/components/ui/loader';
import { getLoggedInUser } from '@/lib/supabase/user';

type Params = {
	applicationId: string;
};

export default async function UpdateApplication({ params }: { params: Params }) {
	const user = await getLoggedInUser();

	return (
		<Suspense fallback={<Loader />}>
			<main className="flex min-h-screen flex-col gap-8 mx-auto py-8">
				<Analytics />
				<HydrationBoundary>
					<ApplicationForm applicationId={params.applicationId} isUpdateForm userId={String(user?.id)} />
				</HydrationBoundary>
			</main>
		</Suspense>
	);
}
