import { createClient } from '@/lib/supabase/server';
import { getProfile } from '@/lib/supabase/profiles';
import { redirect } from 'next/navigation';
import { EditProfileForm } from '@/components/Profile/EditProfile';

export default async function EditProfilePage() {
	const supabase = await createClient();

	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();

	if (error || !user) {
		redirect('/auth/signin');
	}

	// Fetch user profile
	const profileResult = await getProfile(user.id);

	return (
		<div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-2xl mx-auto">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold text-primary">Edit Profile</h1>
					<p className="mt-2 text-secondary-foreground">Update your profile information</p>
				</div>
				<EditProfileForm profile={profileResult.profile} userId={user.id} />
			</div>
		</div>
	);
}
