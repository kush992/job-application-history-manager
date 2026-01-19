'use client';

import { Cpu } from 'lucide-react';

import { FeatureCard } from '../FeatureCard';
import { ListItem } from '../ListItem';
import { SectionWrapper } from '../SectionWrapper';

export function AIInsightsSection() {
	return (
		<SectionWrapper
			title="AI-Powered Insights"
			description="Leverage artificial intelligence to optimize your job search, get personalized recommendations, and improve your success rate."
		>
			<FeatureCard
				title="What AI Insights Can Do"
				description="How artificial intelligence enhances your job search"
				icon={
					<Cpu className="w-6 h-6 stroke-darkVioletAccent fill-lightVioletAccent dark:stroke-lightVioletAccent dark:fill-darkVioletAccent" />
				}
				index={0}
			>
				<ul className="space-y-2 !list-item !list-outside !list-disc">
					<ListItem>Analyze your job search patterns and identify trends</ListItem>
					<ListItem>Suggest improvements to your application strategy</ListItem>
					<ListItem>Recommend optimal times to apply for certain roles</ListItem>
					<ListItem>Identify keywords to improve resume matching</ListItem>
					<ListItem>Predict success likelihood for applications</ListItem>
					<ListItem>Suggest which journeys to prioritize</ListItem>
					<ListItem>Generate personalized interview preparation plans</ListItem>
				</ul>
			</FeatureCard>

			<FeatureCard
				title="Smart Recommendations"
				description="Get AI-powered suggestions tailored to your situation"
				// icon={<span className="text-lg">💡</span>}
				index={1}
			>
				<div className="space-y-3">
					<div className="bg-muted/50 rounded-lg p-3">
						<p className="font-medium text-foreground mb-1">Resume Recommendations</p>
						<p className="text-sm text-muted-foreground">
							Suggestions to strengthen resume content based on target roles and industry standards
						</p>
					</div>
					<div className="bg-muted/50 rounded-lg p-3">
						<p className="font-medium text-foreground mb-1">Application Strategy</p>
						<p className="text-sm text-muted-foreground">
							Personalized advice on target companies, roles, and application volume
						</p>
					</div>
					<div className="bg-muted/50 rounded-lg p-3">
						<p className="font-medium text-foreground mb-1">Interview Preparation</p>
						<p className="text-sm text-muted-foreground">
							Custom prep materials based on company and role analysis
						</p>
					</div>
					<div className="bg-muted/50 rounded-lg p-3">
						<p className="font-medium text-foreground mb-1">Salary Insights</p>
						<p className="text-sm text-muted-foreground">
							Market data and negotiation advice for your target positions
						</p>
					</div>
				</div>
			</FeatureCard>

			<FeatureCard
				title="Pattern Recognition"
				description="AI uncovers hidden patterns in your data"
				// icon={<span className="text-lg">🔍</span>}
				index={2}
			>
				<ul className="space-y-2">
					<ListItem>Which job titles get you the most interviews</ListItem>
					<ListItem>Best performing application channels</ListItem>
					<ListItem>Optimal application volume for your target</ListItem>
					<ListItem>Companies that typically respond to you</ListItem>
					<ListItem>Time of day or week with best response rates</ListItem>
					<ListItem>Correlation between your profile and interview rates</ListItem>
					<ListItem>Industry trends affecting your job search</ListItem>
				</ul>
			</FeatureCard>

			<FeatureCard
				title="Optimization Suggestions"
				description="Actionable advice to improve your metrics"
				// icon={<span className="text-lg">⚡</span>}
				index={3}
			>
				<div className="space-y-3">
					<div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
						<p className="font-medium text-foreground mb-1">If Response Rate is Low</p>
						<p className="text-sm text-muted-foreground">
							AI suggests: Update resume keywords, target more specific roles, expand location range
						</p>
					</div>
					<div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
						<p className="font-medium text-foreground mb-1">If Interview Rate is Low</p>
						<p className="text-sm text-muted-foreground">
							AI suggests: Focus on phone screening practice, improve cover letters, add more experience
						</p>
					</div>
					<div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
						<p className="font-medium text-foreground mb-1">If Offer Rate is Low</p>
						<p className="text-sm text-muted-foreground">
							AI suggests: Practice common interview questions, improve salary negotiation skills, refine
							target role
						</p>
					</div>
					<div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
						<p className="font-medium text-foreground mb-1">If No Applications Yet</p>
						<p className="text-sm text-muted-foreground">
							AI suggests: Build your journey, compile documents, identify top 20 target companies
						</p>
					</div>
				</div>
			</FeatureCard>

			<FeatureCard
				title="Resume Enhancement"
				description="AI-powered suggestions to improve your resume"
				// icon={<span className="text-lg">📝</span>}
				index={4}
			>
				<ul className="space-y-2">
					<ListItem>Action verb suggestions to strengthen bullet points</ListItem>
					<ListItem>Keyword analysis based on target job descriptions</ListItem>
					<ListItem>Quantification suggestions for achievements</ListItem>
					<ListItem>ATS compatibility feedback</ListItem>
					<ListItem>Readability and format optimization</ListItem>
					<ListItem>Relevance scoring for each experience section</ListItem>
					<ListItem>Gap identification (missing skills, experience)</ListItem>
				</ul>
			</FeatureCard>

			<FeatureCard
				title="Predictive Analytics"
				description="AI predicts success outcomes based on patterns"
				// icon={<span className="text-lg">📊</span>}
				index={5}
			>
				<div className="space-y-3">
					<div className="bg-muted/50 rounded-lg p-3">
						<p className="font-medium text-foreground mb-1">Success Likelihood Scoring</p>
						<p className="text-sm text-muted-foreground">
							AI predicts % chance of interview for each application based on your profile
						</p>
					</div>
					<div className="bg-muted/50 rounded-lg p-3">
						<p className="font-medium text-foreground mb-1">Offer Prediction</p>
						<p className="text-sm text-muted-foreground">
							Based on your interview performance patterns, predicts offer likelihood
						</p>
					</div>
					<div className="bg-muted/50 rounded-lg p-3">
						<p className="font-medium text-foreground mb-1">Timeline Estimation</p>
						<p className="text-sm text-muted-foreground">
							Estimates how long until first interview based on application rate
						</p>
					</div>
					<div className="bg-muted/50 rounded-lg p-3">
						<p className="font-medium text-foreground mb-1">Goal Achievement</p>
						<p className="text-sm text-muted-foreground">
							Predicts if current trajectory will achieve your goals
						</p>
					</div>
				</div>
			</FeatureCard>

			<FeatureCard
				title="Using AI Insights Effectively"
				description="Best practices for leveraging AI recommendations"
				// icon={<span className="text-lg">🎯</span>}
				index={6}
			>
				<ul className="space-y-2">
					<ListItem>Review recommendations weekly, not daily</ListItem>
					<ListItem>Prioritize top 3-5 suggestions to implement</ListItem>
					<ListItem>Test recommendations and track results</ListItem>
					<ListItem>Use A/B testing (old vs. new resume versions)</ListItem>
					<ListItem>Combine AI insights with personal judgment</ListItem>
					<ListItem>Track which changes had biggest impact</ListItem>
					<ListItem>Iterate and refine based on outcomes</ListItem>
				</ul>
			</FeatureCard>

			<FeatureCard
				title="Privacy & Data Security"
				description="How your data is protected with AI analysis"
				// icon={<span className="text-lg">🔒</span>}
				index={7}
			>
				<ul className="space-y-2">
					<ListItem>Your application data is encrypted and secure</ListItem>
					<ListItem>AI analysis happens on your data only (not shared)</ListItem>
					<ListItem>Personal information is anonymized in system learning</ListItem>
					<ListItem>You control what data is used for AI insights</ListItem>
					<ListItem>Opt-in for different types of AI analysis</ListItem>
					<ListItem>Data deletion removes all AI insights too</ListItem>
				</ul>
			</FeatureCard>
		</SectionWrapper>
	);
}
