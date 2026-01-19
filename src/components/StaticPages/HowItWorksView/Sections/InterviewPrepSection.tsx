'use client';

import { FeatureCard } from '../FeatureCard';
import { ListItem } from '../ListItem';
import { SectionWrapper } from '../SectionWrapper';

export function InterviewPrepSection() {
	return (
		<SectionWrapper
			title="Interview Preparation"
			description="Prepare effectively with structured interview tracking and preparation tools. Master the interview process."
		>
			<FeatureCard
				title="Interview Preparation Workflow"
				description="Step-by-step process to prepare for success"
				// icon={<span className="text-lg">🎤</span>}
				index={0}
			>
				<ul className="space-y-2">
					<ListItem checked>Receive Interview Invitation - Application moved to interview stage</ListItem>
					<ListItem checked>Schedule Preparation - Note interview date, time, and format</ListItem>
					<ListItem checked>Research Company - Deep dive into company background</ListItem>
					<ListItem checked>Prepare Answers - Practice responses to common questions</ListItem>
					<ListItem checked>Mock Interview - Test yourself or do a practice run</ListItem>
					<ListItem checked>Interview Day - Conduct the actual interview</ListItem>
					<ListItem checked>Follow-up - Send thank you message</ListItem>
				</ul>
			</FeatureCard>

			<FeatureCard
				title="Company Research Checklist"
				description="Essential information to gather before interviews"
				// icon={<span className="text-lg">🔍</span>}
				index={1}
			>
				<ul className="space-y-2">
					<ListItem>Company mission, values, and vision statement</ListItem>
					<ListItem>Recent news, funding, or major announcements</ListItem>
					<ListItem>Product/service details and target market</ListItem>
					<ListItem>Key competitors and market position</ListItem>
					<ListItem>Company culture and work environment</ListItem>
					<ListItem>{"Interviewer's"} background and role</ListItem>
					<ListItem>Unique reasons why you want to work there</ListItem>
				</ul>
			</FeatureCard>

			<FeatureCard
				title="Common Interview Questions"
				description="Be ready for these standard questions"
				// icon={<span className="text-lg">❓</span>}
				index={2}
			>
				<div className="space-y-3">
					<div className="bg-muted/50 rounded-lg p-3">
						<p className="font-medium text-foreground mb-1">Tell me about yourself</p>
						<p className="text-sm text-muted-foreground">
							Craft a 2-3 minute overview of your background, experience, and career goals
						</p>
					</div>
					<div className="bg-muted/50 rounded-lg p-3">
						<p className="font-medium text-foreground mb-1">Why are you interested in this role?</p>
						<p className="text-sm text-muted-foreground">
							Connect your skills to the job requirements and company mission
						</p>
					</div>
					<div className="bg-muted/50 rounded-lg p-3">
						<p className="font-medium text-foreground mb-1">What are your strengths and weaknesses?</p>
						<p className="text-sm text-muted-foreground">
							Be honest, choose relevant strengths, and frame weaknesses as growth areas
						</p>
					</div>
					<div className="bg-muted/50 rounded-lg p-3">
						<p className="font-medium text-foreground mb-1">Tell me about a challenge you overcame</p>
						<p className="text-sm text-muted-foreground">
							Use the STAR method (Situation, Task, Action, Result) to tell compelling stories
						</p>
					</div>
					<div className="bg-muted/50 rounded-lg p-3">
						<p className="font-medium text-foreground mb-1">Where do you see yourself in 5 years?</p>
						<p className="text-sm text-muted-foreground">
							Show ambition while staying realistic and aligned with the company
						</p>
					</div>
				</div>
			</FeatureCard>

			<FeatureCard
				title="STAR Interview Method"
				description="Framework for answering behavioral questions effectively"
				// icon={<span className="text-lg">⭐</span>}
				index={3}
			>
				<ul className="space-y-2">
					<ListItem>
						<span className="font-semibold">Situation:</span> Describe the context and challenge you faced
					</ListItem>
					<ListItem>
						<span className="font-semibold">Task:</span> Explain your responsibility and what needed to be
						done
					</ListItem>
					<ListItem>
						<span className="font-semibold">Action:</span> Detail the specific steps you took to address it
					</ListItem>
					<ListItem>
						<span className="font-semibold">Result:</span> Share the outcome and what you learned
					</ListItem>
				</ul>
			</FeatureCard>

			<FeatureCard
				title="Interview Format Types"
				description="Different interview styles and how to prepare"
				// icon={<span className="text-lg">📱</span>}
				index={4}
			>
				<div className="space-y-3">
					<div className="bg-muted/50 rounded-lg p-3">
						<p className="font-medium text-foreground mb-1">Phone Screening</p>
						<p className="text-sm text-muted-foreground">
							Brief 15-30 min call. Keep resume nearby, speak clearly, confirm interviewer details.
						</p>
					</div>
					<div className="bg-muted/50 rounded-lg p-3">
						<p className="font-medium text-foreground mb-1">Video Interview</p>
						<p className="text-sm text-muted-foreground">
							Test tech beforehand, use neutral background, make eye contact with camera.
						</p>
					</div>
					<div className="bg-muted/50 rounded-lg p-3">
						<p className="font-medium text-foreground mb-1">Technical Assessment</p>
						<p className="text-sm text-muted-foreground">
							Coding challenge or skills test. Practice beforehand, think aloud, ask questions.
						</p>
					</div>
					<div className="bg-muted/50 rounded-lg p-3">
						<p className="font-medium text-foreground mb-1">In-Person Interview</p>
						<p className="text-sm text-muted-foreground">
							Formal setting. Arrive early, dress appropriately, bring copies of resume.
						</p>
					</div>
					<div className="bg-muted/50 rounded-lg p-3">
						<p className="font-medium text-foreground mb-1">Panel Interview</p>
						<p className="text-sm text-muted-foreground">
							Multiple interviewers. Engage each person, repeat questions clearly if needed.
						</p>
					</div>
				</div>
			</FeatureCard>

			<FeatureCard
				title="Post-Interview Best Practices"
				description="How to follow up and leave a lasting impression"
				// icon={<span className="text-lg">✉️</span>}
				index={5}
			>
				<ul className="space-y-2">
					<ListItem checked>Send thank you email within 24 hours</ListItem>
					<ListItem checked>Reference specific points from the conversation</ListItem>
					<ListItem checked>Reiterate your interest in the position</ListItem>
					<ListItem checked>Ask about next steps and timeline</ListItem>
					<ListItem checked>Keep your thank you concise (3-4 paragraphs)</ListItem>
					<ListItem checked>Personalize each thank you (different for each interviewer)</ListItem>
					<ListItem checked>Update application status in JobJourney</ListItem>
				</ul>
			</FeatureCard>
		</SectionWrapper>
	);
}
