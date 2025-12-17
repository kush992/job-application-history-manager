import { Analytics } from '@vercel/analytics/next';
import { Suspense } from 'react';

import AboutUsView from '@/components/StaticPages/AboutUsView';
import Loader from '@/components/ui/loader';

export default function AboutUs() {
	return (
		<Suspense fallback={<Loader />}>
			<main className="flex flex-col h-full gap-4 mx-auto">
				<AboutUsView />
				<Analytics />
			</main>
		</Suspense>
	);
}
