'use client';

import { AntdRegistry } from '@ant-design/nextjs-registry';
import Header from '@/components/Header';
import { ConfigProvider, theme } from 'antd';

export default function Wrapper({
	children,
}: Readonly<{
	children: React.ReactNode;
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
				<Header />
				{children}
			</ConfigProvider>
		</AntdRegistry>
	);
}
