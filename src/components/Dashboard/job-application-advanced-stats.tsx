'use client';

import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	CalendarIcon,
	ClockIcon,
	CompassIcon,
	DollarSignIcon,
	GlobeIcon,
	LineChartIcon,
	ListChecksIcon,
	MapPinIcon,
	TrendingUpIcon,
} from 'lucide-react';
import { ContractType, JobApplicationData, JobSites, WorkMode } from '@/types/apiResponseTypes';
import { ApplicationStatus } from '../ApplicationForm/utility';
import { Badge } from '../ui/badge';

interface JobApplicationAdvancedStatsProps {
	data: JobApplicationData[];
}

export function JobApplicationAdvancedStats({ data }: JobApplicationAdvancedStatsProps) {
	// Application timeline metrics
	const timelineMetrics = useMemo(() => {
		// Sort applications by date
		const sortedApps = [...data].sort(
			(a, b) => new Date(a.$createdAt).getTime() - new Date(b.$createdAt).getTime(),
		);

		// Calculate days between first and last application
		const firstDate = new Date(sortedApps[0]?.$createdAt || new Date());
		const lastDate = new Date(sortedApps[sortedApps.length - 1]?.$createdAt || new Date());
		const totalDays = Math.max(1, Math.ceil((lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24)));

		// Calculate applications per week
		const appsPerWeek = (data.length / totalDays) * 7;

		// Find most active day of week
		const dayCount = data.reduce(
			(acc, app) => {
				const day = new Date(app.$createdAt).toLocaleDateString('en-US', { weekday: 'long' });
				acc[day] = (acc[day] || 0) + 1;
				return acc;
			},
			{} as Record<string, number>,
		);

		const mostActiveDay = Object.entries(dayCount).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

		return {
			appsPerWeek: appsPerWeek.toFixed(1),
			totalDays,
			mostActiveDay,
		};
	}, [data]);

	// Response and conversion rates
	const conversionMetrics = useMemo(() => {
		const interviews = data.filter(
			(app) =>
				app.applicationStatus === ApplicationStatus.APPLIED ||
				app.applicationStatus === ApplicationStatus.IN_PROGRESS ||
				app.applicationStatus === ApplicationStatus.NO_REPLY ||
				app.applicationStatus === ApplicationStatus.REJECTED_NO_FEEDBACK ||
				app.applicationStatus === ApplicationStatus.REJECTED_WITH_FEEDBACK ||
				app.applicationStatus === ApplicationStatus.SUCCESS,
		).length;

		const offers = data.filter((app) => app.applicationStatus === ApplicationStatus.SUCCESS).length;

		const interviewRate = (interviews / data.length) * 100;
		const offerRate = (offers / interviews) * 100 || 0;

		return {
			interviewRate: interviewRate.toFixed(1),
			offerRate: offerRate.toFixed(1),
		};
	}, [data]);

	// Salary metrics
	const salaryMetrics = useMemo(() => {
		const salaries = data
			.filter((app) => app.salary && !isNaN(Number(app.salary)))
			.map((app) => Number(app.salary));

		if (salaries.length === 0) return { avg: 'N/A', min: 'N/A', max: 'N/A' };

		const avg = salaries.reduce((sum, val) => sum + val, 0) / salaries.length;
		const min = Math.min(...salaries);
		const max = Math.max(...salaries);

		const formatSalary = (val: number) => {
			return new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'USD',
				maximumFractionDigits: 0,
			}).format(val);
		};

		return {
			avg: formatSalary(avg),
			min: formatSalary(min),
			max: formatSalary(max),
		};
	}, [data]);

	// Location metrics
	const locationMetrics = useMemo(() => {
		const locations = data.reduce(
			(acc, app) => {
				const location = app.location || 'Warsaw, Poland';
				acc[location] = (acc[location] || 0) + 1;
				return acc;
			},
			{} as Record<string, number>,
		);

		const topLocation = Object.entries(locations).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

		const remoteCount = data.filter((app) => app.workMode === WorkMode.REMOTE).length;
		const remotePercentage = (remoteCount / data.length) * 100;

		return {
			topLocation,
			remotePercentage: remotePercentage.toFixed(1),
		};
	}, [data]);

	// Source effectiveness
	const sourceMetrics = useMemo(() => {
		// Group by source
		const sourceGroups = data.reduce(
			(acc, app) => {
				const source = app.jobPostedOn || JobSites.LINKEDIN;
				if (!acc[source]) {
					acc[source] = { total: 0, interviews: 0, offers: 0 };
				}

				acc[source].total++;

				if (app.interviewDate) {
					acc[source].interviews++;
				}

				if (app.applicationStatus === 'Offer') {
					acc[source].offers++;
				}

				return acc;
			},
			{} as Record<string, { total: number; interviews: number; offers: number }>,
		);

		// Find most effective source (highest interview rate)
		let bestSource = { name: 'N/A', rate: 0 };

		Object.entries(sourceGroups).forEach(([source, stats]) => {
			if (stats.total >= 2) {
				// Minimum threshold to avoid outliers
				const interviewRate = (stats.interviews / stats.total) * 100;
				if (interviewRate > bestSource.rate) {
					bestSource = { name: source, rate: interviewRate };
				}
			}
		});

		return {
			bestSource: bestSource.name,
			interviewRate: bestSource.rate.toFixed(1),
		};
	}, [data]);

	// Contract type distribution
	const contractMetrics = useMemo(() => {
		const contractTypes = data.reduce(
			(acc, app) => {
				const type = app.contractType || 'Not Specified';
				acc[type] = (acc[type] || 0) + 1;
				return acc;
			},
			{} as Record<string, number>,
		);

		const fullTimeCount = contractTypes[ContractType.FULL_TIME] || 0;
		const fullTimePercentage = (fullTimeCount / data.length) * 100;

		return {
			fullTimePercentage: fullTimePercentage.toFixed(1),
			fullTimeCount,
		};
	}, [data]);

	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
			<Card className="bg-card">
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Application Velocity</CardTitle>
					<TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">{timelineMetrics.appsPerWeek}</div>
					<p className="text-xs text-muted-foreground">Applications per week</p>
				</CardContent>
			</Card>

			<Card className="bg-card">
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Most Active Day</CardTitle>
					<CalendarIcon className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">{timelineMetrics.mostActiveDay}</div>
					<p className="text-xs text-muted-foreground">Day with most applications</p>
				</CardContent>
			</Card>

			<Card className="bg-card">
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Interview to Offer</CardTitle>
					<LineChartIcon className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">{conversionMetrics.offerRate}%</div>
					<p className="text-xs text-muted-foreground">Conversion rate from interview to offer</p>
				</CardContent>
			</Card>

			<Card className="bg-card">
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">
						<Badge variant="rose">Average Salary</Badge>
					</CardTitle>
					<DollarSignIcon className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">{salaryMetrics.avg}</div>
					<p className="text-xs text-muted-foreground">
						Range: {salaryMetrics.min} - {salaryMetrics.max}
					</p>
				</CardContent>
			</Card>

			<Card className="bg-card">
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">
						<Badge variant="sky">Top Location</Badge>
					</CardTitle>
					<MapPinIcon className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold truncate" title={locationMetrics.topLocation}>
						{locationMetrics.topLocation}
					</div>
					<p className="text-xs text-muted-foreground">Most common application location</p>
				</CardContent>
			</Card>

			<Card className="bg-card">
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">
						<Badge variant="emerald">Remote Opportunities</Badge>
					</CardTitle>
					<GlobeIcon className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">{locationMetrics.remotePercentage}%</div>
					<p className="text-xs text-muted-foreground">Applications for remote positions</p>
				</CardContent>
			</Card>

			<Card className="bg-card">
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">
						<Badge variant="indigo">Best Job Source</Badge>
					</CardTitle>
					<CompassIcon className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">{sourceMetrics.bestSource}</div>
					<p className="text-xs text-muted-foreground">{sourceMetrics.interviewRate}% interview rate</p>
				</CardContent>
			</Card>

			<Card className="bg-card">
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">
						<Badge variant="fuchsia">Full-Time Positions</Badge>
					</CardTitle>
					<ListChecksIcon className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">{contractMetrics.fullTimePercentage}%</div>
					<p className="text-xs text-muted-foreground">
						{contractMetrics.fullTimeCount} full-time applications
					</p>
				</CardContent>
			</Card>

			<Card className="bg-card">
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">
						<Badge variant="lime">Job Search Duration</Badge>
					</CardTitle>
					<ClockIcon className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">{timelineMetrics.totalDays} days</div>
					<p className="text-xs text-muted-foreground">From first to most recent application</p>
				</CardContent>
			</Card>
		</div>
	);
}
