import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { Suspense } from 'react';

import PricingView from '@/components/StaticPages/PricingView';
import Loader from '@/components/ui/loader';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';

export const metadata: Metadata = generateSEOMetadata({
	title: 'Pricing',
	description:
		'Start tracking your job applications for free with JobJourney. Affordable pricing plans designed for job seekers. Get started today with our free tier and upgrade as you grow.',
	keywords: [
		'job application tracker pricing',
		'job search tool cost',
		'free job tracker',
		'application management pricing',
	],
	url: '/pricing',
});

export default function Pricing() {
	return (
		<Suspense fallback={<Loader />}>
			<main className="flex flex-col h-full gap-4 container mx-auto p-4">
				<PricingView />
				<Analytics />
			</main>
		</Suspense>
	);
}
