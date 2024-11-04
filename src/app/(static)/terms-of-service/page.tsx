import Loader from '@/components/Loader';
import TermsOfServicePage from '@/components/TermsOfServicePage';
import { Analytics } from '@vercel/analytics/next';
import { Suspense } from 'react';

export default function TermsOfService() {
	return (
		<Suspense fallback={<Loader />}>
			<main className="flex flex-col h-full gap-4 max-w-6xl mx-auto p-4">
				<TermsOfServicePage />
				<Analytics />
			</main>
		</Suspense>
	);
}
