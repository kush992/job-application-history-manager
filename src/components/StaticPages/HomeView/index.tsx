'use client';
// import { MoveRight } from 'lucide-react';
// import Image from 'next/image';
// import Link from 'next/link';
// import React from 'react';

// import BentoGrid from '@/components/ui/BentoGrid/BentoGrid';
// import { TestimonialCarousel } from '@/components/ui/TestimonialCarousel';
// import testimonials from '@/data/testimonials';
// import { appRoutes } from '@/utils/constants';

// import { Button } from '../../ui/button';

const bentoItems = [
	{
		id: 'easy',
		title: 'Easy Application Entry',
		desc: 'Quickly add job applications with company, position, location and status.',
		image: 'https://storage.googleapis.com/job-application-manager/easy_add_applications.png',
	},
	{
		id: 'community',
		title: 'Community Sharing',
		desc: 'Share interview questions and insights with the community to help others succeed.',
		// image: 'https://storage.googleapis.com/job-application-manager/easy_add_application.png',
	},
	{
		id: 'journey',
		title: 'Journey Tracking',
		desc: 'Create and manage application journeys to group related opportunities and track progress.',
		image: 'https://storage.googleapis.com/job-application-manager/journey_tracking.png',
	},
	{
		id: 'analytics',
		title: 'Smart Analytics',
		desc: 'Visualize your application data with charts and insights to optimize your job search strategy.',
		image: 'https://storage.googleapis.com/job-application-manager/smart_analytics.png',
	},

	{
		id: 'interview',
		title: 'Interview Management',
		desc: 'Schedule interviews, store questions, and track your preparation progress.',
		// image: 'https://storage.googleapis.com/job-application-manager/easy_add_application.png',
	},
	{
		id: 'docs',
		title: 'Document Storage',
		desc: 'Upload and organize resumes, cover letters, and other application materials.',
		image: 'https://storage.googleapis.com/job-application-manager/document_storage.png',
	},
	{
		id: 'ai',
		title: 'Smart AI Insights',
		desc: 'Get automated insights and recommendations from your application data using AI.',
		image: 'https://storage.googleapis.com/job-application-manager/smart_ai_insights.png',
	},
];

const timeline = [
	{
		icon: Lightbulb,
		year: 'The Beginning',
		title: 'A Vision Takes Shape',
		description:
			'Founded by Kush Bhalodi with a singular mission: to transform how job seekers track their application journey.',
	},
	{
		icon: Rocket,
		year: 'The Launch',
		title: 'JobJourney Goes Live',
		description:
			'We launched our platform to eliminate clunky spreadsheets and provide a centralized, user-friendly portal.',
	},
	{
		icon: Heart,
		year: 'Growing Community',
		title: 'Building Connections',
		description: 'Job seekers joined our community, sharing insights and helping each other succeed.',
	},
	{
		icon: Target,
		year: 'Today',
		title: 'Empowering Careers',
		description:
			'We continue to innovate, adding AI features and expanding our tools to help you land your dream job.',
	},
];

// const HomeView = () => {
// 	return (
// 		<>
// 			<header className="relative isolate px-6 pt-14 lg:px-8 bg-gradient-to-b from-background">
// 				<div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
// 					<div className="text-center">
// 						<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance md:text-6xl leading-tight text-white">
// 							Track Every Job Application <br />
// 							<span className="bg-gradient-to-r from-indigo-500 to-secondary-foreground bg-clip-text text-transparent">
// 								Level Up Your Career
// 							</span>
// 						</h1>
// 						<p className="leading-7 [&:not(:first-child)]:mt-6 text-secondary-foreground">
// 							JobJourney helps you organize, analyze, and improve your job search with visual insights —
// 							so you can focus on what works and land faster.
// 						</p>
// 						<nav className="mt-10 flex items-center justify-center gap-x-6" aria-label="Main navigation">
// 							<Link href={appRoutes.application} aria-label="Get started with JobJourney">
// 								<Button size="lg">Get Started Free</Button>
// 							</Link>
// 							<Link href={appRoutes.aboutUs} aria-label="Learn more about JobJourney">
// 								<Button variant="ghost" className="flex gap-2 items-center font-semibold">
// 									Learn more <MoveRight className="h-4 w-4" aria-hidden="true" />
// 								</Button>
// 							</Link>
// 						</nav>
// 					</div>
// 					<Image
// 						src="https://storage.googleapis.com/job-application-manager/journey_analytics.png"
// 						width={600}
// 						height={400}
// 						alt="JobJourney application dashboard showing analytics, application tracking, and job search insights with visual charts and graphs"
// 						className="hidden md:block mt-12 rounded-xl shadow-lg border border-slate-200 hover:scale-105 transition-transform duration-300 mx-auto"
// 						priority
// 						loading="eager"
// 					/>
// 				</div>
// 			</header>

