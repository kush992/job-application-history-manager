import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import { appRoutes } from '@/utils/constants';
import { PlusCircleFilled } from '@ant-design/icons';
import Link from 'next/link';
import { backgroundImageUrl } from '@/utils/utility';

type Props = {
	isDrawerOpen: boolean;
	onClose: () => void;
};

const DrawerMenu: React.FC<Props> = ({ isDrawerOpen, onClose }) => {
	return (
		<>
			<Drawer title='Navigation' onClose={onClose} open={isDrawerOpen}>
				<ul className='flex flex-col justify-between items-center m-0 gap-2'>
					<li className='list-none w-full'>
						<Button
							href={appRoutes.addApplicationPage}
							type='primary'
							style={{
								width: '100%',
								backgroundImage: backgroundImageUrl,
							}}
						>
							<PlusCircleFilled color='blue' height='40px' width='40px' />
						</Button>
					</li>
					<li className='list-none w-full'>
						<Link href={appRoutes.applicationPage} className='w-full'>
							Your Applications
						</Link>
					</li>
				</ul>
			</Drawer>
		</>
	);
};

export default DrawerMenu;
