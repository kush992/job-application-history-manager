'use client';
import { appwriteDatabaseConfig, database } from '@/appwrite/config';
import { JobApplicationData, Response } from '@/types/apiResponseTypes';
import { Query } from 'appwrite';
import React, { useEffect, useState } from 'react';
import { Button, Divider } from 'antd';
import { appRoutes } from '@/utils/constants';
import SubHeader from '../SubHeader';
import ApplicationList from './ApplicationList';
import { LoadingOutlined } from '@ant-design/icons';
import Notifications from '../Notifications';

type Props = {
	userId: string;
};

const Application: React.FC<Props> = ({ userId }) => {
	const [documents, setDocuments] = useState<JobApplicationData[]>([]);
	const [totalDocuments, setTotalDocuments] = useState<number>(0);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [hasMore, setHasMore] = useState<boolean>(true);
	const [notification, setNotification] = useState<{ content: string; type: '' | 'success' | 'error' }>({
		content: '',
		type: '',
	});

	const fetchApplicationData = async (lastId?: string) => {
		setIsLoading(true);
		try {
			const queries = [Query.limit(20), Query.equal('isSoftDelete', false), Query.equal('userId', userId), Query.orderDesc('$createdAt')];

			if (lastId) {
				queries.push(Query.cursorAfter(lastId));
			}

			const response = (await database.listDocuments(
				appwriteDatabaseConfig.applicationDatabase,
				appwriteDatabaseConfig.applicationDatabaseCollectionId,
				queries,
			)) as Response<JobApplicationData>;

			setTotalDocuments(response.total);

			if (response.documents.length) {
				setDocuments((prevDocuments) => (lastId ? [...prevDocuments, ...response.documents] : response.documents));
				setHasMore(response.documents.length === 20);
			} else {
				setHasMore(false);
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
				setNotification({ content: 'Application deleted', type: 'success' });
				fetchApplicationData();
			})
			.catch((error) => {
				setNotification({ content: 'An error occured', type: 'error' });
				console.error(error);
			});
	}

	useEffect(() => {
		fetchApplicationData();
	}, []);

	useEffect(() => {
		if (notification.content) {
			const timer = setTimeout(() => {
				setNotification({ content: '', type: '' });
			}, 1000);

			return () => clearTimeout(timer);
		}
	}, [notification]);

	return (
		<div className='rounded-lg'>
			{notification.content && <Notifications {...notification} />}
			<div className='flex justify-between items-center mb-6'>
				<div>
					<SubHeader previousPageTitle='Home' href='/' />
					<h1 className='text-xl font-semibold !m-0'>Application Data</h1>
				</div>
				<Button href={appRoutes.addApplicationPage}>Add new</Button>
			</div>

			<div className='flex flex-col items-center gap-4'>
				<div>
					<p className='text-xs text-center'>Total: {totalDocuments}</p>
					<p className='text-xs text-center'>Showing: {documents.length}</p>
				</div>
				<div className='flex flex-col border border-gray-200 rounded-lg overflow-hidden'>
					{documents?.map((data) => (
						<>
							<ApplicationList key={data.$id} data={data} onClickDelete={softDeleteData} />
							<Divider className='!my-0 py-10' />
						</>
					))}
				</div>
				<Button type='primary' onClick={() => fetchApplicationData(documents[documents.length - 1].$id)} disabled={!hasMore || isLoading}>
					{isLoading && <LoadingOutlined />}
					<span>{isLoading ? 'Loading...' : 'Load more'}</span>
				</Button>
			</div>
		</div>
	);
};

export default Application;
