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

	return NextResponse.redirect(`${request.nextUrl.origin}/${appRoutes.applicationPage}`);
}
