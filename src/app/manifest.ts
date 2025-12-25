import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'JobJourney - Track Every Job Application & Level Up Your Career',
		short_name: 'JobJourney',
		description:
			'Track, organize, and analyze your job applications. Manage applications, store documents, track interviews, and gain insights with smart analytics.',
		start_url: '/',
		display: 'standalone',
		background_color: '#ffffff',
		theme_color: '#000000',
		orientation: 'portrait-primary',
		categories: ['business', 'productivity', 'utilities'],
		icons: [
			{
				src: '/favicon.ico',
				sizes: 'any',
				type: 'image/x-icon',
			},
		],
	};
}
