import Loader from '@/components/Loader';
import PricingPage from '@/components/PricingPage';
import { Analytics } from '@vercel/analytics/next';
import { Suspense } from 'react';

export default function Pricing() {
	return (
		<Suspense fallback={<Loader />}>
			<main className="flex flex-col h-full gap-4 max-w-6xl mx-auto p-4">
				<PricingPage />
				<Analytics />
			</main>
		</Suspense>
	);
}
