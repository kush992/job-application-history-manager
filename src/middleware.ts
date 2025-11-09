import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { appRoutes } from './utils/constants';

// Define route patterns based on your appRoutes
const publicRoutes = [
	appRoutes.home,
	appRoutes.signUp,
	appRoutes.faq,
	appRoutes.pricing,
	appRoutes.aboutUs,
	appRoutes.contactUs,
	appRoutes.privacyPolicy,
	appRoutes.termsOfService,
	appRoutes.authCodeError,
	appRoutes.authConfirm,
];

const authRoutes = [appRoutes.signUp];

const protectedRoutes = [
	appRoutes.application,
	appRoutes.addApplication,
	appRoutes.updateApplication,
	appRoutes.viewApplication,
	appRoutes.interviewQuestions,
	appRoutes.addInterviewQuestions,
	appRoutes.updateInterviewQuestions,
	appRoutes.journeys,
	appRoutes.journeyApplications,
	appRoutes.addJourney,
	appRoutes.editJourney,
	appRoutes.viewJourney,
];

// Helper function to check if path matches pattern
function matchesPattern(pathname: string, patterns: string[]): boolean {
	return patterns.some((pattern) => {
		if (pattern.endsWith('*')) {
			return pathname.startsWith(pattern.slice(0, -1));
		}
		return pathname === pattern || pathname.startsWith(pattern + '/');
	});
}

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Skip middleware for static files, API routes, and auth callback
	if (
		pathname.startsWith('/_next') ||
		pathname.startsWith('/api') ||
		pathname.includes('.') ||
		pathname === appRoutes.authCallback ||
		pathname.startsWith('/auth/callback')
	) {
		return NextResponse.next();
	}

	// Handle Supabase environment check
	if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
		// Redirect to setup page if Supabase is not configured
		if (pathname !== '/setup') {
			const url = request.nextUrl.clone();
			url.pathname = '/setup';
			return NextResponse.redirect(url);
		}
		return NextResponse.next();
	}

	let supabaseResponse = NextResponse.next({
		request,
	});

	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
		{
			cookies: {
				getAll() {
					return request.cookies.getAll();
				},
				setAll(cookiesToSet) {
					cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
					supabaseResponse = NextResponse.next({
						request,
					});
					cookiesToSet.forEach(({ name, value, options }) =>
						supabaseResponse.cookies.set(name, value, options),
					);
				},
			},
		},
	);

	// Get user session
	const {
		data: { user },
		error: authError,
	} = await supabase.auth.getUser();

	// Handle public routes
	if (matchesPattern(pathname, publicRoutes)) {
		// If user is authenticated and trying to access auth pages, redirect to applications
		if (user && matchesPattern(pathname, authRoutes)) {
			const url = request.nextUrl.clone();
			url.pathname = appRoutes.application;
			return NextResponse.redirect(url);
		}
		// Allow access to public routes
		return supabaseResponse;
	}

	// Handle protected routes
	if (
		matchesPattern(
			pathname,
			protectedRoutes.filter((route) => typeof route === 'string'),
		)
	) {
		// Check if user is authenticated
		if (!user || authError) {
			const url = request.nextUrl.clone();
			url.pathname = appRoutes.signUp;
			url.searchParams.set('redirectTo', pathname + request.nextUrl.search);
			return NextResponse.redirect(url);
		}
		// User is authenticated, allow access
		return supabaseResponse;
	}

	// For any other route not explicitly defined, allow access (don't treat as protected by default)
	return supabaseResponse;
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * - api routes (handled separately)
		 */
		'/((?!_next/static|_next/image|favicon.ico|api).*)',
	],
};
