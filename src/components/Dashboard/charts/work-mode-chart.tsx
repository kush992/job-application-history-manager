'use client';

import { useMemo } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { JobApplicationData } from '@/types/apiResponseTypes';
import { useDistributionData } from '../utils/data-utils';

interface WorkModeChartProps {
	data: JobApplicationData[];
}

export function WorkModeChart({ data }: WorkModeChartProps) {
	const chartData = useDistributionData(data, 'workMode');

	// Define work mode colors
	const modeColors = useMemo(
		() => ({
			Remote: 'hsl(var(--chart-1))',
			Hybrid: 'hsl(var(--chart-2))',
			'On-site': 'hsl(var(--chart-3))',
			'Not Specified': 'hsl(var(--chart-4))',
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
					modeColors[item.name as keyof typeof modeColors] ||
					`hsl(var(--chart-${(Object.keys(config).length % 4) + 1}))`,
			};
		});
		return config;
	}, [chartData, modeColors]);

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
							<Cell
								key={`cell-${index}`}
								fill={
									modeColors[entry.name as keyof typeof modeColors] ||
									`hsl(var(--chart-${(index % 4) + 1}))`
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
						wrapperStyle={{ paddingLeft: '20px' }}
					/>
				</PieChart>
			</ResponsiveContainer>
		</ChartContainer>
	);
}
