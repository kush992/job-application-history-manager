import { ApplicationStatus } from '@/components/ApplicationForm/utility';
import Tags from '@/components/Tags';
import { JobApplicationData } from '@/types/apiResponseTypes';
import { appRoutes } from '@/utils/constants';
import { formatDate, transformDate } from '@/utils/date';
import { DeleteFilled, DollarCircleFilled, EditFilled } from '@ant-design/icons';
import { Button, Divider } from 'antd';
import Link from 'next/link';
import React from 'react';

type Props = {
	data: JobApplicationData;
	onClickDelete: (id: string) => void;
};

const ApplicationList: React.FC<Props> = ({ data, onClickDelete }) => {
	function getApplicationStatusColor(applicationStatus: ApplicationStatus) {
		switch (applicationStatus) {
			case ApplicationStatus.APPLIED:
				return 'default';
			case ApplicationStatus.IN_PROGRESS:
				return 'processing';
			case ApplicationStatus.NO_REPLY:
				return 'error';
			case ApplicationStatus.SUCCESS:
				return 'success';
			case ApplicationStatus.REJECTED_NO_FEEDBACK:
				return 'error';
			case ApplicationStatus.REJECTED_WITH_FEEDBACK:
				return 'error';
		}
	}

	return (
		<div className='bg-white p-4 grid sm:grid-cols-[1fr_auto]'>
			<Link href={`${appRoutes.viewApplicationPage}/${data.$id}`}>
				<div className='grid sm:grid-cols-3 sm:gap-4 w-full items-start'>
					<div>
						<h3 className='text-base font-[500] !pb-0 !my-0'>{data.jobTitle}</h3>
						<p className='!my-0 text-gray-600'>{data.companyName}</p>
					</div>
					<p className='text-gray-600 text-xs md:hidden'>{transformDate(data.$createdAt)}</p>
					<div className='flex items-center my-2 md:my-0'>
						{data.applicationStatus && (
							<Tags
								iconType=''
								type={getApplicationStatusColor(data.applicationStatus as ApplicationStatus)}
								text={data.applicationStatus}
							/>
						)}
						{data.salary && <DollarCircleFilled className='!text-blue-400' />}
					</div>
					<p className='hidden md:block md:!my-0 text-gray-600 text-xs md:text-sm'>{transformDate(data.$createdAt)}</p>
				</div>
			</Link>

			<div className='flex sm:flex-col w-full justify-between gap-4 sm:max-w-fit pt-2 sm:pt-0'>
				<Button
					type='default'
					href={`${appRoutes.updateApplicationPage}/${data.$id}`}
					className='flex items-center gap-1 text-sm !text-gray-600'
				>
					<EditFilled />
					Edit
				</Button>
				<Button onClick={() => onClickDelete(data.$id)} className='text-sm !bg-red-300'>
					<DeleteFilled className='!bg-red-300 !text-white' />
				</Button>
			</div>
		</div>
	);
};

export default ApplicationList;
