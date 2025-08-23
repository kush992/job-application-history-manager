import HomePage from '@/components/Home';
import Loader from '@/components/Loader';
import { Analytics } from '@vercel/analytics/next';
import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { ChartColumn } from 'lucide-react';

export default function Home() {
	return (
		<Suspense fallback={<Loader />}>
			{/* <main className="flex flex-col h-full gap-4 container mx-auto">
				<HomePage />
				<Analytics />
			</main> */}

			<main className="">
				{/* Hero */}
				<section className="bg-gradient-to-b from-primary to-secondary dark:to-black">
					<div className="container mx-auto px-6 py-20 flex flex-col-reverse md:flex-row items-center gap-10">
						<div className="flex-1 text-center md:text-left">
							<h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-white">
								Track Every Job Application <br />
								<span className="bg-gradient-to-r from-indigo-500 to-secondary-foreground bg-clip-text text-transparent">
									Level Up Your Career
								</span>
							</h1>
							<p className="pt-8 text-secondary-foreground">
								JobJourney helps you organize, analyze, and improve your job search with visual insights
								— so you can focus on what works and land faster.
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
									src=""
									alt="JobJourney Dashboard"
									className="rounded-xl shadow-lg border border-slate-200 hover:scale-105 transition-transform duration-300"
								/>
							</div>
						</div>
					</div>
				</section>

				<section>
					<div className="bg-background py-24 sm:py-32">
						<div className="mx-auto max-w-7xl px-6 lg:px-8">
							<h2 className="text-center pb-8 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
								Trusted by applicants worldwide
							</h2>
							<dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
								<div className="mx-auto flex max-w-xs flex-col gap-y-4">
									<dt className="text-base/7 text-secondary-foreground">New users annually</dt>
									<dd className="order-first text-3xl font-semibold tracking-tight sm:text-5xl">
										100
									</dd>
								</div>
								<div className="mx-auto flex max-w-xs flex-col gap-y-4">
									<dt className="text-base/7 text-secondary-foreground">Applications added</dt>
									<dd className="order-first text-3xl font-semibold tracking-tight sm:text-5xl">
										400+
									</dd>
								</div>
								<div className="mx-auto flex max-w-xs flex-col gap-y-4">
									<dt className="text-base/7 text-secondary-foreground">Journeys created</dt>
									<dd className="order-first text-3xl font-semibold tracking-tight sm:text-5xl">
										20+
									</dd>
								</div>
							</dl>
						</div>
					</div>
				</section>

				{/* Features */}
				{/* <section className="py-20">
					<div className="container mx-auto px-6 text-center">
						<h2 className="text-3xl font-bold mb-12">Everything You Need to Win the Job</h2>
						<div className="grid md:grid-cols-3 gap-8">
							<Card className="hover:shadow-lg transition-shadow duration-300">
								<CardHeader>
									<CardTitle className="flex items-center justi">
										<ChartColumn className="h-6 w-6 text-primary" /> Visual Analytics
									</CardTitle>
								</CardHeader>
								<CardContent>See which platforms, roles, and strategies work best for you.</CardContent>
							</Card>
							<Card className="hover:shadow-lg transition-shadow duration-300">
								<CardHeader>
									<CardTitle className="text-cyan-500">🗂 Organized Journeys</CardTitle>
								</CardHeader>
								<CardContent>
									Group applications by each job search phase for better tracking.
								</CardContent>
							</Card>
							<Card className="hover:shadow-lg transition-shadow duration-300">
								<CardHeader>
									<CardTitle className="text-emerald-500">📁 Upload & Store</CardTitle>
								</CardHeader>
								<CardContent>
									Keep resumes, cover letters, and interview notes in one place.
								</CardContent>
							</Card>
						</div>
					</div>
				</section> */}

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
			</main>
		</Suspense>
	);
}
