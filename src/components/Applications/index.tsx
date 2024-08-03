'use client';
import { appwriteDatabaseConfig, database } from '@/appwrite/config';
import { JobApplicationData, Response } from '@/types/apiResponseTypes';
import { Query } from 'appwrite';
import React, { useEffect, useState } from 'react';
import ApplicationsTable from './ApplicationsTable';
import { useSearchParams } from 'next/navigation';
import { Button } from 'antd';
import { appRoutes } from '@/utils/constants';

const Application = () => {
	const [applicationData, setApplicationData] = useState<Response<JobApplicationData>>({} as Response<JobApplicationData>);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const searchParams = useSearchParams();

	const isShowTableData = searchParams.get('hashKeyForData') === 'hvL_MVht8PdrjLFiU0AJU';

	const getApplicationData = async () => {
		setIsLoading(true);
		try {
			const response = (await database.listDocuments(
				appwriteDatabaseConfig.applicationDatabase,
				appwriteDatabaseConfig.applicationDatabaseCollectionId,
				[Query.equal('isSoftDelete', false)],
			)) as Response<JobApplicationData>;

			if (response.documents.length) {
				setApplicationData(response);
			}
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	function softDeleteData(documentId: string) {
		database
			.updateDocument(appwriteDatabaseConfig.applicationDatabase, appwriteDatabaseConfig.applicationDatabaseCollectionId, String(documentId), {
				isSoftDelete: true,
				softDeleteDateAndTime: new Date(),
			})
			.then((response) => {
				console.log('response', response);
				getApplicationData();
			})
			.catch((error) => {
				console.error(error);
			});
	}

	useEffect(() => {
		isShowTableData && getApplicationData();
	}, [isShowTableData]);

	console.log('applicationData', applicationData);
	return (
		<div className='rounded-lg'>
			<div className='flex justify-between items-center mb-6'>
				<h1 className='text-xl font-semibold text-black'>Application Data</h1>
				<Button href={appRoutes.addApplicationPage}>Add new</Button>
			</div>
			{isShowTableData && <ApplicationsTable applicationData={applicationData} isLoading={isLoading} onClick={softDeleteData} />}
			{!isShowTableData && 'No data to show. Please re-authenticate with special code for the data'}
		</div>
	);
};

export default Application;
