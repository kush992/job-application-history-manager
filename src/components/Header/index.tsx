'use client';

import { appRoutes } from '@/utils/constants';
import { Button } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { MenuFoldOutlined, PlusCircleFilled } from '@ant-design/icons';
import { backgroundImageUrl } from '@/utils/utility';
import { Models } from 'appwrite';
import { signOut } from '@/lib/server/appwrite';

type Props = {
	user: Models.User<Models.Preferences> | null;
};

const Header: React.FC<Props> = ({ user }) => {
	const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
	const pathname = usePathname();

	const isActive = (route: string) => {
		return pathname === route ? 'primary' : 'default';
	};

	return (
		<header
			className='border-b border-gray-200 h-[50px] z-50 sticky top-0 backdrop-blur-[100px]'
			style={{
				backgroundImage: backgroundImageUrl,
				backgroundColor: '#ffffffcd',
			}}
		>
			<nav className='max-w-6xl mx-auto flex justify-between items-center h-[50px] px-4'>
				<div>
					<p className=''>
						<Link href={appRoutes.home} className='flex flex-col'>
							<span className='text-lg font-bold'>JobJourney</span>
						</Link>
					</p>
				</div>
				<div className='hidden md:flex justify-center items-center gap-4'>
					{user?.$id && (
						<ul className='flex justify-between items-center m-0 gap-2'>
							<li className='list-none'>
								<Button href={appRoutes.addApplicationPage} type='primary' style={{ backgroundImage: backgroundImageUrl }}>
									<PlusCircleFilled color='blue' height='40px' width='40px' />
								</Button>
							</li>
							<li className='list-none'>
								<Button href={appRoutes.applicationPage} type={isActive(appRoutes.interviewQuestionsPage)}>
									Your Applications
								</Button>
							</li>
							<form action={signOut}>
								<button type='submit'>Signout</button>
							</form>
						</ul>
					)}
					{!user?.$id && <Button href='/signup'>Signup</Button>}
				</div>
				<div className='md:hidden flex items-center gap-2'>
					{user?.$id && (
						<Button onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
							<MenuFoldOutlined />
						</Button>
					)}
					{!user?.$id && <Button href='/signup'>Signup</Button>}
				</div>
			</nav>
		</header>
	);
};

export default Header;
