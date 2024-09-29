import React, { Suspense } from 'react';
import { getLoggedInUser, signUpWithEmail } from '@/lib/server/appwrite';
import { redirect } from 'next/navigation';
import Loader from '@/components/Loader';
import SignUp from '@/components/Signup';

const SignupPage: React.FC = async () => {
	const user = await getLoggedInUser();
	if (user) redirect('/applications');

	return (
		<Suspense fallback={<Loader />}>
			<div className='max-w-4xl mx-auto flex items-center justify-center h-[calc(100vh-150px)]'>
				<SignUp handleSignup={signUpWithEmail} />
			</div>
		</Suspense>
	);
};

export default SignupPage;
