import { type NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function DELETE(request: NextRequest) {
	try {
		// Create Supabase client
		const supabase = createClient();

		// Check authentication
		const {
			data: { user },
			error: authError,
		} = await supabase.auth.getUser();

		if (authError || !user) {
			return NextResponse.json(
				{ error: 'Unauthorized', details: authError ? JSON.stringify(authError) : 'User not found' },
				{ status: 401 },
			);
		}

		// Get document ID from search params
		const documentId = request.nextUrl.searchParams.get('documentId');

		if (!documentId) {
			return NextResponse.json({ error: 'Document ID is required' }, { status: 400 });
		}

		// Check if the application exists and belongs to the user
		const { data: existingApplication, error: fetchError } = await supabase
			.from('job_applications')
			.select('id')
			.eq('id', documentId)
			.eq('user_id', user.id)
			.single();

		// We can treat this as a successful deletion if the application does not exist,
		// meaning it has already been deleted or never existed.
		if (fetchError || !existingApplication) {
			return NextResponse.json(
				{ error: 'Application deleted successfully', details: JSON.stringify(fetchError) },
				{ status: 200 },
			);
		}

		// If you want to actually delete the record instead of soft delete:
		const { error: deleteError } = await supabase
			.from('job_applications')
			.delete()
			.eq('id', documentId)
			.eq('user_id', user.id);

		if (deleteError) {
			console.error('Supabase delete error:', deleteError);
			return NextResponse.json(
				{
					error: 'Failed to delete application',
					details: JSON.stringify(deleteError),
				},
				{ status: 500 },
			);
		}

		return NextResponse.json(
			{
				message: 'Application deleted successfully',
			},
			{ status: 200 },
		);
	} catch (error) {
		console.error('Application deletion error:', error);
		return NextResponse.json(
			{
				error: 'An unexpected error occurred',
				details: JSON.stringify(error),
			},
			{ status: 500 },
		);
	}
}
