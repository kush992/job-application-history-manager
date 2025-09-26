// import type { Statistics } from '@/types/schema';
// import { ResponsiveContainer, Pie, Cell, PieChart, Legend } from 'recharts';
// import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
// import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';

// type Props = {
// 	statistics: Statistics;
// };

// const WorkArrangementDataChart = ({ statistics }: Props) => {
// 	const workArrangementData = [
// 		{ name: 'Remote', value: statistics.remote_count, fill: '#8b5cf6' }, // Purple
// 		{ name: 'Hybrid', value: statistics.hybrid_count, fill: '#06b6d4' }, // Cyan
// 		{ name: 'On-site', value: statistics.onsite_count, fill: '#f97316' }, // Orange
// 	];
// 	return (
// 		<Card className="h-[400px]">
// 			<CardHeader className="px-3 sm:px-6 pb-2">
// 				<CardTitle className="text-base sm:text-lg">Work Arrangement Preferences</CardTitle>
// 				<CardDescription className="text-xs sm:text-sm">Distribution of work location types</CardDescription>
// 			</CardHeader>
// 			<CardContent className="px-3 sm:px-6 h-[300px]">
// 				<ChartContainer
// 					config={{
// 						remote: { label: 'Remote', color: '#8b5cf6' },
// 						hybrid: { label: 'Hybrid', color: '#06b6d4' },
// 						onsite: { label: 'On-site', color: '#f97316' },
// 					}}
// 					className="h-full w-full"
// 				>
// 					<ResponsiveContainer width="100%" height="100%">
// 						<PieChart>
// 							<Pie
// 								data={workArrangementData}
// 								cx="50%"
// 								cy="40%"
// 								innerRadius={50}
// 								outerRadius={80}
// 								dataKey="value"
// 							>
// 								{workArrangementData.map((entry, index) => (
// 									<Cell key={`cell-${index}`} fill={entry.fill} />
// 								))}
// 							</Pie>
// 							<Legend
// 								verticalAlign="bottom"
// 								height={60}
// 								formatter={(value, entry) => `${value}: ${entry?.payload?.value ?? ''}`}
// 								wrapperStyle={{ fontSize: '12px', paddingTop: '15px' }}
// 							/>
// 							<ChartTooltip content={<ChartTooltipContent />} />
// 						</PieChart>
// 					</ResponsiveContainer>
// 				</ChartContainer>
// 			</CardContent>
// 		</Card>
// 	);
// };

// export default WorkArrangementDataChart;

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Statistics } from '@/types/schema';

type Props = {
	statistics: Statistics;
};

export default function WorkModeChart({ statistics }: Props) {
	const chartData = [
		{
			mode: 'Remote',
			count: statistics.remote_count,
			percentage:
				(statistics.remote_count /
					(statistics.remote_count + statistics.hybrid_count + statistics.onsite_count)) *
				100,
		},
		{
			mode: 'Hybrid',
			count: statistics.hybrid_count,
			percentage:
				(statistics.hybrid_count /
					(statistics.remote_count + statistics.hybrid_count + statistics.onsite_count)) *
				100,
		},
		{
			mode: 'Onsite',
			count: statistics.onsite_count,
			percentage:
				(statistics.onsite_count /
					(statistics.remote_count + statistics.hybrid_count + statistics.onsite_count)) *
				100,
		},
	];

	return (
		<Card className="h-full">
			<CardHeader>
				<CardTitle>Work Mode Distribution</CardTitle>
			</CardHeader>
			<CardContent className="h-[320px]">
				<ResponsiveContainer width="100%" height="100%">
					<BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="mode" />
						<YAxis />
						<Tooltip
							formatter={(value, name) => [
								`${value} (${chartData.find((d) => d.count === value)?.percentage.toFixed(1)}%)`,
								'Applications',
							]}
						/>
						<Legend />
						<Bar dataKey="count" fill="#10b981" name="Applications" />
					</BarChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	);
}
