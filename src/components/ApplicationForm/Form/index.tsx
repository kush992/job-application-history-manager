import React from 'react';
import { FieldErrors, UseFormHandleSubmit, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { formSchema, SalaryCurrency, FormData, SalaryType, ApplicationStatus } from '../utility';
import TinyEditor from '@/components/TinyEditor';
import { z } from 'zod';
import { Input } from 'antd';
import InputWithLabel from '@/components/InputWithLabel';
import DatePickerCustom from '@/components/DatePicker';
import SelectWithLabel from '@/components/SelectCustom';

type Props = {
	handleSubmit: any;
	register: UseFormRegister<FormData>;
	initialFormData: FormData;
	errors: FieldErrors<FormData>;
	isSubmitting: boolean;
	setValue: UseFormSetValue<FormData>;
};

const Form = ({ handleSubmit, register, errors, isSubmitting, initialFormData, setValue }: Props) => {
	return (
		<form className='max-w-7xl w-full mx-auto flex flex-col gap-4 dark:bg-gray-950 p-4 md:p-8 rounded-lg' onSubmit={handleSubmit}>
			{/* job title */}
			<InputWithLabel
				labelName='Job Title'
				placeholder='Job Title'
				name='Job Title'
				onChange={(e) => setValue('jobTitle', e.currentTarget.value)}
				value={initialFormData.jobTitle}
				errorText={errors.jobTitle?.message ?? ''}
				isError={!!errors.jobTitle}
			/>

			<div>
				<TinyEditor
					initialData={initialFormData?.jobDescription ?? ''}
					onChange={(data: any) => {
						console.log(data);
						initialFormData.jobDescription = data?.toString();
						setValue('jobDescription', data);
					}}
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
					value={initialFormData.companyDomain}
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
					value={initialFormData.salary}
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
					labelName={'Application Status'}
					onChange={(data) => typeof data === 'string' && setValue('applicationStatus', data)}
				/>
			</div>

			<div className='flex flex-col w-fit'>
				<label className='text-xs my-0 py-0'>Interview Date</label>
				<DatePickerCustom onChange={(data) => setValue('interviewDate', data?.toString())} initialValue={initialFormData.interviewDate} />
				{errors.interviewDate && <p className='text-[10px] py-2 text-red-400'>{errors.interviewDate.message}</p>}
			</div>

			<button
				type='submit'
				disabled={isSubmitting}
				className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
			>
				Submit
			</button>
		</form>
	);
};

export default Form;
