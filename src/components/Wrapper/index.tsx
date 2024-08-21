'use client';

import { AntdRegistry } from '@ant-design/nextjs-registry';
import Header from '@/components/Header';
import { ConfigProvider, theme } from 'antd';
import { useEffect, useState } from 'react';
import ApplicationAuth from '@/appwrite/auth';

export default function Wrapper({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

	useEffect(() => {
		const isUserLoggedIn = async () => {
			const auth = new ApplicationAuth();
			const isloggedIn = await auth.isLoggedIn();
			setIsLoggedIn(isloggedIn);
			console.log('sessionData', isLoggedIn);
		};

		isUserLoggedIn();
	}, [isLoggedIn]);

	return (
		<AntdRegistry>
			<ConfigProvider
				theme={{
					token: {
						borderRadius: 8,
						// colorLink: '#faad14',
						// colorPrimary: '#faad14',
						// colorInfo: '#faad14',
						colorLink: '#2463eb',
						colorPrimary: '#2463eb',
						colorInfo: '#2463eb',
					},
					// algorithm: [theme.darkAlgorithm],
				}}
			>
				<Header isLoggedIn={isLoggedIn} />
				{children}
			</ConfigProvider>
		</AntdRegistry>
	);
}
