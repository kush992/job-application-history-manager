'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import PageDescription from '@/components/ui/page-description';
import PageTitle from '@/components/ui/page-title';
import { useApplications } from '@/hooks/useApplications';
import { jobApplicationSchema } from '@/lib/supabase/schema';
import { JobApplicationFormData } from '@/types/schema';
import { appRoutes } from '@/utils/constants';

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '../../ui/breadcrumb';
import { Card, CardContent } from '../../ui/card';
// import ErrorDisplay from '../../ui/error-display';
import Loader from '../../ui/loader';
import ApplicationDataForm from './Form';

type Props = {
	applicationId?: string;
	isUpdateForm?: boolean;
	isViewOnlyForm?: boolean;
};

const ApplicationFormView: FC<Props> = ({ applicationId, isUpdateForm }) => {
	// const { toast } = useToast();

	// const { data: application, isLoading } = useQuery({
	// 	queryKey: [QueryKeys.APPLICATION_BY_ID, applicationId, userId],
	// 	queryFn: () => applicationDataQueries.getOne(String(applicationId)),
	// 	enabled: !!applicationId,
	// });

	const { application, isLoadingApplication, addApplication, updateApplication } = useApplications({
		applicationId,
		enableSingle: true,
	});

	// const addLinksMutation = useMutation({
	// 	mutationFn: (links: string) => addLinks(links, String(application?.id)),
	// 	onSuccess: () => {
	// 		toast({
	// 			title: 'success',
	// 			description: 'File uploaded successfully',
	// 			variant: 'success',
	// 		});
	// 	},
	// 	onError: (error) => {
	// 		toast({ title: 'Error', description: <ErrorDisplay error={error} />, variant: 'destructive' });
	// 		console.error(error);
	// 	},
	// });

	// const createDocMutation = useMutation({
	// 	mutationFn: (data: JobApplicationFormData) => {
	// 		if (data.links) {
	// 			addLinksMutation.mutate(data.links);
	// 		}
	// 		return applicationDataQueries.add(data);
	// 	},
	// 	onSuccess: () => {
	// 		toast({
	// 			title: 'success',
	// 			description: 'Application added successfully',
	// 		});
	// 		router.back();
	// 	},
	// 	onError: (error) => {
	// 		toast({ title: 'Error', description: <ErrorDisplay error={error} /> });
	// 		console.error(error);
	// 	},
	// });

	// const updateDocMutation = useMutation({
	// 	mutationFn: (data: JobApplicationFormData) => {
	// 		if (data.links) {
	// 			addLinksMutation.mutate(data.links);
	// 		}

	// 		return applicationDataQueries.update(data, String(applicationId));
	// 	},
	// 	onSuccess: () => {
	// 		console.log('here');
	// 		toast({
	// 			title: 'success',
	// 			description: 'Application updated successfully',
	// 		});
	// 		router.back();
	// 	},
	// 	onError: (error) => {
	// 		toast({ title: 'Error', description: <ErrorDisplay error={error} /> });
	// 		console.error(error);
	// 	},
	// });

	const form = useForm<JobApplicationFormData>({
		resolver: zodResolver(jobApplicationSchema),
		defaultValues: {
			job_title: '',
			notes: '',
			company_name: '',
			company_domain: undefined,
			application_status: undefined,
			salary: undefined,
			salary_currency: undefined,
			salary_type: undefined,
			interview_date: undefined,
			links: undefined,
			location: undefined,
			job_link: undefined,
			job_posted_on: undefined,
			work_mode: undefined,
			contract_type: undefined,
			applied_at: new Date().toISOString(),
		},
	});

	useEffect(() => {
		if (isUpdateForm && application) {
			form.reset({
				job_title: application.job_title || '',
				notes: application.notes || '',
				company_name: application.company_name || '',
				company_domain: application.company_domain || undefined,
				application_status: application.application_status || undefined,
				salary: application.salary || undefined,
				salary_currency: application.salary_currency || undefined,
				salary_type: application.salary_type || undefined,
				interview_date: application.interview_date ? new Date(application.interview_date) : undefined,
				links: application.links || undefined,
				location: application.location || undefined,
				job_link: application.job_link || undefined,
				job_posted_on: application.job_posted_on || undefined,
				work_mode: application.work_mode || undefined,
				contract_type: application.contract_type || undefined,
				applied_at: application.applied_at
					? new Date(application.applied_at).toISOString()
					: new Date().toISOString(),
			});
		}
	}, [isUpdateForm, application, form]);

	async function onSubmit(data: JobApplicationFormData) {
		if (!data.application_status) {
			delete data.application_status;
		}

		if (!data.salary_currency) {
			delete data.salary_currency;
		}

		if (!data.salary_type) {
			delete data.salary_type;
		}

		if (data.interview_date) {
			data.interview_date = new Date(data.interview_date);
		}

		if (!isUpdateForm) {
			addApplication(data);
		} else {
			updateApplication({ data, applicationId: String(applicationId) });
		}
	}

	return (
		<div className="container">
			<Breadcrumb className="mb-4">
				<BreadcrumbList>
					<BreadcrumbLink href={appRoutes.home}>Home</BreadcrumbLink>
					<BreadcrumbSeparator />
					<BreadcrumbLink href={appRoutes.application}>Applications</BreadcrumbLink>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>{isUpdateForm ? 'Update' : 'Add'}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<div className="mb-6">
				<PageTitle title={isUpdateForm ? 'Update' : 'Add latest applied'} />
				<PageDescription description="Fill up all the details that are available" />
			</div>

			{isLoadingApplication ? (
				<Loader />
			) : (
				<Card className="bg-background rounded-none border-[0px] md:rounded-xl md:border mb-6">
					<CardContent className="pt-6 px-4 md:px-6">
						<ApplicationDataForm form={form} onSubmit={onSubmit} />
					</CardContent>
				</Card>
			)}
		</div>
	);
};

export default ApplicationFormView;
