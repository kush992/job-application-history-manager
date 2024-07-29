'use client';
import React, { FormEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { formSchema, SalaryCurrency, SalaryType } from './utility';
import { appwriteDatabaseConfig, database } from '@/appwrite/config';
import { ID } from 'appwrite';
import { useRouter } from 'next/navigation';
import Form from './Form';

type Props = {
	documentId?: string;
	isUpdateForm?: boolean;
	isViewOnlyForm?: boolean;
};

const ApplicationForm = ({ documentId, isUpdateForm }: Props) => {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [applicationData, setApplicationData] = useState<any>({} as any);

	const initialFormData: FormData = {
		userId: applicationData?.userId ?? '',
		jobTitle: applicationData.jobTitle ?? '',
		jobDescription: applicationData.jobDescription ?? '',
		companyName: applicationData?.companyName ?? '',
		companyDomain: applicationData?.companyDomain ?? '',
		links: applicationData?.links ?? '',
		feedbackFromCompany: applicationData?.feedbackFromCompany ?? '',
		applicationStatus: applicationData?.applicationStatus ?? '',
		salary: applicationData?.salary ?? '',
		salaryCurrency: applicationData?.salaryCurrency ?? '',
		salaryType: applicationData?.salaryType ?? '',
		interviewDate: applicationData?.interviewDate ?? '',
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(formSchema),
		defaultValues: { ...initialFormData },
		values: { ...initialFormData },
	});

	type FormData = z.infer<typeof formSchema>;

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
				['read', 'write', 'update', 'delete'],
			)
			.then((response) => {
				console.log('response', response);
				router.push('/');
			})
			.catch((error) => {
				console.error(error);
			})
			.finally(() => {
				setIsSubmitting(false);
			});
	}

	function addDocument(data: FormData) {
		database
			.createDocument(appwriteDatabaseConfig.applicationDatabase, appwriteDatabaseConfig.applicationDatabaseCollectionId, ID.unique(), {
				...data,
			})
			.then((response) => {
				console.log('response', response);
				router.push('/');
			})
			.catch((error) => {
				console.error(error);
			})
			.finally(() => {
				setIsSubmitting(false);
			});
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
		<div className='flex flex-col gap-8'>
			<h1 className='text-lg max-w-2xl mx-auto'>Add latest applied</h1>
			<Form
				handleSubmit={handleSubmit(onSubmit)}
				register={register}
				isSubmitting={isSubmitting}
				errors={errors}
				initialFormData={initialFormData}
			/>
		</div>
	);
};

export default ApplicationForm;
