import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { Suspense } from 'react';

import FaqView from '@/components/StaticPages/FaqView';
import Loader from '@/components/ui/loader';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';

export const metadata: Metadata = generateSEOMetadata({
	title: 'Frequently Asked Questions',
	description:
		'Find answers to common questions about JobJourney - the job application tracker. Learn how to track applications, manage documents, prepare for interviews, and optimize your job search.',
	keywords: [
		'jobjourney faq',
		'job application tracker questions',
		'job search tool help',
		'application tracker guide',
	],
	url: '/faq',
});

export default function FAQ() {
	return (
		<Suspense fallback={<Loader />}>
			<main className="flex flex-col h-full gap-4 container mx-auto pt-4">
				<FaqView />
				<Analytics />
			</main>
		</Suspense>
	);
}
