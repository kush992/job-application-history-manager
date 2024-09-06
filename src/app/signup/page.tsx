import React, { Suspense } from 'react';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Input, Modal, Space } from 'antd';
import { ID, Models } from 'node-appwrite';
import { createAdminClient, getLoggedInUser, signUpWithEmail } from '@/lib/server/appwrite';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// async function signUpWithEmail(formData: any) {
// 	'use server';

// 	const email = formData.get('email');
// 	const password = formData.get('password');
// 	const name = formData.get('name');

// 	const { account } = await createAdminClient();

// 	await account.create(ID.unique(), email, password, name);
// 	const session: Models.Session = await account.createEmailPasswordSession(email, password);

// 	cookies().set('my-custom-session', session.secret, {
// 		path: '/',
// 		httpOnly: true,
// 		sameSite: 'strict',
// 		secure: true,
// 	});

// 	redirect('/account');
// }

const SignupPage: React.FC = async () => {
	const user = await getLoggedInUser();
	if (user) redirect('/applications');

	return (
		<Suspense fallback='loading....'>
			{/* <Modal title='Authentication' open={false}> */}
			<form action={signUpWithEmail} className='flex flex-col justify-center'>
				<Input id='email' name='email' placeholder='Email' type='email' />
				<Input id='password' name='password' placeholder='Password' minLength={8} type='password' />
				<Input id='name' name='name' placeholder='Name' type='text' />
				<button type='submit'>Sign up</button>
			</form>
			{/* </Modal> */}
		</Suspense>
	);
};

export default SignupPage;
