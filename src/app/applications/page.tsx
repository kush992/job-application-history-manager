import { HydrationBoundary } from '@tanstack/react-query';
import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import React, { Suspense } from 'react';

import ApplicationsView from '@/components/Applications/ApplicationsView';
import Loader from '@/components/ui/loader';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { getLoggedInUser } from '@/lib/supabase/user';

export const metadata: Metadata = generateSEOMetadata({
	title: 'My Applications',
	description:
		'Manage and track all your job applications in one place. View status, organize by company, track deadlines, and analyze your application progress with JobJourney.',
	keywords: [
		'my applications',
		'application dashboard',
		'job application list',
		'track applications',
		'application status',
	],
	url: '/applications',
	noIndex: true, // User-specific content, don't index
});

const ApplicationsPage = async () => {
	const user = await getLoggedInUser();

	// const queryClient = new QueryClient();
	// await queryClient.prefetchQuery({
	// 	queryKey: [QueryKeys.APPLICATIONS_PAGE, user?.id],
	// 	queryFn: () => applicationDataQueries.getAll(undefined, undefined, undefined),
	// });

	return (
		<Suspense fallback={<Loader />}>
			<main className="flex min-h-screen flex-col gap-8 mx-auto px-4">
				<Analytics />
				<HydrationBoundary>
					<ApplicationsView />
				</HydrationBoundary>
			</main>
		</Suspense>
	);
};

export default ApplicationsPage;
