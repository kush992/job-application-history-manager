'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { JourneyForm } from '@/components/Journeys/JourneyForm';
import { useJourneys } from '@/hooks/useJourneys';
import { JourneyFormData } from '@/types/schema';
import { appRoutes } from '@/utils/constants';
import { FormMessage } from '@/components/ui/form-message';

export default function AddJourneyPage() {
	const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
	const { createJourney, isLoading, error } = useJourneys();
	const router = useRouter();

	const handleSubmit = async (data: JourneyFormData) => {
		const result = await createJourney(data);
		if (result) {
			setMessage({ type: 'success', text: 'Journey created successfully!' });

			router.push(appRoutes.journeys);
		} else if (error) {
			setMessage({ type: 'error', text: error });
		}
	};

	return (
		<div className="min-h-screen bg-appBackground bg-gradient-to-r from-transparent to-primary-foreground py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-2xl mx-auto">
				<div className="text-center mb-8 motion-preset-fade-md">
					<h1 className="text-3xl font-bold text-primary">Create New Journey</h1>
					<p className="mt-2 text-secondary-foreground">Start tracking your job search journey</p>
				</div>

				{message && (
					<div className="mb-6">
						<FormMessage type={message.type} message={message.text} />
					</div>
				)}

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
