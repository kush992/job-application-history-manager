import { getLoggedInUser, signUpWithEmail } from '@/lib/server/appwrite';
import { Modal } from 'antd';
import { redirect } from 'next/navigation';

const SignUp: React.FC = async () => {
	const user = await getLoggedInUser();
	if (user) redirect('/applications');

	return (
		// <Modal title='Basic Modal' open={true}>
		<form action={signUpWithEmail}>
			<input id='email' name='email' placeholder='Email' type='email' />
			<input id='password' name='password' placeholder='Password' minLength={8} type='password' />
			<input id='name' name='name' placeholder='Name' type='text' />
			<button type='submit'>Sign up</button>
		</form>
		// </Modal>
	);
};

export default SignUp;
