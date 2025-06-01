'use client';

import { useState, useMemo, useCallback, lazy, Suspense } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartSkeleton } from './chart-skeleton';
import { useMediaQuery } from '@/hooks/use-media-query';
import { JobApplicationStats } from './job-application-stats';
import { useQuery } from '@tanstack/react-query';
import { appRoutes, QueryKeys } from '@/utils/constants';
import { applicationDataQueries } from '@/lib/server/application-queries';
import {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbLink,
	BreadcrumbSeparator,
	BreadcrumbItem,
	BreadcrumbPage,
} from '../ui/breadcrumb';
import { DashboardSkeleton } from './dashboard-skeleton';
import { JobApplicationAdvancedStats } from './job-application-advanced-stats';

// Lazy load chart components for better performance
const ApplicationStatusChart = lazy(() =>
	import('./charts/application-status-chart').then((mod) => ({ default: mod.ApplicationStatusChart })),
);
const SalaryDistributionChart = lazy(() =>
	import('./charts/salary-distribution-chart').then((mod) => ({ default: mod.SalaryDistributionChart })),
);
const ApplicationTimelineChart = lazy(() =>
	import('./charts/application-timeline-chart').then((mod) => ({ default: mod.ApplicationTimelineChart })),
);
const CompanyBreakdownChart = lazy(() =>
	import('./charts/company-breakdown-chart').then((mod) => ({ default: mod.CompanyBreakdownChart })),
);
const JobSourceChart = lazy(() => import('./charts/job-source-chart').then((mod) => ({ default: mod.JobSourceChart })));
const WorkModeChart = lazy(() => import('./charts/work-mode-chart').then((mod) => ({ default: mod.WorkModeChart })));
const ContractTypeChart = lazy(() =>
	import('./charts/contract-type-chart').then((mod) => ({ default: mod.ContractTypeChart })),
);

// Chart options for tabs/dropdown
const chartOptions = [
	{ value: 'status', label: 'Status' },
	{ value: 'salary', label: 'Salary' },
	{ value: 'timeline', label: 'Timeline' },
	{ value: 'companies', label: 'Companies' },
	{ value: 'sources', label: 'Sources' },
	{ value: 'workmode', label: 'Work Mode' },
	{ value: 'contracttype', label: 'Contract Type' },
];

interface JobApplicationDashboardProps {
	userId: string;
}

export function JobApplicationDashboard({ userId }: JobApplicationDashboardProps) {
	// Use pagination for large datasets
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(1);
	const [activeTab, setActiveTab] = useState('status');

	const {
		data: initialData,
		error,
		isLoading,
		isFetching,
	} = useQuery({
		queryKey: [QueryKeys.APPLICATIONS_PAGE, userId],
		queryFn: () => applicationDataQueries.getAll(),
		enabled: !!userId,
		staleTime: 1000 * 60 * 5, // 5 minutes
	});

	// Check if we're on mobile
	const isMobile = useMediaQuery('(max-width: 768px)');

	// Memoize the sliced data to avoid recalculations
	const paginatedData = useMemo(() => {
		const startIndex = (page - 1) * pageSize;
		return initialData?.documents?.slice(startIndex, startIndex + pageSize);
	}, [initialData, page, pageSize]);

	// For very large datasets, virtual pagination could be implemented
	const totalPages = Math.ceil(initialData?.documents?.length / pageSize);

	// Handle tab change
	const handleTabChange = useCallback((value: string) => {
		setActiveTab(value);
	}, []);

	return (
		<div className="rounded-md flex flex-col gap-4">
			<Breadcrumb className="mb-2">
				<BreadcrumbList>
					<BreadcrumbLink href={appRoutes.home}>Home</BreadcrumbLink>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>Dashboard</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			{(isLoading || isFetching) && <DashboardSkeleton />}

			{!isLoading && !isFetching && !error && (
				<>
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
						<JobApplicationStats data={initialData?.documents ?? []} />
					</div>

					{/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"> */}
					<JobApplicationAdvancedStats data={initialData?.documents ?? []} />
					{/* </div> */}

					<div className="w-full overflow-x-auto pb-2 mb-2">
						<Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
							<TabsList className="inline-flex w-auto min-w-full border">
								{chartOptions.map((option) => (
									<TabsTrigger key={option.value} value={option.value} className="w-full">
										{option.label}
									</TabsTrigger>
								))}
							</TabsList>
						</Tabs>
					</div>

					{/* Chart content */}
					<Card className="w-full bg-card">
						<CardHeader>
							<CardTitle>
								{chartOptions.find((option) => option.value === activeTab)?.label} Chart
							</CardTitle>
							<CardDescription>
								{activeTab === 'status' && 'Breakdown of your job applications by current status'}
								{activeTab === 'salary' && 'Overview of salary ranges across your applications'}
								{activeTab === 'timeline' && 'Number of applications submitted over time'}
								{activeTab === 'companies' && "Top companies you've applied to"}
								{activeTab === 'sources' && 'Platforms where you found job listings'}
								{activeTab === 'workmode' && 'Remote vs. On-site vs. Hybrid opportunities'}
								{activeTab === 'contracttype' && 'Full-time vs. Part-time vs. Contract positions'}
							</CardDescription>
						</CardHeader>
						<CardContent className="min-h-fit">
							<Suspense fallback={<ChartSkeleton />}>
								{activeTab === 'status' && (
									<ApplicationStatusChart data={initialData?.documents ?? []} />
								)}
								{activeTab === 'salary' && (
									<SalaryDistributionChart data={initialData?.documents ?? []} />
								)}
								{activeTab === 'timeline' && (
									<ApplicationTimelineChart data={initialData?.documents ?? []} />
								)}
								{activeTab === 'companies' && (
									<CompanyBreakdownChart data={initialData?.documents ?? []} />
								)}
								{activeTab === 'sources' && <JobSourceChart data={initialData?.documents ?? []} />}
								{activeTab === 'workmode' && <WorkModeChart data={initialData?.documents ?? []} />}
								{activeTab === 'contracttype' && (
									<ContractTypeChart data={initialData?.documents ?? []} />
								)}
							</Suspense>
						</CardContent>
					</Card>
				</>
			)}
		</div>
	);
}
