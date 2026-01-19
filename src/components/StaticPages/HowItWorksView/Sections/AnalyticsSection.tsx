'use client';

import { FeatureCard } from '../FeatureCard';
import { ListItem } from '../ListItem';
import { SectionWrapper } from '../SectionWrapper';

export function AnalyticsSection() {
	return (
		<SectionWrapper
			title="Analytics & Metrics"
			description="Understand your job search performance with detailed analytics. Identify patterns and optimize your strategy."
		>
			<FeatureCard
				title="Key Performance Indicators (KPIs)"
				description="Essential metrics to track your job search success"
				// icon={<span className="text-lg">📊</span>}
				index={0}
			>
				<ul className="space-y-2">
					<ListItem checked>Application Rate: How many applications you submit per week/month</ListItem>
					<ListItem checked>Response Rate: Percentage of applications that get responses</ListItem>
					<ListItem checked>Interview Rate: Percentage of applications that lead to interviews</ListItem>
					<ListItem checked>Offer Rate: Percentage of interviews that result in offers</ListItem>
					<ListItem checked>Average Time to Response: How long companies typically take to respond</ListItem>
					<ListItem checked>Conversion Rate: Applications to offers ratio</ListItem>
				</ul>
			</FeatureCard>

			<FeatureCard
				title="Dashboard Overview"
				description="Your comprehensive job search snapshot"
				// icon={<span className="text-lg">📈</span>}
				index={1}
			>
				<div className="space-y-3">
					<div className="bg-muted/50 rounded-lg p-3">
						<p className="font-medium text-foreground mb-1">Total Applications</p>
						<p className="text-sm text-muted-foreground">All applications submitted across all journeys</p>
					</div>
					<div className="bg-muted/50 rounded-lg p-3">
						<p className="font-medium text-foreground mb-1">Status Breakdown</p>
						<p className="text-sm text-muted-foreground">
							Visual breakdown of submitted, under review, interview, and offer stages
						</p>
					</div>
					<div className="bg-muted/50 rounded-lg p-3">
						<p className="font-medium text-foreground mb-1">Monthly Trend</p>
						<p className="text-sm text-muted-foreground">
							Chart showing application volume trends over time
						</p>
					</div>
					<div className="bg-muted/50 rounded-lg p-3">
						<p className="font-medium text-foreground mb-1">Response Metrics</p>
						<p className="text-sm text-muted-foreground">Response rate and average days to first contact</p>
					</div>
				</div>
			</FeatureCard>

			<FeatureCard
				title="Analyzing Your Data"
				description="How to interpret and act on your analytics"
				// icon={<span className="text-lg">🔍</span>}
				index={2}
			>
				<ul className="space-y-2">
					<ListItem>Check metrics weekly to track progress</ListItem>
					<ListItem>Compare response rates across journeys to identify what works</ListItem>
					<ListItem>Identify which companies respond fastest</ListItem>
					<ListItem>Track your best performing job titles</ListItem>
					<ListItem>Monitor application volume to stay consistent</ListItem>
					<ListItem>Benchmark against industry standards</ListItem>
				</ul>
			</FeatureCard>

			<FeatureCard
				title="Industry Benchmarks"
				description="What to aim for in your job search"
				// icon={<span className="text-lg">🎯</span>}
				index={3}
			>
				<div className="space-y-3">
					<div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
						<p className="font-medium text-foreground mb-1">Average Response Rate: 2-5%</p>
						<p className="text-sm text-muted-foreground">
							Most companies respond to 2-5% of applications. Highly sought-after roles may be lower.
						</p>
					</div>
					<div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
						<p className="font-medium text-foreground mb-1">Interview Rate: 10-20% of responses</p>
						<p className="text-sm text-muted-foreground">
							Approximately 1 in 5 to 1 in 10 responses lead to interviews
						</p>
					</div>
					<div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
						<p className="font-medium text-foreground mb-1">Offer Rate: 20-30% of interviews</p>
						<p className="text-sm text-muted-foreground">
							You typically need 3-5 interviews to get one offer
						</p>
					</div>
					<div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
						<p className="font-medium text-foreground mb-1">
							Overall Conversion: 0.1-0.5% applications to offers
						</p>
						<p className="text-sm text-muted-foreground">
							This means submitting 200-1000 applications for a typical offer
						</p>
					</div>
				</div>
			</FeatureCard>

			<FeatureCard
				title="Action-Based Insights"
				description="What to do when metrics aren't meeting targets"
				// icon={<span className="text-lg">⚡</span>}
				index={4}
			>
				<div className="space-y-3">
					<div className="bg-muted/50 rounded-lg p-3">
						<p className="font-medium text-foreground mb-1">Low Response Rate (&lt;1%)</p>
						<p className="text-sm text-muted-foreground">
							Improve resume/cover letter, target more relevant roles, check application quality
						</p>
					</div>
					<div className="bg-muted/50 rounded-lg p-3">
						<p className="font-medium text-foreground mb-1">Few Applications Submitted</p>
						<p className="text-sm text-muted-foreground">
							Increase your job search activity, expand your search criteria
						</p>
					</div>
					<div className="bg-muted/50 rounded-lg p-3">
						<p className="font-medium text-foreground mb-1">Low Interview Rate</p>
						<p className="text-sm text-muted-foreground">
							Strengthen your resume, improve phone screening skills
						</p>
					</div>
					<div className="bg-muted/50 rounded-lg p-3">
						<p className="font-medium text-foreground mb-1">Low Offer Rate</p>
						<p className="text-sm text-muted-foreground">
							Prepare better for interviews, work on negotiation skills
						</p>
					</div>
				</div>
			</FeatureCard>
		</SectionWrapper>
	);
}
