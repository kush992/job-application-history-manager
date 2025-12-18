import React from 'react';

import BentoTile, { BentoItem } from './BentoTile';

type Props = {
	items: BentoItem[]; // expect 7 items in order
};

export default function BentoGrid({ items }: Props) {
	// Fallback: pad items to at least 7 with empty placeholders
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
		<div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
			{cols.map((col, i) => (
				<div key={i} className="flex flex-col gap-6 h-full">
					{col.map((it) => (
						<BentoTile key={it.id} item={it} />
					))}
				</div>
			))}
		</div>
	);
}
