import React from 'react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import { Form, FormDescription, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { QnAFormData } from '../utility';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, X } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';

type Props = {
	form: UseFormReturn<QnAFormData>;
	onSubmit: (data: QnAFormData) => Promise<void>;
};

const QuestionAndAnswerForm: React.FC<Props> = ({ form, onSubmit }) => {
	const { control, handleSubmit, getValues } = form;
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'questionsAndAnswers',
	});

	return (
		<Form {...form}>
			<form onSubmit={handleSubmit(onSubmit)} className="border p-4 rounded-md bg-background md:m-4">
				<div className="flex flex-col gap-2">
					<FormDescription>Enter the questions and answers</FormDescription>
					{fields.map((field, index: number) => (
						<div key={field.id} className="flex flex-col">
							<div className="w-full p-2">
								<FormField
									control={control}
									name={`questionsAndAnswers.${index}.question`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Question</FormLabel>
											<FormControl>
												<Input placeholder="Question" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={control}
									name={`questionsAndAnswers.${index}.answer`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Answer</FormLabel>
											<FormControl>
												<Textarea placeholder="Answer" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button type="button" variant="outline" onClick={() => remove(index)} className="mt-2">
									<X className="w-4 h-4" /> Remove
								</Button>
							</div>
						</div>
					))}

					<Button
						type="button"
						onClick={() => append({ question: '', answer: '' })}
						className="mt-4"
						variant="secondary"
					>
						<Plus className="w-4 h-4" /> Add Question and Answer
					</Button>

					<FormField
						control={form.control}
						name="isPrivate"
						render={({ field }) => (
							<FormItem className="flex flex-row items-start space-x-3 space-y-0">
								<FormControl>
									<Checkbox checked={field.value} onCheckedChange={field.onChange} />
								</FormControl>
								<div className="space-y-1 leading-none">
									<FormLabel>Is private</FormLabel>
									<FormDescription>
										Decide whether to make the questions and answers private or not.
									</FormDescription>
								</div>
							</FormItem>
						)}
					/>
				</div>

				<Button type="submit" className="mt-4 w-full">
					Submit
				</Button>
			</form>
		</Form>
	);
};

export default QuestionAndAnswerForm;
