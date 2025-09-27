import { updateProfile } from '@/lib/supabase/profiles';
import { createClient } from '@/lib/supabase/server';
import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const updateProfileSchema = z.object({
	userId: z.string(),
	full_name: z.string().min(2).max(50),
	avatar_url: z.string().url().nullable().optional(),
});

export async function PUT(request: NextRequest) {
	try {
		const supabase = await createClient();

		// Check if user is authenticated
		const {
			data: { user },
			error: authError,
		} = await supabase.auth.getUser();

		if (authError || !user) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const body = await request.json();

		// Validate request data
		const validatedFields = updateProfileSchema.safeParse(body);

		if (!validatedFields.success) {
			return NextResponse.json(
				{
					error: 'Invalid form data',
					fieldErrors: validatedFields.error.flatten().fieldErrors,
				},
				{ status: 400 },
			);
		}

		const { userId, full_name, avatar_url } = validatedFields.data;

		// Ensure user can only update their own profile
		if (user.id !== userId) {
			return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
		}

		// Update profile
		const result = await updateProfile(userId, {
			full_name,
			avatar_url: avatar_url || undefined,
		});

		if (result.error) {
			return NextResponse.json({ error: result.error }, { status: 400 });
		}

		return NextResponse.json({
			success: 'Profile updated successfully',
			profile: result.profile,
		});
	} catch (error) {
		console.error('Profile update error:', error);
		return NextResponse.json(
			{
				error: 'Unable to update profile. Please try again.',
			},
			{ status: 500 },
		);
	}
}
