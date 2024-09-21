'use client';

import { AntdRegistry } from '@ant-design/nextjs-registry';
import Header from '@/components/Header';
import { ConfigProvider, theme } from 'antd';
import { Models } from 'appwrite';
import { jsonParseString } from '@/utils/utility';
import { ThemeProvider } from '../ThemeProvider';

export default function Wrapper({
	children,
	user,
}: Readonly<{
	children: React.ReactNode;
	user: Models.User<Models.Preferences> | null;
}>) {
	return (
		// <AntdRegistry>
		// 	<ConfigProvider
		// 		theme={{
		// 			token: {
		// 				borderRadius: 8,
		// 				colorLink: '#3b81f6',
		// 				colorPrimary: '#3b81f6',
		// 				colorInfo: '#3b81f6',
		// 			},
		// 			// algorithm: [theme.darkAlgorithm],
		// 		}}
		// 	>
		// 		<Header user={jsonParseString(user)} />
		// 		{children}
		// 	</ConfigProvider>
		// </AntdRegistry>
		<ThemeProvider attribute='class' themes={['dark', 'light', 'system']} defaultTheme='system' enableColorScheme disableTransitionOnChange>
			<Header user={jsonParseString(user)} />
			{children}
		</ThemeProvider>
	);
}
