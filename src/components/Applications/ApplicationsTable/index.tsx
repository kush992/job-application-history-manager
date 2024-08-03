import { JobApplicationData, Response } from '@/types/apiResponseTypes';
import React from 'react';
import TableDataCell from './ApplicationsTableDataCell';
import { formatDate } from '@/utils/date';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { ApplicationStatus } from '@/components/ApplicationForm/utility';
import { Table } from 'antd';
import { appRoutes } from '@/utils/constants';

type Props = {
	applicationData: Response<JobApplicationData>;
	isLoading: boolean;
	onClick?: (documentId: string) => void;
};

const ApplicationsTable: React.FC<Props> = ({ applicationData, isLoading, onClick }) => {
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
		<Table
			loading={isLoading}
			scroll={{ x: true }}
			sticky={true}
			bordered
			pagination={{ position: ['bottomCenter'] }}
			tableLayout='fixed'
			className='w-full'
			columns={[
				{
					dataIndex: 'index',
					key: 'index',
					render: (text: string, record: any, index: number) => index + 1,
					showSorterTooltip: { target: 'full-header' },
				},
				{
					title: 'Job Title',
					dataIndex: 'jobTitle',
					key: 'jobTitle',
					render: (text: string, record: any) => <a href={`${appRoutes.viewApplicationPage}/${record.$id}`}>{text}</a>,
					sorter: (a, b) => a.jobTitle.localeCompare(b.jobTitle),
					sortDirections: ['ascend', 'descend'],
				},
				{
					title: 'Status',
					dataIndex: 'applicationStatus',
					key: 'applicationStatus',
					render: (text: string, record: any) => (
						<TableDataCell
							text={text ?? '-'}
							isSpecialTextColor
							link={`${appRoutes.viewApplicationPage}/${record.$id}`}
							textColor={getApplicationStatusColor(record.applicationStatus as ApplicationStatus)}
						/>
					),
					sorter: (a, b) => a.applicationStatus?.localeCompare(b.applicationStatus),
					sortDirections: ['ascend', 'descend'],
					filters: [
						{ text: ApplicationStatus.APPLIED, value: ApplicationStatus.APPLIED },
						{ text: ApplicationStatus.IN_PROGRESS, value: ApplicationStatus.IN_PROGRESS },
						{ text: ApplicationStatus.SUCCESS, value: ApplicationStatus.SUCCESS },
						{ text: ApplicationStatus.NO_REPLY, value: ApplicationStatus.NO_REPLY },
						{ text: ApplicationStatus.REJECTED_NO_FEEDBACK, value: ApplicationStatus.REJECTED_NO_FEEDBACK },
						{ text: ApplicationStatus.REJECTED_WITH_FEEDBACK, value: ApplicationStatus.REJECTED_WITH_FEEDBACK },
					],
					onFilter: (value, record) => record?.applicationStatus?.includes(value),
				},
				{
					title: 'Applied on',
					dataIndex: '$createdAt',
					key: '$createdAt',
					sorter: (a, b) => new Date(a.$createdAt).getTime() - new Date(b.$createdAt).getTime(),
					sortDirections: ['ascend', 'descend'],
					render: (text: string, record: any) => (
						<TableDataCell text={formatDate(text)} link={`${appRoutes.viewApplicationPage}/${record.$id}`} />
					),
				},
				{
					title: 'Company Name',
					dataIndex: 'companyName',
					key: 'companyName',
					render: (text: string, record: any) => <TableDataCell text={text} link={`${appRoutes.viewApplicationPage}/${record.$id}`} />,
				},
				{
					title: 'Salary',
					dataIndex: 'salary',
					key: 'salary',
					render: (text: string, record: any) => (
						<td className='w-max'>
							<a href={`${appRoutes.viewApplicationPage}/${record.$id}`}>
								{text} <br /> <span className='text-[10px]'>{record.salaryCurrency}</span>
								&nbsp;
								<span className='text-[10px]'>{record.salaryType}</span>
							</a>
						</td>
					),
				},
				{
					title: 'Action',
					dataIndex: 'action',
					key: 'action',
					render: (text: string, record: any) => (
						<td className='flex gap-2'>
							<a href={`${appRoutes.updateApplicationPage}/${record.$id}`}>
								<EditFilled height={'20px'} width={'20px'} />
							</a>
							<DeleteFilled className='text-red-400' height={'20px'} width={'20px'} onClick={() => onClick && onClick(record.$id)} />
						</td>
					),
				},
			]}
			dataSource={applicationData?.documents}
		/>
	);
};

export default ApplicationsTable;
