'use client';

import { appRoutes } from '@/utils/constants';
import cn from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { PlusCircleFilled } from '@ant-design/icons';
import { Models } from 'appwrite';
// import { ThemeSwitcher } from '../ThemeSwitcher';
import { Button } from '@/components/ui/button';
import { UserMenu } from '../UserMenu';
import { CircleX, Info, X } from 'lucide-react';

type Props = {
	user: Models.User<Models.Preferences> | null;
};

const Header: React.FC<Props> = ({ user }) => {
	const [isHidden, setIsHidden] = useState<boolean>(true);
	const pathname = usePathname();

	const isActive = (route: string) => {
		return pathname === route;
	};

	const hideTestingInfo = () => {
		const isHidden = localStorage.getItem('isHidden');
		if (isHidden === 'true') {
			setIsHidden(true);
		}

		localStorage.setItem('isHidden', 'true');
		setIsHidden(true);
	};

	useEffect(() => {
		const isHidden = localStorage.getItem('isHidden');
		if (isHidden === 'true') {
			setIsHidden(true);
		} else {
			setIsHidden(false);
		}
	}, []);

	return (
		<>
			{!isHidden && (
				<div className='bg-background text-muted-foreground text-xs py-2 text-center border-b flex gap-2 items-center justify-center'>
					Currently on testing stage{' '}
					<Button size='icon' variant='ghost' className='w-7 h-7' onClick={hideTestingInfo}>
						<X className='cursor-pointer w-5 h-5' />
					</Button>
				</div>
			)}
			<header className='border-b border-muted z-50 sticky top-0 backdrop-blur duration-200 bg-background'>
				<div className='max-w-6xl mx-auto flex justify-between items-center h-[50px] px-4'>
					<div>
						<Link href={appRoutes.home} className='flex flex-col'>
							<span className='text-lg font-bold text-secondary-foreground tracking-tighter'>JobJourney</span>
						</Link>
					</div>
					<nav className='hidden md:flex justify-center items-center gap-4'>
						{/* <ThemeSwitcher /> */}
						{user?.$id && (
							<ul className='flex justify-between items-center m-0 gap-4'>
								<li className='list-none'>
									<Link href={appRoutes.addApplicationPage}>
										<Button variant='outline' size='icon'>
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
								<UserMenu user={user} />
							</ul>
						)}
						{!user?.$id && (
							<Link href={appRoutes.signUpPage}>
								<Button>SignIn</Button>
							</Link>
						)}
					</nav>
					<div className='md:hidden flex items-center gap-2'>
						{/* <ThemeSwitcher /> */}
						{user?.$id && <UserMenu user={user} />}
						{!user?.$id && (
							<Link href={appRoutes.signUpPage}>
								<Button>SignIn</Button>
							</Link>
						)}
					</div>
				</div>
			</header>
		</>
	);
};

export default Header;
