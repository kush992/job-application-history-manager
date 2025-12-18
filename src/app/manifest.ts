import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'JobJourney',
		short_name: 'JobJourney',
		description: 'Created by kushbhalodi.com',
		start_url: '/',
		display: 'standalone',
		background_color: '#ffffff',
		theme_color: '#000000',
		icons: [
			{
				src: '/favicon.ico',
			},
		],
	};
}
