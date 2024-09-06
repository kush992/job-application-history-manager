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
				<Header user={jsonParseString(user)} />
				{children}
			</ConfigProvider>
		</AntdRegistry>
	);
}
