import { Analytics } from '@vercel/analytics/next';
import { Suspense } from 'react';

import HomePage from '@/components/Home';
import Loader from '@/components/ui/loader';

export default function Home() {
	return (
		<Suspense fallback={<Loader />}>
			{/* <main className="flex flex-col h-full gap-4 container mx-auto">
			</main> */}

			<main className="">
				<HomePage />
				<Analytics />
			</main>
		</Suspense>
	);
}
