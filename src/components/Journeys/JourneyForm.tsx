'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { journeySchema } from '@/lib/supabase/schema';
import { JourneyFormData } from '@/types/schema';
import { appRoutes } from '@/utils/constants';
import { Switch } from '../ui/switch';
import { useEffect } from 'react';

interface JourneyFormProps {
	onSubmit: (data: JourneyFormData) => Promise<void>;
	defaultValues?: Partial<JourneyFormData>;
	isLoading?: boolean;
	title: string;
	description: string;
	submitText: string;
}

export function JourneyForm({ onSubmit, defaultValues, isLoading, title, description, submitText }: JourneyFormProps) {
	const form = useForm<JourneyFormData>({
		resolver: zodResolver(journeySchema),
		defaultValues: {
			title: defaultValues?.title || '',
			description: '',
			start_date: new Date().toISOString().split('T')[0],
			end_date: null,
			is_active: true,
			...defaultValues,
		},
	});

	useEffect(() => {
		if (defaultValues && defaultValues.title) {
			form.reset({
				title: defaultValues?.title,
				description: defaultValues.description,
				start_date: new Date().toISOString().split('T')[0],
				end_date: defaultValues.end_date ?? null,
				is_active: defaultValues.is_active,
			});
		}
	}, [defaultValues, form]);

	return (
		<Card className="w-full mx-auto motion-preset-slide-down-md">
			<CardHeader>
				<div className="flex flex-col items-start gap-4">
					<Link href={appRoutes.journeys}>
						<Button variant="outline" size="sm">
							<ArrowLeft className="h-4 w-4 mr-2" />
							Back
						</Button>
					</Link>
					<div className="flex flex-col gap-2">
						<CardTitle>{title}</CardTitle>
						<CardDescription>{description}</CardDescription>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Journey Title</FormLabel>
									<FormControl>
										<Input
											placeholder="e.g., Software Engineer 2024, Career Change to Data Science"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Describe your job search goals and strategy..."
											{...field}
											value={field.value || ''}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<FormField
								control={form.control}
								name="start_date"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Start Date</FormLabel>
										<FormControl>
											<Input
												type="date"
												{...field}
												value={
													field.value ? new Date(field.value).toISOString().split('T')[0] : ''
												}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="end_date"
								render={({ field }) => (
									<FormItem>
										<FormLabel>End Date (Optional)</FormLabel>
										<FormControl>
											<Input
												type="date"
												{...field}
												value={
													field.value instanceof Date
														? field.value.toISOString().split('T')[0]
														: field.value || ''
												}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<FormField
							control={form.control}
							name="is_active"
							render={({ field }) => (
								<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
									<div className="space-y-0.5">
										<FormLabel className="text-base">Active Journey</FormLabel>
										<FormDescription>Mark this journey as currently active</FormDescription>
									</div>
									<FormControl>
										<Switch checked={field.value} onCheckedChange={field.onChange} />
									</FormControl>
								</FormItem>
							)}
						/>

						<div className="flex gap-4">
							<Button type="submit" className="flex-1" disabled={isLoading}>
								{isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
								{submitText}
							</Button>
							<Link href={appRoutes.journeys}>
								<Button type="button" variant="outline" className="px-8 bg-transparent">
									Cancel
								</Button>
							</Link>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
