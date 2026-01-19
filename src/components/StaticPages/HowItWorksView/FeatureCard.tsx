'use client';

'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface FeatureCardProps {
	title: string;
	description: string;
	icon?: ReactNode;
	children?: ReactNode;
	index?: number;
}

export function FeatureCard({ title, description, icon, children, index = 0 }: FeatureCardProps) {
	return (
		<motion.div
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
						delay: index * 0.15,
					},
				},
			}}
		>
			<Card className="border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
				<CardHeader>
					<div className="flex items-start justify-between gap-4">
						<div className="flex-1">
							<CardTitle className="text-xl mb-1">{title}</CardTitle>
							<CardDescription>{description}</CardDescription>
						</div>
						{icon && (
							<div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
								{icon}
							</div>
						)}
					</div>
				</CardHeader>
				{children && <CardContent className="space-y-3">{children}</CardContent>}
			</Card>
		</motion.div>
	);
}
