import FAQPage from '@/components/FAQPage';
import Loader from '@/components/Loader';
import { Analytics } from '@vercel/analytics/next';
import { Suspense } from 'react';

export default function FAQ() {
	return (
		<Suspense fallback={<Loader />}>
			<main className="flex flex-col h-full gap-4 max-w-6xl mx-auto p-4">
				<FAQPage />
				<Analytics />
			</main>
		</Suspense>
	);
}
