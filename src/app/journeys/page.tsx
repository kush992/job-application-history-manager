import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { JourneysView } from '@/components/Journeys/JourneysView';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { createClient } from '@/lib/supabase/server';
import { appRoutes } from '@/utils/constants';

export const metadata: Metadata = generateSEOMetadata({
	title: 'My Journeys',
	description:
		'Create and manage application journeys to group related job opportunities. Track progress, organize applications by campaign or goal, and analyze journey performance.',
	keywords: [
		'application journeys',
		'job search journey',
		'group applications',
		'application campaigns',
	],
	url: '/journeys',
	noIndex: true, // User-specific content, don't index
});

export default async function JourneysPage() {
	const supabase = await createClient();
	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();

	if (error || !user) {
		redirect(appRoutes.signUp);
	}

	// No need to fetch initial data - React Query handles it
	return <JourneysView />;
}
