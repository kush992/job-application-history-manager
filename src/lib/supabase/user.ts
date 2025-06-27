import { createClient } from '@/lib/supabase/server';
import { Profile } from '@/types/profiles';

export const getLoggedInUser = async (): Promise<Partial<Profile> | null> => {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	console.info('Logged in user:', user);

	if (!user) {
		return null;
	}

	return {
		id: user.id,
		email: user.email || null,
		full_name: user.user_metadata.full_name || null,
		avatar_url: user.user_metadata.avatar_url || null,
	};
};
