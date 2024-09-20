import { ApplicationStatus } from '@/components/ApplicationForm/utility';
import SelectWithLabel from '@/components/SelectCustom';
import { DeleteFilled } from '@ant-design/icons';
import { Button, Input } from 'antd';
import React from 'react';

type Props = {
	onInputChange: (query: string) => void;
	filterByStatus: (value: ApplicationStatus) => void;
	clearAllFilters: () => void;
};

const ApplicationFilter: React.FC<Props> = ({ onInputChange, filterByStatus, clearAllFilters }) => {
	return (
		<div className='w-full flex sm:flex-row flex-col items-center gap-2'>
			<Input
				size='large'
				placeholder='Search for job title, position...'
				onChange={(e) => onInputChange(e.target.value)}
				className='md:!w-[70%]'
			/>

			<div className='flex items-center w-full gap-2'>
				<SelectWithLabel
					options={[
						{ value: 'NULL', label: 'Select' },
						{ value: ApplicationStatus.APPLIED, label: 'Applied' },
						{ value: ApplicationStatus.IN_PROGRESS, label: 'In progress' },
						{ value: ApplicationStatus.SUCCESS, label: 'Success' },
						{ value: ApplicationStatus.NO_REPLY, label: 'No reply' },
						{ value: ApplicationStatus.REJECTED_NO_FEEDBACK, label: 'Rejected no feedback' },
						{ value: ApplicationStatus.REJECTED_WITH_FEEDBACK, label: 'Rejected with feedback' },
					]}
					initialValue={{ value: '', label: 'Select status' }}
					onChange={(data) => typeof data === 'string' && filterByStatus(data)}
					wrapperClassName='w-full'
				/>

				<Button size='large' onClick={clearAllFilters}>
					<DeleteFilled />
					<span>Clear filters</span>
				</Button>
			</div>
		</div>
	);
};

export default ApplicationFilter;
