import Application from '@/components/Applications';
import ApplicationForm from '@/components/ApplicationForm';
import { Analytics } from '@vercel/analytics/next';
import { Suspense } from 'react';

export default function AddApplication() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<main className='flex min-h-screen flex-col gap-8 max-w-8xl mx-auto p-4 md:p-16'>
				<Analytics />
				<ApplicationForm />
			</main>
		</Suspense>
	);
}
