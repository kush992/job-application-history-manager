'use client';

import { motion } from 'framer-motion';

import { fadeUp } from '@/lib/motion';

import BentoTile, { BentoItem } from './BentoTile';

type Props = {
	items: BentoItem[];
};

export default function BentoGrid({ items }: Props) {
	const padded = [...items];
	//   while (padded.length < 7) padded.push({ id: `empty-${padded.length}`, title: '', desc: '', image: '' });
	// Split into three sequential chunks
	const perColumn = Math.ceil(padded.length / 5);
	const cols: BentoItem[][] = [
		padded.slice(0, 2),
		padded.slice(2, perColumn + 2),
		padded.slice(perColumn + 2, padded.length),
	];

	return (
		<div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
			{cols.map((col, i) => (
				<motion.div
					variants={{
						hidden: { opacity: 0, y: 50 },
						show: { opacity: 1, y: 0 },
					}}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true }}
					key={i}
					className="flex flex-col gap-6 h-full"
					transition={{ duration: 0.6, delay: i * 0.15 }}
				>
					{col.map((it, _) => (
						<motion.div
							key={it.id}
							variants={fadeUp}
							initial="hidden"
							whileInView="show"
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: _ * 0.15 }}
						>
							<BentoTile item={it} />
						</motion.div>
					))}
				</motion.div>
			))}
		</div>
	);
}
