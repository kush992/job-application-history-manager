'use client';
import { appwriteDatabaseConfig, database } from '@/appwrite/config';
import { JobApplicationData } from '@/types/apiResponseTypes';
import React, { useEffect, useState } from 'react';
import SubHeader from '../SubHeader';
import Link from 'next/link';
import { appRoutes } from '@/utils/constants';
import { formatDate } from '@/utils/date';
import Loader from '../Loader';

type Props = {
	documentId: string;
};

const ApplicationView = ({ documentId }: Props) => {
	const [isFetching, setIsFetching] = useState<boolean>(false);
	const [applicationData, setApplicationData] = useState<JobApplicationData>({} as JobApplicationData);

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
			} finally {
				setIsFetching(false);
			}
		}
		fetchApplicationData();
	}, [documentId]);

	return (
		<div className='flex flex-col gap-6'>
			{isFetching && <Loader />}
			{!isFetching && !applicationData.$id && <p>Application data not found</p>}
			{!isFetching && (
				<>
					<div className='flex items-center justify-between'>
						<div>
							<SubHeader previousPageTitle='Applications' href={appRoutes.applicationPage} />
							<h1 className='text-xl font-semibold !m-0'>
								{applicationData.jobTitle} at {applicationData.companyName}
							</h1>
						</div>
						<Link href={`${appRoutes.updateApplicationPage}/${documentId}`} className='underline'>
							Edit
						</Link>
					</div>

					<div className='bg-slate-100 p-4 rounded-lg'>
						<div>
							<p className='text-sm text-gray-500'>
								Applied on: <strong>{formatDate(applicationData.$createdAt)}</strong>
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

						<div
							className='bg-grey rounded-lg reset-styles !py-3'
							dangerouslySetInnerHTML={{ __html: applicationData?.jobDescription }}
						/>
					</div>
				</>
			)}
		</div>
	);
};

export default ApplicationView;
