'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderIcon } from 'lucide-react';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ErrorDisplay from '@/components/ui/error-display';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import PageDescription from '@/components/ui/page-description';
import PageTitle from '@/components/ui/page-title';
import TinyEditor from '@/components/ui/tiny-editor';
import { config } from '@/config/config';
import { useAddWithAi } from '@/hooks/useAddWithAi';
import { jobApplicationSchemaAddWithAi } from '@/lib/supabase/schema';
import { apiRoutes, appRoutes } from '@/utils/constants';

import FileUpload from '../FileUpload';

const ApplicationFormAiView: FC = () => {
	const form = useForm({
		resolver: zodResolver(jobApplicationSchemaAddWithAi),
		defaultValues: {
			links: undefined,
			job_application_data: '',
		},
	});

	const { isLoading, data, error, addMutation } = useAddWithAi();

	const onSubmit = () => {
		addMutation({
			endpoint: `${window.origin}${apiRoutes.applications.add}`,
			rawText:
				form.getValues('job_application_data') +
				'uploaded files during this application are linked here for "links" attribute: ' +
				form.getValues('links'),
		});
	};

	return (
		<div className="container">
			<Breadcrumb className="mb-4">
				<BreadcrumbList>
					<BreadcrumbLink href={appRoutes.home}>Home</BreadcrumbLink>
					<BreadcrumbSeparator />
					<BreadcrumbLink href={appRoutes.application}>Applications</BreadcrumbLink>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>Add with AI</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<div className="mb-8 motion-preset-fade-md">
				<PageTitle title="Add latest applied" />
				<PageDescription description="Fill up all the details that are available" />
			</div>

			<Card className="bg-background rounded-none border-[0px] md:rounded-xl md:border mb-6">
				<CardContent className="pt-6 px-4 md:px-6">
					<Form {...form}>
						<form className="flex flex-col gap-6" onSubmit={form.handleSubmit(onSubmit)}>
							<FormField
								control={form.control}
								name="job_application_data"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Job Application Data *</FormLabel>
										<FormControl>
											<TinyEditor
												initialData={form.getValues('job_application_data')}
												textareaName="job_application_data"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{config.uiShowUploader === '1' && <FileUpload form={form} />}

							<Button type="submit" disabled={isLoading}>
								Save {isLoading && <LoaderIcon className="animate-spin h-6 w-6" />}
							</Button>
						</form>
					</Form>
				</CardContent>
			</Card>

			{error && <ErrorDisplay error={error} />}

			{data && (
				<pre className="bg-background text-status-success text-sm rounded-md border p-4 overflow-x-auto">
					<code>{JSON.stringify(data, null, 2)}</code>
				</pre>
			)}
		</div>
	);
};

export default ApplicationFormAiView;
