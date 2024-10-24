'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginFormSchema } from '@/lib/schemas';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../ui/card';
import Link from 'next/link';
import { appRoutes } from '@/utils/constants';

type Props = {
	handleLogin?: (formData: FormData) => Promise<void>;
};

const LogIn: React.FC<Props> = ({ handleLogin }) => {
	const [loading, setLoading] = useState<boolean>(false);

	const form = useForm<{
		email: string;
		password: string;
	}>({
		resolver: zodResolver(loginFormSchema),
	});

	return (
		<Card className="max-w-[400px] w-full mx-auto">
			<CardHeader>
				<CardTitle>Login</CardTitle>
				<CardDescription>
					Enter your email below to login to your account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form action={handleLogin}>
						<div className="mb-4">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												placeholder="Email"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="mb-4">
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										{/* TODO: add the reset password */}
										{/* <Link href='#' className='ml-auto inline-block text-sm underline'>
											Forgot your password?
										</Link> */}
										<FormControl>
											<Input
												placeholder="Password"
												type="password"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<Button
							type="submit"
							className="w-full"
							disabled={loading || !form.formState.isValid}
						>
							{form.formState.isSubmitting
								? 'Loging in...'
								: 'Login'}
						</Button>
					</form>
				</Form>
			</CardContent>
			<CardFooter>
				<div className="mt-4 text-center text-sm">
					Don&apos;t have an account?{' '}
					<Link href={appRoutes.signUpPage} className="underline">
						Create here
					</Link>
				</div>
			</CardFooter>
		</Card>
	);
};

export default LogIn;
