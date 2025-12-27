import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';

import Wrapper from '@/components/Layout/Wrapper';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { getLoggedInUser } from '@/lib/supabase/user';
import { viewport } from '@/lib/viewport';
import { jsonParseString } from '@/utils/utility';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = generateSEOMetadata();
export { viewport };

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const user = await getLoggedInUser();
	const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jobjourney.site';

	// Structured Data (JSON-LD)
	const organizationSchema = {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: 'JobJourney',
		url: siteUrl,
		logo: `${siteUrl}/favicon.ico`,
		description:
			'Track, organize, and analyze your job applications with JobJourney. Manage applications, store documents, track interviews, and gain insights.',
		sameAs: ['https://twitter.com/jobjourney', 'https://github.com/jobjourney'],
		contactPoint: {
			'@type': 'ContactPoint',
			contactType: 'Customer Support',
			url: `${siteUrl}/contact`,
		},
	};

	const websiteSchema = {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: 'JobJourney',
		url: siteUrl,
		description:
			'Track, organize, and analyze your job applications with JobJourney. Manage applications, store documents, track interviews, and gain insights.',
		potentialAction: {
			'@type': 'SearchAction',
			target: {
				'@type': 'EntryPoint',
				urlTemplate: `${siteUrl}/search?q={search_term_string}`,
			},
			'query-input': 'required name=search_term_string',
		},
	};

	const softwareApplicationSchema = {
		'@context': 'https://schema.org',
		'@type': 'SoftwareApplication',
		name: 'JobJourney',
		applicationCategory: 'BusinessApplication',
		operatingSystem: 'Web Browser',
		offers: {
			'@type': 'Offer',
			price: '0',
			priceCurrency: 'USD',
		},
		aggregateRating: {
			'@type': 'AggregateRating',
			ratingValue: '4.8',
			ratingCount: '50',
		},
	};

	return (
		<html lang="en" prefix="og: https://ogp.me/ns#">
			<body className={inter.className}>
				<Script
					id="organization-schema"
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
					strategy="beforeInteractive"
				/>
				<Script
					id="website-schema"
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
					strategy="beforeInteractive"
				/>
				<Script
					id="software-application-schema"
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
					strategy="beforeInteractive"
				/>
				<Wrapper user={jsonParseString(user)}>{children}</Wrapper>
			</body>
		</html>
	);
}
