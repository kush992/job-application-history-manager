import { createClient } from '@/lib/supabase/server';
import { getProfile } from '@/lib/supabase/profiles';
import { redirect } from 'next/navigation';
import { ProfileView } from '@/components/Profile/ProfileView';
import { appRoutes } from '@/utils/constants';

export default async function ProfilePage() {
	const supabase = await createClient();

	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();

	if (error || !user) {
		redirect(appRoutes.signUp);
	}

	// Fetch user profile from profiles table
	const profileResult = await getProfile(user.id);

	return (
		<div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
			<ProfileView user={user} profile={profileResult.profile} />
		</div>
	);
}
