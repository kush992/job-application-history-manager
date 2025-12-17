import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

import type { JourneyInsight, Statistics } from '@/types/schema';

import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

type Props = {
	journeyId: string;
	statistics: Statistics;
	fetchedInsights?: JourneyInsight | null;
	isLoading: boolean;
	postInsightsMutate: (stats: Statistics, opts?: any) => void;
};

const InsightsTabContent: React.FC<Props> = ({ statistics, fetchedInsights, postInsightsMutate, isLoading }) => {
	const [localInsights, setLocalInsights] = useState<JourneyInsight | null | undefined>(undefined);

	const insightsToShow = localInsights ?? fetchedInsights;

	const handleRegenerate = () => {
		if (!statistics) return;
		postInsightsMutate(statistics, {
			onSuccess: (data: JourneyInsight) => {
				setLocalInsights(data);
			},
		});
	};

	return (
		<div className="space-y-4">
			<div className="flex justify-end">
				<Button variant="outline" onClick={handleRegenerate} disabled={isLoading}>
					{isLoading ? 'Generating...' : 'Regenerate AI Insights'}
				</Button>
			</div>

			{isLoading && <p className="text-muted-foreground">Insights loading...</p>}

			{!insightsToShow && !isLoading && (
				<p className="text-muted-foreground">
					No insights available yet. Click {"'Regenerate AI Insights'"} to generate.
				</p>
			)}

			{insightsToShow && (
				<Card>
					<CardContent className="!p-6">
						<ReactMarkdown>{insightsToShow.insights}</ReactMarkdown>
					</CardContent>
				</Card>
			)}
		</div>
	);
};

export default InsightsTabContent;
