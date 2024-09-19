import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import Link from 'next/link';
import { appRoutes } from '@/utils/constants';
import { EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { signOut } from '@/lib/server/appwrite';

type Props = {
	showDrawer: boolean;
	onClose: () => void;
};

const MobileHeader: React.FC<Props> = ({ showDrawer, onClose }) => {
	return (
		<Drawer className='!bg-[#f4f2ee] !rounded-l-lg md:hidden' title='Menu' onClose={onClose} open={showDrawer}>
			<div className='flex flex-col justify-between h-full'>
				<div className='flex flex-col gap-3'>
					<Link
						onClick={onClose}
						href={appRoutes.addApplicationPage}
						className='p-3 bg-white rounded-lg text-black flex gap-4 items-center'
					>
						<PlusOutlined /> Add application
					</Link>
					<Link onClick={onClose} href={appRoutes.applicationPage} className='p-3 bg-white rounded-lg text-black flex gap-4 items-center'>
						<EyeOutlined /> Your applications
					</Link>
				</div>

				<form action={signOut}>
					<button type='submit' className='p-3 bg-red-300 w-full rounded-lg text-white'>
						Signout
					</button>
				</form>
			</div>
		</Drawer>
	);
};

export default MobileHeader;