// 			{/* Features */}
// 			<section className="py-20" aria-labelledby="features-heading">
// 				<div className="container mx-auto px-6 text-center">
// 					<h2
// 						id="features-heading"
// 						className="scroll-m-20 text-center pb-2 text-3xl font-semibold tracking-tight first:mt-0"
// 					>
// 						Everything You Need to Win the Job
// 					</h2>
// 					<p className="leading-7 [&:not(:first-child)]:mt-6 text-secondary-foreground">
// 						Comprehensive tools to manage your entire job search process
// 					</p>
// 					<BentoGrid items={bentoItems} />
// 				</div>
// 			</section>

// 			<section aria-labelledby="stats-heading">
// 				<div className="bg-background py-24 sm:py-32">
// 					<div className="mx-auto max-w-7xl px-6 lg:px-8">
// 						<h2
// 							id="stats-heading"
// 							className="scroll-m-20 text-center pb-2 text-3xl font-semibold tracking-tight first:mt-0"
// 						>
// 							Trusted by applicants worldwide
// 						</h2>
// 						<dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
// 							<div className="mx-auto flex max-w-xs flex-col gap-y-4">
// 								<dt className="text-base/7 text-secondary-foreground">New users annually</dt>
// 								<dd
// 									className="order-first text-3xl font-semibold tracking-tight sm:text-5xl"
// 									aria-label="Approximately 70 new users annually"
// 								>
// 									≈70
// 								</dd>
// 							</div>
// 							<div className="mx-auto flex max-w-xs flex-col gap-y-4">
// 								<dt className="text-base/7 text-secondary-foreground">Applications added</dt>
// 								<dd
// 									className="order-first text-3xl font-semibold tracking-tight sm:text-5xl"
// 									aria-label="Over 400 applications added"
// 								>
// 									400+
// 								</dd>
// 							</div>
// 							<div className="mx-auto flex max-w-xs flex-col gap-y-4">
// 								<dt className="text-base/7 text-secondary-foreground">Journeys created</dt>
// 								<dd
// 									className="order-first text-3xl font-semibold tracking-tight sm:text-5xl"
// 									aria-label="Over 20 journeys created"
// 								>
// 									20+
// 								</dd>
// 							</div>
// 						</dl>
// 					</div>
// 				</div>
// 			</section>

// 			{/* Testimonials carousel */}
// 			<section className="py-16" aria-labelledby="testimonials-heading">
// 				<div className="container w-full mx-auto px-6">
// 					<h2 id="testimonials-heading" className="sr-only">
// 						User Testimonials
// 					</h2>
// 					<TestimonialCarousel items={testimonials} />
// 				</div>
// 			</section>

