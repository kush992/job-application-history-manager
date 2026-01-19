'use client';

import { FeatureCard } from '../FeatureCard';
import { ListItem } from '../ListItem';
import { SectionWrapper } from '../SectionWrapper';

export function CommunitySection() {
	return (
		<SectionWrapper
			title="Community & Connections"
			description="Learn from others, share insights, and build your professional network. Leverage collective job search wisdom."
		>
			<FeatureCard
				title="Community Benefits"
				description="Why engaging with the JobJourney community matters"
				// icon={<span className="text-lg">🤝</span>}
				index={0}
			>
				<ul className="space-y-2">
					<ListItem checked>Learn from others job search experiences</ListItem>
					<ListItem checked>Discover companies and roles you might have missed</ListItem>
					<ListItem checked>Get motivation and encouragement from peers</ListItem>
					<ListItem checked>Share interview preparation tips and questions</ListItem>
					<ListItem checked>Build your professional network</ListItem>
					<ListItem checked>Find accountability partners for job search goals</ListItem>
					<ListItem checked>Access crowdsourced company reviews and insights</ListItem>
				</ul>
			</FeatureCard>

			<FeatureCard
				title="How to Engage Effectively"
				description="Best practices for community participation"
				// icon={<span className="text-lg">💬</span>}
				index={1}
			>
				<div className="space-y-3">
					<div className="bg-muted/50 rounded-lg p-3">
						<p className="font-medium text-foreground mb-1">Ask Specific Questions</p>
						<p className="text-sm text-muted-foreground">
							{'"Interview tips for Google PM"'} gets better responses than {'"Need help"'}
						</p>
					</div>
					<div className="bg-muted/50 rounded-lg p-3">
						<p className="font-medium text-foreground mb-1">Share Your Wins & Losses</p>
						<p className="text-sm text-muted-foreground">
							Post about rejections, interviews, and offers to help others learn
						</p>
					</div>
					<div className="bg-muted/50 rounded-lg p-3">
						<p className="font-medium text-foreground mb-1">Provide Value First</p>
						<p className="text-sm text-muted-foreground">
							Share your insights, experience, and resources before asking
						</p>
					</div>
					<div className="bg-muted/50 rounded-lg p-3">
						<p className="font-medium text-foreground mb-1">Be Respectful & Inclusive</p>
						<p className="text-sm text-muted-foreground">
							{"Everyone's"} journey is different; avoid judgment and criticism
						</p>
					</div>
					<div className="bg-muted/50 rounded-lg p-3">
						<p className="font-medium text-foreground mb-1">Follow Up & Give Feedback</p>
						<p className="text-sm text-muted-foreground">
							Share what worked when you get advice, help close the loop
						</p>
					</div>
				</div>
			</FeatureCard>

			<FeatureCard
				title="Common Topics & Discussions"
				description="Popular community conversations"
				// icon={<span className="text-lg">🔥</span>}
				index={2}
			>
				<ul className="space-y-2">
					<ListItem>
						<span className="font-semibold">Company Reviews:</span> Salaries, culture, interview experience
					</ListItem>
					<ListItem>
						<span className="font-semibold">Salary Negotiation:</span> Tips for negotiating better offers
					</ListItem>
					<ListItem>
						<span className="font-semibold">Interview Prep:</span> Questions, answers, and preparation
						strategies
					</ListItem>
					<ListItem>
						<span className="font-semibold">Career Transitions:</span> Changing industries or roles
					</ListItem>
					<ListItem>
						<span className="font-semibold">Job Search Strategy:</span> Where to apply, how many
						applications
					</ListItem>
					<ListItem>
						<span className="font-semibold">Resume & Cover Letter:</span> Optimization tips and reviews
					</ListItem>
					<ListItem>
						<span className="font-semibold">Rejections & Resilience:</span> Dealing with rejection and
						staying motivated
					</ListItem>
				</ul>
			</FeatureCard>

			<FeatureCard
				title="Networking Tips"
				description="Build meaningful professional relationships"
				// icon={<span className="text-lg">🌐</span>}
				index={3}
			>
				<div className="space-y-3">
					<div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
						<p className="font-medium text-foreground mb-1">Connect on LinkedIn</p>
						<p className="text-sm text-muted-foreground">
							Move conversations to LinkedIn for long-term professional relationships
						</p>
					</div>
					<div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
						<p className="font-medium text-foreground mb-1">Mentorship Opportunities</p>
						<p className="text-sm text-muted-foreground">
							Seek mentors {"who've"} succeeded in your target role/company
						</p>
					</div>
					<div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
						<p className="font-medium text-foreground mb-1">Offer Help to Others</p>
						<p className="text-sm text-muted-foreground">
							Review resumes, conduct mock interviews, share industry insights
						</p>
					</div>
					<div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
						<p className="font-medium text-foreground mb-1">Attend Virtual Events</p>
						<p className="text-sm text-muted-foreground">
							Join community webinars, Q&A sessions, and networking events
						</p>
					</div>
				</div>
			</FeatureCard>

			<FeatureCard
				title="Accountability & Support Groups"
				description="Get support and stay motivated"
				// icon={<span className="text-lg">🎯</span>}
				index={4}
			>
				<ul className="space-y-2">
					<ListItem>Join application challenge groups (e.g., {'"50 applications this month"'})</ListItem>
					<ListItem>Find an accountability partner to check in weekly</ListItem>
					<ListItem>Share your goals and progress with the community</ListItem>
					<ListItem>Celebrate wins together and support through rejections</ListItem>
					<ListItem>Participate in interview prep sessions together</ListItem>
					<ListItem>Share resources and learning materials</ListItem>
				</ul>
			</FeatureCard>

			<FeatureCard
				title="Community Guidelines"
				description="Keep the community positive and valuable"
				// icon={<span className="text-lg">📋</span>}
				index={5}
			>
				<ul className="space-y-2">
					<ListItem checked>Be respectful and supportive of all members</ListItem>
					<ListItem checked>No spam, self-promotion, or off-topic content</ListItem>
					<ListItem checked>Provide constructive feedback and genuine help</ListItem>
					<ListItem checked>Protect others privacy</ListItem>
					<ListItem checked>Avoid controversial or discriminatory content</ListItem>
					<ListItem checked>Share verified information and experiences</ListItem>
					<ListItem checked>Report inappropriate behavior to moderators</ListItem>
				</ul>
			</FeatureCard>
		</SectionWrapper>
	);
}
