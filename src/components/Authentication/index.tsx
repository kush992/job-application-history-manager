import ApplicationAuth from '@/appwrite/auth';
import { auth } from '@/appwrite/config';
import { Button } from 'antd';
import React, { useEffect } from 'react';

const LoginForm = () => {
	const applicationAuth = new ApplicationAuth();
	const [session, setSession] = React.useState<any>({});
	const [isLoggedInUser, setIsLoggedInUser] = React.useState<boolean>(false);

	const isLoggedIn = async () => {
		return await applicationAuth
			.isLoggedIn()
			.then((res) => setIsLoggedInUser(res))
			.catch((error) => console.error(error));
	};

	useEffect(() => {
		applicationAuth
			.getSession()
			.then((res) => {
				setSession(res);
			})
			.catch((error) => console.error(error));

		isLoggedIn();
	}, []);

	return (
		<div>
			{isLoggedInUser ? (
				<Button onClick={applicationAuth.logout}>LogOut</Button>
			) : (
				<Button onClick={applicationAuth.login} type='primary'>
					LogIn
				</Button>
			)}
		</div>
	);
};

export default LoginForm;
