'use client';

import { useMemo } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { JobApplicationData } from '@/types/apiResponseTypes';
import { useStatusCounts } from '../utils/data-utils';

interface ApplicationStatusChartProps {
	data: JobApplicationData[];
}

export function ApplicationStatusChart({ data }: ApplicationStatusChartProps) {
	const chartData = useStatusCounts(data);

	// Define status colors
	const statusColors = useMemo(
		() => ({
			Applied: 'hsl(var(--chart-1))',
			Screening: 'hsl(var(--chart-2))',
			Interview: 'hsl(var(--chart-3))',
			Technical: 'hsl(var(--chart-4))',
			'Final Round': 'hsl(var(--chart-5))',
			Offer: 'hsl(var(--chart-6))',
			Rejected: 'hsl(var(--chart-7))',
			'Not Specified': 'hsl(var(--chart-8))',
		}),
		[],
	);

	// Create chart config for shadcn/ui ChartContainer
	const chartConfig = useMemo(() => {
		const config: Record<string, { label: string; color: string }> = {};
		chartData.forEach((item) => {
			config[item.name] = {
				label: item.name,
				color:
					statusColors[item.name as keyof typeof statusColors] ||
					`hsl(var(--chart-${(Object.keys(config).length % 8) + 1}))`,
			};
		});
		return config;
	}, [chartData, statusColors]);

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
				<PieChart className='h-full w-full'>
					<Pie
						data={chartData}
						cx="50%"
						cy="50%"
						labelLine={false}
						outerRadius={120}
						fill="#8884d8"
						dataKey="value"
						nameKey="name"
						label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(2)}%`}
					>
						{chartData.map((entry, index) => (
							<Cell
								key={`cell-${index}`}
								fill={
									statusColors[entry.name as keyof typeof statusColors] ||
									`hsl(var(--chart-${(index % 8) + 1}))`
								}
							/>
						))}
					</Pie>
					<Tooltip content={<ChartTooltipContent />} />
					<Legend
						formatter={renderLegendText}
						layout="vertical"
						verticalAlign="middle"
						align="right"
						className="max-w-[200px]"
						wrapperStyle={{ paddingLeft: '20px', bottom: 0, left: 0 }}
					/>
				</PieChart>
			</ResponsiveContainer>
		</ChartContainer>
	);
}
