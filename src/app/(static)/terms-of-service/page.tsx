import { Analytics } from '@vercel/analytics/next';
import { Suspense } from 'react';

import TermsOfServicePage from '@/components/StaticPages/TermsOfServicePage';
import Loader from '@/components/ui/loader';

export default function TermsOfService() {
	return (
		<Suspense fallback={<Loader />}>
			<main className="flex flex-col h-full gap-4 container mx-auto p-4">
				<TermsOfServicePage />
				<Analytics />
			</main>
		</Suspense>
	);
}
