import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { Suspense } from 'react';

import AboutUsView from '@/components/StaticPages/AboutUsView';
import Loader from '@/components/ui/loader';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';

export const metadata: Metadata = generateSEOMetadata({
	title: 'About Us',
	description:
		'Learn about JobJourney - the comprehensive job application tracker designed to help job seekers organize, analyze, and improve their job search process with smart analytics and intuitive tools.',
	keywords: [
		'about jobjourney',
		'job application tracker company',
		'job search tool',
		'career management platform',
	],
	url: '/about-us',
});

export default function AboutUs() {
	return (
		<Suspense fallback={<Loader />}>
			<main className="flex flex-col h-full gap-4 mx-auto">
				<AboutUsView />
				<Analytics />
			</main>
		</Suspense>
	);
}
