import { createClient } from '@/lib/supabase/server';
import { type NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	try {
		const supabase = await createClient();

		const { error } = await supabase.auth.signOut();

		if (error) {
			return NextResponse.json({ error: error.message }, { status: 400 });
		}

		return NextResponse.json({
			success: 'Successfully signed out!',
		});
	} catch (error) {
		console.error('Sign out error:', error);
		return NextResponse.json(
			{
				error: 'Unable to sign out. Please try again.',
			},
			{ status: 500 },
		);
	}
}
