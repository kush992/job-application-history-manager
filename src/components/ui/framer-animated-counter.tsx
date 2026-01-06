'use client';

import { animate, Easing, motion, useInView, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';

type NumberCounterProps = {
	from?: number;
	to: number;
	duration?: number;
	delay?: number;
	decimals?: number;
	ease?: Easing | Easing[];
	autoStart?: boolean;
	loop?: boolean;
	resetOnExit?: boolean;

	// Styling
	fontSize?: string;
	fontWeight?: number | string;
	fontFamily?: string;
	color?: string;
	align?: 'left' | 'center' | 'right';
};

export function FramerAnimatedCounter({
	from = 0,
	to,
	duration = 1.5,
	delay = 0,
	decimals = 0,
	ease = 'easeOut',
	autoStart = true,
	loop = false,
	resetOnExit = false,
	fontSize = '2rem',
	fontWeight = 600,
	fontFamily = 'inherit',
	color = 'currentColor',
	align = 'center',
}: NumberCounterProps) {
	const ref = useRef<HTMLSpanElement>(null);
	const isInView = useInView(ref, { margin: '-50px' });

	const value = useMotionValue(from);

	const formatted = useTransform(value, (latest) => latest.toFixed(decimals));

	useEffect(() => {
		if (!autoStart) return;
		if (!isInView) {
			if (resetOnExit) value.set(from);
			return;
		}

		const controls = animate(value, to, {
			duration,
			delay,
			ease,
			repeat: loop ? Infinity : 0,
			repeatType: 'loop',
		});

		return controls.stop;
	}, [autoStart, isInView, from, to, duration, delay, ease, loop, resetOnExit, value]);

	return (
		<span
			ref={ref}
			style={{
				display: 'inline-block',
				minWidth: 'fit-content',
				textAlign: align,
				fontSize,
				fontWeight,
				fontFamily,
				color,
				fontVariantNumeric: 'tabular-nums',
			}}
		>
			<motion.span className='text-5xl'>{formatted}</motion.span>
		</span>
	);
}
