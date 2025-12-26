'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import debounce from 'lodash.debounce';
import { Info } from 'lucide-react';
import Link from 'next/link';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ErrorDisplay from '@/components/ui/error-display';
// Search input is now rendered inside ApplicationFilters
import PageDescription from '@/components/ui/page-description';
import PageTitle from '@/components/ui/page-title';
import { Separator } from '@/components/ui/separator';
import { useApplications } from '@/hooks/useApplications';
import { appRoutes } from '@/utils/constants';

import ApplicationFilters from './ApplicationFilters';
import ApplicationListItem from './ApplicationListItem';
import ApplicationListItemSkeleton from './ApplicationListItemSkeleton';
import { FilterFormValues, filterSchema } from './utility';

type Props = {
	journeyId?: string;
};

const ApplicationsView: React.FC<Props> = ({ journeyId }) => {
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

	const debouncedRefetch = useMemo(() => debounce(refetchApplications, 300), [refetchApplications])

	const clearAllFilters = () => {
		filterForm.reset({
			searchQuery: '',
			status: [],
			contractType: [],
			workMode: [],
		});
	};

	const handleClearFilter = (type: 'status' | 'contractType' | 'workMode', value: string) => {
		if (type === 'status') {
			const currentValue = filterForm.getValues('status') || [];
			filterForm.setValue(
				'status',
				currentValue.filter((v) => v !== value),
			);
		} else if (type === 'contractType') {
			const currentValue = filterForm.getValues('contractType') || [];
			filterForm.setValue(
				'contractType',
				currentValue.filter((v) => v !== value),
			);
		} else if (type === 'workMode') {
			const currentValue = filterForm.getValues('workMode') || [];
			filterForm.setValue(
				'workMode',
				currentValue.filter((v) => v !== value),
			);
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

			<div className="flex flex-col items-center gap-3 w-full top-8 mb-3">
				<p className="text-xs text-center flex items-center gap-1 text-muted-foreground">
					<Info className="w-4 h-4" />
					<span>Total: {applications?.data?.length}</span>
				</p>
			</div>

			<div className="w-full">
				{/* Mobile filters (drawer + search handled inside ApplicationFilters) */}
				<div className="flex flex-col gap-4 mb-4">
					<div className="w-full md:hidden">
						<ApplicationFilters
							filterForm={filterForm}
							onFilterChange={debouncedRefetch}
							onClearFilter={handleClearFilter}
							onClearAll={clearAllFilters}
						/>
					</div>
				</div>

				{/* Desktop: two-column layout (left filters, right list) */}
				<div className="w-full flex flex-col md:flex-row gap-6">
					<aside className="hidden md:block md:w-72 lg:w-80 sticky top-20 self-start">
						<ApplicationFilters
							filterForm={filterForm}
							onFilterChange={debouncedRefetch}
							onClearFilter={handleClearFilter}
							onClearAll={clearAllFilters}
						/>
					</aside>

					<div className="flex-1 h-full">
						{isErrorApplications && <ErrorDisplay error={errorApplications} />}

						{!isLoadingApplications &&
							!isErrorApplications &&
							applications &&
							applications?.data?.length < 1 && (
								<Card>
									<CardContent className='flex justify-center items-center min-h-screen'>
									<p className="text-lg text-muted-foreground">No applications found</p>
									</CardContent>
								</Card>
							)}

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
					</div>
				</div>
			</div>
		</div>
	);
};

export default ApplicationsView;
