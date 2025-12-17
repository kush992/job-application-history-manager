import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import React from 'react';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { signOut } from '@/lib/server/appwrite';
import { Profile } from '@/types/profiles';
import { appRoutes } from '@/utils/constants';

import { Avatar, AvatarFallback } from '../../ui/avatar';

type Props = {
	user: Profile | null;
};

export function UserMenu({ user }: Props) {
	const userInitials = user?.full_name
		?.split(' ')
		.map((name) => name[0])
		.join('');

	const { setTheme } = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar className="cursor-pointer">
					<Image
						src={user?.avatar_url || 'https://img.kushbhalodi.com/images/avatar.png'}
						alt="profile-image"
						width={32}
						height={32}
						className="rounded-full w-full h-full object-cover !max-h-14 !max-w-14"
					/>
					{!user?.avatar_url && <AvatarFallback>{userInitials}</AvatarFallback>}
				</Avatar>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end" className="mr-2 md:mr-0" slot="left">
				<DropdownMenuLabel className="flex gap-2 items-center">
					<Avatar className="cursor-pointer">
						<Image
							src={user?.avatar_url || 'https://img.kushbhalodi.com/images/avatar.png'}
							alt="profile-image"
							width={32}
							height={32}
							className="rounded-full w-full h-full object-cover !max-h-14 !max-w-14"
						/>
						{!user?.avatar_url && <AvatarFallback>{userInitials}</AvatarFallback>}
					</Avatar>
					<div>
						<p>{user?.full_name}</p>
						<p className="text-xs text-muted-foreground">{user?.email}</p>
					</div>
				</DropdownMenuLabel>

				<DropdownMenuSeparator />

				{/* links */}
				<DropdownMenuGroup>
					<Link href={appRoutes.journeys}>
						<DropdownMenuItem>Journeys</DropdownMenuItem>
					</Link>
					<Link href={appRoutes.addApplication}>
						<DropdownMenuItem>Add application</DropdownMenuItem>
					</Link>
					<Link href={appRoutes.addWithAiApplication}>
						<DropdownMenuItem>Add application with AI</DropdownMenuItem>
					</Link>
					<Link href={appRoutes.application}>
						<DropdownMenuItem>Applications</DropdownMenuItem>
					</Link>
					{/* <Link href={appRoutes.interviewQuestions}>
						<DropdownMenuItem>Interview Questions</DropdownMenuItem>
					</Link> */}
				</DropdownMenuGroup>

				<DropdownMenuSeparator />

				{/* settings */}
				<DropdownMenuGroup>
					<Link href={appRoutes.profileView}>
						<DropdownMenuItem>Profile</DropdownMenuItem>
					</Link>

					<DropdownMenuSub>
						<DropdownMenuSubTrigger>Appearance</DropdownMenuSubTrigger>
						<DropdownMenuPortal>
							<DropdownMenuSubContent>
								<DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
								<DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
								<DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
							</DropdownMenuSubContent>
						</DropdownMenuPortal>
					</DropdownMenuSub>
				</DropdownMenuGroup>

				<DropdownMenuSeparator />

				<form action={signOut} className="w-full">
					<button type="submit" className="w-full text-left">
						<DropdownMenuItem>Log out</DropdownMenuItem>
					</button>
				</form>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
