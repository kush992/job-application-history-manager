'use client';

import React from 'react';
import debounce from 'lodash/debounce';
import Link from 'next/link';
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { applicationDataQueries } from '@/lib/server/application-queries';
import { ApplicationStatus } from '@/components/ApplicationForm/utility';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import ApplicationListItem from './ApplicationListItem';
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
import { Separator } from '../ui/separator';
import { Info } from 'lucide-react';
import PageDescription from '../ui/page-description';
import PageTitle from '../ui/page-title';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FilterFormValues, filterSchema } from './ApplicationFilter/utility';
import ApplicationListItemSkeleton from './ApplicationListItemSkeleton';
import { useApplications } from '@/hooks/useApplications';
import ErrorDisplay from '../ui/error-display';

type Props = {
	userId: string;
	journeyId?: string;
};

const ApplicationsListPage: React.FC<Props> = ({ userId, journeyId }) => {
	const filterForm = useForm<FilterFormValues>({
		resolver: zodResolver(filterSchema),
		defaultValues: {
			companyName: '',
			status: [],
			contractType: [],
			workMode: [],
		},
	});

	const { companyName, status, contractType, workMode } = filterForm.getValues();

	// const { data, error, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery({
	// 	queryKey: [QueryKeys.APPLICATIONS_PAGE, userId, companyName, status, workMode, contractType],
	// 	queryFn: ({ pageParam = undefined }) =>
	// 		applicationDataQueries.getAll(
	// 			String(pageParam),
	// 			companyName,
	// 			status?.join(',') as ApplicationStatus,
	// 			workMode?.join(',') as WorkMode,
	// 			contractType?.join(',') as ContractType,
	// 		),
	// 	getNextPageParam: (lastPage) => {
	// 		if (lastPage.documents.length === 20) {
	// 			return lastPage.documents[lastPage.documents.length - 1].$id;
	// 		}
	// 		return undefined;
	// 	},
	// 	retry: 0,
	// 	staleTime: 1000 * 60 * 5,
	// 	initialPageParam: undefined,
	// });

	// const { data, error, isLoading, refetch } = useQuery({
	// 	queryKey: [QueryKeys.APPLICATIONS_PAGE, userId, companyName, status, workMode, contractType],
	// 	queryFn: () =>
	// 		applicationDataQueries.getAll(companyName, status?.[0], workMode?.[0], contractType?.[0], journeyId),
	// 	retry: 0,
	// 	staleTime: 1000 * 60 * 5,
	// });

	const { toast } = useToast();

	const {
		applications,
		isErrorApplications,
		isLoadingApplications,
		errorApplications,
		refetchApplications,
		deleteApplication,
	} = useApplications({
		filters: {
			query: companyName,
			statusFilter: status?.[0],
			workModeFilter: workMode?.[0],
			contractTypeFilter: contractType?.[0],
			journeyId: journeyId,
		},
	});

	// const { mutate, isSuccess } = useDeleteApplication();

	// const mutation = useMutation({
	// 	mutationFn: (documentId: string) => applicationDataQueries.delete(documentId, refetch),
	// 	onSuccess: () => {
	// 		toast({
	// 			title: 'Success',
	// 			description: 'Application deleted successfully',
	// 		});
	// 	},
	// 	onError: (error) => {
	// 		toast({
	// 			title: 'Error',
	// 			description: 'Failed to delete application',
	// 		});
	// 		console.error(error);
	// 	},
	// });

	const debouncedRefetch = debounce(refetchApplications, 500);

	const clearAllFilters = () => {
		filterForm.reset();
	};

	const onSubmitFilters = () => {
		debouncedRefetch();
	};

	console.log('isError', isErrorApplications, errorApplications);

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
			</div>

			<div className="flex flex-col items-center gap-2 w-full sticky top-8">
				<p className="text-xs text-center flex items-center gap-1 text-muted-foreground">
					<Info className="w-4 h-4" />
					<span>Total: {applications?.length}</span>
				</p>

				<div className="flex justify-between gap-2 w-full bg-background py-2 px-4 rounded-md shadow-lg">
					<ApplicationFilter
						onSubmit={onSubmitFilters}
						filterForm={filterForm}
						clearAllFilters={clearAllFilters}
					/>
					<Button variant="primaryViolet" className="w-full">
						<Link href={appRoutes.addApplication}>Add new</Link>
					</Button>
				</div>
			</div>

			{!isLoadingApplications && !isErrorApplications && applications && applications?.length < 1 && (
				<div className="flex items-center justify-center w-full h-96">
					<p className="text-lg text-muted-foreground">No applications found</p>
				</div>
			)}

			{isErrorApplications && <ErrorDisplay error={errorApplications} />}

			{isLoadingApplications && (
				<div className="flex flex-col border rounded-md overflow-hidden w-full">
					{Array.from({ length: 10 }).map((_, index) => (
						<React.Fragment key={index}>
							<ApplicationListItemSkeleton />
							<Separator />
						</React.Fragment>
					))}
				</div>
			)}

			{!isLoadingApplications && !errorApplications && applications && (
				<div className="flex flex-col border rounded-md overflow-hidden w-full">
					{applications?.map((application) => (
						<React.Fragment key={application.id}>
							<ApplicationListItem
								data={application}
								onClickDelete={() => deleteApplication(application.id)}
							/>
							<Separator />
						</React.Fragment>
					))}
				</div>
			)}

			{/* {hasNextPage && (
				<Button
					variant="outline"
					onClick={() => fetchNextPage()}
					disabled={isLoading || isFetchingNextPage}
					className="w-full flex gap-1 items-center mt-2"
					size="lg"
				>
					{isLoading || isFetchingNextPage ? (
						<>
							Fetching
							<Loader className="animate-spin" />
						</>
					) : (
						'Fetch More'
					)}
				</Button>
			)} */}
		</div>
	);
};

export default ApplicationsListPage;
