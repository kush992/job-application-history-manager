import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import Link from 'next/link';
import { appRoutes } from '@/utils/constants';
import { signOut } from '@/lib/server/appwrite';
import { Models } from 'node-appwrite';
import React from 'react';

type Props = {
	user: Models.User<Models.Preferences> | null;
};

export function UserMenu({ user }: Props) {
	const userInitials = user?.name
		?.split(' ')
		.map((name) => name[0])
		.join('');

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar className='cursor-pointer h-8 w-8'>
					<AvatarImage src='https://img.kushbhalodi.com/images/avatar.png' alt='profile-image' />
					<AvatarFallback>{userInitials}</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>

			<DropdownMenuContent className='mr-2 md:mr-0' slot='left'>
				<DropdownMenuLabel className='flex gap-2 items-center'>
					<Avatar className='cursor-pointer'>
						<AvatarImage src='https://img.kushbhalodi.com/images/avatar.png' alt='profile-image' />
						<AvatarFallback>{userInitials}</AvatarFallback>
					</Avatar>
					<div>
						<p>{user?.name}</p>
						<p className='text-xs text-muted-foreground'>{user?.email}</p>
					</div>
				</DropdownMenuLabel>

				<DropdownMenuSeparator />

				{/* links */}
				<DropdownMenuGroup>
					<Link href={appRoutes.addApplicationPage}>
						<DropdownMenuItem>Add application</DropdownMenuItem>
					</Link>
					<Link href={appRoutes.applicationPage}>
						<DropdownMenuItem>Your applications</DropdownMenuItem>
					</Link>
				</DropdownMenuGroup>

				<DropdownMenuSeparator />

				{/* settings */}
				<DropdownMenuGroup>
					<DropdownMenuItem disabled>Dashboard</DropdownMenuItem>
					<DropdownMenuItem disabled>Profile</DropdownMenuItem>
					<DropdownMenuItem disabled>Settings</DropdownMenuItem>
				</DropdownMenuGroup>

				<DropdownMenuSeparator />

				<form action={signOut} className='w-full'>
					<button type='submit' className='w-full text-left'>
						<DropdownMenuItem>Log out</DropdownMenuItem>
					</button>
				</form>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
