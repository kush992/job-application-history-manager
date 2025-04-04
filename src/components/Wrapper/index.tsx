'use client';

import Header from '@/components/Header';
import { Models } from 'node-appwrite';
import { jsonParseString } from '@/utils/utility';
import { ThemeProvider } from '../ThemeProvider';
import { Toaster } from '../ui/toaster';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import Footer from '../Footer';

export default function Wrapper({
	children,
	user,
}: Readonly<{
	children: React.ReactNode;
	user: Models.User<Models.Preferences> | null;
}>) {
	const [queryClient] = React.useState(() => new QueryClient());

	return (
		<ThemeProvider
			attribute="class"
			themes={['dark', 'light', 'system']}
			defaultTheme={user?.prefs?.theme || 'system'}
			enableColorScheme
			disableTransitionOnChange
		>
			<QueryClientProvider client={queryClient}>
				<ReactQueryDevtools initialIsOpen={false} />
				<Toaster />
				<Header user={jsonParseString(user)} />
				<div className="min-h-screen">
					<div className="bg-gradient-to-b from-secondary to-transparent dark:from-background w-full h-full absolute top-0 left-0 -z-10"></div>
					{children}
				</div>
				<Footer />
			</QueryClientProvider>
		</ThemeProvider>
	);
}
