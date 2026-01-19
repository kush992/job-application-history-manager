import type { Metadata } from 'next';

import DocumentationContent from '@/components/StaticPages/HowItWorksView/DocumentationContent';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';

export const metadata: Metadata = generateSEOMetadata({
	title: 'JobJourney Documentation',
	description:
		'Start tracking your job applications for free with JobJourney. Affordable pricing plans designed for job seekers. Get started today with our free tier and upgrade as you grow.',
	keywords: [
		'job application tracker pricing',
		'job search tool cost',
		'free job tracker',
		'application management pricing',
	],
	url: '/how-it-works',
});

export default function HowItWorksPage() {
	return (
		<main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
			<DocumentationContent />
		</main>
	);
}
