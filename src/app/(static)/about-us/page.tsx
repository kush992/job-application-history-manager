import { Analytics } from '@vercel/analytics/next';
import { Suspense } from 'react';

import AboutUsPage from '@/components/StaticPages/AboutUsPage';
import Loader from '@/components/ui/loader';

export default function AboutUs() {
	return (
		<Suspense fallback={<Loader />}>
			<main className="flex flex-col h-full gap-4 mx-auto">
				<AboutUsPage />
				<Analytics />
			</main>
		</Suspense>
	);
}
