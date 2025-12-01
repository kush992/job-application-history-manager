import { Analytics } from '@vercel/analytics/next';
import { Suspense } from 'react';

import PricingPage from '@/components/StaticPages/PricingPage';
import Loader from '@/components/ui/loader';

export default function Pricing() {
	return (
		<Suspense fallback={<Loader />}>
			<main className="flex flex-col h-full gap-4 container mx-auto p-4">
				<PricingPage />
				<Analytics />
			</main>
		</Suspense>
	);
}
