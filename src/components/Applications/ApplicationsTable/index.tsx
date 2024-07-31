import { JobApplicationData, Response } from '@/types/apiResponseTypes';
import React from 'react';
import TableDataCell from './ApplicationsTableDataCell';
import { formatDate } from '@/utils/date';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { ApplicationStatus } from '@/components/ApplicationForm/utility';

type Props = {
	applicationData: Response<JobApplicationData>;
	isLoading: boolean;
	onClick?: (documentId: string) => void;
};

const ApplicationsTable = ({ applicationData, isLoading, onClick }: Props) => {
	function getApplicationStatusColor(applicationStatus: ApplicationStatus) {
		switch (applicationStatus) {
			case ApplicationStatus.APPLIED:
				return 'text-yellow-500 bg-yellow-50';
			case ApplicationStatus.IN_PROGRESS:
				return 'text-yellow-500 bg-yellow-50';
			case ApplicationStatus.NO_REPLY:
				return 'text-red-500 bg-red-50';
			case ApplicationStatus.SUCCESS:
				return 'text-green-500 bg-green-50';
			case ApplicationStatus.REJECTED_NO_FEEDBACK:
				return 'text-red-500 bg-red-50';
			case ApplicationStatus.REJECTED_WITH_FEEDBACK:
				return 'text-red-500 bg-red-50';
		}
	}

	return (
		<div className='relative overflow-x-auto shadow-md sm:rounded-lg w-full'>
			<table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
				<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
					<tr>
						<th scope='col' className='px-6 py-3'>
							No.
						</th>
						<th scope='col' className='px-6 py-3'>
							Job Title
						</th>
						<th scope='col' className='px-6 py-3'>
							<div className='flex items-center'>Status</div>
						</th>
						<th scope='col' className='px-6 py-3'>
							<div className='flex items-center'>Applied on</div>
						</th>
						<th scope='col' className='px-6 py-3'>
							<div className='flex items-center'>Company Name</div>
						</th>
						<th scope='col' className='px-6 py-3 w-max'>
							<div className='flex items-center'>Salary</div>
						</th>
						{/* <th scope='col' className='px-6 py-3'>
							<div className='flex items-center'>Interview Date</div>
						</th> */}
						<th scope='col' className='px-6 py-3'>
							<span className='sr-only'>Action</span>
						</th>
					</tr>
				</thead>
				<tbody>
					{isLoading && 'Loading...'}
					{!isLoading &&
						applicationData?.documents?.map((data, index) => (
							<tr key={data.$id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
								<th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
									{index + 1}
								</th>
								<th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
									<a href={`/view/${data.$id}`}>{data.jobTitle}</a>
								</th>
								<TableDataCell
									text={data.applicationStatus ?? '-'}
									isSpecialTextColor
									link={`/view/${data.$id}`}
									textColor={getApplicationStatusColor(data.applicationStatus as ApplicationStatus)}
								/>
								<TableDataCell text={formatDate(data.$createdAt)} link={`/view/${data.$id}`} />
								<TableDataCell text={data.companyName} link={`/view/${data.$id}`} />
								<td className='px-6 py-4 w-max'>
									<a href={`/view/${data.$id}`}>
										{data.salary} <br /> <span className='text-[10px]'>{data.salaryCurrency}</span> <br />{' '}
										<span className='text-[10px]'>{data.salaryType}</span>
									</a>
								</td>
								{/* <TableDataCell text={formatDate(String(data.interviewDate)) ?? '-'} /> */}
								<td className='px-6 py-4 flex gap-2'>
									<a href={`/update/${data.$id}`}>
										<EditFilled height={20} width={20} />
									</a>
									<DeleteFilled className='text-red-400' height={20} width={20} onClick={() => onClick && onClick(data.$id)} />
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
};

export default ApplicationsTable;
