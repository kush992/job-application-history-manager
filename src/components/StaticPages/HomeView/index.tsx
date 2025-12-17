import { Calendar, ChartCandlestick, FileUp, Map, Plus, Share2 } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader } from '../../ui/card';

const HomeView = () => {
	return (
		<>
			{/* Hero */}
			<section className="bg-gradient-to-b from-primary to-secondary dark:to-black">
				<div className="container mx-auto px-6 py-20 flex flex-col-reverse md:flex-row items-center gap-10">
					<div className="flex-1 text-center md:text-left">
						<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance md:text-6xl leading-tight text-white">
							Track Every Job Application <br />
							<span className="bg-gradient-to-r from-indigo-500 to-secondary-foreground bg-clip-text text-transparent">
								Level Up Your Career
							</span>
						</h1>
						<p className="leading-7 [&:not(:first-child)]:mt-6 text-secondary-foreground">
							JobJourney helps you organize, analyze, and improve your job search with visual insights —
							so you can focus on what works and land faster.
						</p>
						<div className="mt-8 flex gap-4 justify-center md:justify-start">
							<Button size="lg">Get Started Free</Button>
							<Button size="lg" variant="outline">
								View Demo
							</Button>
						</div>
					</div>
					<div className="flex-1 flex justify-center">
						<div className="relative w-full max-w-md">
							<Image
								src="https://storage.googleapis.com/job-application-manager/journey_analytics.png"
								width={600}
								height={400}
								alt="JobJourney Dashboard"
								className="rounded-xl shadow-lg border border-slate-200 hover:scale-105 transition-transform duration-300"
							/>
						</div>
					</div>
				</div>
			</section>

			{/* Features */}
			<section className="py-20">
				<div className="container mx-auto px-6 text-center">
					<h2 className="scroll-m-20 text-center pb-2 text-3xl font-semibold tracking-tight first:mt-0">
						Everything You Need to Win the Job
					</h2>
					<p className="leading-7 [&:not(:first-child)]:mt-6 text-secondary-foreground">
						Comprehensive tools to manage your entire job search process
					</p>
					<div className="grid md:grid-cols-3 gap-8 pt-8">
						<Card>
							<CardHeader className="pb-2">
								<Plus className="p-2 h-10 w-10 text-primary-foreground bg-primary rounded-md" />
							</CardHeader>
							<CardContent className="text-left">
								<h3 className="text-lg font-semibold mb-2">Easy Application Entry</h3>
								<p className="text-sm text-muted-foreground">
									Quickly add job applications with all relevant details including company, position,
									location, and status.
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="pb-2">
								<Map className="p-2 h-10 w-10 text-primary-foreground bg-primary rounded-md" />
							</CardHeader>
							<CardContent className="text-left">
								<h3 className="text-lg font-semibold mb-2">Journey Tracking</h3>
								<p className="text-sm text-muted-foreground">
									Create and manage application journeys to group related opportunities and track
									progress.
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="pb-2">
								<ChartCandlestick className="p-2 h-10 w-10 text-primary-foreground bg-primary rounded-md" />
							</CardHeader>
							<CardContent className="text-left">
								<h3 className="text-lg font-semibold mb-2">Smart Analytics</h3>
								<p className="text-sm text-muted-foreground">
									Visualize your application data with charts and insights to optimize your job search
									strategy.
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="pb-2">
								<Calendar className="p-2 h-10 w-10 text-primary-foreground bg-primary rounded-md" />
							</CardHeader>
							<CardContent className="text-left">
								<h3 className="text-lg font-semibold mb-2">Interview Management</h3>
								<p className="text-sm text-muted-foreground">
									Schedule interviews, store questions, and track your preparation progress.
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="pb-2">
								<FileUp className="p-2 h-10 w-10 text-primary-foreground bg-primary rounded-md" />
							</CardHeader>
							<CardContent className="text-left">
								<h3 className="text-lg font-semibold mb-2">Document Storage</h3>
								<p className="text-sm text-muted-foreground">
									Upload and organize resumes, cover letters, and other application materials.
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="pb-2">
								<Share2 className="p-2 h-10 w-10 text-primary-foreground bg-primary rounded-md" />
							</CardHeader>
							<CardContent className="text-left">
								<h3 className="text-lg font-semibold mb-2">Community Sharing</h3>
								<p className="text-sm text-muted-foreground">
									Share interview questions and insights with the community to help others succeed.
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			<section>
				<div className="bg-background py-24 sm:py-32">
					<div className="mx-auto max-w-7xl px-6 lg:px-8">
						<h2 className="scroll-m-20 text-center pb-2 text-3xl font-semibold tracking-tight first:mt-0">
							Trusted by applicants worldwide
						</h2>
						<dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
							<div className="mx-auto flex max-w-xs flex-col gap-y-4">
								<dt className="text-base/7 text-secondary-foreground">New users annually</dt>
								<dd className="order-first text-3xl font-semibold tracking-tight sm:text-5xl">≈70</dd>
							</div>
							<div className="mx-auto flex max-w-xs flex-col gap-y-4">
								<dt className="text-base/7 text-secondary-foreground">Applications added</dt>
								<dd className="order-first text-3xl font-semibold tracking-tight sm:text-5xl">400+</dd>
							</div>
							<div className="mx-auto flex max-w-xs flex-col gap-y-4">
								<dt className="text-base/7 text-secondary-foreground">Journeys created</dt>
								<dd className="order-first text-3xl font-semibold tracking-tight sm:text-5xl">20+</dd>
							</div>
						</dl>
					</div>
				</div>
			</section>

			{/* Final CTA */}
			<section className="py-16 bg-gradient-to-t from-primary to-secondary dark:to-black text-center">
				<div className="container ">
					<h2 className="text-3xl font-bold">Start Tracking Smarter Today</h2>
					<p className="mt-4 text-secondary-foreground">
						Join candidates who already use JobJourney to get better results in less time.
					</p>
					<Button size="lg" variant="secondary" className="mt-6">
						Get Started Free
					</Button>
				</div>
			</section>
		</>
	);
};

export default HomeView;
