import { SupabaseClient, User } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

import { createClient } from './server';

export async function withAuth(
	request: NextRequest,
	handler: (supabase: SupabaseClient, user: User) => Promise<NextResponse>,
) {
	try {
		const supabase = await createClient();
		const {
			data: { user },
			error: authError,
		} = await supabase.auth.getUser();

		if (authError || !user) {
			return NextResponse.json(
				{
					error: 'Unauthorized',
					details: authError ? JSON.stringify(authError) : 'User not logged in or user does not exists.',
				},
				{ status: 401 },
			);
		}

		return await handler(supabase, user);
	} catch (error) {
		console.error('API error:', error);
		return NextResponse.json({ error: 'Internal server error', details: JSON.stringify(error) }, { status: 500 });
	}
}
