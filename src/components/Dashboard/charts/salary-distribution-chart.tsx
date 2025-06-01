'use client';

import { useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { useSalaryRangeData } from '../utils/data-utils';
import { JobApplicationData } from '@/types/apiResponseTypes';

interface SalaryDistributionChartProps {
	data: JobApplicationData[];
}

export function SalaryDistributionChart({ data }: SalaryDistributionChartProps) {
	const rangeData = useSalaryRangeData(data);

	const chartConfig = useMemo(
		() => ({
			count: {
				label: 'Job Count',
				color: 'hsl(var(--chart-1))',
			},
		}),
		[],
	);

	return (
		<ChartContainer config={chartConfig} className="h-full">
			<ResponsiveContainer width="100%" height="100%">
				<BarChart data={rangeData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
					<CartesianGrid strokeDasharray="3 3" vertical={false} />
					<XAxis dataKey="range" tick={{ fontSize: 12 }} tickMargin={8} />
					<YAxis width={40} tick={{ fontSize: 12 }} />
					<Tooltip content={<ChartTooltipContent />} />
					<Legend formatter={(value) => `${value} by Salary Range`} wrapperStyle={{ paddingTop: '10px' }} />
					<Bar
						dataKey="count"
						name="Job Count"
						fill="var(--color-count)"
						radius={[4, 4, 0, 0]}
						maxBarSize={60}
					/>
				</BarChart>
			</ResponsiveContainer>
		</ChartContainer>
	);
}
