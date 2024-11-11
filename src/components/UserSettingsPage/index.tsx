'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Models } from 'node-appwrite';
import { useMutation } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { getARandomGradient } from './utility';
import { useTheme } from 'next-themes';
import { userPrefQueries } from '@/lib/server/user-queries';

type Props = {
	user: Models.User<Models.Preferences> | null;
};

const userPreferenceFormSchema = z.object({
	theme: z.enum(['light', 'dark', 'system'], {
		required_error: 'Please select a theme.',
	}),
	profileImage: z.string().url({}),
});

export default function UserSettingsPage({ user }: Props) {
	const form = useForm<z.infer<typeof userPreferenceFormSchema>>({
		resolver: zodResolver(userPreferenceFormSchema),
		defaultValues: {
			theme: user?.prefs?.theme,
			profileImage: user?.prefs?.profileImage || getARandomGradient(),
		},
	});

	const userPrefUpdate = useMutation({
		mutationFn: (values: z.infer<typeof userPreferenceFormSchema>) => userPrefQueries.update(values),
		onSuccess: () => {
			toast({
				title: 'success',
				description: 'Application deleted successfully',
			});
		},
		onError: (error) => {
			toast({
				title: 'Error',
				description: 'Failed to delete application',
			});
			console.error(error);
		},
	});

	const { setTheme } = useTheme();

	async function onSubmit(values: z.infer<typeof userPreferenceFormSchema>) {
		userPrefUpdate.mutate(values);
		setTheme(values.theme);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
				<Card className="w-full max-w-xl mx-auto">
					<CardHeader>
						<CardTitle>User Settings</CardTitle>
						<CardDescription>Manage your account settings and preferences.</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="flex items-center space-x-4">
							<Avatar className="w-20 h-20">
								<AvatarImage src={user?.prefs.profileImage} alt={user?.name} />
								<AvatarFallback>
									{user?.name[0]}
									{user?.name.split(' ')[1] && user?.name.split(' ')[1][0]}
								</AvatarFallback>
							</Avatar>
							<Button variant="outline" type="button" disabled>
								Change Profile Picture
							</Button>
						</div>

						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input disabled value={user?.name} />
							</FormControl>
						</FormItem>

						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input disabled value={user?.email} />
							</FormControl>
						</FormItem>

						<FormField
							control={form.control}
							name="theme"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Theme</FormLabel>
									<Select onValueChange={field.onChange} defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select a theme" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="light">Light</SelectItem>
											<SelectItem value="dark">Dark</SelectItem>
											<SelectItem value="system">System</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>
					<CardFooter>
						<Button type="submit" className="ml-auto">
							Save Changes
						</Button>
					</CardFooter>
				</Card>
			</form>
		</Form>
	);
}
