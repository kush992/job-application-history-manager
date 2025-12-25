import React from 'react';

import { StructuredData } from '@/components/SEO/StructuredData';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../ui/accordion';

const FaqView = () => {
	const faqData = {
		title: 'Frequently Asked Questions',
		description: 'Find answers to common questions about JobJourney below',
		questionsAndAnswers: [
			{
				question: 'How does JobJourney organize job applications?',
				answer: 'JobJourney provides structured fields for each job application, including company name, job title, application status, interview notes, and options to upload related files.',
			},
			{
				question: 'Can I access my data on multiple devices?',
				answer: 'Yes! JobJourney is accessible from any internet-connected device, providing flexibility for on-the-go tracking.',
			},
			{
				question: 'How do I use the interview questions feature?',
				answer: 'After each interview, you can add questions, answers, and notes to the application\'s interview section. Choose to keep these notes private or share them with the community on the public interview questions page.',
			},
			{
				question: 'What are the file upload limits?',
				answer: 'Currently, you can upload common file types (PDF, DOCX, images) for each application. In the Free plan, files are stored for up to 20 applications.',
			},
			{
				question: 'Is JobJourney really free?',
				answer: 'Yes, our Free plan offers full access to essential features. The Premium plan will add more advanced features and unlimited application tracking.',
			},
		],
	};

	return (
		<>
			<StructuredData
				type="faq"
				data={{
					faq: faqData.questionsAndAnswers,
				}}
			/>
			<section className="flex flex-col items-center gap-10 w-full motion-preset-slide-down" aria-labelledby="faq-heading">
				<div className="pt-4 text-center">
					<h1 id="faq-heading" className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
						{faqData.title}
					</h1>
					<p className="leading-7 [&:not(:first-child)]:mt-6">{faqData.description}</p>
				</div>
				<Accordion type="single" collapsible className="max-w-3xl w-full mx-auto" aria-label="FAQ Questions">
					{faqData.questionsAndAnswers.map((qa, index) => (
						<AccordionItem key={index} value={`item-${index}`} className="bg-background rounded-md p-2">
							<AccordionTrigger className="text-left">{qa.question}</AccordionTrigger>
							<AccordionContent>{qa.answer}</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</section>
		</>
	);
};

export default FaqView;
