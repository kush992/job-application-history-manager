'use client';

import Image from 'next/image';
import { appRoutes } from '@/utils/constants';
import { Button } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { MenuFoldOutlined, PlusCircleFilled } from '@ant-design/icons';
import LoginForm from '../Authentication';
import DrawerMenu from '../DrawerMenu';
import { backgroundImageUrl } from '@/utils/utility';

type Props = {
	isLoggedIn: boolean;
};

const Header: React.FC<Props> = ({ isLoggedIn }) => {
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
					{isLoggedIn && (
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
						</ul>
					)}
					<LoginForm />
				</div>
				<div className='md:hidden flex items-center gap-2'>
					{isLoggedIn && (
						<Button onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
							<MenuFoldOutlined />
						</Button>
					)}
					<LoginForm />
					{isDrawerOpen && <DrawerMenu isDrawerOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(!isDrawerOpen)} />}
				</div>
			</nav>
		</header>
	);
};

export default Header;
