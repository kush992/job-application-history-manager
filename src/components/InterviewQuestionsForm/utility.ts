import { z } from 'zod';

export const formSchema = z.object({
	userId: z.string().optional().default(''),
	questionsAndAnswers: z
		.array(
			z.object({
				question: z.string(),
				answer: z.string(),
			}),
		)
		.optional(),
	isPrivate: z.boolean().optional(),
});

export type FormData = z.infer<typeof formSchema>;

export const normaliseQuestionsAndAnswers = (questionsAndAnswers: string[]) => {
	return questionsAndAnswers?.map((questionsAndAnswer) => {
		const obj = JSON.parse(questionsAndAnswer);

		return { question: obj.question, answer: obj.answer };
	});
};

export const denormaliseQuestionsAndAnswers = (questionsAndAnswers: FormData['questionsAndAnswers']) => {
	return questionsAndAnswers?.map((qa) => JSON.stringify(qa));
};
