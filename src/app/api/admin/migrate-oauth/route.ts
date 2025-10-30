import { createClient } from '@/lib/supabase/server';
import { type NextRequest, NextResponse } from 'next/server';

/**
 * Admin endpoint to run OAuth migration for existing users
 *
 * This should be called ONCE after deploying OAuth-only changes
 * It ensures all existing users have profiles and can continue using the app
 *
 * Optional: Protect this endpoint with admin authentication
 */
export async function POST(request: NextRequest) {
	try {
		const supabase = await createClient();

		// Optional: Add admin check here
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

		// Get all users from auth
		const {
			data: { users },
			error: usersError,
		} = await supabase.auth.admin.listUsers();

		if (usersError) {
			return NextResponse.json({ error: usersError.message }, { status: 500 });
		}

		console.info(`Starting migration for ${users?.length || 0} users`);

		let created = 0;
		let updated = 0;
		let skipped = 0;
		let errors = 0;

		for (const authUser of users || []) {
			try {
				// Check if profile exists
				const { data: existingProfile } = await supabase
					.from('profiles')
					.select('id, full_name, avatar_url')
					.eq('id', authUser.id)
					.single();

				if (!existingProfile) {
					// Create new profile
					const { error: createError } = await supabase.from('profiles').insert({
						id: authUser.id,
						email: authUser.email!,
						full_name:
							authUser.user_metadata?.full_name ||
							authUser.user_metadata?.name ||
							authUser.email?.split('@')[0] ||
							'',
						avatar_url: authUser.user_metadata?.avatar_url || authUser.user_metadata?.picture || null,
					});

					if (createError) {
						console.error(`Error creating profile for ${authUser.email}:`, createError);
						errors++;
					} else {
						console.info(`Created profile for ${authUser.email}`);
						created++;
					}
				} else {
					// Check if profile needs updating
					const needsUpdate = !existingProfile.full_name || !existingProfile.avatar_url;

					if (needsUpdate) {
						const { error: updateError } = await supabase
							.from('profiles')
							.update({
								full_name:
									existingProfile.full_name ||
									authUser.user_metadata?.full_name ||
									authUser.user_metadata?.name ||
									authUser.email?.split('@')[0],
								avatar_url:
									existingProfile.avatar_url ||
									authUser.user_metadata?.avatar_url ||
									authUser.user_metadata?.picture,
								updated_at: new Date().toISOString(),
							})
							.eq('id', authUser.id);

						if (updateError) {
							console.error(`Error updating profile for ${authUser.email}:`, updateError);
							errors++;
						} else {
							console.info(`Updated profile for ${authUser.email}`);
							updated++;
						}
					} else {
						console.info(`Profile already complete for ${authUser.email}`);
						skipped++;
					}
				}
			} catch (error) {
				console.error(`Error processing user ${authUser.email}:`, error);
				errors++;
			}
		}

		const result = {
			success: true,
			total: users?.length || 0,
			created,
			updated,
			skipped,
			errors,
			message: `Migration complete: ${created} profiles created, ${updated} updated, ${skipped} skipped, ${errors} errors`,
		};

		console.info(result.message);

		return NextResponse.json(result);
	} catch (error) {
		console.error('Migration error:', error);
		return NextResponse.json(
			{
				error: 'Migration failed',
				details: String(error),
			},
			{ status: 500 },
		);
	}
}

/**
 * GET endpoint to check migration status
 */
export async function GET(request: NextRequest) {
	try {
		const supabase = await createClient();

		// Optional: Add admin check here
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

		// Get user count from auth
		const {
			data: { users },
			error: usersError,
		} = await supabase.auth.admin.listUsers();

		if (usersError) {
			return NextResponse.json(
				{ error: usersError.message, details: JSON.stringify(usersError) },
				{ status: 500 },
			);
		}

		// Get profile count
		const { count: profileCount, error: profileError } = await supabase
			.from('profiles')
			.select('id', { count: 'exact', head: true });

		if (profileError) {
			return NextResponse.json(
				{ error: profileError.message, details: JSON.stringify(profileError) },
				{ status: 500 },
			);
		}

		const totalUsers = users?.length || 0;
		const usersWithProfiles = profileCount || 0;
		const usersWithoutProfiles = totalUsers - usersWithProfiles;

		return NextResponse.json({
			success: true,
			totalUsers,
			usersWithProfiles,
			usersWithoutProfiles,
			migrationNeeded: usersWithoutProfiles > 0,
			status: usersWithoutProfiles === 0 ? 'complete' : 'incomplete',
		});
	} catch (error) {
		console.error('Status check error:', error);
		return NextResponse.json(
			{
				error: 'Status check failed',
				details: JSON.stringify(error),
			},
			{ status: 500 },
		);
	}
}
