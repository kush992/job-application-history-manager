import AddJourney from '@/components/Journeys/AddJourney';
import { HydrationBoundary } from '@tanstack/react-query';
import { Analytics } from '@vercel/analytics/next';

import { Loader } from 'lucide-react';
import { Suspense } from 'react';

export default function AddJourneyPage() {
	return (
		<Suspense fallback={<Loader />}>
			<Analytics />
			<HydrationBoundary>
				<main className="min-h-screen bg-appBackground bg-gradient-to-r from-transparent to-primary-foreground py-8 px-4 sm:px-6 lg:px-8">
					<AddJourney />
				</main>
			</HydrationBoundary>
		</Suspense>
	);
}
