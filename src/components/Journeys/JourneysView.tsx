'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus, Calendar, MapPin, Briefcase, Trash2, Edit, Eye, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useJourneys } from '@/hooks/useJourneys';
import { Journey } from '@/types/schema';
import { appRoutes } from '@/utils/constants';
import { DeleteJourneyDialog } from './DeleteJourneyDialog';

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

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString();
	};

	// Show loading skeleton while fetching initial data
	if (isFetching && journeys.length === 0) {
		return (
			<div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-6xl mx-auto">
					<div className="flex justify-between items-center mb-8">
						<div>
							<Skeleton className="h-8 w-64 mb-2" />
							<Skeleton className="h-4 w-48" />
						</div>
						<Skeleton className="h-10 w-32" />
					</div>
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{Array.from({ length: 6 }).map((_, i) => (
							<Card key={i}>
								<CardHeader>
									<Skeleton className="h-6 w-3/4 mb-2" />
									<Skeleton className="h-4 w-full" />
								</CardHeader>
								<CardContent>
									<div className="space-y-3">
										<Skeleton className="h-4 w-2/3" />
										<Skeleton className="h-4 w-1/2" />
										<Skeleton className="h-4 w-3/4" />
									</div>
									<div className="flex gap-2 mt-6">
										<Skeleton className="h-8 flex-1" />
										<Skeleton className="h-8 w-8" />
										<Skeleton className="h-8 w-8" />
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</div>
		);
	}

	// Show error state
	if (error && !isFetching) {
		return (
			<div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-4xl mx-auto">
					<div className="text-center">
						<div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-100">
							<RefreshCw className="h-12 w-12 text-red-600" />
						</div>
						<h1 className="mt-6 text-3xl font-bold text-gray-900">Error Loading Journeys</h1>
						<p className="mt-4 text-lg text-gray-600">{error}</p>
						<div className="mt-8">
							<Button onClick={refreshJourneys}>Try Again</Button>
						</div>
					</div>
				</div>
			</div>
		);
	}

	// Show empty state
	if (journeys.length === 0 && !isFetching) {
		return (
			<div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-4xl mx-auto">
					<div className="text-center">
						<div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-blue-100">
							<MapPin className="h-12 w-12 text-blue-600" />
						</div>
						<h1 className="mt-6 text-3xl font-bold text-gray-900">Start Your Job Search Journey</h1>
						<p className="mt-4 text-lg text-gray-600">
							Create your first journey to organize and track your job applications effectively.
						</p>
						<div className="mt-8">
							<Link href={appRoutes.addJourney}>
								<Button size="lg">
									<Plus className="h-5 w-5 mr-2" />
									Create Your First Journey
								</Button>
							</Link>
						</div>
					</div>

					<div className="mt-16">
						<Card className="max-w-2xl mx-auto">
							<CardHeader>
								<CardTitle>What is a Journey?</CardTitle>
								<CardDescription>Organize your job search into focused campaigns</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-start gap-3">
									<div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
										<span className="text-sm font-semibold text-blue-600">1</span>
									</div>
									<div>
										<h4 className="font-medium text-gray-900">Create a Journey</h4>
										<p className="text-sm text-gray-600">
											Set up a journey for a specific job search campaign, like "Software Engineer
											2024" or "Career Change to Data Science"
										</p>
									</div>
								</div>
								<div className="flex items-start gap-3">
									<div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
										<span className="text-sm font-semibold text-blue-600">2</span>
									</div>
									<div>
										<h4 className="font-medium text-gray-900">Track Applications</h4>
										<p className="text-sm text-gray-600">
											Add job applications to your journey and track their progress from
											application to offer
										</p>
									</div>
								</div>
								<div className="flex items-start gap-3">
									<div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
										<span className="text-sm font-semibold text-blue-600">3</span>
									</div>
									<div>
										<h4 className="font-medium text-gray-900">Stay Organized</h4>
										<p className="text-sm text-gray-600">
											Keep all related applications, notes, and progress in one organized place
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		);
	}

	// Show journeys list
	return (
		<div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-5xl mx-auto">
				<div className="md:flex justify-between items-center mb-8">
					<div>
						<h1 className="text-3xl font-bold text-gray-900">Your Job Search Journeys</h1>
						<p className="mt-2 text-gray-600">Manage and track your job search campaigns</p>
					</div>
					<div className="flex gap-2">
						<Button variant="outline" onClick={refreshJourneys} disabled={isFetching}>
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

				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{journeys.map((journey) => (
						<Card key={journey.id} className="hover:shadow-lg transition-shadow">
							<CardHeader>
								<div className="flex items-start justify-between">
									<div className="flex-1">
										<CardTitle className="text-lg">{journey.title}</CardTitle>
										<CardDescription className="mt-1">
											{journey.description || 'No description provided'}
										</CardDescription>
									</div>
									<Badge variant={journey.is_active ? 'default' : 'secondary'}>
										{journey.is_active ? 'Active' : 'Inactive'}
									</Badge>
								</div>
							</CardHeader>
							<CardContent>
								<div className="space-y-3">
									<div className="flex items-center gap-2 text-sm text-gray-600">
										<Calendar className="h-4 w-4" />
										<span>Started {formatDate(journey.start_date)}</span>
									</div>
									{journey.end_date && (
										<div className="flex items-center gap-2 text-sm text-gray-600">
											<Calendar className="h-4 w-4" />
											<span>Ends {formatDate(journey.end_date)}</span>
										</div>
									)}
									<div className="flex items-center gap-2 text-sm text-gray-600">
										<Briefcase className="h-4 w-4" />
										<span>{journey.applications_count || 0} applications</span>
									</div>
								</div>

								<div className="flex gap-2 mt-6">
									<Link href={`${appRoutes.application}?journey=${journey.id}`} className="flex-1">
										<Button variant="outline" size="sm" className="w-full bg-transparent">
											<Eye className="h-4 w-4 mr-2" />
											View
										</Button>
									</Link>
									<Link href={`${appRoutes.editJourney}?id=${journey.id}`}>
										<Button variant="outline" size="sm">
											<Edit className="h-4 w-4" />
										</Button>
									</Link>
									<Button variant="outline" size="sm" onClick={() => handleDeleteClick(journey)}>
										<Trash2 className="h-4 w-4" />
									</Button>
								</div>
							</CardContent>
						</Card>
					))}
				</div>

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
