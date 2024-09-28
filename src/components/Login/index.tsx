'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginFormSchema } from '@/lib/schemas';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
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
		<Card className='max-w-[400px] w-full mx-auto'>
			<CardHeader>
				<CardTitle>Login</CardTitle>
				<CardDescription>Login with email and password below.</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form action={handleLogin}>
						<div className='mb-4'>
							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input placeholder='Email' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className='mb-4'>
							<FormField
								control={form.control}
								name='password'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input placeholder='Password' type='password' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<Button type='submit' className='w-full' disabled={loading || !form.formState.isValid}>
							Create account
						</Button>
					</form>
				</Form>
			</CardContent>
			<CardFooter>
				<p className='text-muted-foreground'>
					Don&apos;t have an account? &nbsp;
					<Link className='text-primary' href={appRoutes.signUpPage}>
						Create here
					</Link>
				</p>
			</CardFooter>
		</Card>
	);
};

export default LogIn;
