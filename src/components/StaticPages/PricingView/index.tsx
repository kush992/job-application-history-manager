'use client';

import cn from 'classnames';
import { motion } from 'framer-motion';
import { CheckIcon, MoveRightIcon } from 'lucide-react';
import React from 'react';

import { appRoutes } from '@/utils/constants';

import { Button } from '../../ui/button';

const tiers = [
	{
		name: 'Trail',
		id: 'tier-trial',
		href: appRoutes.signUp,
		priceMonthly: '$0',
		description: "The trial plan if you're just getting started with our product.",
		features: ['Up to 1 journey', 'Up to 100 applications', 'Private interview insights'],
		featured: false,
	},
	{
		name: 'Premium',
		id: 'tier-premium',
		href: appRoutes.signUp,
		priceMonthly: '$12',
		description: 'Full access of JobJourney for you to advance your career.',
		features: [
			'Unlimited journeys',
			'Unlimited applications',
			'Unlimited interview insights on the public page',
			'Unlimited file uploads',
			'AI-powered application analysis with deep research',
			'AI-powered goal insights',
			'AI-powered adding applications',
		],
		featured: true,
	},
];

const PricingView = () => {
	return (
		<section>
			<div className="relative isolate py-24 sm:py-32 lg:px-8">
				<div className="mx-auto max-w-4xl text-center motion-preset-slide-up-md motion-preset-fade-lg">
					<h1 className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">Pricing</h1>
					<p className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
						Designed for candidates like you
					</p>
					<p className="mx-auto pt-6 text-center text-md font-medium text-pretty text-accent-foreground">
						Choose an affordable plan that’s packed with the best features for engaging your audience,
						creating customer loyalty, and driving sales.
					</p>
				</div>
				<div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
					{tiers.map((tier, tierIdx) => (
						<>
							<motion.div
								key={tier.id}
								className={cn(
									tier.featured
										? 'relative bg-gray-900 shadow-2xl dark:bg-gray-800 dark:shadow-none'
										: 'sm:mx-8 lg:mx-0',
									tier.featured
										? ''
										: tierIdx === 0
											? 'rounded-t-3xl sm:rounded-b-none lg:rounded-tr-none lg:rounded-bl-3xl'
											: 'sm:rounded-t-none lg:rounded-tr-3xl lg:rounded-bl-none',
									'rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10 dark:ring-white/10',
								)}
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true, amount: 0.3 }}
								variants={{
									hidden: { opacity: 0, y: 40 },
									visible: {
										opacity: 1,
										y: 0,
										scale: 1,
										transition: {
											duration: 0.6,
											ease: 'easeOut',
											delay: tierIdx * 0.15,
										},
									},
								}}
							>
								<h3
									id={tier.id}
									className={cn(
										tier.featured ? 'text-indigo-400' : 'text-indigo-600 dark:text-indigo-400',
										'text-base/7 font-semibold',
									)}
								>
									{tier.name}
								</h3>
								<p className="mt-4 flex items-baseline gap-x-2">
									<span
										className={cn(
											tier.featured ? 'text-white' : 'text-gray-900 dark:text-white',
											'text-5xl font-semibold tracking-tight',
										)}
									>
										{tier.priceMonthly}
									</span>
									<span
										className={cn(
											tier.featured ? 'text-gray-400' : 'text-gray-500 dark:text-gray-400',
											'text-base',
										)}
									>
										/month
									</span>
								</p>
								<p
									className={cn(
										tier.featured ? 'text-gray-300' : 'text-gray-600 dark:text-gray-300',
										'mt-6 text-base/7',
									)}
								>
									{tier.description}
								</p>
								<ul
									role="list"
									className={cn(
										tier.featured ? 'text-gray-300' : 'text-gray-600 dark:text-gray-300',
										'mt-8 space-y-3 text-sm/6 sm:mt-10',
									)}
								>
									{tier.features.map((feature) => (
										<li key={feature} className="flex gap-x-3">
											<CheckIcon
												aria-hidden="true"
												className={cn(
													tier.featured
														? 'text-indigo-400'
														: 'text-indigo-600 dark:text-indigo-400',
													'h-6 w-5 flex-none',
												)}
											/>
											{feature}
										</li>
									))}
								</ul>
								<a
									href={tier.href}
									aria-describedby={tier.id}
									className={cn(
										'mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10',
									)}
								>
									<Button className="w-full gap-2" variant={tier.featured ? 'default' : 'secondary'}>
										Get started today
										<MoveRightIcon className="w-4 h-4" />
									</Button>
								</a>
							</motion.div>
						</>
					))}
				</div>
			</div>
		</section>
	);
};

export default PricingView;
