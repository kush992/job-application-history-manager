import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { Suspense } from 'react';

import TermsOfServiceView from '@/components/StaticPages/TermsOfServiceView';
import Loader from '@/components/ui/loader';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';

export const metadata: Metadata = generateSEOMetadata({
	title: 'Terms of Service',
	description:
		'Read JobJourney terms of service to understand the rules and guidelines for using our job application tracking platform.',
	keywords: ['terms of service', 'user agreement', 'terms and conditions'],
	url: '/terms-of-service',
});

export default function TermsOfService() {
	return (
		<Suspense fallback={<Loader />}>
			<main className="flex flex-col h-full gap-4 container mx-auto p-4">
				<TermsOfServiceView />
				<Analytics />
			</main>
		</Suspense>
	);
}
