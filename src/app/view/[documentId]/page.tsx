import ApplicationForm from '@/components/ApplicationForm';
import ApplicationView from '@/components/ApplicationView';
import { Analytics } from '@vercel/analytics/next';
import { GetServerSidePropsContext } from 'next';
import { Suspense } from 'react';

type Params = {
	documentId: string;
};

export default function UpdateApplication({ params }: { params: Params }) {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<main className='flex min-h-screen flex-col gap-8 max-w-7xl mx-auto p-4 md:p-16'>
				<Analytics />
				<ApplicationView documentId={params.documentId} />
			</main>
		</Suspense>
	);
}
