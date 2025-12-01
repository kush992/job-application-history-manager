import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Wrapper from '@/components/Wrapper';
import { getLoggedInUser } from '@/lib/supabase/user';
import { jsonParseString } from '@/utils/utility';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'JobJourney',
	description: 'Created by kushbhalodi.com',
	openGraph: {
		title: 'JobJourney',
		description: 'Created by kushbhalodi.com',
		type: 'website',
		locale: 'en_US',
		url: 'https://job-application-manager.vercel.app',
		siteName: 'JobJourney',
		images: '/favicon.ico',
	},
	twitter: {
		site: '@kushbhalodi',
		card: 'summary_large_image',
		title: 'JobJourney',
		description: 'Created by kushbhalodi.com',
		images: '/favicon.ico',
	},
	robots: {
		googleBot: 'index, follow',
	},
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const user = await getLoggedInUser();

	return (
		<html lang="en">
			<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
			<body className={inter.className}>
				<Wrapper user={jsonParseString(user)}>{children}</Wrapper>
				{/* <Loader /> */}
			</body>
		</html>
	);
}
