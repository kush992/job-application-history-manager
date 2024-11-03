'use client';

import { appwriteDbConfig, database } from '@/appwrite/config';
import { JobApplicationData, Response } from '@/types/apiResponseTypes';
import { Query } from 'appwrite';
import React, { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import { appRoutes } from '@/utils/constants';
import ApplicationList from './ApplicationList';
import { InfoCircleFilled, LoadingOutlined } from '@ant-design/icons';
import ApplicationFilter from './ApplicationFilter';
import { ApplicationStatus } from '../ApplicationForm/utility';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '../ui/breadcrumb';
import { useToast } from '@/hooks/use-toast';
import PageTitle from '@/components/ui/page-title';
import PageDescription from '@/components/ui/page-description';

type Props = {
	userId: string;
};

const ApplicationPage: React.FC<Props> = ({ userId }) => {
	const [documents, setDocuments] = useState<JobApplicationData[]>([]);
	const [totalDocuments, setTotalDocuments] = useState<number>(0);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [hasMore, setHasMore] = useState<boolean>(true);
	const [companyNameFilter, setCompanyNameFilter] = useState<
		string | undefined
	>(undefined);
	const [statusFilter, setStatusFilter] = useState<
		ApplicationStatus | undefined
	>(undefined);

	const { toast } = useToast();

	const fetchApplicationData = async (
		lastId?: string,
		query?: string,
		statusFilter?: ApplicationStatus,
	) => {
		setIsLoading(true);
		try {
			const queries = [
				Query.limit(20),
				Query.equal('isSoftDelete', false),
				Query.equal('userId', userId),
				Query.orderDesc('$createdAt'),
			];

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
				appwriteDbConfig.applicationDb,
				appwriteDbConfig.applicationDbCollectionId,
				queries,
			)) as Response<JobApplicationData>;

			setTotalDocuments(response.total);

			setDocuments((prevDocuments) =>
				lastId
					? [...prevDocuments, ...response.documents]
					: response.documents,
			);
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
			.updateDocument(
				appwriteDbConfig.applicationDb,
				appwriteDbConfig.applicationDbCollectionId,
				String(documentId),
				{
					isSoftDelete: true,
					softDeleteDateAndTime: new Date(),
				},
			)
			.then(() => {
				toast({
					title: 'Success',
					description: 'Application deleted successfully',
				});
				fetchApplicationData();
			})
			.catch((error) => {
				toast({
					title: 'Error',
					description: 'Failed to delete application',
				});
				console.error(error);
			});
	}

	const debouncedFetching = useCallback(
		debounce(fetchApplicationData, 400),
		[],
	);

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

	return (
		<div className="rounded-md">
			<Breadcrumb className="mb-2">
				<BreadcrumbList>
					<BreadcrumbLink href={appRoutes.home}>Home</BreadcrumbLink>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>Applications</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<div className="flex justify-between items-center mb-6">
				<div>
					<PageTitle title="Applied jobs" />
					<PageDescription description="This is a collection of all the jobs you have applied for." />
				</div>
				<Button variant="outline">
					<Link href={appRoutes.addApplication}>Add new</Link>
				</Button>
			</div>

			<div className="flex flex-col items-center gap-2 w-full">
				<p className="text-xs text-center flex items-center gap-1 text-muted-foreground">
					<InfoCircleFilled />
					<span>
						Total: {totalDocuments} Showing: {documents.length}
					</span>
				</p>
				<ApplicationFilter
					onInputChange={onInputChange}
					filterByStatus={filterByStatus}
					clearAllFilters={clearAllFilters}
				/>

				{documents.length > 0 && (
					<div className="flex flex-col border rounded-md overflow-hidden w-full">
						{documents?.map((data) => (
							<div key={data.$id}>
								<ApplicationList
									data={data}
									onClickDelete={softDeleteData}
								/>
								<Separator />
							</div>
						))}
					</div>
				)}

				{!documents.length && (
					<p className="text-base my-10">No data to show.</p>
				)}

				<Button
					variant="outline"
					onClick={() =>
						fetchApplicationData(
							documents[documents.length - 1].$id,
							companyNameFilter,
							statusFilter,
						)
					}
					disabled={!hasMore || isLoading}
					className="w-full flex gap-1 items-center mt-2"
					size="lg"
				>
					{isLoading && <LoadingOutlined />}
					<span>{isLoading ? 'Loading...' : 'Load more'}</span>
				</Button>
			</div>
		</div>
	);
};

export default ApplicationPage;
