import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { appRoutes } from '@/utils/constants';
import { Analytics } from '@vercel/analytics/next';
import { ChevronRight, MoveRight } from 'lucide-react';
import Link from 'next/link';
import { featureData } from './utility';

export default function HomePage() {
	return (
		<>
			<section>
				<div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 z-10 relative">
					<Link
						href={appRoutes.pricing}
						className="inline-flex justify-between items-center py-1 px-1 pe-4 mb-7 text-sm bg-lightGreenAccent rounded-full text-darkGreenAccent"
					>
						<span className="text-xs bg-darkGreenAccent rounded-full text-white px-4 py-1.5 me-3">New</span>
						<span className="text-sm font-medium">Available now - Premium plan</span>
						<ChevronRight className="text-darkGreenAccent" />
					</Link>
					<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
						Welcome to JobJourney – Your Job Application Tracker
					</h1>
					<p className="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground">
						Streamline Your Job Search with Precision and Ease
					</p>
					<div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center my-6">
						<Link href={appRoutes.signUp}>
							<Button size="lg" className="flex items-center gap-2">
								Get started <MoveRight />
							</Button>
						</Link>
						<Link href={appRoutes.aboutUs}>
							<Button size="lg" variant="outline" className="flex items-center gap-2">
								Learn More
							</Button>
						</Link>
					</div>
				</div>
				<div className="bg-gradient-to-b from-secondary to-transparent dark:from-background w-full h-full absolute top-0 left-0 z-0"></div>
			</section>

			<section>
				<div className="py-4 px-4 mx-auto max-w-screen-xl text-center lg:py-8 z-10 relative">
					<h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
						Tired of spreadsheets for tracking job applications?
					</h2>
					<p className="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground">
						With JobJourney, effortlessly manage and track every application, from submissions to
						interviews, in a single portal. Forget Excel – our tool is designed to organize all your
						application data, including files, notes, and interview insights, all in one place for easy
						access and analysis.{' '}
					</p>
				</div>
			</section>

			<section>
				<div className="py-4 px-4 mx-auto max-w-screen-xl text-center lg:py-8 z-10 relative">
					<h2 className="mt-10 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
						How JobJourney Works
					</h2>
					<div className="grid md:grid-cols-2 gap-8">
						{featureData.map((data) => (
							<Card key={data.tag}>
								<CardHeader className="text-center">
									<CardDescription>
										<p className="bg-lightGreenAccent text-darkGreenAccent text-xs font-medium inline-flex items-center text-center px-2.5 py-0.5 rounded-md w-fit mb-2">
											{data.tag}
										</p>
									</CardDescription>
									<h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
										{data.title}
									</h3>
								</CardHeader>
								<CardContent>
									<p className="leading-7 text-muted-foreground">{data.description}</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			<Analytics />
		</>
	);
}
