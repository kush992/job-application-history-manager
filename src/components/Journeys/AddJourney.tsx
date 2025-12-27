'use client';

import { useRouter } from 'next/navigation';

import { JourneyForm } from '@/components/Journeys/JourneyForm';
import { useToast } from '@/hooks/use-toast';
import { useJourneys } from '@/hooks/useJourneys';
import { JourneyFormData } from '@/types/schema';
import { appRoutes } from '@/utils/constants';

import { Breadcrumb, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../ui/breadcrumb';

export default function AddJourney() {
	const { createJourney, isLoading, error } = useJourneys();
	const { toast } = useToast();
	const router = useRouter();

	const handleSubmit = async (data: JourneyFormData) => {
		const result = await createJourney(data);
		if (result) {
			toast({ title: 'Success', description: 'Journey created successfully!', variant: 'success' });

			router.push(appRoutes.journeys);
		} else if (error) {
			toast({ title: 'Error', description: error, variant: 'destructive' });
		}
	};

	return (
		<div className="md:container">
			<Breadcrumb>
				<BreadcrumbList className="overflow-x-scroll flex-nowrap no-scrollbar">
					<BreadcrumbLink href={appRoutes.home}>Home</BreadcrumbLink>
					<BreadcrumbSeparator />
					<BreadcrumbPage>Add journey</BreadcrumbPage>
				</BreadcrumbList>
			</Breadcrumb>
			<div className="mb-8 motion-preset-fade-md">
				<h1 className="text-4xl font-bold tracking-tight">Create New Journey</h1>
				<p className="mt-2 text-muted-foreground">Start tracking your job search journey</p>
			</div>

			<JourneyForm
				onSubmit={handleSubmit}
				isLoading={isLoading}
				title="Create New Journey"
				description="Set up a new job search campaign to track your applications"
				submitText="Create Journey"
			/>
		</div>
	);
}
