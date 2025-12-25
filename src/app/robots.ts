import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jobjourney.site';

	return {
		rules: [
			{
				userAgent: '*',
				allow: '/',
				disallow: [
					'/api/',
					'/auth/',
					'/profile',
					'/applications/*/edit',
					'/applications/add',
					'/applications/add-with-ai',
					'/journeys/*/edit',
					'/journeys/add',
					'/interview-questions/add',
					'/interview-questions/update',
				],
			},
			{
				userAgent: 'Googlebot',
				allow: '/',
				disallow: [
					'/api/',
					'/auth/',
					'/profile',
					'/applications/*/edit',
					'/applications/add',
					'/applications/add-with-ai',
					'/journeys/*/edit',
					'/journeys/add',
					'/interview-questions/add',
					'/interview-questions/update',
				],
				crawlDelay: 0,
			},
			{
				userAgent: 'Bingbot',
				allow: '/',
				disallow: [
					'/api/',
					'/auth/',
					'/profile',
					'/applications/*/edit',
					'/applications/add',
					'/applications/add-with-ai',
					'/journeys/*/edit',
					'/journeys/add',
					'/interview-questions/add',
					'/interview-questions/update',
				],
				crawlDelay: 1,
			},
		],
		sitemap: `${baseUrl}/sitemap.xml`,
		host: baseUrl,
	};
}

