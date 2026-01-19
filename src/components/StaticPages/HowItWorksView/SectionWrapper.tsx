'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SectionWrapperProps {
	title: string;
	description: string;
	children: ReactNode;
}

export function SectionWrapper({ title, description, children }: SectionWrapperProps) {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.4 }}
			className="space-y-6 w-full"
		>
			<div>
				<h2 className="scroll-m-20 text-3xl font-extrabold tracking-tight">{title}</h2>
				<p className="text-muted-foreground">{description}</p>
			</div>
			<div className="grid gap-6 md:gap-8">{children}</div>
		</motion.div>
	);
}
