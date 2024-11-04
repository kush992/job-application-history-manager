'use client';

import Header from '@/components/Header';
import { Models } from 'appwrite';
import { jsonParseString } from '@/utils/utility';
import { ThemeProvider } from '../ThemeProvider';
import { Toaster } from '../ui/toaster';
import Footer from '../Footer';

export default function Wrapper({
	children,
	user,
}: Readonly<{
	children: React.ReactNode;
	user: Models.User<Models.Preferences> | null;
}>) {
	return (
		<ThemeProvider
			attribute="class"
			themes={['dark', 'light', 'system']}
			defaultTheme="system"
			enableColorScheme
			disableTransitionOnChange
		>
			<Toaster />
			<Header user={jsonParseString(user)} />
			<div className="min-h-screen">{children}</div>
			<Footer />
		</ThemeProvider>
	);
}
