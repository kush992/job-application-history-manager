'use client';

import React, { useState } from 'react';
import debounce from 'lodash/debounce';
import Link from 'next/link';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { applicationDataQueries } from '@/lib/server/application-queries';
import { ApplicationStatus } from '@/components/ApplicationForm/utility';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import ApplicationList from './ApplicationList';
import ApplicationFilter from './ApplicationFilter';
import { appRoutes, QueryKeys } from '@/utils/constants';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { JobApplicationData } from '@/types/apiResponseTypes';
import { Separator } from '../ui/separator';
import { Info, Loader } from 'lucide-react';
import PageDescription from '../ui/page-description';
import PageTitle from '../ui/page-title';

type Props = {
	userId: string;
};

const ApplicationPage: React.FC<Props> = ({ userId }) => {
	const [companyNameFilter, setCompanyNameFilter] = useState<string | undefined>(undefined);
	const [statusFilter, setStatusFilter] = useState<ApplicationStatus | undefined>(undefined);

	const { data, error, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery<{
		documents: JobApplicationData[];
	}>({
		queryKey: [QueryKeys.APPLICATIONS_PAGE, userId, companyNameFilter, statusFilter],
		queryFn: ({ pageParam = undefined }) =>
			applicationDataQueries.getAll(String(pageParam), companyNameFilter, statusFilter),
		getNextPageParam: (lastPage) => {
			if (lastPage.documents.length === 20) {
				return lastPage.documents[lastPage.documents.length - 1].$id;
			}
			return undefined;
		},
		staleTime: 1000 * 60 * 5,
		initialPageParam: undefined,
	});

	const { toast } = useToast();

	const mutation = useMutation({
		mutationFn: (documentId: string) => applicationDataQueries.delete(documentId, refetch),
		onSuccess: () => {
			toast({
				title: 'Success',
				description: 'Application deleted successfully',
			});
		},
		onError: (error) => {
			toast({
				title: 'Error',
				description: 'Failed to delete application',
			});
			console.error(error);
		},
	});

	const debouncedRefetch = debounce(refetch, 500);

	const onInputChange = (value: string) => {
		setCompanyNameFilter(value);
		debouncedRefetch();
	};

	const filterByStatus = (value: ApplicationStatus) => {
		setStatusFilter(value);
		debouncedRefetch();
	};

	const clearAllFilters = () => {
		setCompanyNameFilter(undefined);
		setStatusFilter(undefined);
		debouncedRefetch();
	};

	const jobRecords = data?.pages?.map((page) => page?.documents)?.flat();

	console.log(data, jobRecords);

	// if (isLoading) {
	// 	return <div>Loading...</div>;
	// }

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<div className="rounded-md flex flex-col gap-4">
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
				<Button variant="defaultGradient">
					<Link href={appRoutes.addApplication}>Add new</Link>
				</Button>
			</div>

			<div className="flex flex-col items-center gap-2 w-full">
				<p className="text-xs text-center flex items-center gap-1 text-muted-foreground">
					<Info className="w-4 h-4" />
					<span>Total: {data?.pages[0]?.total}</span>
				</p>
				<ApplicationFilter
					onInputChange={onInputChange}
					filterByStatus={filterByStatus}
					clearAllFilters={clearAllFilters}
				/>
			</div>

			{!isLoading && !error && data && (
				<div className="flex flex-col border rounded-md overflow-hidden w-full">
					{jobRecords?.map((dataa) => (
						<React.Fragment key={dataa.$id}>
							<ApplicationList data={dataa} onClickDelete={() => mutation.mutate(dataa.$id)} />
							<Separator />
						</React.Fragment>
					))}
				</div>
			)}

			{hasNextPage && (
				<Button
					variant="outline"
					onClick={() => fetchNextPage()}
					disabled={isLoading || isFetchingNextPage}
					className="w-full flex gap-1 items-center mt-2"
					size="lg"
				>
					{isLoading || isFetchingNextPage ? <Loader className="animate-spin" /> : 'Fetch More'}
				</Button>
			)}
		</div>
	);
};

export default ApplicationPage;
