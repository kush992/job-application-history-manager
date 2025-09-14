import { Statistics } from '@/types/schema';
import React from 'react';
import { ResponsiveContainer, Pie, Cell, PieChart } from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';

type Props = {
	statistics: Statistics;
};

const WorkArrangementDataChart = ({ statistics }: Props) => {
	const workArrangementData = [
		{ name: 'Remote', value: statistics.remote_count, fill: '#8b5cf6' }, // Purple
		{ name: 'Hybrid', value: statistics.hybrid_count, fill: '#06b6d4' }, // Cyan
		{ name: 'On-site', value: statistics.onsite_count, fill: '#f97316' }, // Orange
	];
	return (
		<Card>
			<CardHeader className="px-3 sm:px-6">
				<CardTitle className="text-base sm:text-lg">Work Arrangement Preferences</CardTitle>
				<CardDescription className="text-xs sm:text-sm">Distribution of work location types</CardDescription>
			</CardHeader>
			<CardContent className="px-3 sm:px-6">
				<ChartContainer
					config={{
						remote: { label: 'Remote', color: '#8b5cf6' },
						hybrid: { label: 'Hybrid', color: '#06b6d4' },
						onsite: { label: 'On-site', color: '#f97316' },
					}}
					className="h-[250px] sm:h-[300px] w-full"
				>
					<ResponsiveContainer width="100%" height="100%">
						<PieChart>
							<Pie
								data={workArrangementData}
								cx="50%"
								cy="50%"
								innerRadius={60}
								outerRadius={90}
								dataKey="value"
								label={({ name, value, percent }) =>
									`${name}: ${value} (${(percent * 100).toFixed(1)}%)`
								}
								labelLine={false}
							>
								{workArrangementData.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={entry.fill} />
								))}
							</Pie>
							<ChartTooltip content={<ChartTooltipContent />} />
						</PieChart>
					</ResponsiveContainer>
				</ChartContainer>
			</CardContent>
		</Card>
	);
};

export default WorkArrangementDataChart;
