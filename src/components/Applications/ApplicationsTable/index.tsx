import { JobApplicationData, Response } from '@/types/apiResponseTypes';
import React from 'react';
import TableDataCell from './ApplicationsTableDataCell';
import { formatDate } from '@/utils/date';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { ApplicationStatus } from '@/components/ApplicationForm/utility';
import { Button, Table } from 'antd';
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
			pagination={{ position: ['bottomCenter'], pageSize: 20 }}
			tableLayout='fixed'
			className='w-full'
			columns={[
				{
					dataIndex: 'index',
					key: 'index',
					render: (text: string, record: any, index: number) => index + 1,
					showSorterTooltip: { target: 'full-header' },
					className: '!',
				},
				{
					title: 'Job Title',
					dataIndex: 'jobTitle',
					key: 'jobTitle',
					render: (text: string, record: any) => (
						<a className='text-black' href={`${appRoutes.viewApplicationPage}/${record.$id}`}>
							{text}
						</a>
					),
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
					className: 'w-max !break-normal',
				},
				{
					title: 'Applied on',
					dataIndex: '$createdAt',
					key: '$createdAt',
					sorter: (a, b) => new Date(a.$createdAt).getTime() - new Date(b.$createdAt).getTime(),
					sortDirections: ['ascend', 'descend'],
					render: (text: string, record: any) => (
						<TableDataCell textColor='black' text={formatDate(text)} link={`${appRoutes.viewApplicationPage}/${record.$id}`} />
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
							<a className='' href={`${appRoutes.viewApplicationPage}/${record.$id}`}>
								{text} <br /> <span className='text-[10px]'>{record.salaryCurrency}</span>
								&nbsp;
								<span className='text-[10px]'>{record.salaryType}</span>
							</a>
						</td>
					),
					className: 'w-max !break-normal',
				},
				{
					title: 'Action',
					dataIndex: 'action',
					key: 'action',
					render: (text: string, record: any) => (
						<td className='flex gap-2'>
							<Button type='text' href={`${appRoutes.updateApplicationPage}/${record.$id}`} className='!p-2'>
								<EditFilled height={'20px'} width={'20px'} />
							</Button>
							<Button
								className='!bg-red-400 !p-2 !border-none'
								style={{
									backgroundImage:
										'url(data:image/png;base64,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)',
								}}
							>
								<DeleteFilled className='!text-white' height={'20px'} width={'20px'} onClick={() => onClick && onClick(record.$id)} />
							</Button>
						</td>
					),
					className: 'w-max !break-normal',
				},
			]}
			dataSource={applicationData?.documents}
		/>
	);
};

export default ApplicationsTable;
