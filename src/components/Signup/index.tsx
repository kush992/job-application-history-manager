'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import Link from 'next/link';
import { appRoutes } from '@/utils/constants';
import { signUpFormSchema } from '@/lib/schemas';
import { z } from 'zod';

// type FormData = {
// 	name: string;
// 	email: string;
// 	password: string;
// };

type Props = {
	handleSignup: (formData: FormData) => Promise<void>;
};

const SignUp: React.FC<Props> = ({ handleSignup }) => {
	const [loading, setLoading] = useState<boolean>(false);

	const form = useForm<z.infer<typeof signUpFormSchema>>({
		resolver: zodResolver(signUpFormSchema),
	});

	const onSubmit = async (data: FormData) => {
		setLoading(true);
		try {
			await handleSignup(data); // Submit the form data to the server function
		} catch (error) {
			console.error('Signup failed:', error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Card className='max-w-[400px] mx-auto'>
			<CardHeader>
				<CardTitle>Create an account</CardTitle>
				<CardDescription>
					Create Your Account <br /> Welcome to our registration page! Get started by creating your account.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form action={handleSignup}>
						<div className='mb-4'>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input placeholder='Name' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
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
											<Input type='password' placeholder='Password' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<Button type='submit' className='w-full' disabled={loading || !form.formState.isValid}>
							{loading ? 'Creating account...' : 'Create account'}
						</Button>
					</form>
				</Form>
			</CardContent>
			<CardFooter>
				<p className='text-muted-foreground'>
					Already have an account?&nbsp;
					<Link className='text-primary' href={appRoutes.loginPage}>
						Login here
					</Link>
				</p>
			</CardFooter>
		</Card>
	);
};

export default SignUp;
