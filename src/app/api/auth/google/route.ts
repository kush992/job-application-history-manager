import { type NextRequest, NextResponse } from 'next/server';

import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
	try {
		const supabase = await createClient();
		const { redirectTo } = await request.json();

		// Get the origin from the request
		const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

		// Create the callback URL
		const callbackUrl = new URL(`${origin}/auth/callback`);

		const nextPath = redirectTo || '/';
		callbackUrl.searchParams.set('next', nextPath);

		// Sign in with Google OAuth
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: callbackUrl.toString(),
				queryParams: {
					access_type: 'offline',
					prompt: 'consent',
				},
			},
		});
		if (error) {
			console.error('Google OAuth error:', error);
			return NextResponse.json({ error: error.message, details: JSON.stringify(error) }, { status: 400 });
		}

		console.info('Google OAuth URL generated successfully');

		// Return the OAuth URL to redirect to
		return NextResponse.json({
			url: data.url,
			success: 'Redirecting to Google for authentication',
		});
	} catch (error) {
		console.error('Google authentication error:', error);
		return NextResponse.json(
			{
				error: 'Unable to initiate Google authentication. Please try again.',
				details: JSON.stringify(error),
			},
			{ status: 500 },
		);
	}
}
