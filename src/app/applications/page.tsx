'use client';

import React, { Suspense } from 'react';
import Application from '@/components/Applications';
import Loader from '@/components/Loader';
import { Analytics } from '@vercel/analytics/next';
import withAuth from '@/components/hoc/withAuth';

const ApplicationPage = () => {
	return (
		<Suspense fallback={<Loader />}>
			<main className='flex min-h-screen flex-col gap-8 max-w-6xl mx-auto p-4 '>
				<Analytics />
				<Application />
			</main>
		</Suspense>
	);
};

export default withAuth(ApplicationPage);
