// import { createClient } from '@/lib/supabase/server';
// import { appRoutes } from '@/utils/constants';
// import { type NextRequest, NextResponse } from 'next/server';

// export async function GET(request: NextRequest) {
// 	const { searchParams, origin } = new URL(request.url);
// 	const code = searchParams.get('code');
// 	const next = searchParams.get('next') ?? appRoutes.application;

// 	if (code) {
// 		const supabase = await createClient();

// 		const { error } = await supabase.auth.exchangeCodeForSession(code);

// 		if (!error) {
// 			const forwardedHost = request.headers.get('x-forwarded-host'); // original origin before load balancer
// 			const isLocalEnv = process.env.NODE_ENV === 'development';

// 			if (isLocalEnv) {
// 				// we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
// 				return NextResponse.redirect(`${origin}${next}`);
// 			} else if (forwardedHost) {
// 				return NextResponse.redirect(`https://${forwardedHost}${next}`);
// 			} else {
// 				return NextResponse.redirect(`${origin}${next}`);
// 			}
// 		}
// 	}

// 	// return the user to an error page with instructions
// 	return NextResponse.redirect(`${origin}/auth/auth-code-error`);
// }
import { createClient } from '@/lib/supabase/server';
import { getOrCreateProfile } from '@/lib/supabase/profiles';
import { appRoutes } from '@/utils/constants';
import { type NextRequest, NextResponse } from 'next/server';
import { baseUrl } from '@/utils/utility';

export async function GET(request: NextRequest) {
	const { searchParams, origin } = new URL(request.url);
	const code = searchParams.get('code');
	const next = searchParams.get('next') ?? appRoutes.application;

	console.info('Auth callback received:', { code: !!code, next });

	if (code) {
		const supabase = await createClient();

		const { data, error } = await supabase.auth.exchangeCodeForSession(code);

		if (!error && data.user) {
			console.info('Session exchanged successfully for user:', data.user.email);

			// Get or create profile for OAuth users
			const profileResult = await getOrCreateProfile(
				data.user.id,
				data.user.email!,
				data.user.user_metadata?.full_name || data.user.user_metadata?.name,
			);

			if (profileResult.error) {
				console.error('Profile creation/fetch failed:', profileResult.error);
				// Don't fail the auth flow, just log it
				return NextResponse.redirect(`${origin}/auth/auth-code-error`);
			} else {
				console.info('Profile ensured for user:', data.user.email);
			}

			const forwardedHost = request.headers.get('x-forwarded-host');
			const isLocalEnv = process.env.NODE_ENV === 'development';

			console.debug('kb_logs: ',forwardedHost, isLocalEnv)

			// const appUrl = baseUrl();

			if (isLocalEnv) {
				console.debug('kb_logs: redirecting to localhost')
				return NextResponse.redirect(`${origin}${next}`);
			} else if (forwardedHost) {
				console.debug('kb_logs: redirecting to forwardedHost', forwardedHost)
				return NextResponse.redirect(`https://${forwardedHost}${next}`);
			} else {
				return NextResponse.redirect(`${origin}${next}`);
			}
		}

		console.error('Auth callback error:', error);
		return NextResponse.redirect(`${origin}/auth/auth-code-error`);
	}

	// Return the user to an error page with instructions
	console.error('Auth callback failed: No code or error occurred');
	return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
