import Loader from '@/components/ui/loader';
import ApplicationView from '@/components/ApplicationsPages/ApplicationView';
import { Analytics } from '@vercel/analytics/next';
import { Suspense } from 'react';
import { HydrationBoundary } from '@tanstack/react-query';
import { getLoggedInUser } from '@/lib/supabase/user';

type Params = {
	applicationId: string;
};

export default async function ViewApplication({ params }: { params: Params }) {
	const user = await getLoggedInUser();

	return (
		<Suspense fallback={<Loader />}>
			<main className="flex min-h-screen flex-col gap-8 mx-auto">
				<Analytics />
				<HydrationBoundary>
					<ApplicationView applicationId={params.applicationId} userId={String(user?.id)} />
				</HydrationBoundary>
			</main>
		</Suspense>
	);
}
