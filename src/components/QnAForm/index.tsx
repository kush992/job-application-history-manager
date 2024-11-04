'use client';
import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	formSchema,
	QnAFormData,
	normaliseQuestionsAndAnswers,
	denormaliseQuestionsAndAnswers,
} from './utility';
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
import {
	InterviewQuestionsData,
	JobApplicationData,
} from '@/types/apiResponseTypes';
import PageTitle from '@/components/ui/page-title';
import PageDescription from '@/components/ui/page-description';
import QuestionAndAnswerForm from './Form';

type Props = {
	documentId?: string;
	isUpdateForm?: boolean;
	isViewOnlyForm?: boolean;
	userId: string;
};

const QnAForm: React.FC<Props> = ({ documentId, isUpdateForm, userId }) => {
	const router = useRouter();
	const { toast } = useToast();

	const [isLoading, setIsLoading] = useState(false);
	const [interviewQAData, setInterviewQAData] =
		useState<InterviewQuestionsData>({} as InterviewQuestionsData);

	const initialFormData: QnAFormData = {
		userId: interviewQAData?.userId || userId,
		isPrivate: interviewQAData.isPrivate,
		questionsAndAnswers:
			normaliseQuestionsAndAnswers(
				interviewQAData?.questionsAndAnswers,
			) || [],
	};

	const form = useForm<QnAFormData>({
		resolver: zodResolver(formSchema),
		defaultValues: { ...initialFormData },
		values: { ...initialFormData },
	});

	async function onSubmit(data: QnAFormData) {
		if (!isUpdateForm) {
			addDocument(data);
		} else {
			updateDocument(data);
		}
	}

	function updateDocument(data: QnAFormData) {
		database
			.updateDocument(
				appwriteDbConfig.applicationDb,
				appwriteDbConfig.applicationDbInterviewQuestionsCollectionId,
				String(documentId),
				{
					...data,
					questionsAndAnswers: denormaliseQuestionsAndAnswers(
						data.questionsAndAnswers,
					),
				},
			)
			.then((response) => {
				toast({
					title: 'Success',
					description: 'Application updated successfully',
				});
				router.push(appRoutes.application);
			})
			.catch((error) => {
				console.error(error);

				toast({
					title: 'Error',
					description: 'Error updating application',
				});
			});
	}

	function addDocument(data: QnAFormData) {
		const documentId = ID.unique();
		database
			.createDocument(
				appwriteDbConfig.applicationDb,
				appwriteDbConfig.applicationDbInterviewQuestionsCollectionId,
				documentId,
				{
					...data,
					questionsAndAnswers: denormaliseQuestionsAndAnswers(
						data.questionsAndAnswers,
					),
				},
			)
			.then((response) => {
				toast({
					title: 'Success',
					description: 'Application added successfully',
				});
				router.push(appRoutes.application);
			})
			.catch((error) => {
				toast({
					title: 'Error',
					description: error?.message,
				});
				console.error(error);
			});
	}

	useEffect(() => {
		const getApplicationDataById = async () => {
			setIsLoading(true);
			try {
				const response = await database.getDocument(
					appwriteDbConfig.applicationDb,
					appwriteDbConfig.applicationDbInterviewQuestionsCollectionId,
					String(documentId),
				);

				if (response.$id) {
					setInterviewQAData(response as InterviewQuestionsData);
				}
			} catch (errors) {
				console.error(errors);
			} finally {
				setIsLoading(false);
			}
		};

		documentId && isUpdateForm && getApplicationDataById();
	}, [isUpdateForm, documentId]);

	return (
		<div className="flex flex-col gap-6">
			<div className="px-4 pt-4">
				<Breadcrumb className="mb-4">
					<BreadcrumbList>
						<BreadcrumbLink href={appRoutes.home}>
							Home
						</BreadcrumbLink>
						<BreadcrumbSeparator />
						<BreadcrumbLink href={appRoutes.application}>
							Interview Questions
						</BreadcrumbLink>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>
								{isUpdateForm ? 'Update' : 'Add'}
							</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>

				<PageTitle
					title={isUpdateForm ? 'Update' : 'Add latest applied'}
				/>
				<PageDescription description="Add the latest applied questions and answers" />
			</div>

			{isLoading ? (
				<Loader />
			) : (
				<QuestionAndAnswerForm form={form} onSubmit={onSubmit} />
			)}
		</div>
	);
};

export default QnAForm;
