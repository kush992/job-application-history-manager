'use client';

import { Cpu, Eye } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

import { useGetJourneyInsights, usePostInsights } from '@/hooks/useJourneyInsights';
import { useStatistics } from '@/hooks/useStatistics';
import { appRoutes } from '@/utils/constants';

import { Breadcrumb, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '../ui/breadcrumb';
import { Button } from '../ui/button';
import ErrorDisplay from '../ui/error-display';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import InsightsTabContent from './InsightsTabContent';
import JourneyAnaluticsDashboardLoader from './Loading';
import MetricsTabContent from './MetricsTabContent';
// Metrics and charts are rendered inside MetricsTabContent

type Props = {
	journeyId: string;
};

export default function JobAnalyticsDashboard({ journeyId }: Props) {
	const { statistics, isFetching, isLoading, error } = useStatistics(journeyId);

	// Tabs state: metrics or insights
	const [activeTab, setActiveTab] = useState<'metrics' | 'insights'>('metrics');

	// Fetch insights only when insights tab is active
	const {
		insights: journeyInsights,
		error: journeyInsightsError,
		isLoading: isJourneyInsightsLoading,
	} = useGetJourneyInsights(activeTab === 'insights' ? journeyId : undefined);

	const { insights: postedInsights, error: postInsightsError, mutate, isPending } = usePostInsights();

	if (isLoading || isFetching) {
		return (
			<div className="min-h-screen bg-background p-3 sm:p-4 md:p-6 flex items-center justify-center">
				<JourneyAnaluticsDashboardLoader />
			</div>
		);
	}

	const errors = error || postInsightsError || journeyInsightsError;
	const insightsData = postedInsights ? postedInsights : journeyInsights;

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
			<div className="md:container space-y-4 sm:space-y-6">
				<Breadcrumb className="mb-2">
					<BreadcrumbList>
						<BreadcrumbLink href={appRoutes.home}>Home</BreadcrumbLink>
						<BreadcrumbSeparator />
						<BreadcrumbLink href={appRoutes.journeys}>Journeys</BreadcrumbLink>
					</BreadcrumbList>
				</Breadcrumb>
				<div className="md:flex justify-between items-center mb-8">
					<div>
						<h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight">
							Job Application Analytics Dashboard
						</h1>
						<p className="mt-2 text-secondary-foreground">
							Comprehensive insights from your job search journey
						</p>
					</div>
					<div className="flex gap-2 py-4">
						<Link href={appRoutes.journeyApplications(journeyId)} className="m-0 p-0">
							<Button className="w-full flex gap-1 items-center">
								<Eye className="h-4 w-4" />
								{statistics.applications_count} applications
							</Button>
						</Link>
					</div>
				</div>
				{/* Tabs: Metrics & Insights */}
				<Tabs
					defaultValue={activeTab}
					value={activeTab}
					onValueChange={(v: string) => setActiveTab(v as 'metrics' | 'insights')}
				>
					<TabsList>
						<TabsTrigger value="metrics">Metrics</TabsTrigger>
						<TabsTrigger value="insights">
							<div className="flex items-center gap-2">
								<Cpu className="w-4 h-4 stroke-darkVioletAccent fill-lightVioletAccent dark:stroke-lightVioletAccent dark:fill-darkVioletAccent" />
								<span>AI Insights</span>
							</div>
						</TabsTrigger>
					</TabsList>

					<TabsContent value="metrics">
						<MetricsTabContent statistics={statistics} replyRate={replyRate} successRate={successRate} />
					</TabsContent>

					<TabsContent value="insights">
						<div className="space-y-4">
							<InsightsTabContent
								journeyId={journeyId}
								statistics={statistics}
								fetchedInsights={insightsData}
								postInsightsMutate={mutate}
								isLoading={isPending || isJourneyInsightsLoading}
							/>

							{errors && !insightsData && <ErrorDisplay error={errors} />}
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
