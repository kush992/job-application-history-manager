import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { Suspense } from 'react';

import PrivacyPolicyView from '@/components/StaticPages/PrivacyPolicyView';
import Loader from '@/components/ui/loader';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';

export const metadata: Metadata = generateSEOMetadata({
	title: 'Privacy Policy',
	description:
		'Read JobJourney privacy policy to understand how we collect, use, and protect your personal information and job application data.',
	keywords: ['privacy policy', 'data protection', 'user privacy'],
	url: '/privacy-policy',
});

export default function PrivacyPolicy() {
	return (
		<Suspense fallback={<Loader />}>
			<main className="flex flex-col h-full gap-4 container mx-auto p-4">
				<PrivacyPolicyView />
				<Analytics />
			</main>
		</Suspense>
	);
}
