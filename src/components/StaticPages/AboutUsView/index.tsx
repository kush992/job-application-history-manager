import { Briefcase, FileText, MessageCircle, Users } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TestimonialCarousel } from '@/components/ui/TestimonialCarousel';
import testimonials from '@/data/testimonials';

const AboutUsPage: React.FC = () => {
	return (
		<div className="min-h-screen">
			<section className="py-20 motion-preset-slide-up">
				<div className="container mx-auto text-center">
					<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">About JobJourney</h1>
					<p className="leading-7 [&:not(:first-child)]:mt-6">
						Your comprehensive solution for organized and efficient job application management
					</p>
				</div>
			</section>

			<main className="mx-auto py-8">
				<section className="mb-16 container mx-auto motion-preset-slide-up delay-150 px-4">
					<Card>
						<CardHeader>
							<CardTitle className="text-center mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
								Welcome to JobJourney
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="leading-7 [&:not(:first-child)]:mt-6 text-center">
								Founded by Kush Bhalodi, JobJourney was developed with a singular mission: to transform
								the way job seekers track their application journey and streamline the often
								overwhelming process of job searching. With JobJourney, we eliminate the need for clunky
								spreadsheets and provide a centralized, user-friendly portal to manage every aspect of
								your job search.
							</p>
						</CardContent>
					</Card>
				</section>

				<section className="mb-16 container mx-auto motion-preset-slide-up delay-300 px-4">
					<Card className="shadow-xl">
						<CardHeader>
							<CardTitle className="text-center mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
								Our Vision
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="leading-7 [&:not(:first-child)]:mt-6 text-center">
								JobJourney was created to empower professionals by giving them control over their
								application process, providing detailed tracking, and helping them document every key
								moment along the way. We believe that job seekers should focus on pursuing career
								opportunities, not wrestling with disorganized data. Our platform is built to bring
								structure, clarity, and accessibility to the job application process, making it easier
								to keep track of everything from application submissions to interview notes.
							</p>
						</CardContent>
					</Card>
				</section>

				<section className="mb-16 bg-muted py-8">
					<div className="container mx-auto px-4">
						<h2 className="text-3xl font-bold mb-6 text-center">What We Offer</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center">
										<Briefcase className="mr-2 w-4 h-4" />
										Personalized Job Tracking
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground">
										Log and organize all your applications, track progress, and have easy access to
										your data anytime, anywhere.
									</p>
								</CardContent>
							</Card>
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center">
										<FileText className="mr-2 w-4 h-4" />
										Document Storage
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground">
										Keep all your files in one place, whether {"it's"} your resume, cover letters,
										or interview feedback.
									</p>
								</CardContent>
							</Card>
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center">
										<MessageCircle className="mr-2 w-4 h-4" />
										Interview Insights
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground">
										Record questions and answers, save insights, and share learnings to better
										prepare for future interviews.
									</p>
								</CardContent>
							</Card>
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center">
										<Users className="mr-2 w-4 h-4" />
										Community-Oriented Design
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground">
										Share interview experiences with other job seekers, or keep them private –
										JobJourney is adaptable to your needs.
									</p>
								</CardContent>
							</Card>
						</div>
					</div>
				</section>

				<section className="mb-16 container mx-auto px-4">
					<h2 className="text-3xl font-bold mb-6 text-center">Our Commitment</h2>
					<Card>
						<CardContent className="pt-6">
							<p className="leading-7 [&:not(:first-child)]:mt-6">
								We are committed to maintaining an intuitive platform that respects your privacy,
								safeguards your data, and continually improves to meet the evolving needs of job
								seekers. As JobJourney grows, so will our dedication to building tools that make the job
								search easier, smarter, and more productive.
							</p>
						</CardContent>
					</Card>
				</section>

				{/* <section className="mb-16 container mx-auto px-4">
					<h2 className="text-3xl font-bold mb-6 text-center">
						Our Founder
					</h2>
					<Card>
						<CardContent className="pt-6">
							<p className="leading-7 [&:not(:first-child)]:mt-6">
								Kush Bhalodi, the creator of JobJourney, understands the unique challenges of the job
								market and built this platform to provide a solution that directly addresses those
								challenges. His vision is one where job seekers are empowered by tools that simplify and
								elevate their search, and his dedication to innovation and user-centric design are the
								foundation of JobJourney.
							</p>
						</CardContent>
					</Card>
				</section> */}

				<section className="mb-16 px-4">
					<div className="container mx-auto py-8">
						<TestimonialCarousel items={testimonials} />
					</div>
				</section>

				<section className="text-center container mx-auto px-4">
					<h2 className="text-3xl font-bold mb-6">Join Us on the Journey</h2>
					<p className="leading-7 [&:not(:first-child)]:mt-6">
						JobJourney is more than a tool; {"it's"} a partner in your career advancement. Join us on this
						journey toward a smarter, more organized job search experience.
					</p>
					<Button size="lg">Get Started with JobJourney</Button>
				</section>
			</main>

			{/* <footer className="bg-muted mt-12 py-6">
				<div className="container mx-auto px-4 text-center text-muted-foreground">
					<p>&copy; 2023 JobJourney. All rights reserved.</p>
				</div>
			</footer> */}
		</div>
	);
};

export default AboutUsPage;
