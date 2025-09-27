import { Statistics } from '@/types/schema';
import React from 'react';
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Area, AreaChart } from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';

type Props = {
	statistics: Statistics;
};

const ApplicationFunnelDataChart = ({ statistics }: Props) => {
	const applicationFunnelData = [
		{ name: 'Applications Sent', value: statistics.applications_count, fill: '#3b82f6' }, // Blue
		{ name: 'Replies Received', value: statistics.applications_count - statistics.no_reply_count, fill: '#10b981' }, // Green
		{ name: 'General Interviews', value: statistics.interview_count, fill: '#f59e0b' }, // Amber
		{ name: 'Technical Interviews', value: statistics.technical_interview_count, fill: '#8b5cf6' }, // Purple
		{ name: 'System Design', value: statistics.system_design_interview_count, fill: '#06b6d4' }, // Cyan
		{ name: 'Manager Interviews', value: statistics.manager_interview_count, fill: '#f97316' }, // Orange
		{ name: 'Success', value: statistics.success_count, fill: '#06d6a0' }, // Emerald
	];
	return (
		<Card>
			<CardHeader className="px-3 sm:px-6">
				<CardTitle className="text-base sm:text-lg">Application Funnel</CardTitle>
				<CardDescription className="text-xs sm:text-sm">Journey from applications to success</CardDescription>
			</CardHeader>
			<CardContent className="px-3 sm:px-6">
				<ChartContainer
					config={{
						applications: { label: 'Applications Sent', color: '#3b82f6' },
						replies: { label: 'Replies Received', color: '#10b981' },
						generalInterviews: { label: 'General Interviews', color: '#f59e0b' },
						technicalInterviews: { label: 'Technical Interviews', color: '#8b5cf6' },
						systemDesign: { label: 'System Design', color: '#06b6d4' },
						managerInterviews: { label: 'Manager Interviews', color: '#f97316' },
						success: { label: 'Success', color: '#06d6a0' },
					}}
					className="h-[250px] sm:h-[300px] w-full"
				>
					<ResponsiveContainer width="100%" height="100%">
						<AreaChart data={applicationFunnelData} margin={{ top: 20, right: 20, left: 20, bottom: 60 }}>
							<CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
							<XAxis
								dataKey="name"
								className="text-[10px] sm:text-xs"
								tick={{ fontSize: 10 }}
								angle={-45}
								textAnchor="end"
								height={60}
							/>
							<YAxis className="text-[10px] sm:text-xs" tick={{ fontSize: 10 }} />
							<ChartTooltip content={<ChartTooltipContent />} />
							<Area
								type="monotone"
								dataKey="value"
								stroke="#3b82f6"
								fill="url(#colorGradient)"
								strokeWidth={2}
							/>
							<defs>
								<linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
									<stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
									<stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
								</linearGradient>
							</defs>
						</AreaChart>
					</ResponsiveContainer>
				</ChartContainer>
			</CardContent>
		</Card>
	);
};

export default ApplicationFunnelDataChart;
