'use client';
import React, { FormEvent, useEffect, useState } from 'react';
import { Path, PathValue, RegisterOptions, useForm, UseFormRegisterReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
import { formSchema, SalaryCurrency, SalaryType, FormData } from './utility';
import { appwriteDatabaseConfig, database } from '@/appwrite/config';
import { ID, Permission, Role } from 'appwrite';
import { useRouter } from 'next/navigation';
import CustomForm from './OldForm';
import SubHeader from '../SubHeader';
import Loader from '../Loader';
import { appRoutes } from '@/utils/constants';
import ApplicationDataForm from './Form';

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

		// if (data.interviewDate) {
		// 	data.interviewDate = data.interviewDate.toString();
		// }

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
				// console.log('response', response);
				router.push(appRoutes.applicationPage);
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
			.createDocument(
				appwriteDatabaseConfig.applicationDatabase,
				appwriteDatabaseConfig.applicationDatabaseCollectionId,
				ID.unique(),
				{
					...data,
				},
				// [Permission.read(Role.user(userId)), Permission.write(Role.user(userId)), Permission.update(Role.user(userId))],
			)
			.then((response) => {
				// console.log('response', response);
				router.push(appRoutes.applicationPage);
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
		<div className='flex flex-col gap-6'>
			<div>
				<SubHeader previousPageTitle='Applications' href={appRoutes.applicationPage} />
				<h1 className='text-xl font-semibold !m-0'>{isUpdateForm ? 'Edit' : 'Add latest applied'}</h1>
			</div>

			{isLoading ? (
				<Loader />
			) : (
				<>
					<ApplicationDataForm form={form} onSubmit={onSubmit} />
					{/* <CustomForm
						handleSubmit={handleSubmit(onSubmit)}
						register={register}
						isSubmitting={isSubmitting}
						errors={errors}
						initialFormData={initialFormData}
						setValue={setValue}
					/> */}
				</>
			)}
		</div>
	);
};

export default ApplicationForm;
