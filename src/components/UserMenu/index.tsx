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
					<DropdownMenuItem>
						<Link href={appRoutes.addApplicationPage}>Add application</Link>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Link href={appRoutes.applicationPage}>Your applications</Link>
					</DropdownMenuItem>
				</DropdownMenuGroup>

				<DropdownMenuSeparator />

				{/* settings */}
				<DropdownMenuGroup>
					<DropdownMenuItem disabled>Dashboard</DropdownMenuItem>
					<DropdownMenuItem disabled>Profile</DropdownMenuItem>
					<DropdownMenuItem disabled>Settings</DropdownMenuItem>
				</DropdownMenuGroup>

				<DropdownMenuSeparator />

				<DropdownMenuItem>
					<form action={signOut} className='w-full'>
						<button type='submit' className='w-full text-left'>
							Log out
						</button>
					</form>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
