'use client';

import { FeatureCard } from '../FeatureCard';
import { ListItem } from '../ListItem';
import { SectionWrapper } from '../SectionWrapper';

export function DocumentManagementSection() {
	return (
		<SectionWrapper
			title="Manage Documents"
			description="Organize and store all your career documents in one place. Access resumes, cover letters, and certifications instantly."
		>
			<FeatureCard
				title="Document Types Supported"
				description="All the documents you need for your job search"
				// icon={<span className="text-lg">📄</span>}
				index={0}
			>
				<ul className="space-y-2">
					<ListItem>Resumes - Multiple versions for different roles</ListItem>
					<ListItem>Cover Letters - Customize for each application</ListItem>
					<ListItem>Portfolio Links - Showcase your work samples</ListItem>
					<ListItem>Certifications - Professional credentials and licenses</ListItem>
					<ListItem>References - Contact information for recommenders</ListItem>
					<ListItem>LinkedIn Profile - URL and professional summary</ListItem>
					<ListItem>Transcripts - Educational background documentation</ListItem>
				</ul>
			</FeatureCard>

			<FeatureCard
				title="Resume Best Practices"
				description="Optimize your resume for maximum impact"
				// icon={<span className="text-lg">✨</span>}
				index={1}
			>
				<div className="space-y-3">
					<div className="bg-muted/50 rounded-lg p-3">
						<p className="font-medium text-foreground mb-1">Length & Format</p>
						<p className="text-sm text-muted-foreground">
							1-2 pages for entry-level, 2-3 for experienced. Use clear formatting, consistent fonts.
						</p>
					</div>
					<div className="bg-muted/50 rounded-lg p-3">
						<p className="font-medium text-foreground mb-1">Keywords Matter</p>
						<p className="text-sm text-muted-foreground">
							Include relevant keywords from job posting (ATS systems scan for these)
						</p>
					</div>
					<div className="bg-muted/50 rounded-lg p-3">
						<p className="font-medium text-foreground mb-1">Achievement-Focused</p>
						<p className="text-sm text-muted-foreground">
							Use action verbs, quantify achievements ({'"increased revenue by 25%"'})
						</p>
					</div>
					<div className="bg-muted/50 rounded-lg p-3">
						<p className="font-medium text-foreground mb-1">Tailored Versions</p>
						<p className="text-sm text-muted-foreground">
							Create variations for different job types and industries
						</p>
					</div>
					<div className="bg-muted/50 rounded-lg p-3">
						<p className="font-medium text-foreground mb-1">Recent & Relevant</p>
						<p className="text-sm text-muted-foreground">
							Highlight recent experience first, remove experience older than 10-15 years
						</p>
					</div>
				</div>
			</FeatureCard>

			<FeatureCard
				title="Cover Letter Guidelines"
				description="Craft compelling cover letters that stand out"
				// icon={<span className="text-lg">💌</span>}
				index={2}
			>
				<ul className="space-y-2">
					<ListItem>Keep it to one page (3-4 short paragraphs)</ListItem>
					<ListItem>Open with a strong hook explaining your interest</ListItem>
					<ListItem>Show knowledge of the company and role</ListItem>
					<ListItem>Highlight 2-3 key achievements relevant to the position</ListItem>
					<ListItem>Close with a call to action and thank them</ListItem>
					<ListItem>Proofread multiple times for errors</ListItem>
					<ListItem>Personalize for each company</ListItem>
				</ul>
			</FeatureCard>

			<FeatureCard
				title="Portfolio & Links"
				description="Showcase your work effectively"
				// icon={<span className="text-lg">🔗</span>}
				index={3}
			>
				<div className="space-y-3">
					<div className="bg-muted/50 rounded-lg p-3">
						<p className="font-medium text-foreground mb-1">GitHub Profile</p>
						<p className="text-sm text-muted-foreground">
							For developers: maintain clean, well-documented repositories
						</p>
					</div>
					<div className="bg-muted/50 rounded-lg p-3">
						<p className="font-medium text-foreground mb-1">Personal Website/Portfolio</p>
						<p className="text-sm text-muted-foreground">
							Showcase projects, case studies, and professional brand
						</p>
					</div>
					<div className="bg-muted/50 rounded-lg p-3">
						<p className="font-medium text-foreground mb-1">LinkedIn Profile</p>
						<p className="text-sm text-muted-foreground">
							Keep updated, use professional photo, active recommendations
						</p>
					</div>
					<div className="bg-muted/50 rounded-lg p-3">
						<p className="font-medium text-foreground mb-1">Other Platforms</p>
						<p className="text-sm text-muted-foreground">
							Behance (design), Medium (writing), Kaggle (data science)
						</p>
					</div>
				</div>
			</FeatureCard>

			<FeatureCard
				title="Document Organization Tips"
				description="Keep your materials organized and accessible"
				// icon={<span className="text-lg">🗂️</span>}
				index={4}
			>
				<ul className="space-y-2">
					<ListItem checked>Name files clearly with dates (Resume_2024_Jan.pdf)</ListItem>
					<ListItem checked>Use version control to track resume updates</ListItem>
					<ListItem checked>Keep a master resume then create targeted versions</ListItem>
					<ListItem checked>Save cover letter templates for easy customization</ListItem>
					<ListItem checked>Maintain a list of professional references</ListItem>
					<ListItem checked>Back up important documents in cloud storage</ListItem>
					<ListItem checked>Tag documents for quick filtering</ListItem>
				</ul>
			</FeatureCard>

			<FeatureCard
				title="ATS Optimization"
				description="Ensure your resume passes Applicant Tracking Systems"
				// icon={<span className="text-lg">🤖</span>}
				index={5}
			>
				<ul className="space-y-2">
					<ListItem>Use standard formatting (avoid fancy fonts, graphics)</ListItem>
					<ListItem>Include relevant keywords from job description</ListItem>
					<ListItem>Use bullet points instead of paragraphs</ListItem>
					<ListItem>Save as PDF or Word format (check job posting)</ListItem>
					<ListItem>Avoid tables, headers within headers, columns</ListItem>
					<ListItem>Use common section headings (Experience, Education, etc.)</ListItem>
					<ListItem>Do not use headers or footers with critical information</ListItem>
				</ul>
			</FeatureCard>
		</SectionWrapper>
	);
}
