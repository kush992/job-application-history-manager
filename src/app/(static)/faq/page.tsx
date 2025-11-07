import FAQPage from '@/components/StaticPages/FAQPage';
import Loader from '@/components/ui/loader';
import { Analytics } from '@vercel/analytics/next';
import { Suspense } from 'react';

export default function FAQ() {
	return (
		<Suspense fallback={<Loader />}>
			<main className="flex flex-col h-full gap-4 container mx-auto pt-4">
				<FAQPage />
				<Analytics />
			</main>
		</Suspense>
	);
}
