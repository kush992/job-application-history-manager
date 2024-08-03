import ApplicationForm from '@/components/ApplicationForm';
import Loader from '@/components/Loader';
import { Analytics } from '@vercel/analytics/next';
import { GetServerSidePropsContext } from 'next';
import { Suspense } from 'react';

type Params = {
	documentId: string;
};

export default function UpdateApplication({ params }: { params: Params }) {
	return (
		<Suspense fallback={<Loader />}>
			<main className='flex min-h-screen flex-col gap-8 max-w-7xl mx-auto p-4 md:p-16'>
				<Analytics />
				<ApplicationForm documentId={params.documentId} isUpdateForm />
			</main>
		</Suspense>
	);
}
