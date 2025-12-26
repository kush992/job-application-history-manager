'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import ApplicationSearchSelect from '@/components/InterviewExperiences/ApplicationSearchSelect';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import TinyEditor from '@/components/ui/tiny-editor';
import { interviewExperienceFormSchema } from '@/lib/supabase/schema';
import { ApplicationStatus, InterviewExperienceCategory, InterviewExperienceFormData } from '@/types/schema';
import { appRoutes } from '@/utils/constants';
import { applicationStatusMapping } from '@/utils/utility';

type Props = {
	onSubmit: (data: InterviewExperienceFormData) => Promise<void>;
	defaultValues?: Partial<InterviewExperienceFormData>;
	isLoading?: boolean;
	title: string;
	description: string;
	submitText: string;
	isEditMode?: boolean;
};

const InterviewExperienceForm = ({ title, description, submitText, isLoading, defaultValues, onSubmit, isEditMode = false }: Props) => {
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedApplication, setSelectedApplication] = useState<{
		id: string;
		company_name: string;
		job_title: string;
	} | null>(null);

	const form = useForm<InterviewExperienceFormData>({
		resolver: zodResolver(interviewExperienceFormSchema),
		defaultValues: {
			job_application_id: null,
			company_name: '',
			job_title: '',
			interview_stage: null,
			rating: 0,
			category: InterviewExperienceCategory.INTERVIEW,
			content: '',
			is_public: true,
			...defaultValues,
		},
	});

	const jobApplicationId = form.watch('job_application_id');
	const hasNoApplicationResults = searchQuery && !selectedApplication && !jobApplicationId;

	// When user searches but doesn't select, use search query as company_name/job_title hint
	useEffect(() => {
		if (hasNoApplicationResults && searchQuery && !jobApplicationId) {
			// Split search query - assume format could be "Company - Position" or just one value
			const parts = searchQuery.split(' - ');
			if (parts.length >= 2) {
				form.setValue('company_name', parts[0].trim());
				form.setValue('job_title', parts.slice(1).join(' - ').trim());
			} else if (parts.length === 1 && searchQuery.trim()) {
				// If single value, use as company name
				form.setValue('company_name', searchQuery.trim());
			}
		}
	}, [hasNoApplicationResults, searchQuery, jobApplicationId, form]);

	useEffect(() => {
		if (defaultValues?.job_application_id) {
			form.setValue('job_application_id', defaultValues.job_application_id);
		}
	}, [defaultValues, form]);

	return (
		<Card className="w-full mx-auto motion-preset-slide-down-md">
			<CardHeader>
				<div className="flex flex-col gap-2">
					<CardTitle>{title}</CardTitle>
					<CardDescription>{description}</CardDescription>
				</div>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<FormField
							control={form.control}
							name="job_application_id"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Link to Application (Optional)</FormLabel>
									<FormDescription>
										Search and link this experience to an existing application. If linked, company name and
										job title will be auto-filled.
									</FormDescription>
									<FormControl>
										<ApplicationSearchSelect
											value={field.value || null}
											onChange={(applicationId, application) => {
												field.onChange(applicationId);
												setSelectedApplication(application);
												if (application) {
													form.setValue('company_name', application.company_name);
													form.setValue('job_title', application.job_title);
												} else {
													form.setValue('company_name', '');
													form.setValue('job_title', '');
												}
											}}
											onSearchChange={setSearchQuery}
											placeholder="Search for an application..."
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{hasNoApplicationResults && (
							<Alert>
								<AlertDescription className="text-xs">
									No matching application found. You can still add an experience for a past interview. The
									search query will be used as company name and/or job title. Both fields will be required in
									this case.
								</AlertDescription>
							</Alert>
						)}

						{(jobApplicationId || isEditMode) && (
							<FormField
								control={form.control}
								name="interview_stage"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Interview Stage</FormLabel>
										<FormDescription>
											Select the interview stage/round for this experience. A single application can have
											multiple interview experiences.
										</FormDescription>
										<Select
											value={field.value || undefined}
											onValueChange={(value) => field.onChange(value as ApplicationStatus)}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select interview stage" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{Object.entries(applicationStatusMapping).map(([key, label]) => (
													<SelectItem key={key} value={key}>
														{label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}

						{(!jobApplicationId || isEditMode) && (
							<>
								<FormField
									control={form.control}
									name="company_name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Company name {!jobApplicationId && <span className="text-destructive">*</span>}
											</FormLabel>
											<FormControl>
												<Input
													placeholder="e.g., Google, Amazon, Microsoft"
													{...field}
													value={field.value || ''}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="job_title"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Job title {!jobApplicationId && <span className="text-destructive">*</span>}
											</FormLabel>
											<FormControl>
												<Input
													placeholder="e.g., Software Engineer, Data Scientist"
													{...field}
													value={field.value || ''}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</>
						)}

						<FormField
							control={form.control}
							name="category"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Category</FormLabel>
									<FormDescription>Select the category of this experience</FormDescription>
									<Select
										value={field.value}
										onValueChange={(value) => field.onChange(value as InterviewExperienceCategory)}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select category" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{Object.values(InterviewExperienceCategory).map((category) => (
												<SelectItem key={category} value={category}>
													{category.replace('_', ' ')}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="rating"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Experience Rating</FormLabel>
									<FormDescription>Rate your overall interview experience</FormDescription>
									<Select
										value={field.value?.toString() || '0'}
										onValueChange={(value) => field.onChange(Number.parseInt(value))}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select rating" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="0">Good</SelectItem>
											<SelectItem value="1">Average</SelectItem>
											<SelectItem value="2">Poor</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="content"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Experience Content</FormLabel>
									<FormControl>
										<TinyEditor
											initialData={form.getValues('content') ?? ''}
											textareaName={'content'}
											onChange={(data: string) => form.setValue('content', data)}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="is_public"
							render={({ field }) => (
								<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
									<div className="space-y-0.5">
										<FormLabel className="text-base">Is public</FormLabel>
										<FormDescription>
											Mark this as public and we will share this experience anonymusly.
										</FormDescription>
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
							<Link href={appRoutes.interviewExperiences}>
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
};

export default InterviewExperienceForm;
