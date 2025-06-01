import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
	'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
	{
		variants: {
			variant: {
				default: 'border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80',
				secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
				destructive:
					'border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80',
				outline: 'text-foreground',
				'status-default': 'border-transparent bg-status-default text-white',
				'status-in-progress': 'border-transparent bg-status-inProgress text-white',
				'status-success': 'border-transparent bg-status-success text-white',
				'status-failure': 'border-transparent bg-status-failure text-white',
				// feature: 'border-transparent bg-feature-purple text-white',
				purple: 'border-transparent bg-badge-purple-bg text-badge-purple-text hover:bg-badge-purple-bg/90',
				violet: 'border-transparent bg-badge-violet-bg text-badge-violet-text hover:bg-badge-violet-bg/90',
				indigo: 'border-transparent bg-badge-indigo-bg text-badge-indigo-text hover:bg-badge-indigo-bg/90',
				fuchsia: 'border-transparent bg-badge-fuchsia-bg text-badge-fuchsia-text hover:bg-badge-fuchsia-bg/90',
				pink: 'border-transparent bg-badge-pink-bg text-badge-pink-text hover:bg-badge-pink-bg/90',
				rose: 'border-transparent bg-badge-rose-bg text-badge-rose-text hover:bg-badge-rose-bg/90',
				sky: 'border-transparent bg-badge-sky-bg text-badge-sky-text hover:bg-badge-sky-bg/90',
				cyan: 'border-transparent bg-badge-cyan-bg text-badge-cyan-text hover:bg-badge-cyan-bg/90',
				teal: 'border-transparent bg-badge-teal-bg text-badge-teal-text hover:bg-badge-teal-bg/90',
				emerald: 'border-transparent bg-badge-emerald-bg text-badge-emerald-text hover:bg-badge-emerald-bg/90',
				lime: 'border-transparent bg-badge-lime-bg text-badge-lime-text hover:bg-badge-lime-bg/90',
				amber: 'border-transparent bg-badge-amber-bg text-badge-amber-text hover:bg-badge-amber-bg/90',
				orange: 'border-transparent bg-badge-orange-bg text-badge-orange-text hover:bg-badge-orange-bg/90',
			},
			size: {
				sm: 'px-2 py-0.5 !text-lg',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
	return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
