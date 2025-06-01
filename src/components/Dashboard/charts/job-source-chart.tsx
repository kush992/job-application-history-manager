'use client';

import { useMemo } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { JobApplicationData } from '@/types/apiResponseTypes';
import { useDistributionData } from '../utils/data-utils';

interface JobSourceChartProps {
	data: JobApplicationData[];
}

export function JobSourceChart({ data }: JobSourceChartProps) {
	const chartData = useDistributionData(data, 'jobPostedOn');

	// Create chart config for shadcn/ui ChartContainer
	const chartConfig = useMemo(() => {
		const config: Record<string, { label: string; color: string }> = {};
		chartData.forEach((item, index) => {
			config[item.name] = {
				label: item.name,
				color: `hsl(var(--chart-${(index % 8) + 1}))`,
			};
		});
		return config;
	}, [chartData]);

	// Custom legend formatter to show count and percentage
	const renderLegendText = (value: string) => {
		const item = chartData.find((d) => d.name === value);
		if (!item) return value;

		const total = chartData.reduce((sum, item) => sum + item.value, 0);
		const percentage = ((item.value / total) * 100).toFixed(1);

		return `${value} (${item.value}, ${percentage}%)`;
	};

	return (
		<ChartContainer config={chartConfig} className="h-full">
			<ResponsiveContainer width="100%" height="100%">
				<PieChart>
					<Pie
						data={chartData}
						cx="50%"
						cy="50%"
						labelLine={false}
						outerRadius={120}
						fill="#8884d8"
						dataKey="value"
						nameKey="name"
						label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
					>
						{chartData.map((entry, index) => (
							<Cell key={`cell-${index}`} fill={`hsl(var(--chart-${(index % 8) + 1}))`} />
						))}
					</Pie>
					<Tooltip content={<ChartTooltipContent />} />
					<Legend
						formatter={renderLegendText}
						layout="vertical"
						verticalAlign="middle"
						align="right"
						wrapperStyle={{ paddingLeft: '20px' }}
					/>
				</PieChart>
			</ResponsiveContainer>
		</ChartContainer>
	);
}
