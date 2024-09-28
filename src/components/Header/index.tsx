'use client';

import { appRoutes } from '@/utils/constants';
import cn from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { MenuFoldOutlined, PlusCircleFilled } from '@ant-design/icons';
import { Models } from 'appwrite';
import { signOut } from '@/lib/server/appwrite';
import MobileHeader from './MobileHeader';
import { ThemeSwitcher } from '../ThemeSwitcher';
import { Button } from '@/components/ui/button';

type Props = {
	user: Models.User<Models.Preferences> | null;
};

const Header: React.FC<Props> = ({ user }) => {
	const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
	const pathname = usePathname();

	const isActive = (route: string) => {
		return pathname === route;
	};

	console.log(pathname);

	return (
		<>
			<div className='bg-muted text-muted-foreground text-xs py-1 text-center'>
				Currently on testing stage. <br />
				Please report any bugs here{' '}
				<a target='_blank' href='mailto:kushbhalodi.project@gmail.com' className='underline italic'>
					kushbhalodi.project@gmail.com
				</a>
			</div>
			<header className='border-b border-muted z-50 sticky top-0 backdrop-blur duration-200 bg-background'>
				<div className='max-w-6xl mx-auto flex justify-between items-center h-[50px] px-4'>
					<div>
						<Link href={appRoutes.home} className='flex flex-col'>
							<span className='text-lg font-bold text-secondary-foreground'>JobJourney</span>
						</Link>
					</div>
					<nav className='hidden md:flex justify-center items-center gap-4'>
						<ThemeSwitcher />
						{user?.$id && (
							<ul className='flex justify-between items-center m-0 gap-4'>
								<li className='list-none'>
									<Link href={appRoutes.addApplicationPage}>
										<Button variant='outline'>
											<PlusCircleFilled className='text-secondary-foreground' height='40px' width='40px' />
										</Button>
									</Link>
								</li>
								<li className='list-none'>
									<Link
										href={appRoutes.applicationPage}
										className={cn('text-secondary-foreground', {
											'bg-muted p-2 rounded-md': isActive(appRoutes.applicationPage),
										})}
									>
										Your Applications
									</Link>
								</li>
								<form action={signOut}>
									<Button type='submit' className='text-secondary-foreground' variant='ghost'>
										Signout
									</Button>
								</form>
							</ul>
						)}
						{!user?.$id && (
							<Button>
								<Link href='/login'>Login</Link>
							</Button>
						)}
					</nav>
					<div className='md:hidden flex items-center gap-2'>
						<ThemeSwitcher />
						{user?.$id && (
							<Button onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
								<MenuFoldOutlined />
							</Button>
						)}
						{!user?.$id && (
							<Button>
								<Link href='/login'>Login</Link>
							</Button>
						)}
						{isDrawerOpen && <MobileHeader showDrawer={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />}
					</div>
				</div>
			</header>
		</>
	);
};

export default Header;
