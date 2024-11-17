'use client';
import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, QnAFormData, normaliseQuestionsAndAnswers, denormaliseQuestionsAndAnswers } from './utility';
import { appwriteDbConfig, database } from '@/appwrite/config';
import { ID } from 'appwrite';
import { useRouter } from 'next/navigation';
import Loader from '../Loader';
import { appRoutes } from '@/utils/constants';
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
import QuestionAndAnswerForm from './Form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { interviewQuestionsQueries } from '@/lib/server/interview-questions-queries';

type Props = {
	documentId?: string;
	isUpdateForm?: boolean;
	isViewOnlyForm?: boolean;
	userId: string;
};

const QnAForm: React.FC<Props> = ({ documentId, isUpdateForm, userId }) => {
	const router = useRouter();
	const { toast } = useToast();

	const { data, error, isLoading } = useQuery({
		queryKey: ['interviewQuestions', documentId],
		queryFn: () => interviewQuestionsQueries.getOne(String(documentId)),
		enabled: !!documentId,
	});

	const addDocMutation = useMutation({
		mutationFn: (formData: QnAFormData) => interviewQuestionsQueries.add(formData),
		onSuccess: () => {
			toast({
				title: 'Success',
				description: 'QnA added successfully',
			});
			router.push(appRoutes.application);
		},
		onError: (error) => {
			toast({
				title: 'Error',
				description: error?.message,
			});
			console.error(error);
		},
	});

	const updateDocMutation = useMutation({
		mutationFn: (formData: QnAFormData) => interviewQuestionsQueries.update(formData, String(documentId)),
		onSuccess: () => {
			toast({
				title: 'Success',
				description: 'QnA updated successfully',
			});
			router.push(appRoutes.application);
		},
		onError: (error) => {
			toast({
				title: 'Error',
				description: error?.message,
			});
			console.error(error);
		},
	});

	const initialFormData: QnAFormData = {
		userId: data?.userId || userId,
		isPrivate: data?.isPrivate,
		questionsAndAnswers: normaliseQuestionsAndAnswers(data?.questionsAndAnswers ?? []) || [],
	};

	const form = useForm<QnAFormData>({
		resolver: zodResolver(formSchema),
		defaultValues: { ...initialFormData },
		values: { ...initialFormData },
	});

	async function onSubmit(data: QnAFormData) {
		if (!isUpdateForm) {
			addDocMutation.mutate(data);
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
						<BreadcrumbLink href={appRoutes.application}>Interview Questions</BreadcrumbLink>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>{isUpdateForm ? 'Update' : 'Add'}</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>

				<PageTitle title={isUpdateForm ? 'Update' : 'Add latest applied'} />
				<PageDescription description="Add the latest applied questions and answers" />
			</div>

			{isLoading ? <Loader /> : <QuestionAndAnswerForm form={form} onSubmit={onSubmit} />}
			{error && <p>{error?.message}</p>}
		</div>
	);
};

export default QnAForm;
