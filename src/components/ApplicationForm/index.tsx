'use client';

import { FC } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Loader from '../Loader';
import { appRoutes, QueryKeys } from '@/utils/constants';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '../ui/breadcrumb';
import PageTitle from '@/components/ui/page-title';
import PageDescription from '@/components/ui/page-description';
import ApplicationDataForm from './Form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { applicationDataQueries } from '@/lib/server/application-queries';
import { addLinks } from '@/lib/server/application-docs-queries';
import { Card, CardContent } from '../ui/card';
import { JobApplicationFormData, WorkMode } from '@/types/schema';
import { jobApplicationSchema } from '@/lib/supabase/schema';

type Props = {
	documentId?: string;
	isUpdateForm?: boolean;
	isViewOnlyForm?: boolean;
	userId: string;
};

const ApplicationForm: FC<Props> = ({ documentId, isUpdateForm, userId }) => {
	const router = useRouter();
	const { toast } = useToast();

	const { data: applicationData, isLoading } = useQuery({
		queryKey: [QueryKeys.APPLICATION_BY_ID, documentId, userId],
		queryFn: () => applicationDataQueries.getOne(String(documentId)),
		enabled: !!documentId,
	});

	const addLinksMutation = useMutation({
		mutationFn: (links: string) => addLinks(links, String(applicationData?.id)),
		onSuccess: () => {
			toast({
				title: 'success',
				description: 'File uploaded successfully',
			});
		},
		onError: (error) => {
			toast({ title: 'Error', description: error?.message });
			console.error(error);
		},
	});

	const createDocMutation = useMutation({
		mutationFn: (data: JobApplicationFormData) => {
			if (data.links) {
				addLinksMutation.mutate(data.links);
			}
			return applicationDataQueries.add(data);
		},
		onSuccess: () => {
			toast({
				title: 'success',
				description: 'Application added successfully',
			});
			router.back();
		},
		onError: (error) => {
			toast({ title: 'Error', description: error?.message });
			console.error(error);
		},
	});

	const updateDocMutation = useMutation({
		mutationFn: (data: JobApplicationFormData) => {
			if (data.links) {
				addLinksMutation.mutate(data.links);
			}

			return applicationDataQueries.update(data, String(documentId));
		},
		onSuccess: () => {
			console.log('here');
			toast({
				title: 'success',
				description: 'Application updated successfully',
			});
			router.back();
		},
		onError: (error) => {
			toast({ title: 'Error', description: error?.message });
			console.error(error);
		},
	});

	const initialFormData: JobApplicationFormData = {
		job_title: applicationData?.job_title || '',
		notes: applicationData?.notes,
		company_name: applicationData?.company_name || '',
		company_domain: applicationData?.company_domain || undefined,
		application_status: applicationData?.application_status,
		salary: applicationData?.salary || undefined,
		salary_currency: applicationData?.salary_currency,
		salary_type: applicationData?.salary_type,
		interview_date: applicationData?.interview_date ? new Date(applicationData.interview_date) : undefined,
		links: applicationData?.links || undefined,
		location: applicationData?.location || undefined,
		job_link: applicationData?.job_link || undefined,
		job_posted_on: applicationData?.job_posted_on,
		work_mode: applicationData?.work_mode,
		contract_type: applicationData?.contract_type,
		applied_at: applicationData?.applied_at
			? new Date(applicationData.applied_at).toISOString()
			: new Date().toISOString(),
	};

	const form = useForm<JobApplicationFormData>({
		resolver: zodResolver(jobApplicationSchema),
		defaultValues: { ...initialFormData },
		values: { ...initialFormData } as JobApplicationFormData,
	});

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
			createDocMutation.mutate(data);
		} else {
			updateDocMutation.mutate(data);
		}
	}

	return (
		<div className="flex flex-col gap-6 md:container">
			<div className="px-4 md:px-0 pt-4">
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
				<PageTitle title={isUpdateForm ? 'Update' : 'Add latest applied'} />
				<PageDescription description="Fill up all the details that are available" />
			</div>

			{isLoading ? (
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

export default ApplicationForm;
