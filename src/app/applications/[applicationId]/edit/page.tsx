import { HydrationBoundary } from '@tanstack/react-query';
import { Analytics } from '@vercel/analytics/next';
import { Suspense } from 'react';

import ApplicationFormView from '@/components/Applications/ApplicationFormView';
import Loader from '@/components/ui/loader';

type Params = {
	applicationId: string;
};

export default async function UpdateApplication({ params }: { params: Params }) {
	return (
		<Suspense fallback={<Loader />}>
			<main className="flex min-h-screen flex-col gap-8 mx-auto py-8">
				<Analytics />
				<HydrationBoundary>
					<ApplicationFormView applicationId={params.applicationId} isUpdateForm />
				</HydrationBoundary>
			</main>
		</Suspense>
	);
}
