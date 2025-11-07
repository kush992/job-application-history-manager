import Loader from '@/components/ui/loader';
import ContactView from '@/components/StaticPages/ContactPage';
import { Analytics } from '@vercel/analytics/next';
import { Suspense } from 'react';

export default function ContactPage() {
	return (
		<Suspense fallback={<Loader />}>
			<ContactView />
			<Analytics />
		</Suspense>
	);
}
