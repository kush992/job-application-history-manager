'use client';

import { Bar, BarChart, CartesianGrid, Legend,ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Statistics } from '@/types/schema';

type Props = {
	statistics: Statistics;
};

export default function SalaryDistributionChart({ statistics }: Props) {
	const chartData = [
		{
			type: 'Hourly',
			count: statistics.hourly_salary_count,
			avgSalary:
				statistics.hourly_salary_count > 0 ? statistics.hourly_salary_sum / statistics.hourly_salary_count : 0,
		},
		{
			type: 'Daily',
			count: statistics.daily_salary_count,
			avgSalary:
				statistics.daily_salary_count > 0 ? statistics.daily_salary_sum / statistics.daily_salary_count : 0,
		},
		{
			type: 'Weekly',
			count: statistics.weekly_salary_count,
			avgSalary:
				statistics.weekly_salary_count > 0 ? statistics.weekly_salary_sum / statistics.weekly_salary_count : 0,
		},
		{
			type: 'Monthly',
			count: statistics.monthly_salary_count,
			avgSalary:
				statistics.monthly_salary_count > 0
					? statistics.monthly_salary_sum / statistics.monthly_salary_count
					: 0,
		},
		{
			type: 'Yearly',
			count: statistics.yearly_salary_count,
			avgSalary:
				statistics.yearly_salary_count > 0 ? statistics.yearly_salary_sum / statistics.yearly_salary_count : 0,
		},
	].filter((item) => item.count > 0);

	return (
		<Card className="h-full">
			<CardHeader>
				<CardTitle>Salary Distribution by Type</CardTitle>
			</CardHeader>
			<CardContent className="h-[320px]">
				<ResponsiveContainer width="100%" height="100%">
					<BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="type" />
						<YAxis yAxisId="left" orientation="left" />
						<YAxis yAxisId="right" orientation="right" />
						<Tooltip
							formatter={(value, name) => [
								name === 'Applications' ? value : `$${Math.round(Number(value)).toLocaleString()}`,
								name,
							]}
						/>
						<Legend />
						<Bar yAxisId="left" dataKey="count" fill="#3b82f6" name="Applications" />
						<Bar yAxisId="right" dataKey="avgSalary" fill="#10b981" name="Avg Salary" />
					</BarChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	);
}
