import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Statistics } from '@/types/schema';

type Props = {
	statistics: Statistics;
	replyRate: string;
};

const SummaryInsights = ({ statistics, replyRate }: Props) => {
	return (
		<Card>
			<CardHeader className="px-3 sm:px-6">
				<CardTitle className="text-base sm:text-lg">Key Insights</CardTitle>
			</CardHeader>
			<CardContent className="space-y-3 px-3 sm:px-6">
				<p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
					• Out of {statistics.applications_count} applications, you received{' '}
					{statistics.applications_count - statistics.no_reply_count} replies ({replyRate}% response rate)
				</p>
				<p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
					• {statistics.no_reply_count} applications (
					{((statistics.no_reply_count / statistics.applications_count) * 100).toFixed(1)}%) received no
					response
				</p>
				<p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
					• Remote work positions made up {statistics.remote_count} applications (
					{(
						(statistics.remote_count /
							(statistics.remote_count + statistics.hybrid_count + statistics.onsite_count)) *
						100
					).toFixed(1)}
					% of location-specified roles)
				</p>
				<p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
					• Salary range spans from ${Number.parseInt(statistics.min_salary).toLocaleString()} to $
					{Number.parseInt(statistics.max_salary).toLocaleString()}, with an average of $
					{Math.round(Number.parseFloat(statistics.avg_salary)).toLocaleString()}
				</p>
			</CardContent>
		</Card>
	);
};

export default SummaryInsights;
