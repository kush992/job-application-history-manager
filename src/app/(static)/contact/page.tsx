import { Analytics } from '@vercel/analytics/next';
import { Suspense } from 'react';

import ContactView from '@/components/StaticPages/ContactView';
import Loader from '@/components/ui/loader';

export default function ContactPage() {
	return (
		<Suspense fallback={<Loader />}>
			<ContactView />
			<Analytics />
		</Suspense>
	);
}
