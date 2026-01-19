'use client';

import { FeatureCard } from '../FeatureCard';
import { ListItem } from '../ListItem';
import { SectionWrapper } from '../SectionWrapper';

export function ApplicationTrackingSection() {
	return (
		<SectionWrapper
			title="Track Every Job Application"
			description="Stay organized and never lose track of your applications. Monitor status, dates, and key details all in one place."
		>
			<FeatureCard
				title="Application Status Workflow"
				description="Track applications through their complete lifecycle"
				// icon={<span className="text-lg">📋</span>}
				index={0}
			>
				<ul className="space-y-2">
					<ListItem checked>Application Submitted - Initial application sent</ListItem>
					<ListItem checked>Under Review - Company reviewing your profile</ListItem>
					<ListItem checked>Interview Scheduled - Moved to interview stage</ListItem>
					<ListItem checked>Rejected - Application not selected</ListItem>
					<ListItem checked>Offer Received - Job offer extended</ListItem>
				</ul>
			</FeatureCard>

			<FeatureCard
				title="Key Information You Can Track"
				description="Comprehensive details for each application"
				// icon={<span className="text-lg">📌</span>}
				index={1}
			>
				<ul className="space-y-2">
					<ListItem>Company name and job title</ListItem>
					<ListItem>Application submission date</ListItem>
					<ListItem>Job description and requirements</ListItem>
					<ListItem>Contact person or recruiter name</ListItem>
					<ListItem>Salary range and benefits</ListItem>
					<ListItem>Application link and posting URL</ListItem>
					<ListItem>Personal notes and follow-up details</ListItem>
				</ul>
			</FeatureCard>

			<FeatureCard
				title="Best Practices for Application Tracking"
				description="Tips to maximize your tracking effectiveness"
				// icon={<span className="text-lg">⚡</span>}
				index={2}
			>
				<div className="space-y-3">
					<div className="bg-muted/50 rounded-lg p-3">
						<p className="font-medium text-foreground mb-1">Update Immediately</p>
						<p className="text-sm text-muted-foreground">
							Log applications the same day you submit them while details are fresh
						</p>
					</div>
					<div className="bg-muted/50 rounded-lg p-3">
						<p className="font-medium text-foreground mb-1">Include Custom Notes</p>
						<p className="text-sm text-muted-foreground">
							Add internal referrals, interview tips, or follow-up reminders
						</p>
					</div>
					<div className="bg-muted/50 rounded-lg p-3">
						<p className="font-medium text-foreground mb-1">Organize by Priority</p>
						<p className="text-sm text-muted-foreground">
							Tag dream companies or positions for quick reference
						</p>
					</div>
					<div className="bg-muted/50 rounded-lg p-3">
						<p className="font-medium text-foreground mb-1">Set Follow-up Reminders</p>
						<p className="text-sm text-muted-foreground">
							Plan when to follow up if you {"haven't"} heard back (typically 5-7 days)
						</p>
					</div>
				</div>
			</FeatureCard>

			<FeatureCard
				title="Success Metrics to Monitor"
				description="Track your application performance"
				// icon={<span className="text-lg">📊</span>}
				index={3}
			>
				<ul className="space-y-2">
					<ListItem>Total applications submitted this month</ListItem>
					<ListItem>Response rate (% of companies that responded)</ListItem>
					<ListItem>Interview rate (% of applications that led to interviews)</ListItem>
					<ListItem>Average time from submission to response</ListItem>
					<ListItem>Most successful job titles or companies</ListItem>
				</ul>
			</FeatureCard>
		</SectionWrapper>
	);
}
