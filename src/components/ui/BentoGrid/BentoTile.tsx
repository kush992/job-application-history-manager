// import Image from 'next/image';
// import React from 'react';

// import { Card, CardHeader } from '../card';

// export type BentoItem = {
// 	id: string;
// 	title: string;
// 	desc: string;
// 	image?: string;
// };

// type Props = {
// 	item: BentoItem;
// 	className?: string;
// };

// export default function BentoTile({ item, className = '' }: Props) {
// 	return (
// 		<Card className={`relative ${className}`}>
// 			{/* <div className="relative w-full flex-col overflow-hidden rounded-lg bg-transparent"> */}
// 			<CardHeader>
// 				<p className="mt-2 text-lg font-medium tracking-tight text-foreground">{item.title}</p>
// 				<p className="mt-2 max-w-lg text-sm text-muted-foreground">{item.desc}</p>
// 			</CardHeader>
// 			{item.image && (
// 				<div className="px-6">
// 					<Image
// 						alt={item.title}
// 						src={item.image}
// 						width={1200}
// 						height={700}
// 						className="w-full h-auto object-cover rounded-t-2xl border shadow-2xl"
// 					/>
// 				</div>
// 			)}
// 			{/* </div> */}
// 		</Card>
// 	);
// }

'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

import { Card, CardHeader } from '../card';

export type BentoItem = {
	id: string;
	title: string;
	desc: string;
	image?: string;
};

type Props = {
	item: BentoItem;
};

export default function BentoTile({ item }: Props) {
	const { title, desc, image } = item;

	return (
		<motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
			<Card className="relative h-full">
				<CardHeader>
					<p className="text-lg font-medium">{title}</p>
					<p className="mt-2 text-sm text-muted-foreground">{desc}</p>
				</CardHeader>

				{image && (
					<div className="px-6 pb-6">
						<Image
							alt={title}
							src={image}
							width={1200}
							height={700}
							className="rounded-lg border shadow-sm"
						/>
					</div>
				)}
			</Card>
		</motion.div>
	);
}
