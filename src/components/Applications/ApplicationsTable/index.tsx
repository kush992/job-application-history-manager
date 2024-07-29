import { JobApplicationData, Response } from '@/types/apiResponseTypes';
import React from 'react';
import TableDataCell from './ApplicationsTableDataCell';
import { formatDate } from '@/utils/date';

type Props = {
	applicationData: Response<JobApplicationData>;
	isLoading: boolean;
	onClick?: (documentId: string) => void;
};

const ApplicationsTable = ({ applicationData, isLoading, onClick }: Props) => {
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
						<th scope='col' className='px-6 py-3'>
							<div className='flex items-center'>Salary</div>
						</th>
						<th scope='col' className='px-6 py-3'>
							<div className='flex items-center'>Interview Date</div>
						</th>
						<th scope='col' className='px-6 py-3'>
							<span className='sr-only'>Edit Action</span>
						</th>
						<th scope='col' className='px-6 py-3'>
							<span className='sr-only'>Delete Action</span>
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
									{data.jobTitle}
								</th>
								<TableDataCell text={data.applicationStatus ?? '-'} isSpecialTextColor />
								<TableDataCell text={formatDate(data.$createdAt)} />
								<TableDataCell text={data.companyName} />
								<td className='px-6 py-4'>
									{data.salary} <br /> <span className='text-[10px]'>{data.salaryCurrency}</span> <br />{' '}
									<span className='text-[10px]'>{data.salaryType}</span>
								</td>
								<TableDataCell text={formatDate(String(data.interviewDate)) ?? '-'} />
								<TableDataCell link={`/update/${data.$id}`} text='Edit' highlightLink />
								<TableDataCell onClick={() => onClick && onClick(data.$id)} text='Delete' highlightLink />
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
};

export default ApplicationsTable;
