'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { signUpSchema, type SignUpFormData } from '@/lib/validations/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FormField } from '@/components/ui/form-field';
import { FormMessage } from '@/components/ui/form-message';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Mail, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function SignUpForm() {
	const [isPending, startTransition] = useTransition();
	const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
	const [showEmailSent, setShowEmailSent] = useState(false);
	const router = useRouter();

	const form = useForm<SignUpFormData>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	});

	const handleSubmit = (data: SignUpFormData) => {
		startTransition(async () => {
			try {
				const response = await fetch('/api/auth/signup', {
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
							form.setError(field as keyof SignUpFormData, {
								message: (errors as string[])?.[0],
							});
						});
					}
				} else {
					setMessage({ type: 'success', text: result.success });
					setShowEmailSent(true);
					form.reset();
				}
			} catch (error) {
				setMessage({ type: 'error', text: 'An unexpected error occurred. Please try again.' });
			}
		});
	};

	if (showEmailSent) {
		return (
			<Card className="w-full max-w-md mx-auto">
				<CardHeader className="text-center">
					<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
						<Mail className="h-6 w-6 text-blue-600" />
					</div>
					<CardTitle className="text-2xl font-bold">Check Your Email</CardTitle>
					<CardDescription>{"We've"} sent you a confirmation link</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<Alert className="border-blue-200 bg-blue-50">
						<AlertDescription className="text-blue-700">
							Please check your email and click the confirmation link to activate your account. The link
							will redirect you back to sign in.
						</AlertDescription>
					</Alert>

					<div className="space-y-3">
						<Link href="/auth/signin" className="block">
							<Button variant="outline" className="w-full">
								Back to Sign In
							</Button>
						</Link>
						<Button
							variant="ghost"
							className="w-full text-sm"
							onClick={() => {
								setShowEmailSent(false);
								setMessage(null);
							}}
						>
							{"Didn't"} receive email? Try again
						</Button>
					</div>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className="w-full max-w-md mx-auto motion-preset-slide-down-md">
			<CardHeader className="text-center">
				<CardTitle className="text-2xl font-bold">Create Account</CardTitle>
				<CardDescription>Enter your information to create a new account</CardDescription>
			</CardHeader>
			<CardContent>
				{message && (
					<div className="mb-4">
						<FormMessage type={message.type} message={message.text} />
					</div>
				)}

				<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
					<FormField
						id="name"
						label="Full Name"
						placeholder="Enter your full name"
						error={form.formState.errors.name?.message}
						register={form.register('name')}
						required
					/>

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
						placeholder="Create a strong password"
						error={form.formState.errors.password?.message}
						register={form.register('password')}
						required
					/>

					<FormField
						id="confirmPassword"
						label="Confirm Password"
						type="password"
						placeholder="Confirm your password"
						error={form.formState.errors.confirmPassword?.message}
						register={form.register('confirmPassword')}
						required
					/>

					<Button type="submit" className="w-full" disabled={isPending}>
						{isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
						Create Account
					</Button>
				</form>

				<div className="mt-6 text-center">
					<p className="text-sm text-gray-600">
						Already have an account?{' '}
						<Link href="/auth/signin" className="font-medium text-blue-600 hover:text-blue-500">
							Sign in
						</Link>
					</p>
				</div>
			</CardContent>
		</Card>
	);
}
