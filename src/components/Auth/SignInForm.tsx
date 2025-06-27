'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { signInSchema, type SignInFormData } from '@/lib/validations/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FormField } from '@/components/ui/form-field';
import { FormMessage } from '@/components/ui/form-message';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { appRoutes } from '@/utils/constants';

export default function SignInForm() {
	const [isPending, startTransition] = useTransition();
	const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
	const router = useRouter();

	const form = useForm<SignInFormData>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const handleSubmit = (data: SignInFormData) => {
		startTransition(async () => {
			try {
				const response = await fetch('/api/auth/signin', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data),
				});

				const result = await response.json();

				if (!response.ok) {
					setMessage({ type: 'error', text: result.error });
					if (result.fieldErrors) {
						Object.entries(result.fieldErrors).forEach(([field, errors]) => {
							form.setError(field as keyof SignInFormData, {
								message: (errors as string[])?.[0],
							});
						});
					}
				} else {
					setMessage({ type: 'success', text: result.success });
					router.push(appRoutes.application);
					router.refresh();
				}
			} catch (error) {
				setMessage({ type: 'error', text: 'An unexpected error occurred. Please try again.' });
			}
		});
	};

	return (
		<Card className="w-full max-w-md mx-auto motion-preset-slide-down-md">
			<CardHeader className="text-center">
				<CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
				<CardDescription>Enter your credentials to access your account</CardDescription>
			</CardHeader>
			<CardContent>
				{message && (
					<div className="mb-4">
						<FormMessage type={message.type} message={message.text} />
					</div>
				)}

				<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
					<FormField
						id="email"
						label="Email"
						type="email"
						placeholder="Enter your email address"
						error={form.formState.errors.email?.message}
						register={form.register('email')}
						required
					/>

					<FormField
						id="password"
						label="Password"
						type="password"
						placeholder="Enter your password"
						error={form.formState.errors.password?.message}
						register={form.register('password')}
						required
					/>

					<Button type="submit" className="w-full" disabled={isPending}>
						{isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
						Sign In
					</Button>
				</form>

				<div className="mt-6 text-center">
					<p className="text-sm text-gray-600">
						Don't have an account?{' '}
						<Link href="/auth/signup" className="font-medium text-blue-600 hover:text-blue-500">
							Create one
						</Link>
					</p>
				</div>
			</CardContent>
		</Card>
	);
}
