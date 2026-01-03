'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';

import { Toaster } from '@/components/ui/toaster';
import { Profile } from '@/types/profiles';
import { jsonParseString } from '@/utils/utility';

import Footer from '../Footer';
import Header from '../Header';
import { ThemeProvider } from '../ThemeProvider';

export default function Wrapper({
	children,
	user,
}: Readonly<{
	children: React.ReactNode;
	user: Profile;
}>) {
	const [queryClient] = React.useState(() => new QueryClient());

	return (
		<ThemeProvider
			attribute="class"
			themes={['dark', 'light', 'system']}
			defaultTheme={'system'}
			enableColorScheme
			disableTransitionOnChange
		>
			<QueryClientProvider client={queryClient}>
				<ReactQueryDevtools initialIsOpen={false} />
				<Toaster />
				<Header user={jsonParseString(user)} />
				<div className="md:min-h-screen h-full">
					{children}
				</div>
				<Footer />
			</QueryClientProvider>
		</ThemeProvider>
	);
}
