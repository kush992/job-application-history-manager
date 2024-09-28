import { ApplicationStatus } from '@/components/ApplicationForm/utility';
import { JobApplicationData } from '@/types/apiResponseTypes';
import { appRoutes } from '@/utils/constants';
import { transformDate } from '@/utils/date';
import { DeleteFilled, DollarCircleFilled, EditFilled } from '@ant-design/icons';
import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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
		<div className='bg-background p-4 grid sm:grid-cols-[1fr_auto]'>
			<Link href={`${appRoutes.viewApplicationPage}/${data.$id}`}>
				<div className='grid sm:grid-cols-3 sm:gap-4 w-full items-start'>
					<div>
						<h3 className='text-base font-[500] !pb-0 !my-0 text-primary'>{data.jobTitle}</h3>
						<p className='!my-0 text-muted-foreground'>{data.companyName}</p>
					</div>
					<p className='text-muted-foreground text-xs md:hidden'>{transformDate(data.$createdAt)}</p>
					<div className='flex items-center my-2 gap-2 md:my-0'>
						{data.applicationStatus && (
							<Badge variant={'secondary'} title={data.applicationStatus} className=''>
								{data.applicationStatus}
							</Badge>
						)}
						{data.salary && <DollarCircleFilled className='!text-primary' />}
					</div>
					<p className='hidden md:block md:!my-0 text-muted-foreground text-xs md:text-sm'>{transformDate(data.$createdAt)}</p>
				</div>
			</Link>

			<div className='flex sm:flex-col w-full justify-between gap-4 sm:max-w-fit pt-2 sm:pt-0'>
				<Link href={`${appRoutes.updateApplicationPage}/${data.$id}`}>
					<Button variant='outline' className='flex items-center gap-1 text-sm !text-muted-foreground'>
						<EditFilled />
						Edit
					</Button>
				</Link>
				<Button variant='destructive' onClick={() => onClickDelete(data.$id)}>
					<DeleteFilled className='' />
				</Button>
			</div>
		</div>
	);
};

export default ApplicationList;
