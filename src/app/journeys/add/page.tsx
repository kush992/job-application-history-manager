'use client';

import { useRouter } from 'next/navigation';
import { JourneyForm } from '@/components/Journeys/JourneyForm';
import { useJourneys } from '@/hooks/useJourneys';
import { JourneyFormData } from '@/types/schema';
import { appRoutes } from '@/utils/constants';

import { useToast } from '@/hooks/use-toast';

export default function AddJourneyPage() {
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
		<div className="min-h-screen bg-appBackground bg-gradient-to-r from-transparent to-primary-foreground py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-2xl mx-auto">
				<div className="text-center mb-8 motion-preset-fade-md">
					<h1 className="text-3xl font-bold text-primary">Create New Journey</h1>
					<p className="mt-2 text-secondary-foreground">Start tracking your job search journey</p>
				</div>

				<JourneyForm
					onSubmit={handleSubmit}
					isLoading={isLoading}
					title="Create New Journey"
					description="Set up a new job search campaign to track your applications"
					submitText="Create Journey"
				/>
			</div>
		</div>
	);
}
