import HomePage from '@/components/Home';
import Loader from '@/components/Loader';
import { Analytics } from '@vercel/analytics/next';
import { Suspense } from 'react';

export default function Home() {
	return (
		<Suspense fallback={<Loader />}>
			<main className="flex flex-col h-full gap-4 container mx-auto">
				<HomePage />
				<Analytics />
			</main>
		</Suspense>
	);
}
