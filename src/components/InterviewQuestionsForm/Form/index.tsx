import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { FormData } from '../utility';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';

type Props = {
	form: UseFormReturn<FormData>;
	onSubmit: (data: FormData) => Promise<void>;
};

const QuestionAndAnswerForm: React.FC<Props> = ({ form, onSubmit }) => {
	const initialQuestionsAndAnswers = form.getValues('questionsAndAnswers') || [];

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='border p-4 rounded-md bg-background md:m-4'>
				<div className='flex flex-col gap-2'>
					<FormDescription>Enter the questions and answers</FormDescription>
					{initialQuestionsAndAnswers?.map((qa, index) => (
						<div key={index} className='flex flex-col p-4'>
							<FormField
								control={form.control}
								name={`questionsAndAnswers.${index}.question`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Question</FormLabel>
										<FormControl>
											<Input placeholder='Question' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name={`questionsAndAnswers.${index}.answer`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Answer</FormLabel>
										<FormControl>
											<Input placeholder='Answer' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Separator />
						</div>
					))}
				</div>

				<FormField
					control={form.control}
					name='isPrivate'
					render={({ field }) => (
						<FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md'>
							<FormControl>
								<Checkbox checked={field.value} onCheckedChange={field.onChange} />
							</FormControl>
							<div className='space-y-1 leading-none'>
								<FormLabel>Is Private</FormLabel>
								<FormDescription>Decide whether to show this in public gist available for everyone</FormDescription>
							</div>
						</FormItem>
					)}
				/>

				<Button type='submit' disabled={form.formState.isSubmitting}>
					Submit
				</Button>
			</form>
		</Form>
	);
};

export default QuestionAndAnswerForm;
