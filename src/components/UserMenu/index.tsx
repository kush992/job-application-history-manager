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
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import Link from 'next/link';
import { appRoutes } from '@/utils/constants';
import { signOut } from '@/lib/server/appwrite';
import { Models } from 'node-appwrite';
import React from 'react';
import { useTheme } from 'next-themes';
import { Profile } from '@/types/profiles';
import { UserCircle2Icon } from 'lucide-react';

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
				<Avatar className="cursor-pointer h-8 w-8">
					<AvatarImage
						src={user?.avatar_url || 'https://img.kushbhalodi.com/images/avatar.png'}
						alt="profile-image"
					/>
					<AvatarFallback>{userInitials}</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end" className="mr-2 md:mr-0" slot="left">
				<DropdownMenuLabel className="flex gap-2 items-center">
					{/* <Avatar className="cursor-pointer">
						<AvatarImage
							src={user?.avatar_url || 'https://img.kushbhalodi.com/images/avatar.png'}
							alt="profile-image"
						/>
						<AvatarFallback>{userInitials}</AvatarFallback>
					</Avatar> */}
					<UserCircle2Icon className="h-8 w-8 text-secondary-foreground" />
					<div>
						<p>{user?.full_name}</p>
						<p className="text-xs text-muted-foreground">{user?.email}</p>
					</div>
				</DropdownMenuLabel>

				<DropdownMenuSeparator />

				{/* links */}
				<DropdownMenuGroup>
					{/* <Link href={appRoutes.addApplication}>
						<DropdownMenuItem>Add application</DropdownMenuItem>
					</Link> */}
					<Link href={appRoutes.application}>
						<DropdownMenuItem>Your applications</DropdownMenuItem>
					</Link>
					<Link href={appRoutes.interviewQuestions}>
						<DropdownMenuItem>Interview Questions</DropdownMenuItem>
					</Link>
				</DropdownMenuGroup>

				<DropdownMenuSeparator />

				{/* settings */}
				<DropdownMenuGroup>
					<DropdownMenuItem disabled>Dashboard</DropdownMenuItem>
					<DropdownMenuItem disabled>Profile</DropdownMenuItem>
					<Link href={appRoutes.userSettings}>
						<DropdownMenuItem>Settings</DropdownMenuItem>
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
