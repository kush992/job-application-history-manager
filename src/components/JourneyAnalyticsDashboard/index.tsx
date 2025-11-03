'use client';

import { useStatistics } from '@/hooks/useStatistics';
import ApplicationFunnelDataChart from './ApplicationFunnelDataChart';
import WorkModeChart from './WorkArrangementDataChart';
import SummaryInsights from './SummaryInsights';
import JourneyAnaluticsDashboardLoader from './Loading';
import ApplicationResponseBreakdownDataChart from './ApplicationResponseBreakdownDataChart';
import EmploymentTypeDataChart from './EmploymentTypeDataChart';
import KeyMetrics from './KeyMetrics';
import SalaryDistributionChart from './SalaryDistributionChart';
import SalaryCurrencyTypeChart from './SalaryCurrencyTypeChart';
import ErrorDisplay from '../ui/error-display';
import { Button } from '../ui/button';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { useGetJourneyInsights, usePostInsights } from '@/hooks/useJourneyInsights';
import { Card, CardContent, CardDescription } from '../ui/card';
import { appRoutes } from '@/utils/constants';

type Props = {
	journeyId: string;
};

export default function JobAnalyticsDashboard({ journeyId }: Props) {
	const { statistics, isFetching, isLoading, error } = useStatistics(journeyId);
	const { insights, error: insightsError, mutate } = usePostInsights();
	const { insights: journeyInsights, error: journeyInsightsError } = useGetJourneyInsights(statistics?.id);

	console.log('insights', insights);
	console.error('insightsError', insightsError);

	if (isLoading || isFetching) {
		return (
			<div className="min-h-screen bg-background p-3 sm:p-4 md:p-6 flex items-center justify-center">
				<JourneyAnaluticsDashboardLoader />
			</div>
		);
	}

	const errors = error || insightsError || journeyInsightsError;
	const insightsData = insights ? insights : journeyInsights;

	if (!statistics || typeof statistics !== 'object') {
		return (
			<div className="min-h-screen bg-background p-3 sm:p-4 md:p-6 flex items-center justify-center">
				<div className="text-center">
					<h2 className="text-xl font-semibold mb-2">No Data Available</h2>
					<p className="text-muted-foreground">No statistics found for this journey</p>
				</div>
			</div>
		);
	}

	const replyRate = (
		((statistics.applications_count - statistics.no_reply_count) / statistics.applications_count) *
		100
	).toFixed(1);
	const successRate = ((statistics.success_count / statistics.applications_count) * 100).toFixed(2);

	return (
		<div className="min-h-screen bg-background p-3 sm:p-4 md:p-6">
			<div className="max-w-5xl mx-auto space-y-4 sm:space-y-6">
				<div className="text-center space-y-2">
					<h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-balance">
						Job Application Analytics Dashboard
					</h1>
					<p className="text-muted-foreground text-sm sm:text-base md:text-lg">
						Comprehensive insights from your job search journey
					</p>
				</div>

				<div className="text-center flex flex-col md:flex-row md:justify-center md:items-center gap-4">
					<Link
						href={appRoutes.journeyApplications(journeyId)}
						target="_blank"
						rel="noopener noreferrer"
						className="m-0 p-0"
					>
						<Button className="w-full">See all {statistics.applications_count} applications</Button>
					</Link>
					<Button variant="outline" onClick={() => mutate(statistics)}>
						Regenerate AI Insights
					</Button>
				</div>

				{insightsData && (
					<Card>
						<CardContent className="!p-6">
							<ReactMarkdown>{insightsData.insights}</ReactMarkdown>
						</CardContent>
					</Card>
				)}

				{errors && <ErrorDisplay error={errors} />}

				{/* Key Metrics */}
				<KeyMetrics statistics={statistics} replyRate={replyRate} successRate={successRate} />

				{/* Summary Insights */}
				{/* <SummaryInsights statistics={statistics} replyRate={replyRate} successRate={successRate} /> */}

				{/* Charts Grid */}
				{/* Application Funnel */}
				<ApplicationFunnelDataChart statistics={statistics} />
				<div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
					{/* Work Arrangement */}
					<WorkModeChart statistics={statistics} />

					{/* Salary Distribution */}
					<SalaryDistributionChart statistics={statistics} />

					{/* Salary Currency */}
					<SalaryCurrencyTypeChart statistics={statistics} />

					{/* Employment Types */}
					<EmploymentTypeDataChart statistics={statistics} />
				</div>
				{/* Response Breakdown */}
				<ApplicationResponseBreakdownDataChart statistics={statistics} />
			</div>
		</div>
	);
}
