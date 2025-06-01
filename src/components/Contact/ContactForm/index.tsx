'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { ContactFormData, contactFormSchema } from './utility';

interface ApiResponse {
	success: boolean;
	message?: string;
	error?: string;
	code?: string;
	details?: Array<{ field: string; message: string }>;
}

export default function ContactForm() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { toast } = useToast();

	const form = useForm<ContactFormData>({
		resolver: zodResolver(contactFormSchema),
		defaultValues: {
			name: '',
			email: '',
			message: '',
			privacyPolicy: false,
		},
	});

	const onSubmit = async (data: ContactFormData) => {
		setIsSubmitting(true);

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			const result: ApiResponse = await response.json();

			if (response.ok && result.success) {
				toast({
					title: 'Message sent successfully!',
					description: result.message || "We'll get back to you as soon as possible.",
				});
				form.reset();
			} else {
				// Handle different error types
				if (result.code === 'RATE_LIMIT_EXCEEDED') {
					toast({
						title: 'Too many requests',
						description: 'Please wait a moment before sending another message.',
						variant: 'destructive',
					});
				} else if (result.code === 'VALIDATION_ERROR' && result.details) {
					// Handle field-specific validation errors
					result.details.forEach((detail) => {
						form.setError(detail.field as keyof ContactFormData, {
							type: 'server',
							message: detail.message,
						});
					});
					toast({
						title: 'Please check your inputs',
						description: 'Some fields contain invalid data.',
						variant: 'destructive',
					});
				} else {
					toast({
						title: 'Failed to send message',
						description: result.error || 'Please try again later.',
						variant: 'destructive',
					});
				}
			}
		} catch (error) {
			console.error('Network error:', error);
			toast({
				title: 'Network error',
				description: 'Please check your connection and try again.',
				variant: 'destructive',
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-md mx-auto">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-white text-base font-medium">Name</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder="Name"
									className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500 h-12 rounded-lg focus:border-gray-600 focus:ring-0"
								/>
							</FormControl>
							<FormMessage className="text-red-400" />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-white text-base font-medium">Email</FormLabel>
							<FormControl>
								<Input
									{...field}
									type="email"
									placeholder="Email"
									className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500 h-12 rounded-lg focus:border-gray-600 focus:ring-0"
								/>
							</FormControl>
							<FormMessage className="text-red-400" />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="message"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-white text-base font-medium">Message</FormLabel>
							<FormControl>
								<Textarea
									{...field}
									placeholder="Type your message"
									className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500 min-h-[120px] rounded-lg resize-none focus:border-gray-600 focus:ring-0"
								/>
							</FormControl>
							<FormMessage className="text-red-400" />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="privacyPolicy"
					render={({ field }) => (
						<FormItem className="flex flex-row items-start space-x-3 space-y-0">
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={field.onChange}
									className="border-gray-600 data-[state=checked]:bg-white data-[state=checked]:text-black"
								/>
							</FormControl>
							<div className="space-y-1 leading-none">
								<FormLabel className="text-gray-400 text-sm font-normal cursor-pointer">
									By selecting this you agree to our{' '}
									<a href="/privacy-policy" className="text-white underline hover:no-underline">
										Privacy Policy
									</a>
									.
								</FormLabel>
								<FormMessage className="text-red-400" />
							</div>
						</FormItem>
					)}
				/>

				<Button
					type="submit"
					disabled={isSubmitting}
					className="w-full h-12 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
				>
					{isSubmitting ? (
						<>
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							Sending...
						</>
					) : (
						'Send message'
					)}
				</Button>
			</form>
		</Form>
	);
}
