'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FormField } from '@/components/ui/form-field';
import { FormMessage } from '@/components/ui/form-message';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Profile } from '@/types/profiles';
import { appRoutes } from '@/utils/constants';

const editProfileSchema = z.object({
	full_name: z.string().min(2, { message: 'Name must be at least 2 characters long.' }).max(50),
	avatar_url: z.string().url({ message: 'Please enter a valid URL.' }).optional().or(z.literal('')),
});

type EditProfileFormData = z.infer<typeof editProfileSchema>;

interface EditProfileFormProps {
	profile: Profile | undefined;
	userId: string;
}

export function EditProfileForm({ profile, userId }: EditProfileFormProps) {
	const [isPending, startTransition] = useTransition();
	const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
	const router = useRouter();

	const form = useForm<EditProfileFormData>({
		resolver: zodResolver(editProfileSchema),
		defaultValues: {
			full_name: profile?.full_name || '',
			avatar_url: profile?.avatar_url || '',
		},
	});

	const handleSubmit = (data: EditProfileFormData) => {
		startTransition(async () => {
			try {
				const response = await fetch('/api/profile/update', {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						userId,
						...data,
						avatar_url: data.avatar_url || null,
					}),
				});

				const result = await response.json();

				if (!response.ok) {
					setMessage({ type: 'error', text: result.error });
				} else {
					setMessage({ type: 'success', text: 'Profile updated successfully!' });
					router.push(appRoutes.application);
				}
			} catch (error) {
				setMessage({ type: 'error', text: 'An unexpected error occurred. Please try again.' });
			}
		});
	};

	return (
		<Card className="w-full max-w-2xl mx-auto">
			<CardHeader>
				<div className="flex items-center gap-4">
					<Link href={appRoutes.application}>
						<Button variant="outline" size="sm">
							<ArrowLeft className="h-4 w-4 mr-2" />
							Back
						</Button>
					</Link>
					<div>
						<CardTitle>Edit Profile</CardTitle>
						<CardDescription>Update your profile information and avatar</CardDescription>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				{message && (
					<div className="mb-6">
						<FormMessage type={message.type} message={message.text} />
					</div>
				)}

				<div className="flex items-center gap-6 mb-6">
					<Avatar className="h-20 w-20">
						<AvatarImage src={form.watch('avatar_url') || profile?.avatar_url || ''} alt="Profile" />
						<AvatarFallback className="text-xl">
							{form
								.watch('full_name')
								?.split(' ')
								.map((n) => n[0])
								.join('')
								.toUpperCase() || 'U'}
						</AvatarFallback>
					</Avatar>
					<div>
						<h3 className="font-semibold text-lg">{form.watch('full_name') || 'Your Name'}</h3>
						<p className="text-sm text-secondary-foreground">{profile?.email}</p>
					</div>
				</div>

				<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
					<FormField
						id="full_name"
						label="Full Name"
						placeholder="Enter your full name"
						error={form.formState.errors.full_name?.message}
						register={form.register('full_name')}
						required
					/>

					<FormField
						id="avatar_url"
						label="Avatar URL"
						placeholder="https://example.com/your-avatar.jpg"
						error={form.formState.errors.avatar_url?.message}
						register={form.register('avatar_url')}
					/>

					<div className="flex gap-4">
						<Button type="submit" className="flex-1" disabled={isPending}>
							{isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
							Update Profile
						</Button>
						<Link href={appRoutes.application}>
							<Button type="button" variant="outline" className="px-8">
								Cancel
							</Button>
						</Link>
					</div>
				</form>
			</CardContent>
		</Card>
	);
}
