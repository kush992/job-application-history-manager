import React, { Suspense } from 'react';
import Application from '@/components/Applications';
import Loader from '@/components/Loader';
import { Analytics } from '@vercel/analytics/next';

const ApplicationPage = () => {
	return (
		<Suspense fallback={<Loader />}>
			<main className='flex min-h-screen flex-col gap-8 max-w-5xl mx-auto p-4 '>
				<Analytics />
				<Application />
			</main>
		</Suspense>
	);
};

export default ApplicationPage;
