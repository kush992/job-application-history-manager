'use client';

import { motion } from 'framer-motion';

import { DocumentationHeader } from './DocumentationHeader';
import { DocumentationTabs } from './DocumentationTabs';

export default function DocumentationContent() {
	return (
		<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="w-full">
			<DocumentationHeader />
			<div className="container mx-auto px-4 py-12 md:py-16">
				<DocumentationTabs />
			</div>
		</motion.div>
	);
}
