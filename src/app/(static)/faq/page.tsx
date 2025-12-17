import { Analytics } from '@vercel/analytics/next';
import { Suspense } from 'react';

import FaqView from '@/components/StaticPages/FaqView';
import Loader from '@/components/ui/loader';

export default function FAQ() {
	return (
		<Suspense fallback={<Loader />}>
			<main className="flex flex-col h-full gap-4 container mx-auto pt-4">
				<FaqView />
				<Analytics />
			</main>
		</Suspense>
	);
}
