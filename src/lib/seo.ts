import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jobjourney.site';
const siteName = 'JobJourney';
const defaultDescription =
	'Track, organize, and analyze your job applications with JobJourney. Manage applications, store documents, track interviews, and gain insights with smart analytics. Level up your job search today.';
const defaultTitle = `${siteName} - Track Every Job Application & Level Up Your Career`;
const defaultKeywords = [
	'job application tracker',
	'job search tracker',
	'application management',
	'career tracker',
	'job interview tracker',
	'application organizer',
	'job search analytics',
	'career management tool',
	'application history',
	'job hunt tracker',
	'application status tracker',
	'interview questions tracker',
	'resume tracker',
	'job search insights',
	'application dashboard',
];

interface GenerateMetadataOptions {
	title?: string;
	description?: string;
	keywords?: string[];
	image?: string;
	url?: string;
	type?: 'website' | 'article' | 'profile';
	noIndex?: boolean;
	canonical?: string;
}

export function generateMetadata(options: GenerateMetadataOptions = {}): Metadata {
	const {
		title,
		description = defaultDescription,
		keywords = defaultKeywords,
		image = `${siteUrl}/og-image.png`,
		url,
		type = 'website',
		noIndex = false,
		canonical,
	} = options;

	const fullTitle = title ? `${title} | ${siteName}` : defaultTitle;
	const pageUrl = url || siteUrl;
	const canonicalUrl = canonical || pageUrl;

	return {
		metadataBase: new URL(siteUrl),
		title: {
			default: fullTitle,
			template: `%s | ${siteName}`,
		},
		description,
		keywords: keywords.join(', '),
		authors: [{ name: 'JobJourney Team' }],
		creator: 'JobJourney',
		publisher: 'JobJourney',
		formatDetection: {
			email: false,
			address: false,
			telephone: false,
		},
		alternates: {
			canonical: canonicalUrl,
		},
		openGraph: {
			type,
			locale: 'en_US',
			url: pageUrl,
			siteName,
			title: fullTitle,
			description,
			images: [
				{
					url: image,
					width: 1200,
					height: 630,
					alt: fullTitle,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title: fullTitle,
			description,
			images: [image],
			creator: '@jobjourney',
			site: '@jobjourney',
		},
		robots: {
			index: !noIndex,
			follow: !noIndex,
			googleBot: {
				index: !noIndex,
				follow: !noIndex,
				'max-video-preview': -1,
				'max-image-preview': 'large',
				'max-snippet': -1,
			},
		},
		verification: {
			google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
			yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
			yahoo: process.env.NEXT_PUBLIC_YAHOO_VERIFICATION,
		},
	};
}

export const siteConfig = {
	name: siteName,
	url: siteUrl,
	description: defaultDescription,
	keywords: defaultKeywords,
	ogImage: `${siteUrl}/og-image.png`,
	links: {
		linkedin: 'https://www.linkedin.com/company/jobjourney-2024',
	},
};
