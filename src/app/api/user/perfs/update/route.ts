import { createSessionClient } from '@/lib/server/appwrite';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(data: NextRequest) {
	const account = await createSessionClient();

	const formData = await data.json();

	try {
		await account.account
			.updatePrefs(formData)
			.then((resp) => {
				if (resp.$id) {
					return NextResponse.json({ status: 'success' });
				}
			})
			.catch((error) => {
				console.error(error);
				return NextResponse.json({ status: 'error' });
			});
		return NextResponse.json({ status: 'success' });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ status: 'error' });
	}
}
