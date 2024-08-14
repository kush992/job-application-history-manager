import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Wrapper from '@/components/Wrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Job Application Manager',
	description: 'Created by kushbhalodi.com',
	openGraph: {
		title: 'Job Application Manager',
		description: 'Created by kushbhalodi.com',
		type: 'website',
		locale: 'en_US',
		url: 'https://job-application-manager.vercel.app',
		siteName: 'Job Application Manager',
	},
	twitter: {
		site: '@kushbhalodi',
		card: 'summary_large_image',
		title: 'Job Application Manager',
		description: 'Created by kushbhalodi.com',
		images: 'https://img.kushbhalodi.com/images/kush-bhalodi-logo.png',
	},
	robots: {
		googleBot: 'index, follow',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<Wrapper> {children}</Wrapper>
			</body>
		</html>
	);
}
