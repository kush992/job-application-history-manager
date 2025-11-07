import Loader from '@/components/ui/loader';
import PricingPage from '@/components/StaticPages/PricingPage';
import { Analytics } from '@vercel/analytics/next';
import { Suspense } from 'react';

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
