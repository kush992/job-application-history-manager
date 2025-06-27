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
	const { createJourney, isLoading } = useJourneys();
	const router = useRouter();

	const handleSubmit = async (data: JourneyFormData) => {
		const result = await createJourney(data);
		if (result) {
			setMessage({ type: 'success', text: 'Journey created successfully!' });
			setTimeout(() => {
				router.push(appRoutes.journeys);
			}, 1500);
		} else {
			setMessage({ type: 'error', text: 'Failed to create journey. Please try again.' });
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-2xl mx-auto">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold text-gray-900">Create New Journey</h1>
					<p className="mt-2 text-gray-600">Start tracking your job search journey</p>
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
