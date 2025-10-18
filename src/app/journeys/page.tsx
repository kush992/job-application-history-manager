import { JourneysView } from '@/components/Journeys/JourneysView';
import { createClient } from '@/lib/supabase/server';
import { appRoutes } from '@/utils/constants';
import { redirect } from 'next/navigation';

export default async function JourneysPage() {
	const supabase = await createClient();
	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();

	if (error || !user) {
		redirect(appRoutes.signUp);
	}

	// No need to fetch initial data - React Query handles it
	return <JourneysView />;
}
