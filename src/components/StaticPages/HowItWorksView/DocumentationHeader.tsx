'use client';

'use client';

import { motion } from 'framer-motion';

export function DocumentationHeader() {
	return (
		<div className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-transparent py-16 md:py-24">
			<div className="container mx-auto px-4">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.1 }}
					className="max-w-4xl mx-auto"
				>
					<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
						JobJourney Complete Guide
					</h1>
					<p className="text-muted-foreground py-6">
						Master every feature and get 100% value from JobJourney. From tracking applications to
						leveraging AI insights, everything you need to level up your career.
					</p>
					<div className="flex flex-col sm:flex-row gap-3">
						<div className="flex items-center gap-2 text-sm text-muted-foreground">
							<span className="w-2 h-2 rounded-full bg-primary" />7 Core Features
						</div>
						<div className="flex items-center gap-2 text-sm text-muted-foreground">
							<span className="w-2 h-2 rounded-full bg-primary" />
							Best Practices Included
						</div>
						<div className="flex items-center gap-2 text-sm text-muted-foreground">
							<span className="w-2 h-2 rounded-full bg-primary" />
							Real-World Examples
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
}
