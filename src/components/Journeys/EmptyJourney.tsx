import { Link, Plus,RocketIcon } from 'lucide-react';
import React from 'react';

import { appRoutes } from '@/utils/constants';

import { Button } from '../ui/button';
import { Card, CardContent,CardDescription, CardHeader, CardTitle } from '../ui/card';

const EmptyJourney = () => {
	return (
		<div className="min-h-screen bg-appBackground bg-gradient-to-r from-transparent to-primary-foreground py-8 px-4 sm:px-6 lg:px-8">
			<div className="max-w-4xl mx-auto">
				<div className="text-center">
					<div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-blue-100">
						<RocketIcon className="h-12 w-12 text-primary" />
					</div>
					<h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight">
						Start Your Job Search Journey
					</h1>
					<p className="mt-4 text-lg text-secondary-foreground">
						Create your first journey to organize and track your job applications effectively.
					</p>
					<div className="mt-8">
						<Link href={appRoutes.addJourney}>
							<Button size="lg">
								<Plus className="h-5 w-5 mr-2" />
								Create Your First Journey
							</Button>
						</Link>
					</div>
				</div>

				<div className="mt-16">
					<Card className="max-w-2xl mx-auto">
						<CardHeader>
							<CardTitle>What is a Journey?</CardTitle>
							<CardDescription>Organize your job search into focused campaigns</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-start gap-3">
								<div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
									<span className="text-sm font-semibold text-primary">1</span>
								</div>
								<div>
									<h4 className="font-medium text-primary">Create a Journey</h4>
									<p className="text-sm text-secondary-foreground">
										Set up a journey for a specific job search campaign, like{' '}
										{`"Software Engineer
											2024"`}{' '}
										or {`"Career Change to Data Science"`}
									</p>
								</div>
							</div>
							<div className="flex items-start gap-3">
								<div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
									<span className="text-sm font-semibold text-primary">2</span>
								</div>
								<div>
									<h4 className="font-medium text-primary">Track Applications</h4>
									<p className="text-sm text-secondary-foreground">
										Add job applications to your journey and track their progress from application
										to offer
									</p>
								</div>
							</div>
							<div className="flex items-start gap-3">
								<div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
									<span className="text-sm font-semibold text-primary">3</span>
								</div>
								<div>
									<h4 className="font-medium text-primary">Stay Organized</h4>
									<p className="text-sm text-secondary-foreground">
										Keep all related applications, notes, and progress in one organized place
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default EmptyJourney;
