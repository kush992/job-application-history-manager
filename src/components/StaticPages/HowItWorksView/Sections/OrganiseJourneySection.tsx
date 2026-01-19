'use client';

import { FeatureCard } from '../FeatureCard';
import { ListItem } from '../ListItem';
import { SectionWrapper } from '../SectionWrapper';

export function OrganizeJourneySection() {
	return (
		<SectionWrapper
			title="Organize Journeys"
			description="Group related applications into strategic journeys. Perfect for targeting specific companies, roles, or career goals."
		>
			<FeatureCard
				title="What is a Journey?"
				description="A collection of related applications organized around a common theme or goal"
				// icon={<span className="text-lg">🎯</span>}
				index={0}
			>
				<p className="text-muted-foreground">
					A Journey is a strategic grouping that helps you focus on specific targets. Instead of viewing all
					50 applications at once, you can create focused journeys for different strategies.
				</p>
			</FeatureCard>

			<FeatureCard
				title="Journey Organization Strategies"
				description="Different ways to structure your journeys"
				// icon={<span className="text-lg">📂</span>}
				index={1}
			>
				<div className="space-y-3">
					<div className="bg-muted/50 rounded-lg p-3">
						<p className="font-medium text-foreground mb-1">By Target Company</p>
						<p className="text-sm text-muted-foreground">
							Create journeys for each dream company with all their open roles
						</p>
					</div>
					<div className="bg-muted/50 rounded-lg p-3">
						<p className="font-medium text-foreground mb-1">By Job Title/Role</p>
						<p className="text-sm text-muted-foreground">
							Group similar positions {'(e.g., "Senior Engineer Roles", "Product Manager Hunt")'}
						</p>
					</div>
					<div className="bg-muted/50 rounded-lg p-3">
						<p className="font-medium text-foreground mb-1">By Industry</p>
						<p className="text-sm text-muted-foreground">
							Separate applications by sector (Tech, Finance, Healthcare, etc.)
						</p>
					</div>
					<div className="bg-muted/50 rounded-lg p-3">
						<p className="font-medium text-foreground mb-1">By Timeline</p>
						<p className="text-sm text-muted-foreground">
							Track applications by urgency (Immediate, Q2 2024, Long-term)
						</p>
					</div>
					<div className="bg-muted/50 rounded-lg p-3">
						<p className="font-medium text-foreground mb-1">By Location</p>
						<p className="text-sm text-muted-foreground">Focus on specific cities or regions</p>
					</div>
				</div>
			</FeatureCard>

			<FeatureCard
				title="Creating & Managing Journeys"
				description="How to set up and use journeys effectively"
				// icon={<span className="text-lg">⚙️</span>}
				index={2}
			>
				<ul className="space-y-2">
					<ListItem>Create a new journey by clicking the {"'New Journey'"} button</ListItem>
					<ListItem>Name it clearly (e.g., {'Google 2024 Applications'})</ListItem>
					<ListItem>Add a description explaining the {"journey's"} purpose</ListItem>
					<ListItem>Assign applications to journeys as you submit them</ListItem>
					<ListItem>Edit journeys anytime to add more applications</ListItem>
					<ListItem>View separate analytics for each journey</ListItem>
					<ListItem>Archive completed or inactive journeys</ListItem>
				</ul>
			</FeatureCard>

			<FeatureCard
				title="Journey Insights & Analytics"
				description="Measure success for each journey"
				// icon={<span className="text-lg">📈</span>}
				index={3}
			>
				<ul className="space-y-2">
					<ListItem>Total applications in the journey</ListItem>
					<ListItem>Success rate (offers / applications)</ListItem>
					<ListItem>Interview conversion rate</ListItem>
					<ListItem>Average days to response</ListItem>
					<ListItem>Status breakdown (submitted, under review, etc.)</ListItem>
					<ListItem>Compare performance across journeys</ListItem>
				</ul>
			</FeatureCard>

			<FeatureCard
				title="Pro Tips for Journey Organization"
				description="Advanced strategies for maximum effectiveness"
				// icon={<span className="text-lg">💡</span>}
				index={4}
			>
				<div className="space-y-3">
					<div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
						<p className="font-medium text-foreground mb-1">Start Broad, Then Narrow</p>
						<p className="text-sm text-muted-foreground">
							Begin with one journey, then create more focused ones as applications grow
						</p>
					</div>
					<div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
						<p className="font-medium text-foreground mb-1">Use Journeys to Test Strategies</p>
						<p className="text-sm text-muted-foreground">
							Create separate journeys for different application approaches and compare results
						</p>
					</div>
					<div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
						<p className="font-medium text-foreground mb-1">Prioritize Your Top Journey</p>
						<p className="text-sm text-muted-foreground">
							Keep your main focus journey visible and track it weekly
						</p>
					</div>
				</div>
			</FeatureCard>
		</SectionWrapper>
	);
}
