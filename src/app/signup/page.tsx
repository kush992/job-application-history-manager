import React, { Suspense } from 'react';
import { getLoggedInUser } from '@/lib/server/appwrite';
import { redirect } from 'next/navigation';
import Loader from '@/components/Loader';
import { signUpWithGoogle } from '@/lib/server/oauth';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';

const SignupPage: React.FC = async () => {
	const user = await getLoggedInUser();

	if (user) redirect('/applications');

	return (
		<Suspense fallback={<Loader />}>
			<div className="max-w-4xl mx-auto flex items-center justify-center h-[calc(100vh-150px)] p-4">
				<Card className="max-w-[400px] w-full mx-auto overflow-hidden">
					<CardHeader className="text-center">
						<CardTitle>Sign into JobJourney</CardTitle>
						<CardDescription>
							Welcome! Please sign in to continue your journey
							with JobJourney
						</CardDescription>
					</CardHeader>
					<CardContent className="text-center">
						<form action={signUpWithGoogle}>
							<Button type="submit">Sign Up with Google</Button>
						</form>
					</CardContent>
					<CardFooter className="text-xs bg-secondary pt-6 w-full justify-center gap-1 items-center">
						<Lock size={15} />
						Secured by{' '}
						<span className="font-semibold">Appwrite</span>
					</CardFooter>
				</Card>
			</div>
		</Suspense>
	);
};

export default SignupPage;
