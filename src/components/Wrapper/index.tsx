'use client';

import { AntdRegistry } from '@ant-design/nextjs-registry';
import Header from '@/components/Header';
import { ConfigProvider, theme } from 'antd';
import { Models } from 'appwrite';
import { jsonParseString } from '@/utils/utility';

export default function Wrapper({
	children,
	user,
}: Readonly<{
	children: React.ReactNode;
	user: Models.User<Models.Preferences> | null;
}>) {
	return (
		<AntdRegistry>
			<ConfigProvider
				theme={{
					token: {
						borderRadius: 8,
						colorLink: '#13c2c2b5',
						colorPrimary: '#475568',
						colorInfo: '#475568',
					},
					// algorithm: [theme.darkAlgorithm],
				}}
			>
				<Header user={jsonParseString(user)} />
				{children}
			</ConfigProvider>
		</AntdRegistry>
	);
}
