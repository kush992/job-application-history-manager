import { createClient } from '@/lib/supabase/server';
import { CreateProfileData, Profile, UpdateProfileData } from '@/types/profiles';

export async function createProfile(data: CreateProfileData): Promise<{ profile?: Profile; error?: string }> {
	try {
		const supabase = await createClient();

		const { data: profile, error } = await supabase
			.from('profiles')
			.insert({
				id: data.id,
				email: data.email,
				full_name: data.full_name,
			})
			.select()
			.single();

		if (error) {
			console.error('Error creating profile:', error);
			return { error: error.message };
		}

		return { profile };
	} catch (error) {
		console.error('Unexpected error creating profile:', error);
		return { error: 'Failed to create user profile' };
	}
}

export async function getProfile(userId: string): Promise<{ profile?: Profile; error?: string }> {
	try {
		const supabase = await createClient();

		const { data: profile, error } = await supabase.from('profiles').select('*').eq('id', userId).single();

		if (error) {
			if (error.code === 'PGRST116') {
				// No profile found, this is expected for some cases
				return { error: 'Profile not found' };
			}
			console.error('Error fetching profile:', error);
			return { error: error.message };
		}

		return { profile };
	} catch (error) {
		console.error('Unexpected error fetching profile:', error);
		return { error: 'Failed to fetch user profile' };
	}
}

export async function updateProfile(
	userId: string,
	data: UpdateProfileData,
): Promise<{ profile?: Profile; error?: string }> {
	try {
		const supabase = await createClient();

		const { data: profile, error } = await supabase
			.from('profiles')
			.update(data)
			.eq('id', userId)
			.select()
			.single();

		if (error) {
			console.error('Error updating profile:', error);
			return { error: error.message };
		}

		return { profile };
	} catch (error) {
		console.error('Unexpected error updating profile:', error);
		return { error: 'Failed to update user profile' };
	}
}

export async function getOrCreateProfile(
	userId: string,
	email: string,
	fullName?: string,
): Promise<{ profile?: Profile; error?: string }> {
	try {
		// First try to get existing profile
		const existingProfile = await getProfile(userId);

		if (existingProfile.profile) {
			return existingProfile;
		}

		// If no profile exists, create one
		const newProfile = await createProfile({
			id: userId,
			email,
			full_name: fullName || '',
		});

		return newProfile;
	} catch (error) {
		console.error('Error in getOrCreateProfile:', error);
		return { error: 'Failed to get or create profile' };
	}
}
