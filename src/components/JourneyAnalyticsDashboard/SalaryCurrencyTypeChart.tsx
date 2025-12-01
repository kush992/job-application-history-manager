'use client';

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Statistics } from '@/types/schema';

type Props = {
	statistics: Statistics;
};

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#84cc16'];

export default function SalaryCurrencyTypeChart({ statistics }: Props) {
	const chartData = [
		{ name: 'USD', value: statistics.usd_salary_count, color: COLORS[0] },
		{ name: 'EUR', value: statistics.eur_salary_count, color: COLORS[1] },
		{ name: 'PLN', value: statistics.pln_salary_count, color: COLORS[2] },
		{ name: 'INR', value: statistics.inr_salary_count, color: COLORS[3] },
		{ name: 'GBP', value: statistics.gbp_salary_count, color: COLORS[4] },
		{ name: 'CAD', value: statistics.cad_salary_count, color: COLORS[5] },
		{ name: 'AUD', value: statistics.aud_salary_count, color: COLORS[6] },
	].filter((item) => item.value > 0);

	return (
		<Card className="h-full">
			<CardHeader>
				<CardTitle>Salary Currency Distribution</CardTitle>
			</CardHeader>
			<CardContent className="h-[320px]">
				<ResponsiveContainer width="100%" height="100%">
					<PieChart>
						<Pie data={chartData} cx="50%" cy="40%" outerRadius={80} dataKey="value">
							{chartData.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={entry.color} />
							))}
						</Pie>
						<Tooltip formatter={(value, name) => [`${value} applications`, name]} />
						<Legend
							verticalAlign="bottom"
							height={60}
							formatter={(value, entry) => `${value}: ${entry?.payload?.value ?? ''}`}
						/>
					</PieChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	);
}
