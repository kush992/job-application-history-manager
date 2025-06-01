import Loader from '@/components/Loader';
import ContactView from '@/views/Contact';
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
