import React, { useState } from 'react';
import { FieldErrors, UseFormHandleSubmit, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { formSchema, SalaryCurrency, FormData, SalaryType, ApplicationStatus } from '../utility';
import TinyEditor from '@/components/TinyEditor';
import { z } from 'zod';
import { Button, Input } from 'antd';
import InputWithLabel from '@/components/InputWithLabel';
import DatePickerCustom from '@/components/DatePickerCustom';
import SelectWithLabel from '@/components/SelectCustom';
import UploaderCustom from '@/components/UploaderCustom';
import { config } from '@/config/config';

type Props = {
	handleSubmit: any;
	register: UseFormRegister<FormData>;
	initialFormData: FormData;
	errors: FieldErrors<FormData>;
	isSubmitting: boolean;
	setValue: UseFormSetValue<FormData>;
};

const CustomForm: React.FC<Props> = ({ handleSubmit, register, errors, isSubmitting, initialFormData, setValue }) => {
	return (
		<form className='max-w-7xl w-full mx-auto flex flex-col gap-4 rounded-lg' onSubmit={handleSubmit}>
			<InputWithLabel
				labelName='Job Title'
				placeholder='Job Title'
				name='jobTitle'
				onChange={(e) => setValue('jobTitle', e.currentTarget.value)}
				value={initialFormData.jobTitle}
				errorText={errors.jobTitle?.message ?? ''}
				isError={!!errors.jobTitle}
			/>

			<div>
				<label className='text-xs my-0 py-0'>Job Description</label>
				<TinyEditor
					initialData={initialFormData?.jobDescription ?? ''}
					onChange={(data: any) => setValue('jobDescription', data)}
					textareaName='jobDescription'
				/>
				{errors.jobDescription && <p className='text-[10px] py-2 text-red-400'>{errors.jobDescription.message}</p>}
			</div>

			<div className='md:grid grid-cols-2 gap-4'>
				<InputWithLabel
					labelName='Company Name'
					placeholder='Company Name'
					name='Company Name'
					onChange={(e) => setValue('companyName', e.currentTarget.value)}
					value={initialFormData.companyName}
					errorText={errors.companyName?.message ?? ''}
					isError={!!errors.companyName}
				/>

				<InputWithLabel
					labelName='Company Domain'
					placeholder='Company Domain'
					name='Company Domain'
					onChange={(e) => setValue('companyDomain', e.currentTarget.value)}
					value={initialFormData.companyDomain ?? ''}
					errorText={errors.companyDomain?.message ?? ''}
					isError={!!errors.companyDomain}
				/>
			</div>

			<div className='grid grid-cols-2 gap-4'>
				<InputWithLabel
					labelName='Salary'
					placeholder='Salary'
					name='Salary'
					onChange={(e) => setValue('salary', e.currentTarget.value)}
					value={initialFormData.salary ?? ''}
					errorText={errors.salary?.message ?? ''}
					isError={!!errors.salary}
				/>

				<SelectWithLabel
					options={[
						{ value: 'NULL', label: 'Select' },
						{ value: SalaryType.MONTHLY, label: 'Monthly' },
						{ value: SalaryType.PER_ANUM, label: 'Per-anum' },
					]}
					isError={!!errors.salaryType}
					errorText={errors?.salaryType?.message ?? ''}
					labelName={'Salary type'}
					initialValue={{ value: initialFormData?.salaryType ?? '', label: initialFormData?.salaryType ?? '' }}
					onChange={(data) => typeof data === 'string' && setValue('salaryType', data)}
				/>

				<SelectWithLabel
					options={[
						{ value: 'NULL', label: 'Select' },
						{ value: SalaryCurrency.EUR, label: 'EUR' },
						{ value: SalaryCurrency.GBP, label: 'GBP' },
						{ value: SalaryCurrency.PLN, label: 'PLN' },
						{ value: SalaryCurrency.INR, label: 'INR' },
						{ value: SalaryCurrency.USD, label: 'USD' },
					]}
					isError={!!errors.salaryCurrency}
					errorText={errors?.salaryCurrency?.message ?? ''}
					labelName={'Salary currency'}
					initialValue={{ value: initialFormData?.salaryCurrency ?? '', label: initialFormData?.salaryCurrency ?? '' }}
					onChange={(data) => typeof data === 'string' && setValue('salaryCurrency', data)}
				/>

				<SelectWithLabel
					options={[
						{ value: 'NULL', label: 'Select' },
						{ value: ApplicationStatus.APPLIED, label: 'Applied' },
						{ value: ApplicationStatus.IN_PROGRESS, label: 'In progress' },
						{ value: ApplicationStatus.SUCCESS, label: 'Success' },
						{ value: ApplicationStatus.NO_REPLY, label: 'No reply' },
						{ value: ApplicationStatus.REJECTED_NO_FEEDBACK, label: 'Rejected no feedback' },
						{ value: ApplicationStatus.REJECTED_WITH_FEEDBACK, label: 'Rejected with feedback' },
					]}
					isError={!!errors.applicationStatus}
					errorText={errors?.applicationStatus?.message ?? ''}
					initialValue={{ value: initialFormData?.applicationStatus ?? '', label: initialFormData?.applicationStatus ?? '' }}
					labelName={'Application Status'}
					onChange={(data) => typeof data === 'string' && setValue('applicationStatus', data)}
				/>
			</div>

			<div className='flex flex-col w-fit'>
				<label className='text-xs my-0 py-0'>Interview Date</label>
				<DatePickerCustom onChange={(data) => setValue('interviewDate', data?.toString())} initialValue={initialFormData.interviewDate} />
				{errors.interviewDate && <p className='text-[10px] py-2 text-red-400'>{errors.interviewDate.message}</p>}
			</div>

			{/* <div>
				<label className='text-xs my-0 py-0'>Company Feedback</label>
				<TinyEditor
					initialData={initialFormData?.feedbackFromCompany ?? ''}
					onChange={(data: any) => setValue('feedbackFromCompany', data)}
					textareaName='feedbackFromCompany'
				/>
				{errors.feedbackFromCompany && <p className='text-[10px] py-2 text-red-400'>{errors.feedbackFromCompany.message}</p>}
			</div> */}

			{config.uiShowUploader === '1' && (
				<div>
					<label className='text-xs my-0 py-0'>Upload Documents</label>
					<UploaderCustom setValue={setValue} />
				</div>
			)}

			<Button disabled={isSubmitting} loading={isSubmitting} type='primary' size='large'>
				Submit
			</Button>
		</form>
	);
};

export default CustomForm;
