'use client';

import { useRouter } from 'next/navigation';

import { JourneyForm } from '@/components/Journeys/JourneyForm';
import { useToast } from '@/hooks/use-toast';
import { useJourneys } from '@/hooks/useJourneys';
import { JourneyFormData } from '@/types/schema';
import { appRoutes } from '@/utils/constants';

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '../ui/breadcrumb';

type Props = {
	journeyId: string;
};

export default function EditJourney({ journeyId }: Props) {
	const { journey, updateJourney, isLoading, error } = useJourneys(journeyId);
	const { toast } = useToast();
	const router = useRouter();

	const handleSubmit = async (data: JourneyFormData) => {
		const result = await updateJourney(journeyId, data);
		if (result) {
			toast({ title: 'Success', description: 'Journey updated successfully!', variant: 'success' });

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
					<BreadcrumbLink href={appRoutes.application}>Applications</BreadcrumbLink>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage className="whitespace-nowrap">{journey?.title}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<div className="mb-8 motion-preset-fade-md">
				<h1 className="text-4xl font-bold tracking-tight">Edit journey</h1>
			</div>

			<JourneyForm
				onSubmit={handleSubmit}
				isLoading={isLoading}
				title="Edit Journey"
				description="Set up a new job search campaign to track your applications"
				submitText="Update Journey"
				defaultValues={journey}
			/>
		</div>
	);
}
