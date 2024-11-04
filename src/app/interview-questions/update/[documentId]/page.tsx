import Loader from '@/components/Loader';
import QnAForm from '@/components/QnAForm';
import { getLoggedInUser } from '@/lib/server/appwrite';
import { appRoutes } from '@/utils/constants';
import { Analytics } from '@vercel/analytics/next';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

type Params = {
	documentId: string;
};

export default async function UpdateApplication({
	params,
}: {
	params: Params;
}) {
	const user = await getLoggedInUser();

	if (!user) redirect(appRoutes.signUp);

	return (
		<Suspense fallback={<Loader />}>
			<main className="flex min-h-screen flex-col gap-8 max-w-6xl mx-auto p-4 ">
				<Analytics />
				<QnAForm
					documentId={params.documentId}
					isUpdateForm
					userId={user.$id}
				/>
			</main>
		</Suspense>
	);
}
