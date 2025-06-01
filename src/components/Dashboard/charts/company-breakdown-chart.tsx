'use client';

import { useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { JobApplicationData } from '@/types/apiResponseTypes';
import { useCompanyData } from '../utils/data-utils';

interface CompanyBreakdownChartProps {
	data: JobApplicationData[];
}

export function CompanyBreakdownChart({ data }: CompanyBreakdownChartProps) {
	const chartData = useCompanyData(data);

	const chartConfig = useMemo(
		() => ({
			count: {
				label: 'Applications',
				color: 'hsl(var(--chart-1))',
			},
		}),
		[],
	);

	return (
		<ChartContainer config={chartConfig} className="h-full">
			<ResponsiveContainer width="100%" height="100%">
				<BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
					<CartesianGrid strokeDasharray="3 3" horizontal={false} />
					<XAxis type="number" tick={{ fontSize: 12 }} />
					<YAxis
						dataKey="company"
						type="category"
						width={150}
						tick={{ fontSize: 12 }}
						tickFormatter={(value) => (value.length > 15 ? `${value.substring(0, 15)}...` : value)}
					/>
					<Tooltip content={<ChartTooltipContent />} />
					<Legend formatter={() => 'Number of Applications'} wrapperStyle={{ paddingTop: '10px' }} />
					<Bar
						dataKey="count"
						name="Applications"
						fill="var(--color-count)"
						radius={[0, 4, 4, 0]}
						maxBarSize={30}
					/>
				</BarChart>
			</ResponsiveContainer>
		</ChartContainer>
	);
}
