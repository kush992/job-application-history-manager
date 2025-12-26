import { NextRequest, NextResponse } from 'next/server';

import { logger } from '@/lib/logger';
import { interviewExperienceFormSchema } from '@/lib/supabase/schema';
import { withAuth } from '@/lib/supabase/withAuth';

// GET /api/v2/interview-experiences/:id - Get a specific interview experience
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
	return withAuth(request, async (supabase, user) => {
		const { id } = params;

		const { data: experience, error } = await supabase
			.from('interview_experiences')
			.select(
				`
				id,
				user_id,
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
				updated_at,
				job_applications:job_application_id (
					id,
					company_name,
					job_title
				)
			`,
			)
			.eq('id', id)
			.eq('user_id', user.id)
			.single();

		if (error) {
			logger.error({ request, userId: user.id, message: 'Error fetching interview experience', error });
			return NextResponse.json(
				{ error: 'Failed to fetch interview experience', details: JSON.stringify(error) },
				{ status: 500 },
			);
		}

		return NextResponse.json({ experience });
	});
}

// DELETE /api/v2/interview-experiences/:id - Delete a specific interview experience
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
	return withAuth(request, async (supabase, user) => {
		const { id } = params;

		const { error } = await supabase
			.from('interview_experiences')
			.delete()
			.eq('id', id)
			.eq('user_id', user.id);

		if (error) {
			logger.error({ request, userId: user.id, message: 'Error deleting interview experience', error });
			return NextResponse.json(
				{ error: 'Failed to delete interview experience', details: JSON.stringify(error) },
				{ status: 500 },
			);
		}

		return NextResponse.json({ success: 'Interview experience deleted successfully' });
	});
}

// PUT /api/v2/interview-experiences/:id - Update a specific interview experience
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
	return withAuth(request, async (supabase, user) => {
		const { id } = params;
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
		const updateData = { ...validatedFields.data };
		if (validatedFields.data.job_application_id) {
			const { data: application } = await supabase
				.from('job_applications')
				.select('company_name, job_title')
				.eq('id', validatedFields.data.job_application_id)
				.eq('user_id', user.id)
				.single();

			if (application) {
				// Use application's company_name and job_title if not provided
				updateData.company_name = updateData.company_name || application.company_name;
				updateData.job_title = updateData.job_title || application.job_title;
			}
		}

		const { data: experience, error } = await supabase
			.from('interview_experiences')
			.update({
				...updateData,
			})
			.eq('id', id)
			.eq('user_id', user.id)
			.select()
			.single();

		if (error) {
			logger.error({ request, userId: user.id, message: 'Error updating interview experience', error });
			return NextResponse.json(
				{ error: 'Failed to update interview experience', details: JSON.stringify(error) },
				{ status: 500 },
			);
		}

		return NextResponse.json({ success: 'Interview experience updated successfully', experience });
	});
}