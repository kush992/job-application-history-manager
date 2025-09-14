import { Cell, Pie, PieChart, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';
import type { Statistics } from '@/types/schema';

type Props = {
	statistics: Statistics;
};

const EmploymentTypeDataChart = ({ statistics }: Props) => {
	const employmentTypeData = [
		{ name: 'Full-time', value: statistics.full_time_count, fill: '#3b82f6' }, // Blue
		{ name: 'Part-time', value: statistics.part_time_count, fill: '#8b5cf6' }, // Purple
		{ name: 'Contract', value: statistics.contract_count, fill: '#10b981' }, // Green
		{ name: 'Freelance', value: statistics.freelance_count, fill: '#06b6d4' }, // Cyan
		{ name: 'Internship', value: statistics.internship_count, fill: '#f59e0b' }, // Amber
		{ name: 'B2B', value: statistics.b2b_count, fill: '#ef4444' }, // Red
	];

	return (
		<Card className="h-[450px]">
			<CardHeader className="px-3 sm:px-6 pb-2">
				<CardTitle className="text-base sm:text-lg">Employment Types</CardTitle>
				<CardDescription className="text-xs sm:text-sm">Types of positions applied for</CardDescription>
			</CardHeader>
			<CardContent className="px-3 sm:px-6 h-[350px]">
				<ChartContainer
					config={{
						fullTime: { label: 'Full-time', color: '#3b82f6' },
						partTime: { label: 'Part-time', color: '#8b5cf6' },
						contract: { label: 'Contract', color: '#10b981' },
						freelance: { label: 'Freelance', color: '#06b6d4' },
						internship: { label: 'Internship', color: '#f59e0b' },
						b2b: { label: 'B2B', color: '#ef4444' },
					}}
					className="h-full w-full"
				>
					<ResponsiveContainer width="100%" height="100%">
						<PieChart>
							<Pie data={employmentTypeData} cx="50%" cy="35%" outerRadius={70} dataKey="value">
								{employmentTypeData.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={entry.fill} />
								))}
							</Pie>
							<Legend
								verticalAlign="bottom"
								height={100}
								formatter={(value, entry) => `${value}: ${entry?.payload?.value ?? ''}`}
								wrapperStyle={{ fontSize: '11px', paddingTop: '15px' }}
							/>
							<ChartTooltip content={<ChartTooltipContent />} />
						</PieChart>
					</ResponsiveContainer>
				</ChartContainer>
			</CardContent>
		</Card>
	);
};

export default EmploymentTypeDataChart;
