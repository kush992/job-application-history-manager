'use client';

import React, { useCallback, useState } from 'react';
import debounce from 'lodash/debounce';
import { appRoutes, QueryKeys } from '@/utils/constants';
import ApplicationList from './ApplicationList';
import { InfoCircleFilled, LoadingOutlined } from '@ant-design/icons';
import ApplicationFilter from './ApplicationFilter';
import { ApplicationStatus } from '@/components/ApplicationForm/utility';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { useToast } from '@/hooks/use-toast';
import PageTitle from '@/components/ui/page-title';
import PageDescription from '@/components/ui/page-description';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchApplicationData, softDeleteData } from '@/lib/server/appwrite-queries';

type Props = {
	userId: string;
};

const ApplicationPage: React.FC<Props> = ({ userId }) => {
	const [companyNameFilter, setCompanyNameFilter] = useState<string | undefined>(undefined);
	const [statusFilter, setStatusFilter] = useState<ApplicationStatus | undefined>(undefined);
	const [lastId, setLastId] = useState<string | undefined>(undefined);

	const { data, error, isLoading, isFetching, refetch, isRefetching } = useQuery({
		queryKey: [QueryKeys.APPLICATIONS_PAGE, userId, lastId, companyNameFilter, statusFilter],
		queryFn: () => fetchApplicationData(userId, lastId, companyNameFilter, statusFilter as ApplicationStatus),
		enabled: !!userId,
	});

	const { toast } = useToast();

	const mutation = useMutation({
		mutationFn: (documentId: string) => softDeleteData(documentId, refetch),
		onSuccess: () => {
			toast({ title: 'success', description: 'Application deleted successfully' });
		},
		onError: (error) => {
			toast({ title: 'Error', description: 'Failed to delete application' });
			console.error(error);
		},
	});

	const debouncedFetching = useCallback(debounce(refetch, 400), []);

	const onShowMore = async (lastId: string) => {
		setLastId(lastId);
		await debouncedFetching();
	};

	const onInputChange = async (value: string) => {
		setCompanyNameFilter(value);
		await debouncedFetching();
	};

	const filterByStatus = async (value: ApplicationStatus) => {
		setStatusFilter(value);
		await debouncedFetching();
	};

	const clearAllFilters = async () => {
		setCompanyNameFilter(undefined);
		setStatusFilter(undefined);
		await debouncedFetching();
	};

	return (
		<div className='rounded-md'>
			<Breadcrumb className='mb-2'>
				<BreadcrumbList>
					<BreadcrumbLink href={appRoutes.home}>Home</BreadcrumbLink>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>Applications</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<div className='flex justify-between items-center mb-6'>
				<div>
					<PageTitle title='Applied jobs' />
					<PageDescription description='This is a collection of all the jobs you have applied for.' />
				</div>
				<Button variant='outline'>
					<Link href={appRoutes.addApplicationPage}>Add new</Link>
				</Button>
			</div>

			<div className='flex flex-col items-center gap-2 w-full'>
				<p className='text-xs text-center flex items-center gap-1 text-muted-foreground'>
					<InfoCircleFilled />
					<span>
						Total: {data?.total} Showing: {data?.total}
					</span>
				</p>
				<ApplicationFilter onInputChange={onInputChange} filterByStatus={filterByStatus} clearAllFilters={clearAllFilters} />

				{error && <p className='text-base my-10'>Something went wrong</p>}
				{(isFetching || isRefetching || isLoading) && <p className='text-base my-10'>Fetching...</p>}

				{!isLoading && !isFetching && !isRefetching && !error && data && data?.documents?.length > 0 && (
					<div className='flex flex-col border rounded-md overflow-hidden w-full'>
						{data?.documents?.map((data) => (
							<div key={data.$id}>
								<ApplicationList data={data} onClickDelete={() => mutation.mutate(data.$id)} />
								<Separator />
							</div>
						))}
					</div>
				)}

				{data?.total === 0 && <p className='text-base my-10'>No data to show.</p>}

				<Button
					variant='outline'
					onClick={() => onShowMore(String(data?.documents[data?.documents.length - 1].$id))}
					disabled={isLoading || isFetching || isRefetching}
					className='w-full flex gap-1 items-center mt-2'
					size='lg'
				>
					{isLoading || isFetching || (isRefetching && <LoadingOutlined />)}
					<span>{isLoading || isFetching || isRefetching ? 'Loading...' : 'Next page'}</span>
				</Button>
			</div>
		</div>
	);
};

export default ApplicationPage;
