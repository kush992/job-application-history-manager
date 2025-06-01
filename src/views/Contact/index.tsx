import ContactForm from '@/components/Contact/ContactForm';
import ContactInfo from '@/components/Contact/ContactInfo';
import { Card, CardContent } from '@/components/ui/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Contact Us | JobJourney',
	description: "Get in touch with the JobJourney team. We're here to help you navigate your career path.",
};

export default function ContactView() {
	return (
		<main>
			<div className="container mx-auto px-6 py-16 mt-[70px] min-h-screen h-full flex flex-col justify-center">
				<div className="grid md:grid-cols-2 gap-16 mx-auto h-full">
					<ContactInfo />

					{/* <div className="bg-accent flex flex-1 flex-col items-center justify-center px-6 py-6 h-full md:py-24"></div> */}
					<Card>
						<CardContent className='pt-6'>
							<ContactForm />
						</CardContent>
					</Card>
				</div>
			</div>
		</main>
	);
}
