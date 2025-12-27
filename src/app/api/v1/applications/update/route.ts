import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
	// try {
	// 	if (!cookies().get('session')) {
	// 		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	// 	}

	// 	const fromData = (await req.json()) as JobApplicationFormData;
	// 	const documentId = req.nextUrl.searchParams.get('documentId');

	// 	if (!documentId) {
	// 		return NextResponse.json({ error: 'Document ID is required' }, { status: 400 });
	// 	}

	// 	if (!fromData.jobTitle) {
	// 		return NextResponse.json({ error: 'Form completion is required' }, { status: 400 });
	// 	}

	// 	const response = await database.updateDocument(
	// 		appwriteDbConfig.applicationDb,
	// 		appwriteDbConfig.applicationDbCollectionId,
	// 		documentId,
	// 		fromData,
	// 	);

	// 	if (response.$id) {
	// 		return NextResponse.json({ message: 'Application updated successfully' }, { status: 200 });
	// 	} else {
	// 		return NextResponse.json({ error: 'Error updating application' }, { status: 500 });
	// 	}
	// } catch (error) {
	// 	console.error(error);
	// 	return NextResponse.json({ error }, { status: 500 });
	// }
	return NextResponse.json(
		{ error: 'This endpoint is deprecated. Please use the new API endpoints.' },
		{ status: 410 },
	);
}
