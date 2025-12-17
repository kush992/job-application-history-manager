import { Analytics } from '@vercel/analytics/next';
import { Suspense } from 'react';

import TermsOfServiceView from '@/components/StaticPages/TermsOfServiceView';
import Loader from '@/components/ui/loader';

export default function TermsOfService() {
	return (
		<Suspense fallback={<Loader />}>
			<main className="flex flex-col h-full gap-4 container mx-auto p-4">
				<TermsOfServiceView />
				<Analytics />
			</main>
		</Suspense>
	);
}
