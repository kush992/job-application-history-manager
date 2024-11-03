// src/app/oauth/route.js

import { createAdminClient } from '@/lib/server/appwrite';
import { appRoutes } from '@/utils/constants';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	const userId = request.nextUrl.searchParams.get('userId');
	const secret = request.nextUrl.searchParams.get('secret');

	const { account } = await createAdminClient();
	const session = await account.createSession(String(userId), String(secret));

	cookies().set('session', session.secret, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: true,
	});

	// Workaround for redirecting to the application page
	// https://github.com/vercel/next.js/issues/59218
	// https://github.com/vercel/next.js/issues/59218#issuecomment-1837889917
	// NextResponse.rewrite(
	// 	new URL(
	// 		`${request.nextUrl.origin}/${appRoutes.applicationPage}`,
	// 		request.url,
	// 	),
	// );
	return NextResponse.redirect(
		new URL(appRoutes.home, request.nextUrl.origin),
		{
			status: 303,
		},
	);
}
