import { Analytics } from '@vercel/analytics/next';
import { Suspense } from 'react';

import ApplicationFormAiView from '@/components/Applications/ApplicationFormAiView';
import Loader from '@/components/ui/loader';

export default async function AddApplication() {

	return (
		<Suspense fallback={<Loader />}>
			<main className="flex min-h-screen flex-col gap-8 mx-auto py-8">
				<Analytics />
				<ApplicationFormAiView />
			</main>
		</Suspense>
	);
}
