'use client';
import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, FormData } from './utility';
import { appwriteDatabaseConfig, database } from '@/appwrite/config';
import { ID } from 'appwrite';
import { useRouter } from 'next/navigation';
import Loader from '../Loader';
import { appRoutes } from '@/utils/constants';
import ApplicationDataForm from './Form';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../ui/breadcrumb';

type Props = {
	documentId?: string;
	isUpdateForm?: boolean;
	isViewOnlyForm?: boolean;
	userId: string;
};

const ApplicationForm = ({ documentId, isUpdateForm, userId }: Props) => {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [applicationData, setApplicationData] = useState<any>({} as any);
	const [error, setError] = useState('');

	const { toast } = useToast();

	const initialFormData: FormData = {
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

	// const {
	// 	register,
	// 	handleSubmit,
	// 	formState: { errors, defaultValues },
	// 	setValue,
	// } = useForm<FormData>({
	// 	resolver: zodResolver(formSchema),
	// 	defaultValues: { ...initialFormData },
	// 	values: { ...initialFormData },
	// });

	const form = useForm<FormData>({
		resolver: zodResolver(formSchema),
		defaultValues: { ...initialFormData },
		values: { ...initialFormData },
	});

	async function onSubmit(data: FormData) {
		setIsSubmitting(true);

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
			addDocument(data);
		} else {
			updateDocument(data);
		}
	}

	function updateDocument(data: FormData) {
		database
			.updateDocument(
				appwriteDatabaseConfig.applicationDatabase,
				appwriteDatabaseConfig.applicationDatabaseCollectionId,
				String(documentId),
				{
					...data,
				},
				// [Permission.read(Role.user(userId)), Permission.write(Role.user(userId)), Permission.update(Role.user(userId))],
			)
			.then((response) => {
				if (data.links) {
					addLinks(data, documentId || applicationData.$id);
				}
				// console.log('response', response);
				router.push(appRoutes.applicationPage);
			})
			.catch((error) => {
				setError(error);
				console.error(error);
			})
			.finally(() => {
				setIsSubmitting(false);
			});
	}

	function addDocument(data: FormData) {
		const documentId = ID.unique();
		database
			.createDocument(
				appwriteDatabaseConfig.applicationDatabase,
				appwriteDatabaseConfig.applicationDatabaseCollectionId,
				documentId,
				{
					...data,
				},
				// [Permission.read(Role.user(userId)), Permission.write(Role.user(userId)), Permission.update(Role.user(userId))],
			)
			.then((response) => {
				// console.log('response', response);
				if (data.links) {
					addLinks(data, documentId);
				}
				router.push(appRoutes.applicationPage);
			})
			.catch((error) => {
				toast({
					title: 'Error',
					content: error?.message,
				});
				console.error(error);
			})
			.finally(() => {
				setIsSubmitting(false);
			});
	}

	function addLinks(data: FormData, documentId: string) {
		// if (isUpdateForm) {
		// 	database.updateDocument(
		// 		appwriteDatabaseConfig.applicationDatabase,
		// 		appwriteDatabaseConfig.applicationDatabaseDocumentCollectionId,
		// 		documentId,
		// 		{
		// 			link: data.links,
		// 			userId: userId,
		// 			jobApplications: [documentId],
		// 		},
		// 	);
		// } else {
		database.createDocument(
			appwriteDatabaseConfig.applicationDatabase,
			appwriteDatabaseConfig.applicationDatabaseDocumentCollectionId,
			ID.unique(),
			{
				link: data.links,
				userId: userId,
				jobApplications: [documentId],
			},
		);
		// }
	}

	useEffect(() => {
		const getApplicationDataById = async () => {
			setIsLoading(true);
			try {
				const response = await database.getDocument(
					appwriteDatabaseConfig.applicationDatabase,
					appwriteDatabaseConfig.applicationDatabaseCollectionId,
					String(documentId),
				);

				if (response.$id) {
					setApplicationData(response);
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
		<div className='flex flex-col gap-6'>
			<div>
				<Breadcrumb className='mb-2'>
					<BreadcrumbList>
						<BreadcrumbLink href={appRoutes.home}>Home</BreadcrumbLink>
						<BreadcrumbSeparator />
						<BreadcrumbLink href={appRoutes.applicationPage}>Applications</BreadcrumbLink>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>{isUpdateForm ? 'Update' : 'Add'}</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
				<h1 className='text-xl font-semibold !m-0'>{isUpdateForm ? 'Update' : 'Add latest applied'}</h1>
			</div>

			{isLoading ? <Loader /> : <ApplicationDataForm form={form} onSubmit={onSubmit} />}
		</div>
	);
};

export default ApplicationForm;
