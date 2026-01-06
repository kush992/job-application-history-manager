export const fadeUp = {
	hidden: { opacity: 0, y: 24 },
	show: { opacity: 1, y: 0 },
};

export const stagger = {
	show: {
		transition: {
			staggerChildren: 0.12,
		},
	},
};

// timeline.motion.ts
export const sectionStagger = {
	hidden: {},
	show: {
		transition: {
			staggerChildren: 0.12,
		},
	},
};

export const sectionFadeUp = {
	hidden: { opacity: 0, y: 24 },
	show: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.6,
			ease: [0.22, 1, 0.36, 1], // modern easeOutExpo-ish
		},
	},
};

