import ApplicationView from '@/components/ApplicationView';
import Loader from '@/components/Loader';
import { Analytics } from '@vercel/analytics/next';
import { Suspense } from 'react';

type Params = {
	documentId: string;
};

export default function ViewApplication({ params }: { params: Params }) {
	return (
		<Suspense fallback={<Loader />}>
			<main className='flex min-h-screen flex-col gap-8 max-w-7xl mx-auto p-4 md:p-16'>
				<Analytics />
				<ApplicationView documentId={params.documentId} />
			</main>
		</Suspense>
	);
}
