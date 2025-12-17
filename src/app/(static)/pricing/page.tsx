import { Analytics } from '@vercel/analytics/next';
import { Suspense } from 'react';

import PricingView from '@/components/StaticPages/PricingView';
import Loader from '@/components/ui/loader';

export default function Pricing() {
	return (
		<Suspense fallback={<Loader />}>
			<main className="flex flex-col h-full gap-4 container mx-auto p-4">
				<PricingView />
				<Analytics />
			</main>
		</Suspense>
	);
}
