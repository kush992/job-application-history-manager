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
