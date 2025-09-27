import { createClient } from '@/lib/supabase/server';
import { getOrCreateProfile } from '@/lib/supabase/profiles';
import { signInSchema } from '@/lib/validations/auth';
import { type NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();

		// Validate form data
		const validatedFields = signInSchema.safeParse(body);

		console.info('Received sign-in request:', validatedFields.data);

		if (!validatedFields.success) {
			console.error('Validation error:', validatedFields.error);
			return NextResponse.json(
				{
					error: 'Invalid form data',
					fieldErrors: validatedFields.error.flatten().fieldErrors,
				},
				{ status: 400 },
			);
		}

		const { email, password } = validatedFields.data;

		const supabase = await createClient();

		console.info('Attempting to sign in with email:', email);

		const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		console.info('Authentication response:', authData, authError);

		if (authError) {
			console.error('Authentication error:', authError);
			return NextResponse.json({ error: authError.message }, { status: 400 });
		}

		// Ensure profile exists (for users created before the trigger was set up)
		if (authData.user) {
			await getOrCreateProfile(authData.user.id, authData.user.email!, authData.user.user_metadata?.full_name);
		}

		console.info('User signed in successfully:', authData.user?.email);
		return NextResponse.json({
			success: 'Successfully signed in!',
		});
	} catch (error) {
		console.error('Authentication error:', error);
		return NextResponse.json(
			{
				error: 'Unable to connect to authentication service. Please check your configuration.',
			},
			{ status: 500 },
		);
	}
}
