'use client';

import { useMemo } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { useTimelineData } from '../utils/data-utils';
import { JobApplicationData } from '@/types/apiResponseTypes';

interface ApplicationTimelineChartProps {
	data: JobApplicationData[];
}

export function ApplicationTimelineChart({ data }: ApplicationTimelineChartProps) {
	const chartData = useTimelineData(data);

	const chartConfig = useMemo(
		() => ({
			daily: {
				label: 'Daily Applications',
				color: 'hsl(var(--chart-1))',
			},
			cumulative: {
				label: 'Total Applications',
				color: 'hsl(var(--chart-2))',
			},
		}),
		[],
	);

	// For large datasets, we might need to limit the number of points shown
	const displayData = useMemo(() => {
		if (chartData.length <= 30) return chartData;

		// For more than 30 data points, sample to reduce visual clutter
		const step = Math.ceil(chartData.length / 30);
		return chartData.filter((_, index) => index % step === 0 || index === chartData.length - 1);
	}, [chartData]);

	return (
		<ChartContainer config={chartConfig} className="h-full">
			<ResponsiveContainer width="100%" height="100%">
				<AreaChart data={displayData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
					<CartesianGrid strokeDasharray="3 3" vertical={false} />
					<XAxis dataKey="date" tickMargin={10} tick={{ fontSize: 12 }} interval="preserveStartEnd" />
					<YAxis width={40} tick={{ fontSize: 12 }} />
					<Tooltip content={<ChartTooltipContent />} />
					<Legend wrapperStyle={{ paddingTop: '10px' }} />
					<Area
						type="monotone"
						dataKey="daily"
						name="Daily Applications"
						stackId="1"
						stroke="var(--color-daily)"
						fill="var(--color-daily)"
						fillOpacity={0.6}
					/>
					<Area
						type="monotone"
						dataKey="cumulative"
						name="Total Applications"
						stackId="2"
						stroke="var(--color-cumulative)"
						fill="var(--color-cumulative)"
						fillOpacity={0.6}
					/>
				</AreaChart>
			</ResponsiveContainer>
		</ChartContainer>
	);
}
