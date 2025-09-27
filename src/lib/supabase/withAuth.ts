import { NextRequest, NextResponse } from 'next/server';
import { createClient } from './server';

export async function withAuth(request: NextRequest, handler: (supabase: any, user: any) => Promise<NextResponse>) {
	try {
		const supabase = await createClient();
		const {
			data: { user },
			error: authError,
		} = await supabase.auth.getUser();

		if (authError || !user) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		return await handler(supabase, user);
	} catch (error) {
		console.error('API error:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}
