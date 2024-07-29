import React from 'react';
import { UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import { SalaryCurrency } from '../utility';

type Props = {
	handleSubmit: any;
	register: any;
	initialFormData: any;
	errors: any;
	isSubmitting: boolean;
};

const Form = ({ handleSubmit, register, errors, isSubmitting, initialFormData }: Props) => {
	return (
		<form className='max-w-2xl w-full mx-auto flex flex-col gap-4 dark:bg-gray-950 p-4 md:p-8 rounded-lg' onSubmit={handleSubmit}>
			<div className='relative z-0 w-full mb-5 group'>
				<input
					type='text'
					className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
					{...register('jobTitle', { required: true })}
				/>
				<label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
					Job Title
				</label>
				{errors.jobTitle && <p className='text-[10px] py-2 text-red-400'>{errors.jobTitle.message}</p>}
			</div>

			<div className='relative z-0 w-full mb-5 group'>
				<input
					type='textarea'
					className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
					{...register('jobDescription', { required: false })}
				/>
				<label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
					Job Description
				</label>
				{errors.jobDescription && <p className='text-[10px] py-2 text-red-400'>{errors.jobDescription.message}</p>}
			</div>

			<div className='relative z-0 w-full mb-5 group'>
				<input
					type='text'
					className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
					{...register('companyName', { required: true })}
				/>
				<label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
					Company Name
				</label>
				{errors.companyName && <p className='text-[10px] py-2 text-red-400'>{errors.companyName.message}</p>}
			</div>

			<div className='relative z-0 w-full mb-5 group'>
				<input
					type='text'
					className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
					{...register('companyDomain', { required: false })}
				/>
				<label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
					Company Domain
				</label>
				{errors.companyDomain && <p className='text-[10px] py-2 text-red-400'>{errors.companyDomain.message}</p>}
			</div>

			<div className='grid grid-cols-2 gap-4'>
				<div className='relative z-0 w-full mb-5 group'>
					<input
						type='string'
						className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
						{...register('salary', { required: false })}
					/>
					<label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
						Salary
					</label>
					{errors.salary && <p className='text-[10px] py-2 text-red-400'>{errors.salary.message}</p>}
				</div>

				<div className='relative z-0 w-full mb-5 group'>
					<select
						{...register('salaryType', { required: false })}
						className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
					>
						<option value={'NULL'}>Select value</option>
						<option value={'MONTHLY'}>Monthly</option>
						<option value={'PER_ANUM'}>Per-anum</option>
					</select>
					<label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
						Salary Type
					</label>
					{errors.salaryType && <p className='text-[10px] py-2 text-red-400'>{errors.salaryType.message}</p>}
				</div>

				<div className='relative z-0 w-full mb-5 group'>
					<select
						{...register('salaryCurrency', { required: false })}
						className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
					>
						<option value={'NULL'}>Select value</option>
						<option value={SalaryCurrency.PLN}>PLN</option>
						<option value={SalaryCurrency.EUR}>EUR</option>
						<option value={SalaryCurrency.INR}>INR</option>
						<option value={SalaryCurrency.GBP}>GBP</option>
						<option value={SalaryCurrency.USD}>USD</option>
					</select>
					<label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
						Salary Currency
					</label>
					{errors.salaryCurrency && <p className='text-[10px] py-2 text-red-400'>{errors.salaryCurrency.message}</p>}
				</div>

				<div className='relative z-0 w-full mb-5 group'>
					<select
						{...register('applicationStatus', { required: false })}
						className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
					>
						<option value={'NULL'}>Select value</option>
						<option value='APPLIED'>Applied</option>
						<option value='IN_PROGRESS'>In Progress</option>
						<option value='NO_REPLY'>No Reply</option>
						<option value='REJECTED_NO_FEEDBACK'>Rejected without feedback</option>
						<option value='REJECTED_WITH_FEEDBACK'>Rejected with feedback</option>
						<option value='SUCCESS'>Success</option>
					</select>
					<label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
						Application Status
					</label>
					{errors.applicationStatus && <p className='text-[10px] py-2 text-red-400'>{errors.applicationStatus.message}</p>}
				</div>
			</div>

			<div className='relative z-0 w-full mb-5 group'>
				<input
					type='string'
					className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
					{...register('feedbackFromCompany', { required: false })}
				/>
				<label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
					Rejection Reason
				</label>
				{errors.feedbackFromCompany && <p className='text-[10px] py-2 text-red-400'>{errors.feedbackFromCompany.message}</p>}
			</div>

			<div className='relative z-0 w-full mb-5 group'>
				<input
					type='string'
					className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
					{...register('interviewDate', { required: false })}
				/>
				<label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
					Interview Date
				</label>
				{errors.interviewDate && <p className='text-[10px] py-2 text-red-400'>{errors.interviewDate.message}</p>}
			</div>

			<div className='relative z-0 w-full mb-5 group'>
				<input
					type='string'
					className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
					{...register('links', { required: false })}
				/>
				<label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
					Links
				</label>
				{errors.links && <p className='text-[10px] py-2 text-red-400'>{errors.links.message}</p>}
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
