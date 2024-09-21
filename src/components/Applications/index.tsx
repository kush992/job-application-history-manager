'use client';
import { appwriteDatabaseConfig, database } from '@/appwrite/config';
import { JobApplicationData, Response } from '@/types/apiResponseTypes';
import { Query } from 'appwrite';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import debounce from 'lodash/debounce';
import { appRoutes } from '@/utils/constants';
import SubHeader from '../SubHeader';
import ApplicationList from './ApplicationList';
import { InfoCircleFilled, LoadingOutlined } from '@ant-design/icons';
import Notifications from '../Notifications';
import ApplicationFilter from './ApplicationFilter';
import { ApplicationStatus } from '../ApplicationForm/utility';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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
	const [companyNameFilter, setCompanyNameFilter] = useState<string | undefined>(undefined);
	const [statusFilter, setStatusFilter] = useState<ApplicationStatus | undefined>(undefined);

	const fetchApplicationData = async (lastId?: string, query?: string, statusFilter?: ApplicationStatus) => {
		setIsLoading(true);
		try {
			const queries = [Query.limit(20), Query.equal('isSoftDelete', false), Query.equal('userId', userId), Query.orderDesc('$createdAt')];

			if (lastId) {
				queries.push(Query.cursorAfter(lastId));
			}

			if (query) {
				queries.push(Query.contains('companyName', query));
			}

			if (statusFilter) {
				queries.push(Query.contains('applicationStatus', statusFilter));
			}

			const response = (await database.listDocuments(
				appwriteDatabaseConfig.applicationDatabase,
				appwriteDatabaseConfig.applicationDatabaseCollectionId,
				queries,
			)) as Response<JobApplicationData>;

			setTotalDocuments(response.total);

			setDocuments((prevDocuments) => (lastId ? [...prevDocuments, ...response.documents] : response.documents));
			if (response.documents.length) {
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
			.then(() => {
				setNotification({ content: 'Application deleted', type: 'success' });
				fetchApplicationData();
			})
			.catch((error) => {
				setNotification({ content: 'An error occured', type: 'error' });
				console.error(error);
			});
	}

	const debouncedFetching = useCallback(debounce(fetchApplicationData, 400), []);

	const onInputChange = async (value: string) => {
		setCompanyNameFilter(value);
		await debouncedFetching('', value);
	};

	const filterByStatus = async (value: ApplicationStatus) => {
		setStatusFilter(value);
		await debouncedFetching('', '', value);
	};

	const clearAllFilters = async () => {
		setCompanyNameFilter('');
		setStatusFilter(undefined);
		await debouncedFetching(undefined, undefined, undefined);
	};

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
				<Button variant='outline'>
					<Link href={appRoutes.addApplicationPage}>Add new</Link>
				</Button>
			</div>

			<div className='flex flex-col items-center gap-2 w-full'>
				<p className='text-xs text-center flex items-center gap-1 text-muted-foreground'>
					<InfoCircleFilled />
					<span>
						Total: {totalDocuments} Showing: {documents.length}
					</span>
				</p>
				<ApplicationFilter onInputChange={onInputChange} filterByStatus={filterByStatus} clearAllFilters={clearAllFilters} />

				{documents.length > 0 && (
					<div className='flex flex-col border rounded-lg overflow-hidden w-full'>
						{documents?.map((data) => (
							<div key={data.$id}>
								<ApplicationList data={data} onClickDelete={softDeleteData} />
								<Separator />
							</div>
						))}
					</div>
				)}

				{!documents.length && <p className='text-base my-10'>No data to show.</p>}

				<Button
					variant='outline'
					onClick={() => fetchApplicationData(documents[documents.length - 1].$id, companyNameFilter, statusFilter)}
					disabled={!hasMore || isLoading}
				>
					{isLoading && <LoadingOutlined />}
					<span>{isLoading ? 'Loading...' : 'Load more'}</span>
				</Button>
			</div>
		</div>
	);
};

export default Application;
