import { NextRequest, NextResponse } from 'next/server';

import { logger } from '@/lib/logger';
import { withAuth } from '@/lib/supabase/withAuth';

// POST /api/v2/interview-experiences/:id/upvote - Upvote an interview experience
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
	return withAuth(request, async (supabase, user) => {
		const { id } = params;

		// Increment likes_count
		const { data: experience, error } = await supabase.rpc('increment_likes_count', {
			experience_id: id,
		});

		// If RPC doesn't exist, use update query
		if (error && error.code === '42883') {
			const { data: currentExperience, error: fetchError } = await supabase
				.from('interview_experiences')
				.select('likes_count')
				.eq('id', id)
				.single();

			if (fetchError) {
				logger.error({
					request,
					userId: user.id,
					message: 'Error fetching interview experience',
					error: fetchError,
				});
				return NextResponse.json(
					{ error: 'Failed to fetch interview experience', details: JSON.stringify(fetchError) },
					{ status: 500 },
				);
			}

			const { data: updatedExperience, error: updateError } = await supabase
				.from('interview_experiences')
				.update({ likes_count: (currentExperience.likes_count || 0) + 1 })
				.eq('id', id)
				.select()
				.single();

			if (updateError) {
				logger.error({
					request,
					userId: user.id,
					message: 'Error upvoting interview experience',
					error: updateError,
				});
				return NextResponse.json(
					{ error: 'Failed to upvote interview experience', details: JSON.stringify(updateError) },
					{ status: 500 },
				);
			}

			return NextResponse.json({ success: true, likes_count: updatedExperience.likes_count }, { status: 200 });
		}

		if (error) {
			logger.error({ request, userId: user.id, message: 'Error upvoting interview experience', error });
			return NextResponse.json(
				{ error: 'Failed to upvote interview experience', details: JSON.stringify(error) },
				{ status: 500 },
			);
		}

		return NextResponse.json({ success: true }, { status: 200 });
	});
}
