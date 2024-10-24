import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';

type Props = {
	questionsAndAnswers: string[];
};

/**
 * @param questionsAndAnswers - array of strings with JSON stringify content questions and answers
 */
export function QnAAccordion({ questionsAndAnswers }: Props) {
	/**
	 * @param questionsAndAnswers - array of strings with JSON stringify content questions and answers
	 * @returns array of objects with `question` and `answer` attribute
	 */
	const questionsAndAnswersToRender = questionsAndAnswers.map(
		(questionsAndAnswer) => {
			const obj = JSON.parse(questionsAndAnswer);

			return { question: obj.question, answer: obj.answer };
		},
	);

	return (
		<Accordion type="single" collapsible className="w-full">
			{questionsAndAnswersToRender.map((qa, index) => (
				<AccordionItem key={index} value={`item-${index}`}>
					<AccordionTrigger>{qa.question}</AccordionTrigger>
					<AccordionContent>{qa.answer}</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	);
}
