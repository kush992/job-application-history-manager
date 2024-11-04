import React from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../ui/card';
import { Button } from '../ui/button';
import { Check, MoveRightIcon } from 'lucide-react';
import { appRoutes } from '@/utils/constants';

const PricingPage = () => {
	return (
		<section>
			<div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
				<div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
					<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
						Designed for Candidates like you
					</h1>
					<p className="leading-7 [&:not(:first-child)]:mt-6">
						Explore {"JobJourney's"} plans:
					</p>
				</div>
				<div className="space-y-8 flex flex-col md:flex-row justify-center sm:gap-6 xl:gap-10 lg:space-y-0">
					<Card className="max-w-[400px] w-full">
						<CardHeader className="text-center">
							<CardTitle>Starter</CardTitle>
							<CardDescription>
								Best option for personal use & for your next
								project.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="mr-2 text-3xl font-extrabold text-center mb-8">
								Free
							</p>
							<ul
								role="list"
								className="space-y-4 text-left !m-0"
							>
								<li className="flex items-center space-x-3">
									<Check />
									<span>Individual configuration</span>
								</li>
								<li className="flex items-center space-x-3">
									<Check />
									<span>No setup, or hidden fees</span>
								</li>
								<li className="flex items-center space-x-3">
									<Check />
									<span>
										Team size:{' '}
										<span className="font-semibold">
											100+ developers
										</span>
									</span>
								</li>
								<li className="flex items-center space-x-3">
									<Check />
									<span>
										Premium support:{' '}
										<span className="font-semibold">
											36 months
										</span>
									</span>
								</li>
								<li className="flex items-center space-x-3">
									<Check />
									<span>
										Free updates:{' '}
										<span className="font-semibold">
											36 months
										</span>
									</span>
								</li>
							</ul>
						</CardContent>
						<CardFooter>
							<a href={appRoutes.signUp} className="w-full">
								<Button
									className="w-full gap-2"
									variant="secondary"
								>
									Get started <MoveRightIcon />
								</Button>
							</a>
						</CardFooter>
					</Card>

					<Card className="max-w-[400px] w-full">
						<CardHeader className="text-center">
							<CardTitle>Starter</CardTitle>
							<CardDescription>
								Best option for personal use & for your next
								project.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="mr-2 text-3xl font-extrabold text-center mb-8">
								Coming Soon
							</p>
							<ul
								role="list"
								className="space-y-4 text-left !m-0"
							>
								<li className="flex items-center space-x-3">
									<Check />
									<span>Individual configuration</span>
								</li>
								<li className="flex items-center space-x-3">
									<Check />
									<span>No setup, or hidden fees</span>
								</li>
								<li className="flex items-center space-x-3">
									<Check />
									<span>
										Team size:{' '}
										<span className="font-semibold">
											100+ developers
										</span>
									</span>
								</li>
								<li className="flex items-center space-x-3">
									<Check />
									<span>
										Premium support:{' '}
										<span className="font-semibold">
											36 months
										</span>
									</span>
								</li>
								<li className="flex items-center space-x-3">
									<Check />
									<span>
										Free updates:{' '}
										<span className="font-semibold">
											36 months
										</span>
									</span>
								</li>
							</ul>
						</CardContent>
						<CardFooter>
							{/* <a href="#" className="w-full"> */}
							<Button className="w-full gap-2" disabled>
								Get started <MoveRightIcon />
							</Button>
							{/* </a> */}
						</CardFooter>
					</Card>
				</div>
			</div>
		</section>
	);
};

export default PricingPage;
