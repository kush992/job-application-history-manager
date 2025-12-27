import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts';

import type { Statistics } from '@/types/schema';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';

type Props = {
	statistics: Statistics;
};

const ApplicationResponseBreakdownDataChart = ({ statistics }: Props) => {
	const responseData = [
		{ name: 'No Reply', value: statistics.no_reply_count, fill: '#ef4444' }, // Red for negative
		{ name: 'Rejected (No Feedback)', value: statistics.rejected_no_feedback_count, fill: '#f97316' }, // Orange
		{ name: 'Rejected (With Feedback)', value: statistics.rejected_with_feedback_count, fill: '#f59e0b' }, // Amber
		{ name: 'Offer Rejected', value: statistics.offer_rejected_count, fill: '#dc2626' }, // Dark red
		{ name: 'Offer Accepted', value: statistics.offer_accepted_count, fill: '#059669' }, // Dark green
		{ name: 'Success', value: statistics.success_count, fill: '#10b981' }, // Green for positive
	];
	return (
		<Card className="h-[450px]">
			<CardHeader className="px-3 sm:px-6 pb-2">
				<CardTitle className="text-base sm:text-lg">Response Breakdown</CardTitle>
				<CardDescription className="text-xs sm:text-sm">How applications were handled</CardDescription>
			</CardHeader>
			<CardContent className="px-3 sm:px-6 h-[350px]">
				<ChartContainer
					config={{
						noReply: { label: 'No Reply', color: '#ef4444' },
						rejectedNoFeedback: { label: 'Rejected (No Feedback)', color: '#f97316' },
						rejectedWithFeedback: { label: 'Rejected (With Feedback)', color: '#f59e0b' },
						offerRejected: { label: 'Offer Rejected', color: '#dc2626' },
						offerAccepted: { label: 'Offer Accepted', color: '#059669' },
						success: { label: 'Success', color: '#10b981' },
					}}
					className="h-full w-full"
				>
					<ResponsiveContainer width="100%" height="100%">
						<PieChart>
							<Pie
								data={responseData}
								cx="50%"
								cy="40%"
								innerRadius={40}
								outerRadius={70}
								dataKey="value"
							>
								{responseData.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={entry.fill} />
								))}
							</Pie>
							<Legend
								verticalAlign="bottom"
								height={80}
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

export default ApplicationResponseBreakdownDataChart;
