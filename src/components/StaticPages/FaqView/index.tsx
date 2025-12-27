import React from 'react';

import { StructuredData } from '@/components/SEO/StructuredData';
import { Card, CardContent } from '@/components/ui/card';

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
				answer: "After each interview, you can add questions, answers, and notes to the application's interview section. Choose to keep these notes private or share them with the community on the public interview questions page.",
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
			<section
				className="flex flex-col items-center gap-10 w-full motion-preset-slide-down relative isolate px-6 py-24 sm:py-32 lg:px-8"
				aria-labelledby="faq-heading"
			>
				<div className="mx-auto max-w-4xl text-center">
					<h1 className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">{faqData.title}</h1>
					<p className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
						{faqData.description}
					</p>
				</div>
				<Card className="max-w-3xl mx-auto w-full">
					<CardContent>
						<Accordion type="multiple" aria-label="FAQ Questions">
							{faqData.questionsAndAnswers.map((qa, index) => (
								<AccordionItem key={index} value={`item-${index}`}>
									<AccordionTrigger>{qa.question}</AccordionTrigger>
									<AccordionContent className="text-muted-foreground">{qa.answer}</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
					</CardContent>
				</Card>
			</section>
		</>
	);
};

export default FaqView;
