import { createProfile } from '@/lib/supabase/profiles';
import { createClient } from '@/lib/supabase/server';
import { signUpSchema } from '@/lib/validations/auth';
import { type NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();

		// Validate form data
		const validatedFields = signUpSchema.safeParse(body);

		if (!validatedFields.success) {
			return NextResponse.json(
				{
					error: 'Invalid form data',
					fieldErrors: validatedFields.error.flatten().fieldErrors,
				},
				{ status: 400 },
			);
		}

		const { name, email, password } = validatedFields.data;

		const supabase = await createClient();

		// Sign up user first
		const { data: authData, error: authError } = await supabase.auth.signUp({
			email,
			password,
			options: {
				data: {
					full_name: name,
				},
			},
		});

		if (authError) {
			// Handle specific Supabase errors
			if (authError.message.includes('Database error') || authError.message.includes('unexpected_failure')) {
				return NextResponse.json(
					{
						error: 'Database configuration error. Please check your Supabase setup.',
						suggestion:
							'Make sure your Supabase project has authentication enabled and the database is properly configured.',
					},
					{ status: 500 },
				);
			}

			return NextResponse.json({ error: authError.message }, { status: 400 });
		}

		// Create profile if user was created successfully
		if (authData.user && !authData.user.email_confirmed_at) {
			// User needs email confirmation, but we can create the profile
			const profileResult = await createProfile({
				id: authData.user.id,
				email: authData.user.email!,
				full_name: name,
			});

			if (profileResult.error) {
				console.error('Profile creation failed:', profileResult.error);
				// Don't fail the signup if profile creation fails
				// The user can still sign in and we can create the profile later
			}
		}

		return NextResponse.json({
			success: 'Check your email to confirm your account!',
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
