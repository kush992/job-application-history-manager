'use client';

import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/ui/button';

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
	return (
		<div className="flex flex-col container items-center justify-center h-screen">
			<h1 className="text-4xl font-bold text-center text-darkVioletAccent dark:text-lightVioletAccent">
				500 - Internal Server Error
			</h1>
			<p className="mt-4">Sorry, something went wrong.</p>
			<Link href="/">
				<Button>Go back to Home</Button>
			</Link>
		</div>
	);
};

export default Error;
