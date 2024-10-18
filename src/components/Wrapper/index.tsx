'use client';

import Header from '@/components/Header';
import { Models } from 'appwrite';
import { jsonParseString } from '@/utils/utility';
import { ThemeProvider } from '../ThemeProvider';
import { Toaster } from '../ui/toaster';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';

export default function Wrapper({
	children,
	user,
}: Readonly<{
	children: React.ReactNode;
	user: Models.User<Models.Preferences> | null;
}>) {
	const [queryClient] = React.useState(() => new QueryClient());

	return (
		<ThemeProvider attribute='class' themes={['dark', 'light', 'system']} defaultTheme='system' enableColorScheme disableTransitionOnChange>
			<QueryClientProvider client={queryClient}>
				<Header user={jsonParseString(user)} />
				<ReactQueryDevtools initialIsOpen={false} />
				{children}
				<Toaster />
			</QueryClientProvider>
		</ThemeProvider>
	);
}
