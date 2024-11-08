import React, { Suspense } from 'react';
import { getLoggedInUser } from '@/lib/server/appwrite';
import { redirect } from 'next/navigation';
import Loader from '@/components/Loader';
import UserSettingsPage from '@/components/UserSettingsPage';
import { appRoutes } from '@/utils/constants';

const SignupPage: React.FC = async () => {
	const user = await getLoggedInUser();

	if (!user) {
		redirect(appRoutes.signUp);
	}

	return (
		<Suspense fallback={<Loader />}>
			<div className="max-w-4xl mx-auto flex items-center justify-center h-[calc(100vh-150px)] p-4">
				<UserSettingsPage user={user} />
			</div>
		</Suspense>
	);
};

export default SignupPage;
