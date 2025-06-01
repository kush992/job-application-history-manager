import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { JobApplicationData } from '@/types/apiResponseTypes';
import { BriefcaseIcon, CheckCircleIcon, ClockIcon, XCircleIcon } from 'lucide-react';

interface JobApplicationStatsProps {
	data: JobApplicationData[];
}

export function JobApplicationStats({ data }: JobApplicationStatsProps) {
	// Count total applications
	const totalApplications = data.length;

	// Count applications by status
	const statusCounts = data.reduce(
		(acc, app) => {
			const status = app.applicationStatus || 'Not Specified';
			acc[status] = (acc[status] || 0) + 1;
			return acc;
		},
		{} as Record<string, number>,
	);

	// Get interview count
	const interviewCount = data.filter((app) => app.interviewDate !== null).length;

	// Get rejection count
	const rejectionCount = statusCounts['Rejected'] || 0;

	return (
		<>
			<Card className="bg-card">
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Total Applications</CardTitle>
					<BriefcaseIcon className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">{totalApplications}</div>
					<p className="text-xs text-muted-foreground">Job applications submitted</p>
				</CardContent>
			</Card>

			<Card className="bg-card">
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Interviews</CardTitle>
					<ClockIcon className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">{interviewCount}</div>
					<p className="text-xs text-muted-foreground">
						{((interviewCount / totalApplications) * 100).toFixed(1)}% interview rate
					</p>
				</CardContent>
			</Card>

			<Card className="bg-card">
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Rejections</CardTitle>
					<XCircleIcon className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">{rejectionCount}</div>
					<p className="text-xs text-muted-foreground">
						{((rejectionCount / totalApplications) * 100).toFixed(1)}% rejection rate
					</p>
				</CardContent>
			</Card>

			<Card className="bg-card">
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Success Rate</CardTitle>
					<CheckCircleIcon className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">
						{statusCounts['Offer'] ? ((statusCounts['Offer'] / totalApplications) * 100).toFixed(1) : '0.0'}
						%
					</div>
					<p className="text-xs text-muted-foreground">{statusCounts['Offer'] || 0} offers received</p>
				</CardContent>
			</Card>
		</>
	);
}
