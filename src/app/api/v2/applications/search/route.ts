import { NextRequest, NextResponse } from 'next/server';

import { logger } from '@/lib/logger';
import { withAuth } from '@/lib/supabase/withAuth';

// GET /api/v2/applications/search - Search applications by company name or job title
export async function GET(request: NextRequest) {
	return withAuth(request, async (supabase, user) => {
		const searchParams = request.nextUrl.searchParams;
		const query = searchParams.get('q');

		if (!query || query.trim().length === 0) {
			return NextResponse.json({ applications: [] }, { status: 200 });
		}

		// Search applications by company name or job title
		const { data: applications, error } = await supabase
			.from('job_applications')
			.select('id, company_name, job_title')
			.eq('user_id', user.id)
			.or(`company_name.ilike.%${query}%,job_title.ilike.%${query}%`)
			.limit(10)
			.order('created_at', { ascending: false });

		if (error) {
			logger.error({ request, userId: user.id, message: 'Error searching applications', error });
			return NextResponse.json(
				{ error: 'Failed to search applications', details: JSON.stringify(error) },
				{ status: 500 },
			);
		}

		return NextResponse.json({ applications: applications || [] }, { status: 200 });
	});
}
