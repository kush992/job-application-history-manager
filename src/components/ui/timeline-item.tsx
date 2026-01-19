import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

import { Badge } from './badge';

interface TimelineItemProps {
	icon: LucideIcon;
	year: string;
	title: string;
	description: string;
	index: number;
	isLast?: boolean;
}

export const TimelineItem = ({ icon: Icon, year, title, description, index, isLast = false }: TimelineItemProps) => {
	return (
		<motion.div
			initial={{ opacity: 0, x: -30 }}
			whileInView={{ opacity: 1, x: 0 }}
			viewport={{ once: true, margin: '-50px' }}
			transition={{ duration: 0.6, delay: index * 0.15 }}
			className="relative flex items-start gap-6"
		>
			{/* Timeline line */}
			{!isLast && (
				<div className="absolute left-7 top-16 w-0.5 h-full bg-gradient-to-b from-primary/30 to-transparent" />
			)}

			{/* Icon circle */}
			<div className="relative z-10 flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-glow">
				<Icon className="w-6 h-6 text-primary-foreground" />
			</div>

			{/* Content */}
			<div className="flex-1 pb-12">
				<Badge variant="secondary" className="text-muted-foreground">
					{title}
				</Badge>
				<h3 className="text-xl font-display font-semibold text-foreground mb-2">{title}</h3>
				<p className="text-muted-foreground leading-relaxed">{description}</p>
			</div>
		</motion.div>
	);
};
