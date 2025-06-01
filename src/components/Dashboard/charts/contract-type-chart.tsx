'use client';

import { useMemo } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { JobApplicationData } from '@/types/apiResponseTypes';
import { useDistributionData } from '../utils/data-utils';

interface ContractTypeChartProps {
	data: JobApplicationData[];
}

export function ContractTypeChart({ data }: ContractTypeChartProps) {
	const chartData = useDistributionData(data, 'contractType');

	// Define contract type colors
	const typeColors = useMemo(
		() => ({
			'Full-time': 'hsl(var(--chart-1))',
			'Part-time': 'hsl(var(--chart-2))',
			Contract: 'hsl(var(--chart-3))',
			Internship: 'hsl(var(--chart-4))',
			'Not Specified': 'hsl(var(--chart-5))',
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
					typeColors[item.name as keyof typeof typeColors] ||
					`hsl(var(--chart-${(Object.keys(config).length % 5) + 1}))`,
			};
		});
		return config;
	}, [chartData, typeColors]);

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
									typeColors[entry.name as keyof typeof typeColors] ||
									`hsl(var(--chart-${(index % 5) + 1}))`
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
