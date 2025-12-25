import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { Suspense } from 'react';

import HomeView from '@/components/StaticPages/HomeView';
import Loader from '@/components/ui/loader';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';

export const metadata: Metadata = generateSEOMetadata({
	title: 'Track Every Job Application & Level Up Your Career',
	description:
		'JobJourney helps you organize, analyze, and improve your job search with visual insights. Track applications, manage documents, prepare for interviews, and gain actionable analytics to land your dream job faster.',
	keywords: [
		'job application tracker',
		'job search tracker',
		'application management',
		'career tracker',
		'job interview tracker',
		'application organizer',
		'job search analytics',
		'application dashboard',
		'job hunt tool',
		'application status tracker',
	],
	url: '/',
});

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
