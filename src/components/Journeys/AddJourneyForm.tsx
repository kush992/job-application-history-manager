'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FormField } from '@/components/ui/form-field';
import { FormMessage } from '@/components/ui/form-message';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { apiRoutes, appRoutes } from '@/utils/constants';
import { JourneyFormData } from '@/types/schema';
import { journeySchema } from '@/lib/supabase/schema';
import { Checkbox } from '../ui/checkbox';

export function AddJourneyForm() {
	const [isPending, startTransition] = useTransition();
	const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
	const router = useRouter();

	const form = useForm<JourneyFormData>({
		resolver: zodResolver(journeySchema),
		defaultValues: {
			title: '',
			description: '',
			is_active: false,
			start_date: new Date().toISOString().split('T')[0], // Today's date
			end_date: null,
		},
	});

	const handleSubmit = (data: JourneyFormData) => {
		startTransition(async () => {
			try {
				const response = await fetch(apiRoutes.journeys.add, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data),
				});

				const result = await response.json();

				if (!response.ok) {
					setMessage({ type: 'error', text: result.error });
					if (result.fieldErrors) {
						Object.entries(result.fieldErrors).forEach(([field, errors]) => {
							form.setError(field as keyof JourneyFormData, {
								message: (errors as string[])?.[0],
							});
						});
					}
				} else {
					setMessage({ type: 'success', text: result.success });
					setTimeout(() => {
						router.push(appRoutes.journeys);
					}, 1500);
				}
			} catch (error) {
				setMessage({ type: 'error', text: 'An unexpected error occurred. Please try again.' });
			}
		});
	};

	return (
		<Card className="w-full max-w-2xl mx-auto">
			<CardHeader>
				<div className="flex items-center gap-4">
					<Link href={appRoutes.journeys}>
						<Button variant="outline" size="sm">
							<ArrowLeft className="h-4 w-4 mr-2" />
							Back
						</Button>
					</Link>
					<div>
						<CardTitle>Create New Journey</CardTitle>
						<CardDescription>Set up a new job search campaign to track your applications</CardDescription>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				{message && (
					<div className="mb-6">
						<FormMessage type={message.type} message={message.text} />
					</div>
				)}

				<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
					<FormField
						id="title"
						label="Journey Title"
						placeholder="e.g., Software Engineer 2024, Career Change to Data Science"
						error={form.formState.errors.title?.message}
						register={form.register('title')}
						required
					/>

					<div className="space-y-2">
						<Label htmlFor="description">Description</Label>
						<Textarea
							id="description"
							placeholder="Describe your job search goals and strategy..."
							{...form.register('description')}
							className={form.formState.errors.description ? 'border-red-500 focus:border-red-500' : ''}
						/>
						{form.formState.errors.description && (
							<p className="text-sm text-red-600">{form.formState.errors.description.message}</p>
						)}
					</div>

					<div className="space-y-2">
						<Label className="flex items-center space-x-2">
							<Checkbox
								id="is_active"
								checked={form.watch('is_active')}
								onCheckedChange={(checked) => form.setValue('is_active', !!checked)}
							/>
							<span>Active Journey</span>
						</Label>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<FormField
							id="start_date"
							label="Start Date"
							type="date"
							error={form.formState.errors.start_date?.message}
							register={form.register('start_date')}
							required
						/>

						<FormField
							id="end_date"
							label="End Date (Optional)"
							type="date"
							error={form.formState.errors.end_date?.message}
							register={form.register('end_date')}
						/>
					</div>

					<div className="flex gap-4">
						<Button type="submit" className="flex-1" disabled={isPending}>
							{isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
							Create Journey
						</Button>
						<Link href={appRoutes.journeys}>
							<Button type="button" variant="outline" className="px-8 bg-transparent">
								Cancel
							</Button>
						</Link>
					</div>
				</form>
			</CardContent>
		</Card>
	);
}
