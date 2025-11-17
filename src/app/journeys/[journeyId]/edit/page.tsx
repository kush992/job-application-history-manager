import EditJourney from '@/components/Journeys/EditJourney';
import { HydrationBoundary } from '@tanstack/react-query';
import { Analytics } from '@vercel/analytics/next';

import { Loader } from 'lucide-react';
import { Suspense } from 'react';

type Params = {
	journeyId: string;
};

export default function EditJourneyPage({ params }: { params: Params }) {
	return (
		<Suspense fallback={<Loader />}>
			<Analytics />
			<HydrationBoundary>
				<main className="min-h-screen bg-appBackground bg-gradient-to-r from-transparent to-primary-foreground py-8 px-4 sm:px-6 lg:px-8">
					<EditJourney journeyId={params.journeyId} />
				</main>
			</HydrationBoundary>
		</Suspense>
	);
}
