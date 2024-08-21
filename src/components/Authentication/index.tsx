import ApplicationAuth from '@/appwrite/auth';
import { auth } from '@/appwrite/config';
import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import DrawerMenu from '../DrawerMenu';

const LoginForm = () => {
	const [session, setSession] = useState<any>({});
	const isUserLoggedIn = !!session?.userId;

	const handleLogout = async () => {
		const auth = new ApplicationAuth();
		await auth.logout();
	};

	const handleLogin = async () => {
		const auth = new ApplicationAuth();
		await auth.login();
	};

	useEffect(() => {
		const fetchSession = async () => {
			const auth = new ApplicationAuth();
			const sessionData = await auth.getSession();
			setSession(sessionData);
		};

		fetchSession();
	}, []);

	console.log('isLoggedInUser', isUserLoggedIn);

	return (
		<>
			{isUserLoggedIn ? (
				<Image
					src='https://img.kushbhalodi.com/images/IMG_5624.jpg'
					alt='Kush Bhalodi'
					width={30}
					height={30}
					className='rounded-full h-[30px] w-[30px] object-cover'
					onClick={() => {
						handleLogout();
						window.location.reload();
					}}
				/>
			) : (
				<Button onClick={handleLogin} type='primary'>
					LogIn
				</Button>
			)}
		</>
	);
};

export default LoginForm;
