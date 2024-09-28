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

export function UserMenu() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar className='cursor-pointer'>
					<AvatarImage src='https://img.kushbhalodi.com/images/avatar.png' alt='profile-image' />
					<AvatarFallback>UP</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>

			<DropdownMenuContent className='w-48'>
				<DropdownMenuLabel>My Account</DropdownMenuLabel>

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
