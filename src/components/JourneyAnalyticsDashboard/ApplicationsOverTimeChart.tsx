import React from 'react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { ChartContainer, ChartTooltipContent } from '../ui/chart';

type ChartDatum = {
	label: string;
	applications: number;
	_year?: number;
	_month?: number;
};

type Props = {
	data: ChartDatum[];
};

const ApplicationsOverTimeChart: React.FC<Props> = ({ data }) => {

	return (
		<Card>
			<CardHeader className="px-3 sm:px-6">
				<CardTitle className="text-base sm:text-lg">Applications Over Time</CardTitle>
				<CardDescription className="text-xs sm:text-sm">Monthly application counts for this journey</CardDescription>
			</CardHeader>
			<CardContent className="px-3 sm:px-6">
				<ChartContainer className="h-[260px] sm:h-[320px] w-full" config={{ applications: { label: 'Applications', color: '#3b82f6' } }}>
					<ResponsiveContainer width="100%" height="100%">
						<LineChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
							<CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
							<XAxis dataKey="label" className="text-[10px] sm:text-xs" tick={{ fontSize: 11 }} />
							<YAxis className="text-[10px] sm:text-xs" tick={{ fontSize: 11 }} />
							<Tooltip content={<ChartTooltipContent />} />
							<Line type="monotone" dataKey="applications" stroke="#3b82f6" strokeWidth={2} dot={{ r: 2 }} activeDot={{ r: 4 }} />
						</LineChart>
					</ResponsiveContainer>
				</ChartContainer>
			</CardContent>
		</Card>
	);
};

export default ApplicationsOverTimeChart;
