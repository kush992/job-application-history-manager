import JobAnalyticsDashboard from '@/components/JourneyAnalyticsDashboard';
import Loader from '@/components/Loader';
import { createClient } from '@/lib/supabase/server';
import { appRoutes } from '@/utils/constants';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

type Params = {
	journeyId: string;
};

export default async function JobAnalyticsDashboardPage({ params }: { params: Params }) {
	const supabase = await createClient();
	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();

	if (error || !user) {
		redirect(appRoutes.signIn);
	}

	console.log('journeyId', params);
	return (
		<Suspense fallback={<Loader />}>
			<JobAnalyticsDashboard journeyId={params.journeyId} />
		</Suspense>
	);
}