// 			{/* Final CTA */}
// 			<section
// 				className="py-16 bg-gradient-to-t from-background to-secondary dark:to-black text-center"
// 				aria-labelledby="cta-heading"
// 			>
// 				<div className="container">
// 					<h2 id="cta-heading" className="text-3xl font-bold">
// 						Start Tracking Smarter Today
// 					</h2>
// 					<p className="mt-4 text-secondary-foreground">
// 						Join candidates who already use JobJourney to get better results in less time.
// 					</p>
// 					<Link href={appRoutes.application}>
// 						<Button
// 							size="lg"
// 							variant="secondary"
// 							className="mt-6"
// 							aria-label="Get started with JobJourney for free"
// 						>
// 							Get Started Free
// 						</Button>
// 					</Link>
// 				</div>
// 			</section>
// 		</>
// 	);
// };

// export default HomeView;

import { motion } from 'framer-motion';
import { Heart, Lightbulb, MoveRight, Rocket, Target } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import BentoGrid from '@/components/ui/BentoGrid/BentoGrid';
import { Button } from '@/components/ui/button';
import { CardContent, CardHeader } from '@/components/ui/card';
import { FramerAnimatedCounter } from '@/components/ui/framer-animated-counter';
import { TestimonialCarousel } from '@/components/ui/TestimonialCarousel';
import { TimelineItem } from '@/components/ui/timeline-item';
import testimonials from '@/data/testimonials';
import { fadeUp, sectionStagger, stagger } from '@/lib/motion';
import { appRoutes } from '@/utils/constants';

const MotionSection = motion.section;

