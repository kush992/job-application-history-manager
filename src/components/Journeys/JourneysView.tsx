'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useJourneys } from '@/hooks/useJourneys';
import { Journey } from '@/types/schema';
import { appRoutes } from '@/utils/constants';
import { DeleteJourneyDialog } from './DeleteJourneyDialog';
import EmptyJourney from './EmptyJourney';
import ErrorDisplay from '../ui/error-display';
import JourneyCard from './JourneyCard';
import JourneyViewSkeleton from './JourneyViewSkeleton';
import {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbLink,
	BreadcrumbSeparator,
	BreadcrumbEllipsis,
	BreadcrumbItem,
	BreadcrumbPage,
} from '../ui/breadcrumb';

export function JourneysView() {
	const { journeys, isFetching, isDeleting, deleteJourney, error, refreshJourneys } = useJourneys();
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [journeyToDelete, setJourneyToDelete] = useState<Journey | null>(null);

	const handleDeleteClick = (journey: Journey) => {
		setJourneyToDelete(journey);
		setDeleteDialogOpen(true);
	};

	const handleDeleteConfirm = async () => {
		if (!journeyToDelete) return;

		const result = await deleteJourney(journeyToDelete.id);
		if (result) {
			setDeleteDialogOpen(false);
			setJourneyToDelete(null);
		}
	};

	// Show loading skeleton while fetching initial data
	if (isFetching && journeys.length === 0) {
		return <JourneyViewSkeleton />;
	}

	// Show empty state
	if (journeys.length === 0 && !isFetching) {
		return <EmptyJourney />;
	}

	// Show journeys list
	return (
		<div className="min-h-screen bg-appBackground bg-gradient-to-r from-transparent to-primary-foreground py-8 px-4 sm:px-6 lg:px-8">
			<div className="md:container">
				<Breadcrumb className="mb-2">
					<BreadcrumbList>
						<BreadcrumbLink href={appRoutes.home}>Home</BreadcrumbLink>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>Journeys</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
				<div className="md:flex justify-between items-center mb-8">
					<div>
						<h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight">Your Job Search Journeys</h1>
						<p className="mt-2 text-secondary-foreground">Manage and track your job search campaigns</p>
					</div>
					<div className="flex gap-2 py-4">
						<Button variant="outline" size="lg" onClick={refreshJourneys} disabled={isFetching}>
							<RefreshCw className={`h-4 w-4 mr-2 ${isFetching ? 'animate-spin' : ''}`} />
							Refresh
						</Button>
						<Link href={appRoutes.addJourney}>
							<Button>
								<Plus className="h-4 w-4 mr-2" />
								New Journey
							</Button>
						</Link>
					</div>
				</div>

				{error && <ErrorDisplay error={error} />}

				{!error && journeys.length > 0 && (
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{journeys.map((journey) => (
							<JourneyCard key={journey.id} journey={journey} handleDeleteClick={handleDeleteClick} />
						))}
					</div>
				)}

				<DeleteJourneyDialog
					open={deleteDialogOpen}
					onOpenChange={setDeleteDialogOpen}
					journey={journeyToDelete}
					onConfirm={handleDeleteConfirm}
					isDeleting={isDeleting}
				/>
			</div>
		</div>
	);
}
