import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { Suspense } from 'react';

import ContactView from '@/components/StaticPages/ContactView';
import Loader from '@/components/ui/loader';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';

export const metadata: Metadata = generateSEOMetadata({
	title: 'Contact Us',
	description:
		'Get in touch with the JobJourney team. Have questions, feedback, or need support? Contact us today and we\'ll be happy to help with your job application tracking needs.',
	keywords: [
		'contact jobjourney',
		'job application tracker support',
		'job search tool contact',
	],
	url: '/contact',
});

export default function ContactPage() {
	return (
		<Suspense fallback={<Loader />}>
			<ContactView />
			<Analytics />
		</Suspense>
	);
}
