import { appRoutes } from '@/utils/constants';
import { Button } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const Header: React.FC = () => {
	const router = useRouter();

	const isActive = (route: string) => {
		return router.pathname.includes(route) ? 'primary' : 'text';
	};

	return (
		<header className='border-b border-gray-200  z-50 sticky top-0 backdrop-blur-[100px]'>
			<nav className='max-w-5xl mx-auto flex justify-between items-center px-4 py-4'>
				<div>
					<p className=''>
						<Link href={appRoutes.home} className='flex flex-col'>
							<span className='text-md md:text-lg font-bold'>{'<KushBhalodi />'}</span>
							<span className='text-[10px] md:text-[12px]'>Job Application Manager</span>
						</Link>
					</p>
				</div>
				<ul className='hidden md:flex justify-between items-center m-0'>
					<li className='list-none'>
						<Button href={appRoutes.applicationPage} type={isActive(appRoutes.applicationPage)}>
							Your Applications
						</Button>
					</li>
					{/* <li className='list-none'>
						<Button href={appRoutes.interviewQuestionsPage} type={isActive(appRoutes.interviewQuestionsPage)}>
							Interview Questions
						</Button>
					</li>
					<li className='list-none'>
						<Button href={appRoutes.aboutPage} type={isActive(appRoutes.aboutPage)}>
							About
						</Button>
					</li> */}
				</ul>
				<div className='md:hidden'>
					<Button href={appRoutes.addApplicationPage} type={isActive(appRoutes.addApplicationPage)}>
						Add Application
					</Button>
				</div>
			</nav>
		</header>
	);
};

export default Header;
