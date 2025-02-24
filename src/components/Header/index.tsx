'use client';

import { appRoutes } from '@/utils/constants';
import cn from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Models } from 'node-appwrite';
import { Button } from '@/components/ui/button';
import { UserMenu } from '../UserMenu';
import { Plus, X } from 'lucide-react';
import { navBarLinks } from './utility';

type Props = {
	user: Models.User<Models.Preferences> | null;
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
					<Link href={appRoutes.home} className="flex flex-col">
						<span className="text-lg font-bold text-secondary-foreground tracking-tighter">JobJourney</span>
					</Link>
				</div>
				<nav className="hidden md:flex justify-center items-center gap-4">
					{user?.$id && (
						<ul className="flex justify-between items-center m-0 gap-4">
							{navBarLinks.map((navBarLink) =>
								navBarLink.href === appRoutes.addApplication ? (
									<li className="list-none" key={navBarLink.href}>
										<Link href={appRoutes.addApplication}>
											<Button variant="outline" size="icon" className="bg-secondary">
												<Plus className="text-primary" />
											</Button>
										</Link>
									</li>
								) : (
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
								),
							)}

							<UserMenu user={user} />
						</ul>
					)}
					{!user?.$id && (
						<Link href={appRoutes.signUp}>
							<Button>SignIn</Button>
						</Link>
					)}
				</nav>
				<div className="md:hidden flex items-center gap-2">
					{user?.$id && <UserMenu user={user} />}
					{!user?.$id && (
						<Link href={appRoutes.signUp}>
							<Button>SignIn</Button>
						</Link>
					)}
				</div>
			</div>
		</header>
	);
};

export default Header;
