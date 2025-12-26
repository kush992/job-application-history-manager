import { Cpu, LogOut } from 'lucide-react';
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
import { Separator } from '@/components/ui/separator';
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

	const { setTheme, theme } = useTheme();

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

					<Separator className="my-1" />

					<Link href={appRoutes.application}>
						<DropdownMenuItem>Applications</DropdownMenuItem>
					</Link>
					<Link href={appRoutes.addApplication}>
						<DropdownMenuItem>Add application</DropdownMenuItem>
					</Link>
					<Link href={appRoutes.addWithAiApplication}>
						<DropdownMenuItem className="flex gap-2 items-center justify-between">
							Add application with AI
							<Cpu className="w-4 h-4 stroke-darkVioletAccent fill-lightVioletAccent dark:stroke-lightVioletAccent dark:fill-darkVioletAccent" />
						</DropdownMenuItem>
					</Link>

					<Separator className="my-1" />

					<Link href={appRoutes.interviewExperiences}>
						<DropdownMenuItem>Interview Experiences</DropdownMenuItem>
					</Link>
					<Link href={appRoutes.addInterviewExperiences}>
						<DropdownMenuItem>Add Interview Experiences</DropdownMenuItem>
					</Link>
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

				{/* <DropdownMenuGroup className="flex gap-4 items-center justify-between bg-accent rounded-md mt-1 px-2">
					<DropdownMenuItem
						onClick={() => setTheme('light')}
						className={cn({ 'bg-primary': theme === 'light' })}
					>
						<Sun className="w-5 h-5" />
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => setTheme('dark')}
						className={cn({ 'bg-primary': theme === 'dark' })}
					>
						<Moon className="w-5 h-5" />
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => setTheme('system')}
						className={cn({ 'bg-primary': theme === 'system' })}
					>
						<ComputerIcon className="w-5 h-5" />
					</DropdownMenuItem>
				</DropdownMenuGroup> */}

				<DropdownMenuSeparator />

				<form action={signOut}>
					<button type="submit" className="w-full text-left">
						<DropdownMenuItem className="text-destructive w-full">
							Log out
							<LogOut className="w-4 h-4 ml-auto" />
						</DropdownMenuItem>
					</button>
				</form>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
