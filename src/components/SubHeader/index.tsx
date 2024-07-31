import { LeftOutlined } from '@ant-design/icons';
import Link from 'next/link';
import React from 'react';

type Props = {
	previousPageTitle: string;
	href: string;
};

const SubHeader: React.FC<Props> = ({ previousPageTitle, href }) => {
	return (
		<Link href={href} className='flex gap-1 items-center hover:underline hover:gap-2 transition-all'>
			<LeftOutlined className='h-[10px] w-[10px]' />
			<p className='text-xs'>{previousPageTitle}</p>
		</Link>
	);
};

export default SubHeader;
