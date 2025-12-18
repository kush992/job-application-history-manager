'use client';

import cn from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Profile } from '@/types/profiles';
import { appRoutes } from '@/utils/constants';

import Logo from '../Logo';
import { UserMenu } from '../UserMenu';
import { navBarLinks } from './utility';

type Props = {
	user: Profile | null;
};

const Header: React.FC<Props> = ({ user }) => {
	const pathname = usePathname();

	const isActive = (route: string) => {
		return pathname === route;
	};

	return (
		<header className="border-b border-muted z-50 sticky top-0 backdrop-blur duration-200 bg-background shadow-md">
			<div className="container mx-auto flex justify-between items-center h-[65px]">
				<div>
					<Link href={appRoutes.home} className="flex flex-col h-14 w-14 justify-center items-center">
						{/* <Image
							src="./logo.svg"
							alt="JobJourney Logo"
							width={32}
							height={32}
							className="object-contain"
						/> */}
						<Logo />
						{/* <span className="text-lg font-bold text-secondary-foreground tracking-tighter">JobJourney</span> */}
					</Link>
				</div>
				<nav className="hidden md:flex justify-center items-center gap-4">
					{user?.id && (
						<ul className="flex justify-between items-center m-0 gap-4">
							{navBarLinks.map((navBarLink) => (
								<li className="list-none" key={navBarLink.href}>
									<Link
										href={navBarLink.href}
										className={cn(
											'p-2 rounded-md text-secondary-foreground relative hover:bg-secondary',
											{
												'after:absolute after:bg-primary after:bottom-[-17px] after:w-full after:h-[2px] after:left-0':
													isActive(navBarLink.href),
											},
										)}
									>
										{navBarLink.page}
									</Link>
								</li>
							))}

							<UserMenu user={user} />
						</ul>
					)}
					{!user?.id && (
						<Link href={appRoutes.signUp}>
							<Button>Sign Up</Button>
						</Link>
					)}
				</nav>
				<div className="md:hidden flex items-center gap-2">
					{user?.id && <UserMenu user={user} />}
					{!user?.id && (
						<Link href={appRoutes.signUp}>
							<Button>Sign Up</Button>
						</Link>
					)}
				</div>
			</div>
		</header>
	);
};

export default Header;
