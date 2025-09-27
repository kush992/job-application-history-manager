import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../ui/card';
import { Statistics } from '@/types/schema';

type Props = {
	statistics: Statistics;
	replyRate: string;
	successRate: string;
};

const SummaryInsights = ({ statistics, replyRate, successRate }: Props) => {
	return (
		<Card>
			<CardHeader className="px-3 sm:px-6">
				<CardTitle className="text-base sm:text-lg">Key Insights & Analysis</CardTitle>
				<CardDescription className="text-xs sm:text-sm">
					Detailed breakdown of your job search performance and recommendations
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4 px-3 sm:px-6">
				{/* Application Volume Analysis */}
				<div className="space-y-2">
					<h4 className="font-semibold text-sm">📊 Application Volume Analysis</h4>
					<p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
						{"You've"} submitted <strong>{statistics.applications_count} applications</strong> in total.
						{statistics.applications_count > 100
							? ' This is a substantial volume showing strong commitment to your job search.'
							: statistics.applications_count > 50
								? ' This represents a good application volume.'
								: ' Consider increasing your application volume for better opportunities.'}
					</p>
				</div>

				{/* Response Rate Analysis */}
				<div className="space-y-2">
					<h4 className="font-semibold text-sm">📬 Response Rate Performance</h4>
					<p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
						Out of {statistics.applications_count} applications, you received{' '}
						<strong>{statistics.applications_count - statistics.no_reply_count} replies</strong>({replyRate}
						% response rate).{' '}
						{Number.parseFloat(replyRate) > 40
							? 'This is an excellent response rate!'
							: Number.parseFloat(replyRate) > 25
								? 'This is above average - good job!'
								: Number.parseFloat(replyRate) > 15
									? 'This is around industry average.'
									: 'This is below average - consider improving your application quality or targeting.'}{' '}
						Industry average is typically 15-25%.
					</p>
					<p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
						<strong>{statistics.no_reply_count} applications</strong> (
						{((statistics.no_reply_count / statistics.applications_count) * 100).toFixed(1)}%) received no
						response. This could indicate targeting misalignment or the need to improve your resume/cover
						letter.
					</p>
				</div>

				{/* Interview Conversion Analysis */}
				{/* <div className="space-y-2">
					<h4 className="font-semibold text-sm">🎯 Interview Conversion Funnel</h4>
					<p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
						From replies to interviews: <strong>{statistics.interview_count} general interviews</strong>(
						{(
							(statistics.interview_count /
								(statistics.applications_count - statistics.no_reply_count)) *
							100
						).toFixed(1)}
						% of replies converted to interviews).
					</p>
					<p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
						Technical interview progression:{' '}
						<strong>{statistics.technical_interview_count} technical interviews</strong>(
						{((statistics.technical_interview_count / statistics.interview_count) * 100).toFixed(1)}% of
						general interviews progressed), with{' '}
						<strong>{statistics.system_design_interview_count} system design</strong> and
						<strong> {statistics.manager_interview_count} manager interviews</strong>.
					</p>
				</div> */}

				{/* Success Rate Analysis */}
				<div className="space-y-2">
					<h4 className="font-semibold text-sm">🎉 Success Rate & Outcomes</h4>
					<p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
						Final success rate: <strong>{statistics.success_count} successful outcomes</strong> (
						{successRate}% of total applications).
						{Number.parseFloat(successRate) > 5
							? 'This is an excellent conversion rate!'
							: Number.parseFloat(successRate) > 2
								? ' This is a solid success rate.'
								: ' Focus on improving interview performance and targeting.'}
					</p>
					<p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
						Rejection breakdown:{' '}
						<strong>{statistics.rejected_no_feedback_count} rejections without feedback</strong>,
						<strong> {statistics.rejected_with_feedback_count} with feedback</strong>.
						{statistics.rejected_with_feedback_count > 0
							? ' Use the feedback to improve future applications.'
							: ''}
						{statistics.offer_rejected_count > 0
							? ` You rejected ${statistics.offer_rejected_count} offer(s), showing you're selective about opportunities.`
							: ''}
					</p>
				</div>

				{/* Work Arrangement Preferences */}
				<div className="space-y-2">
					<h4 className="font-semibold text-sm">🏠 Work Arrangement Targeting</h4>
					<p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
						Work location preferences: <strong>{statistics.remote_count} remote</strong>(
						{(
							(statistics.remote_count /
								(statistics.remote_count + statistics.hybrid_count + statistics.onsite_count)) *
							100
						).toFixed(1)}
						%),
						<strong> {statistics.hybrid_count} hybrid</strong>(
						{(
							(statistics.hybrid_count /
								(statistics.remote_count + statistics.hybrid_count + statistics.onsite_count)) *
							100
						).toFixed(1)}
						%), and <strong>{statistics.onsite_count} on-site</strong>(
						{(
							(statistics.onsite_count /
								(statistics.remote_count + statistics.hybrid_count + statistics.onsite_count)) *
							100
						).toFixed(1)}
						%) positions.
						{statistics.remote_count > statistics.hybrid_count + statistics.onsite_count
							? " You're heavily targeting remote work."
							: statistics.hybrid_count > statistics.remote_count
								? ' You prefer hybrid arrangements.'
								: ' You have a balanced approach to work arrangements.'}
					</p>
				</div>

				{/* Employment Type Analysis */}
				<div className="space-y-2">
					<h4 className="font-semibold text-sm">💼 Employment Type Distribution</h4>
					<p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
						Employment focus: <strong>{statistics.full_time_count} full-time positions</strong>(
						{((statistics.full_time_count / statistics.applications_count) * 100).toFixed(1)}% of
						applications),
						{statistics.part_time_count > 0 ? ` ${statistics.part_time_count} part-time,` : ''}
						{statistics.contract_count > 0 ? ` ${statistics.contract_count} contract,` : ''}
						{statistics.freelance_count > 0 ? ` ${statistics.freelance_count} freelance,` : ''}
						{statistics.internship_count > 0 ? ` ${statistics.internship_count} internship,` : ''}
						{statistics.b2b_count > 0
							? ` and ${statistics.b2b_count} B2B opportunities.`
							: ' opportunities.'}
						{statistics.full_time_count / statistics.applications_count > 0.9
							? " You're focused primarily on full-time roles."
							: " You're exploring diverse employment types."}
					</p>
				</div>

				{/* Salary Analysis */}
				{/* <div className="space-y-2">
					<h4 className="font-semibold text-sm">💰 Salary Range Analysis</h4>
					<p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
						Salary expectations: Range from{' '}
						<strong>${Number.parseInt(statistics.min_salary).toLocaleString()}</strong> to
						<strong> ${Number.parseInt(statistics.max_salary).toLocaleString()}</strong>, with an average
						of <strong>${Math.round(Number.parseFloat(statistics.avg_salary)).toLocaleString()}</strong>.
						The range spread is{' '}
						<strong>
							$
							{(
								Number.parseInt(statistics.max_salary) - Number.parseInt(statistics.min_salary)
							).toLocaleString()}
						</strong>
						,
						{Number.parseInt(statistics.max_salary) - Number.parseInt(statistics.min_salary) > 100000
							? " indicating you're open to a wide salary range."
							: ' showing focused salary expectations.'}
					</p>
				</div> */}

				{/* Actionable Recommendations */}
				{/* <div className="space-y-2">
					<h4 className="font-semibold text-sm">🚀 Recommendations</h4>
					<div className="text-xs sm:text-sm text-muted-foreground leading-relaxed space-y-1">
						{Number.parseFloat(replyRate) < 20 && (
							<p>
								• <strong>Improve response rate:</strong> Review and optimize your resume, cover letter,
								and application targeting.
							</p>
						)}
						{statistics.technical_interview_count / statistics.interview_count < 0.5 &&
							statistics.interview_count > 5 && (
								<p>
									• <strong>Interview performance:</strong> Focus on improving general interview
									skills to progress to technical rounds.
								</p>
							)}
						{statistics.success_count / statistics.technical_interview_count < 0.3 &&
							statistics.technical_interview_count > 3 && (
								<p>
									• <strong>Technical skills:</strong> Strengthen technical interview preparation and
									system design knowledge.
								</p>
							)}
						{statistics.no_reply_count / statistics.applications_count > 0.6 && (
							<p>
								• <strong>Application quality:</strong> Consider personalizing applications more and
								targeting roles that better match your profile.
							</p>
						)}
						<p>
							• <strong>Keep tracking:</strong> Continue monitoring these metrics to identify trends and
							improvement areas.
						</p>
					</div>
				</div> */}
			</CardContent>
		</Card>
	);
};

export default SummaryInsights;
