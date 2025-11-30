'use client';

import React from 'react';
import debounce from 'lodash/debounce';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import ApplicationListItem from './ApplicationListItem';
import ApplicationFilters from './ApplicationFilters';
import { appRoutes } from '@/utils/constants';
import {
	Breadcrumb,
	BreadcrumbEllipsis,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import { Info, Search } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FilterFormValues, filterSchema } from './ApplicationFilter/utility';
import ApplicationListItemSkeleton from './ApplicationListItemSkeleton';
import { useApplications } from '@/hooks/useApplications';
import { Input } from '@/components/ui/input';
import ErrorDisplay from '@/components/ui/error-display';
import PageDescription from '@/components/ui/page-description';
import PageTitle from '@/components/ui/page-title';
import { Separator } from '@/components/ui/separator';

type Props = {
	journeyId?: string;
};

const ApplicationsListPage: React.FC<Props> = ({ journeyId }) => {
	const filterForm = useForm<FilterFormValues>({
		resolver: zodResolver(filterSchema),
		defaultValues: {
			searchQuery: '',
			status: [],
			contractType: [],
			workMode: [],
		},
	});

	const searchQuery = filterForm.watch('searchQuery');
	const status = filterForm.watch('status') || [];
	const contractType = filterForm.watch('contractType') || [];
	const workMode = filterForm.watch('workMode') || [];

	const {
		applications,
		isErrorApplications,
		isLoadingApplications,
		errorApplications,
		refetchApplications,
		deleteApplication,
	} = useApplications({
		filters: {
			query: searchQuery,
			statusFilter: status.length > 0 ? status : undefined,
			workModeFilter: workMode.length > 0 ? workMode : undefined,
			contractTypeFilter: contractType.length > 0 ? contractType : undefined,
			journeyId: journeyId,
		},
	});

	const debouncedRefetch = debounce(() => {
		refetchApplications();
	}, 500);

	// Watch for filter changes and trigger refetch
	React.useEffect(() => {
		debouncedRefetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchQuery, status, contractType, workMode]);

	const clearAllFilters = () => {
		filterForm.reset({
			searchQuery: '',
			status: [],
			contractType: [],
			workMode: [],
		});
	};

	const handleFilterChange = () => {
		debouncedRefetch();
	};

	const handleClearFilter = (type: 'status' | 'contractType' | 'workMode', value: string) => {
		if (type === 'status') {
			const currentValue = filterForm.getValues('status') || [];
			filterForm.setValue('status', currentValue.filter((v) => v !== value));
		} else if (type === 'contractType') {
			const currentValue = filterForm.getValues('contractType') || [];
			filterForm.setValue('contractType', currentValue.filter((v) => v !== value));
		} else if (type === 'workMode') {
			const currentValue = filterForm.getValues('workMode') || [];
			filterForm.setValue('workMode', currentValue.filter((v) => v !== value));
		}
		debouncedRefetch();
	};

	return (
		<div className="md:container py-8">
			<Breadcrumb className="mb-2">
				<BreadcrumbList>
					<BreadcrumbLink href={appRoutes.home}>Home</BreadcrumbLink>
					<BreadcrumbSeparator />
					{!isLoadingApplications && applications?.journey?.id && (
						<>
							<BreadcrumbLink href={appRoutes.viewJourney(applications?.journey.id)}>
								{applications?.journey?.title}
							</BreadcrumbLink>
							<BreadcrumbSeparator />
						</>
					)}
					<BreadcrumbItem>
						<BreadcrumbPage>Applications</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<div className="flex flex-col md:flex-row gap-4 justify-between md:items-center mb-6">
				<div>
					<PageTitle title={applications?.journey ? applications.journey.title : 'Applied jobs'} />
					<PageDescription
						description={
							applications?.journey?.description
								? applications.journey.description
								: 'This is a collection of all the jobs you have applied for.'
						}
					/>
				</div>
				<Link href={appRoutes.addApplication} className="w-fit p-0 m-0">
					<Button variant="primaryViolet" className="w-full">
						Add new
					</Button>
				</Link>
			</div>

			<div className="flex flex-col items-center gap-3 w-full top-8">
				<p className="text-xs text-center flex items-center gap-1 text-muted-foreground">
					<Info className="w-4 h-4" />
					<span>Total: {applications?.data?.length}</span>
				</p>

				{/* Search Bar */}
				<div className="flex justify-between items-center gap-2 w-full bg-background py-2 px-4 rounded-md shadow-lg">
					<form className="relative flex items-center w-full" onReset={clearAllFilters}>
						<Search className="w-4 h-4 absolute left-3 text-muted-foreground" />
						<Input
							type="text"
							placeholder="Search by company name or job title"
							className="pl-10"
							{...filterForm.register('searchQuery')}
						/>
					</form>
				</div>

				{/* Filters */}
				<ApplicationFilters
					filterForm={filterForm}
					onFilterChange={handleFilterChange}
					onClearFilter={handleClearFilter}
					onClearAll={clearAllFilters}
				/>
			</div>

			{!isLoadingApplications && !isErrorApplications && applications && applications?.data?.length < 1 && (
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
					{applications?.data?.map((application) => (
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
