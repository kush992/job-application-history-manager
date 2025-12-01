import React from 'react';

import { Statistics } from '@/types/schema';

import { Card, CardContent,CardHeader, CardTitle } from '../ui/card';

type Props = {
	statistics: Pick<Statistics, 'applications_count' | 'success_count' | 'avg_salary'>;
	replyRate: string;
	successRate: string;
};

const KeyMetrics = ({ statistics, successRate, replyRate }: Props) => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
			<Card>
				<CardHeader className="pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
					<CardTitle className="text-xs sm:text-sm font-medium">Total Applications</CardTitle>
				</CardHeader>
				<CardContent className="px-3 sm:px-6">
					<div className="text-lg sm:text-2xl font-bold">{statistics.applications_count}</div>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
					<CardTitle className="text-xs sm:text-sm font-medium">Reply Rate</CardTitle>
				</CardHeader>
				<CardContent className="px-3 sm:px-6">
					<div className="text-lg sm:text-2xl font-bold">{replyRate}%</div>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
					<CardTitle className="text-xs sm:text-sm font-medium">Success Rate</CardTitle>
				</CardHeader>
				<CardContent className="px-3 sm:px-6">
					<div className="text-lg sm:text-2xl font-bold">{successRate}%</div>
				</CardContent>
			</Card>
			{/* <Card>
				<CardHeader className="pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
					<CardTitle className="text-xs sm:text-sm font-medium">Average Salary</CardTitle>
				</CardHeader>
				<CardContent className="px-3 sm:px-6">
					<div className="text-lg sm:text-2xl font-bold">
						${Math.round(Number.parseFloat(statistics.avg_salary)).toLocaleString()}
					</div>
				</CardContent>
			</Card> */}
		</div>
	);
};

export default KeyMetrics;
