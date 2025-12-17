import { Analytics } from '@vercel/analytics/next';
import { Suspense } from 'react';

import HomeView from '@/components/StaticPages/HomeView';
import Loader from '@/components/ui/loader';

export default function Home() {
	return (
		<Suspense fallback={<Loader />}>
			{/* <main className="flex flex-col h-full gap-4 container mx-auto">
			</main> */}

			<main className="">
				<HomeView />
				<Analytics />
			</main>
		</Suspense>
	);
}
