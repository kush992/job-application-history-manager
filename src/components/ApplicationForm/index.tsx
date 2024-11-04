'use client';

import { FC } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, JobApplicationFormData } from './utility';
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
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { addDocument, addLinks, fetchApplicationDataById, updateDocument } from '@/lib/server/appwrite-queries';

type Props = {
	documentId?: string;
	isUpdateForm?: boolean;
	isViewOnlyForm?: boolean;
	userId: string;
};

const ApplicationForm: FC<Props> = ({ documentId, isUpdateForm, userId }) => {
	const router = useRouter();
	const { toast } = useToast();

	const { data: applicationData, isLoading } = useSuspenseQuery({
		queryKey: [QueryKeys.APPLICATION_BY_ID, documentId, userId],
		queryFn: () => fetchApplicationDataById(String(documentId), userId),
	});

	const addLinksMutation = useMutation({
		mutationFn: (links: string) => addLinks(links, applicationData.documents[0].$id, userId),
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
			return addDocument(data);
		},
		onSuccess: () => {
			toast({
				title: 'success',
				description: 'Application added successfully',
			});
			router.push(appRoutes.application);
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
			console.log(documentId);
			return updateDocument(data, String(documentId));
		},
		onSuccess: () => {
			toast({
				title: 'success',
				description: 'Application updated successfully',
			});
			router.push(appRoutes.application);
		},
		onError: (error) => {
			toast({ title: 'Error', description: error?.message });
			console.error(error);
		},
	});

	const initialFormData: JobApplicationFormData = {
		userId: applicationData?.userId || userId,
		jobTitle: applicationData.jobTitle,
		jobDescription: applicationData.jobDescription,
		companyName: applicationData?.companyName,
		companyDomain: applicationData?.companyDomain || undefined,
		feedbackFromCompany: applicationData?.feedbackFromCompany,
		applicationStatus: applicationData?.applicationStatus,
		salary: applicationData?.salary || undefined,
		salaryCurrency: applicationData?.salaryCurrency,
		salaryType: applicationData?.salaryType,
		interviewDate: applicationData?.interviewDate || undefined,
		links: applicationData?.links || undefined,
	};

	const form = useForm<JobApplicationFormData>({
		resolver: zodResolver(formSchema),
		defaultValues: { ...initialFormData },
		values: { ...initialFormData },
	});

	async function onSubmit(data: JobApplicationFormData) {
		if (!data.applicationStatus) {
			delete data.applicationStatus;
		}

		if (!data.salaryCurrency) {
			delete data.salaryCurrency;
		}

		if (!data.salaryType) {
			delete data.salaryType;
		}

		if (!isUpdateForm) {
			createDocMutation.mutate(data);
		} else {
			updateDocMutation.mutate(data);
		}
	}

	return (
		<div className="flex flex-col gap-6">
			<div className="px-4 pt-4">
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

			{isLoading ? <Loader /> : <ApplicationDataForm form={form} onSubmit={onSubmit} />}
		</div>
	);
};

export default ApplicationForm;
