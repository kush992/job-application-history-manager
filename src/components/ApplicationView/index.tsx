'use client';
import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { Divider, notification } from 'antd';
import { appwriteDatabaseConfig, database } from '@/appwrite/config';
import { JobApplicationData } from '@/types/apiResponseTypes';
import SubHeader from '../SubHeader';
import { appRoutes } from '@/utils/constants';
import { formatDate } from '@/utils/date';
import Loader from '../Loader';
import { DollarCircleOutlined, EditOutlined } from '@ant-design/icons';
import Tags from '../Tags';

type Props = {
	documentId: string;
};

const ApplicationView = ({ documentId }: Props) => {
	const [isFetching, setIsFetching] = useState<boolean>(false);
	const [applicationData, setApplicationData] = useState<JobApplicationData>({} as JobApplicationData);
	const [api, contextHolder] = notification.useNotification();

	const salaryDetail =
		applicationData.salary &&
		`${applicationData?.salary} ${applicationData?.salaryCurrency?.toLowerCase()} / ${applicationData?.salaryType?.toLowerCase()}`;

	const openNotification = useCallback(() => {
		api.error({
			message: 'Application data not found',
		});
	}, [api]);

	useEffect(() => {
		async function fetchApplicationData() {
			setIsFetching(true);
			try {
				const response: JobApplicationData = await database.getDocument(
					appwriteDatabaseConfig.applicationDatabase,
					appwriteDatabaseConfig.applicationDatabaseCollectionId,
					documentId,
				);
				setApplicationData(response);
			} catch (error) {
				console.error(error);
				openNotification();
			} finally {
				setIsFetching(false);
			}
		}
		fetchApplicationData();
	}, [documentId, openNotification]);

	return (
		<div className='flex flex-col gap-6'>
			{isFetching && <Loader />}
			{!isFetching && !applicationData.$id && contextHolder}
			{!isFetching && applicationData.$id && (
				<>
					<div className='bg-white md:rounded-lg border border-gray-200 p-4'>
						<div className='flex justify-between items-center'>
							<SubHeader previousPageTitle='Applications' href={appRoutes.applicationPage} />
							<Link href={`${appRoutes.updateApplicationPage}/${documentId}`} className='underline'>
								<EditOutlined />
							</Link>
						</div>
						<div>
							<p className='text-sm'>{applicationData.companyName}</p>
							<h1 className='text-2xl font-semibold !mt-0 !mb-2'>{applicationData.jobTitle}</h1>
							<Tags type={'default'} text={applicationData.applicationStatus ?? ''} iconType={''} />
						</div>

						<Divider className='mt-2' />
						<div>
							<h2 className='text-md'>Job Activity</h2>
							<p className='text-sm text-gray-500'>
								Applied on: <strong>{formatDate(applicationData.$createdAt)}</strong>
							</p>
							{applicationData?.interviewDate && (
								<p className='text-sm text-gray-500'>
									Interview Date: <b>{formatDate(applicationData.interviewDate)}</b>
								</p>
							)}
							{salaryDetail && (
								<p className='text-sm text-gray-500'>
									<DollarCircleOutlined /> {salaryDetail}
								</p>
							)}
						</div>
					</div>

					<div className='bg-white border border-gray-200 p-4 md:rounded-lg'>
						{applicationData?.feedbackFromCompany && (
							<div>
								<Divider />
								<h2 className='text-lg font-semibold !mt-3'>Additional details after applying</h2>
								<div
									className='rounded-lg prose prose-h1:!text-lg prose-h2:!text-md prose-h3:!text-md prose-h4:!text-md prose-h5:!text-md prose-h6:!text-md prose-sm prose-img:rounded-xl max-w-none'
									dangerouslySetInnerHTML={{ __html: applicationData?.feedbackFromCompany }}
								/>
								<Divider />
							</div>
						)}
						<div>
							<h2 className='text-lg font-semibold !m-0'>Application Data</h2>
							<div
								className='rounded-lg prose prose-h1:!text-lg prose-h2:!text-md prose-h3:!text-md prose-h4:!text-md prose-h5:!text-md prose-h6:!text-md prose-sm prose-img:rounded-xl max-w-none'
								dangerouslySetInnerHTML={{ __html: applicationData?.jobDescription }}
							/>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default ApplicationView;