const HomeView = () => {
	return (
		<>
			{/* Hero */}
			<header className="px-6 pt-14 lg:px-8 bg-background">
				<div className="mx-auto max-w-3xl py-44 sm:py-40">
					<motion.div
						initial="hidden"
						animate="show"
						variants={stagger}
						className="flex flex-col justify-center items-center text-center gap-8"
					>
						<motion.h1
							variants={fadeUp}
							className="scroll-m-20 text-5xl font-extrabold tracking-tight md:text-7xl text-foreground"
						>
							Track Every Job Application <br />
							<span className="text-muted-foreground">Level Up Your Career</span>
						</motion.h1>

						<motion.p variants={fadeUp} className="text-lg leading-7 text-muted-foreground">
							JobJourney helps you organize, analyze, and improve your job search with visual insights —
							so you can focus on what works and land faster.
						</motion.p>

						<motion.nav variants={fadeUp} className="mt-10 flex items-center justify-center gap-x-6">
							<Link href={appRoutes.application}>
								<Button size="lg">Get Started Free</Button>
							</Link>

							<Link href={appRoutes.aboutUs}>
								<Button variant="ghost" className="flex gap-2 items-center font-semibold">
									Learn more <MoveRight className="h-4 w-4" />
								</Button>
							</Link>
						</motion.nav>
					</motion.div>
					<motion.div
						initial={{ opacity: 0, y: 40, scale: 0.95 }}
						animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
						transition={{ delay: 0.4, duration: 0.6 }}
						whileInView="show"
						viewport={{ once: true }}
					>
						<Image
							src="https://storage.googleapis.com/job-application-manager/journey_analytics.png"
							width={1000}
							height={1000}
							alt="JobJourney dashboard preview"
							className="hidden md:block mt-12 rounded-xl border shadow-lg mx-auto"
							priority
						/>
					</motion.div>
				</div>
			</header>

			{/* Features */}
			<MotionSection
				initial="hidden"
				whileInView="show"
				viewport={{ once: true, margin: '-100px' }}
				variants={stagger}
				className="py-24"
			>
				<div className="container mx-auto px-6 text-center">
					<motion.h2
						variants={fadeUp}
						className="scroll-m-20 text-3xl md:text-4xl font-extrabold tracking-tight text-foreground"
					>
						Everything You Need to Win the Job
					</motion.h2>
					<motion.p variants={fadeUp} className="mt-4 text-muted-foreground">
						Comprehensive tools to manage your entire job search process
					</motion.p>

					<BentoGrid items={bentoItems} />
				</div>
			</MotionSection>

			{/* Stats */}
			<MotionSection
				initial="hidden"
				whileInView="show"
				viewport={{ once: true }}
				variants={stagger}
				className="py-24 bg-background"
			>
				<div className="mx-auto max-w-7xl px-6">
					<div className="flex flex-col items-center">
						<motion.span
							variants={fadeUp}
							className="inline-flex items-center px-4 py-1.5 rounded-full bg-accent text-primary text-sm font-medium mb-4"
						>
							Statistics
						</motion.span>
						<motion.h2
							variants={fadeUp}
							className="scroll-m-20 text-3xl md:text-4xl font-extrabold tracking-tight text-foreground text-center"
						>
							Trusted by applicants worldwide
						</motion.h2>
					</div>

					<div className="mt-16 grid grid-cols-1 gap-12 text-center lg:grid-cols-3">
						{[
							{ label: 'New users annually', value: '70', prefix: '≈' },
							{ label: 'Applications added', value: '400', prefix: '+' },
							{ label: 'Journeys created', value: '20', prefix: '+' },
						].map((stat) => (
							<motion.div
								viewport={{ once: true }}
								initial="hidden"
								whileInView="show"
								key={stat.label}
								variants={fadeUp}
							>
								<div className="flex justify-center items-center">
									<span className="mt-2 text-xl text-muted-foreground">{stat.prefix}</span>
									<FramerAnimatedCounter to={Number(stat.value)} />
								</div>
								<div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>
							</motion.div>
						))}
					</div>
				</div>
			</MotionSection>

			{/* Testimonials */}
			<section className="py-24">
				<div className="container mx-auto px-6">
					<div className="flex flex-col items-center mb-12 text-center">
						<motion.span
							variants={fadeUp}
							className="inline-flex items-center px-4 py-1.5 rounded-full bg-accent text-primary text-sm font-medium mb-4"
						>
							Testimonials
						</motion.span>
						<motion.h2
							variants={fadeUp}
							className="scroll-m-20 text-3xl md:text-4xl font-extrabold tracking-tight text-foreground"
						>
							Applicants Love JobJourney
						</motion.h2>
					</div>
					<TestimonialCarousel items={testimonials} />
				</div>
			</section>

			<section className="bg-background py-24">
				<div className="container mx-auto px-4">
					{/* Header */}
					<motion.div
						initial="hidden"
						whileInView="show"
						viewport={{ once: true, margin: '-100px' }}
						variants={sectionStagger}
						className="text-center mb-16"
					>
						<motion.span
							variants={fadeUp}
							className="inline-flex items-center px-4 py-1.5 rounded-full bg-accent text-primary text-sm font-medium mb-4"
						>
							Our Story
						</motion.span>

						<motion.h2
							variants={fadeUp}
							className="scroll-m-20 text-3xl md:text-4xl font-extrabold tracking-tight text-foreground"
						>
							The JobJourney Timeline
						</motion.h2>
					</motion.div>

					{/* Timeline */}
					<motion.div
						initial="hidden"
						whileInView="show"
						viewport={{ once: true, margin: '-80px' }}
						variants={sectionStagger}
						className="max-w-2xl mx-auto"
					>
						{timeline.map((item, index) => (
							<motion.div key={item.title} variants={fadeUp}>
								<TimelineItem {...item} index={index} isLast={index === timeline.length - 1} />
							</motion.div>
						))}
					</motion.div>
				</div>
			</section>

			{/* CTA */}
			<MotionSection
				initial={{ opacity: 0, y: 24 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className="py-16 text-center"
				transition={{ duration: 0.6, delay: 0.15 }}
			>
				<div className="container">
					<CardHeader>
						<h2 className="scroll-m-20 text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
							Start Tracking Smarter Today
						</h2>
						<p className="mt-4 text-muted-foreground">
							Join candidates who already use JobJourney to get better results in less time.
						</p>
					</CardHeader>

					<CardContent>
						<Link href={appRoutes.application}>
							<Button size="lg" className="mt-6">
								Get Started Free
							</Button>
						</Link>
					</CardContent>
				</div>
			</MotionSection>
		</>
	);
};

export default HomeView;
