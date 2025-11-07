import Loader from '@/components/ui/loader';
import PrivacyPolicyPage from '@/components/StaticPages/PrivacyPolicyPage';
import { Analytics } from '@vercel/analytics/next';
import { Suspense } from 'react';

export default function PrivacyPolicy() {
	return (
		<Suspense fallback={<Loader />}>
			<main className="flex flex-col h-full gap-4 container mx-auto p-4">
				<PrivacyPolicyPage />
				<Analytics />
			</main>
		</Suspense>
	);
}
