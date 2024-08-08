'use client';
import { appwriteDatabaseConfig, database } from '@/appwrite/config';
import { JobApplicationData } from '@/types/apiResponseTypes';
import React, { useEffect, useState } from 'react';
import SubHeader from '../SubHeader';
import Link from 'next/link';
import { appRoutes } from '@/utils/constants';
import { formatDate } from '@/utils/date';

type Props = {
	documentId: string;
};

const ApplicationView = ({ documentId }: Props) => {
	const [isFetching, setIsFetching] = useState<boolean>(false);
	const [applicationData, setApplicationData] = useState<JobApplicationData>({} as JobApplicationData);

	useEffect(() => {
		async function fetchApplicationData() {
			try {
				const response: JobApplicationData = await database.getDocument(
					appwriteDatabaseConfig.applicationDatabase,
					appwriteDatabaseConfig.applicationDatabaseCollectionId,
					documentId,
				);
				setApplicationData(response);
			} catch (error) {
				console.error(error);
			}
		}
		fetchApplicationData();
	}, [documentId]);

	return (
		<div className='flex flex-col gap-6'>
			<div className='flex items-center justify-between'>
				<div>
					<SubHeader previousPageTitle='Applications' href={appRoutes.applicationPage} />
					<h1 className='text-xl font-semibold'>
						{applicationData.jobTitle} at {applicationData.companyName}
					</h1>
				</div>
				<Link href={`${appRoutes.updateApplicationPage}/${documentId}`} className='underline'>
					Edit
				</Link>
			</div>

			<div>
				<p className='text-sm text-gray-500'>
					Applied on: <strong>{new Date(applicationData.$createdAt).toLocaleDateString()}</strong>
				</p>
				<p className='text-sm text-gray-500'>Status: {applicationData.applicationStatus ?? '-'}</p>
				<p className='text-sm text-gray-500'>
					Salary: {applicationData.salary} {applicationData?.salaryCurrency?.toLowerCase()}
					{applicationData?.salaryType?.toLocaleLowerCase()}
				</p>
				{applicationData?.interviewDate && (
					<p className='text-sm text-gray-500'>
						Interview Date: <b>{formatDate(applicationData.interviewDate)}</b>
					</p>
				)}
			</div>

			<div className='p-4 md:p-6 bg-white rounded-lg reset-styles' dangerouslySetInnerHTML={{ __html: applicationData?.jobDescription }} />
		</div>
	);
};

export default ApplicationView;
