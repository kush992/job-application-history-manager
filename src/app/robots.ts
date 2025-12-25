// import type { MetadataRoute } from 'next';

// export default function robots(): MetadataRoute.Robots {
// 	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jobjourney.site';

// 	return {
// 		rules: [
// 			{
// 				userAgent: '*',
// 				allow: '/',
// 				disallow: [
// 					'/api/',
// 					'/auth/',
// 					'/profile',
// 					'/applications/*/edit',
// 					'/applications/add',
// 					'/applications/add-with-ai',
// 					'/journeys/*/edit',
// 					'/journeys/add',
// 					'/interview-questions/add',
// 					'/interview-questions/update',
// 				],
// 			},
// 			{
// 				userAgent: 'Googlebot',
// 				allow: '/',
// 				disallow: [
// 					'/api/',
// 					'/auth/',
// 					'/profile',
// 					'/applications/*/edit',
// 					'/applications/add',
// 					'/applications/add-with-ai',
// 					'/journeys/*/edit',
// 					'/journeys/add',
// 					'/interview-questions/add',
// 					'/interview-questions/update',
// 				],
// 				crawlDelay: 0,
// 			},
// 			{
// 				userAgent: 'Bingbot',
// 				allow: '/',
// 				disallow: [
// 					'/api/',
// 					'/auth/',
// 					'/profile',
// 					'/applications/*/edit',
// 					'/applications/add',
// 					'/applications/add-with-ai',
// 					'/journeys/*/edit',
// 					'/journeys/add',
// 					'/interview-questions/add',
// 					'/interview-questions/update',
// 				],
// 				crawlDelay: 1,
// 			},
// 		],
// 		sitemap: `${baseUrl}/sitemap.xml`,
// 		host: baseUrl,
// 	};
// }


import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jobjourney.site';

    // Shared disallowed routes to keep code DRY
    const privateRoutes = [
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
    ];

    // List of AI bots to block entirely (from Cloudflare's list)
    const aiBots = [
        'Amazonbot',
        'Applebot-Extended',
        'Bytespider',
        'CCBot',
        'ClaudeBot',
        'Google-Extended',
        'GPTBot',
        'meta-externalagent',
    ];

    return {
        rules: [
            // 1. Block all specific AI Bots identified by Cloudflare
            ...aiBots.map((bot) => ({
                userAgent: bot,
                disallow: '/',
            })),

            // 2. Rules for all other bots (including Googlebot)
            {
                userAgent: '*',
                allow: '/',
                disallow: privateRoutes,
            },

            // 3. Specific rule for Bingbot to maintain crawl delay
            {
                userAgent: 'Bingbot',
                disallow: privateRoutes,
                crawlDelay: 1,
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
        host: baseUrl,
    };
}