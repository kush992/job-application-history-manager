import { NextRequest, NextResponse } from 'next/server';

import { logger } from '@/lib/logger';
import { interviewExperienceFormSchema } from '@/lib/supabase/schema';
import { withAuth } from '@/lib/supabase/withAuth';

// GET /api/v2/interview-experiences - List interview experiences
// Query params:
// - application_id: filter by application
// - public_only: if true, return only public experiences (for public page)
export async function GET(request: NextRequest) {
	return withAuth(request, async (supabase, user) => {
		const searchParams = request.nextUrl.searchParams;
		const applicationId = searchParams.get('application_id');
		const publicOnly = searchParams.get('public_only') === 'true';

		let query = supabase.from('interview_experiences').select(
			`
				id,
				job_application_id,
				company_name,
				job_title,
				interview_stage,
				category,
				is_public,
				likes_count,
				content,
				rating,
				created_at,
				updated_at
			`,
		);

		if (publicOnly) {
			// For public experiences, we need to join with profiles but anonymize user info
			query = query.eq('is_public', true).order('created_at', { ascending: false });
		} else {
			// For user's own experiences
			query = query.eq('user_id', user.id).order('created_at', { ascending: false });
		}

		if (applicationId) {
			query = query.eq('job_application_id', applicationId);
		}

		const { data: experiences, error } = await query;

		if (error) {
			logger.error({ request, userId: user.id, message: 'Error fetching interview experiences', error });
			return NextResponse.json(
				{ error: 'Failed to fetch interview experiences', details: JSON.stringify(error) },
				{ status: 500 },
			);
		}

		// Anonymize user info for public experiences
		if (publicOnly && experiences) {
			experiences.forEach((exp: any) => {
				if (exp.profiles) {
					exp.user = {
						id: 'anonymous',
						full_name: 'Anonymous User',
						avatar_url: null,
					};
					delete exp.profiles;
				}
			});
		}

		return NextResponse.json({ experiences: experiences || [] });
	});
}

// POST /api/v2/interview-experiences - Create a new interview experience
export async function POST(request: NextRequest) {
	return withAuth(request, async (supabase, user) => {
		const body = await request.json();
		const validatedFields = interviewExperienceFormSchema.safeParse(body);

		if (!validatedFields.success) {
			return NextResponse.json(
				{
					error: 'Invalid form data',
					fieldErrors: validatedFields.error.flatten().fieldErrors,
				},
				{ status: 400 },
			);
		}

		// If linked to application, get company_name and job_title from application
		const insertData = { ...validatedFields.data };
		if (validatedFields.data.job_application_id) {
			const { data: application } = await supabase
				.from('job_applications')
				.select('company_name, job_title')
				.eq('id', validatedFields.data.job_application_id)
				.eq('user_id', user.id)
				.single();

			if (application) {
				// Use application's company_name and job_title if not provided
				insertData.company_name = insertData.company_name || application.company_name;
				insertData.job_title = insertData.job_title || application.job_title;
			}
		}

		const { data: experience, error } = await supabase
			.from('interview_experiences')
			.insert({
				user_id: user.id,
				...insertData,
			})
			.select()
			.single();

		if (error) {
			return NextResponse.json(
				{ error: 'Failed to create interview experience', details: JSON.stringify(error) },
				{ status: 500 },
			);
		}

		return NextResponse.json({ success: 'Interview experience created successfully', experience }, { status: 201 });
	});
}
