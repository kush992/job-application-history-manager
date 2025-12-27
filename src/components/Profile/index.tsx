'use client';

import type { User } from '@supabase/supabase-js';
import { Calendar, CheckCircle, ChevronRight, Clock, Globe, LogOut, Mail, Shield, UserIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Profile } from '@/types/profiles';
import { appRoutes } from '@/utils/constants';

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '../ui/breadcrumb';

interface ProfileViewProps {
	user: User;
	profile: Profile | undefined;
}

export function ProfileView({ user, profile }: ProfileViewProps) {
	const router = useRouter();
	const [isSigningOut, setIsSigningOut] = useState(false);

	const handleSignOut = async () => {
		setIsSigningOut(true);
		try {
			const response = await fetch('/api/auth/signout', {
				method: 'POST',
			});

			if (response.ok) {
				router.push(appRoutes.home);
				router.refresh();
			}
		} catch (error) {
			console.error('Sign out error:', error);
		} finally {
			setIsSigningOut(false);
		}
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		});
	};

	const getInitials = (name: string) => {
		return name
			.split(' ')
			.map((n) => n[0])
			.join('')
			.toUpperCase();
	};

	const avatarUrl = user.user_metadata?.avatar_url || user.user_metadata?.picture || profile?.avatar_url;
	const fullName = user.user_metadata?.full_name || user.user_metadata?.name || profile?.full_name;
	const isEmailVerified = user.email_confirmed_at !== null;

	return (
		<div className="max-w-4xl mx-auto space-y-6">
			<Breadcrumb className="mb-2">
				<BreadcrumbList>
					<BreadcrumbLink href={appRoutes.home}>Home</BreadcrumbLink>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>Profile</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<div>
				<h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight">Profile</h1>
				<p className="mt-2 text-secondary-foreground">View and manage your account information</p>
			</div>

			{/* Profile Card */}
			<Card className="motion-preset-slide-down-md">
				<CardHeader>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-4">
							<Avatar className="h-10 w-10 md:h-20 md:w-20 border-2 border-primary">
								<AvatarImage src={avatarUrl || ''} alt={fullName || 'User'} />
								<AvatarFallback className="bg-primary text-primary-foreground">
									{fullName ? getInitials(fullName) : 'U'}
								</AvatarFallback>
							</Avatar>
							<div>
								<CardTitle>{fullName || 'User'}</CardTitle>
								<CardDescription className="flex flex-col md:flex-row md:items-center gap-2 mt-1 text-wrap overflow-hidden">
									<div className="flex items-center gap-1 text-wrap">
										<Mail className="h-4 w-4" />
										{user.email}
									</div>
									{isEmailVerified && (
										<Badge variant="default" className="bg-green-600 w-fit">
											<CheckCircle className="h-3 w-3 mr-1" />
											Verified
										</Badge>
									)}
								</CardDescription>
							</div>
						</div>
					</div>
				</CardHeader>
			</Card>

			{/* Account Information */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<UserIcon className="h-5 w-5" />
						Account Information
					</CardTitle>
					<CardDescription>Your account details and authentication information</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid gap-4">
						{/* Full Name */}
						<div className="flex items-center justify-between py-3 border-b">
							<div className="flex items-center gap-3">
								<div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
									<UserIcon className="h-5 w-5 text-primary-foreground" />
								</div>
								<div>
									<p className="text-sm font-medium text-accent-foreground dark:text-gray-400">
										Full Name
									</p>
									<p className="font-semibold text-gray-900 dark:text-white">
										{fullName || 'Not provided'}
									</p>
								</div>
							</div>
						</div>

						{/* Email */}
						<div className="flex items-center justify-between py-3 border-b">
							<div className="flex items-center gap-3">
								<div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
									<Mail className="h-5 w-5 text-green-600 dark:text-green-400" />
								</div>
								<div>
									<p className="text-sm font-medium text-accent-foreground dark:text-gray-400">
										Email Address
									</p>
									<p className="text-base font-semibold text-gray-900 dark:text-white">
										{user.email}
									</p>
									{isEmailVerified && (
										<p className="text-xs text-green-600 dark:text-green-400 mt-0.5">
											✓ Verified on {formatDate(user.email_confirmed_at!)}
										</p>
									)}
								</div>
							</div>
						</div>

						{/* Account Created */}
						<div className="flex items-center justify-between py-3 border-b">
							<div className="flex items-center gap-3">
								<div className="h-10 w-10 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
									<Calendar className="h-5 w-5 text-orange-600 dark:text-orange-400" />
								</div>
								<div>
									<p className="text-sm font-medium text-accent-foreground dark:text-gray-400">
										Account Created
									</p>
									<p className="text-base font-semibold text-gray-900 dark:text-white">
										{formatDate(user.created_at)}
									</p>
								</div>
							</div>
						</div>

						{/* Last Sign In */}
						<div className="flex items-center justify-between py-3 border-b">
							<div className="flex items-center gap-3">
								<div className="h-10 w-10 rounded-full bg-pink-100 dark:bg-pink-900 flex items-center justify-center">
									<Clock className="h-5 w-5 text-pink-600 dark:text-pink-400" />
								</div>
								<div>
									<p className="text-sm font-medium text-accent-foreground dark:text-gray-400">
										Last Sign In
									</p>
									<p className="text-base font-semibold text-gray-900 dark:text-white">
										{user.last_sign_in_at ? formatDate(user.last_sign_in_at) : 'Never'}
									</p>
								</div>
							</div>
						</div>

						{/* Authentication Provider */}
						<div className="flex items-center justify-between py-3">
							<div className="flex items-center gap-3">
								<div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
									<Globe className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
								</div>
								<div>
									<p className="text-sm font-medium text-accent-foreground dark:text-gray-400">
										Authentication Provider
									</p>
									<div className="flex items-center gap-2 mt-1">
										<Badge variant="secondary" className="capitalize">
											{user.app_metadata?.provider || 'Unknown'}
										</Badge>
									</div>
								</div>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Additional Metadata */}
			{user.user_metadata && Object.keys(user.user_metadata).length > 0 && (
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Shield className="h-5 w-5" />
							Additional Information
						</CardTitle>
						<CardDescription>Metadata from your authentication provider</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-3">
							{user.user_metadata.email_verified !== undefined && (
								<div className="flex justify-between py-2 border-b">
									<span className="text-sm font-medium text-accent-foreground dark:text-gray-400">
										Email Verified
									</span>
									<span className="text-sm font-semibold text-gray-900 dark:text-white">
										{user.user_metadata.email_verified ? 'Yes' : 'No'}
									</span>
								</div>
							)}
							{user.user_metadata.phone_verified !== undefined && (
								<div className="flex justify-between py-2 border-b">
									<span className="text-sm font-medium text-accent-foreground dark:text-gray-400">
										Phone Verified
									</span>
									<span className="text-sm font-semibold text-gray-900 dark:text-white">
										{user.user_metadata.phone_verified ? 'Yes' : 'No'}
									</span>
								</div>
							)}
						</div>
					</CardContent>
				</Card>
			)}

			{/* Quick Actions */}
			<Card>
				<CardHeader>
					<CardTitle>Quick Actions</CardTitle>
					<CardDescription>Manage your account and preferences</CardDescription>
				</CardHeader>
				<CardContent className="space-y-3">
					<Button
						variant="outline"
						className="w-full justify-between group bg-transparent"
						onClick={() => router.push(appRoutes.journeys)}
					>
						<span className="flex items-center gap-2">
							<Calendar className="h-4 w-4" />
							View My Journeys
						</span>
						<ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
					</Button>

					<Button
						variant="outline"
						className="w-full justify-between group bg-transparent"
						onClick={() => router.push(appRoutes.application)}
					>
						<span className="flex items-center gap-2">
							<UserIcon className="h-4 w-4" />
							View My Applications
						</span>
						<ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
					</Button>

					<Separator />

					<Button variant="destructive" className="w-full" onClick={handleSignOut} disabled={isSigningOut}>
						<LogOut className="h-4 w-4 mr-2" />
						{isSigningOut ? 'Signing Out...' : 'Sign Out'}
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
