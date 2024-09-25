import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import cn from 'classnames';
import React from 'react';
import { UseFormRegister, FieldErrors, UseFormSetValue, UseFormReturn } from 'react-hook-form';
import { ApplicationStatus, FILES_SEPARATOR, FormData, SalaryCurrency, SalaryType } from '../utility';
import { Input } from '@/components/ui/input';
import TinyEditor from '@/components/TinyEditor';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from '@radix-ui/react-icons';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { DateTimePicker } from '@/components/ui/date-time-picker';
import { useFileUpload } from '@/hooks/useFileUpload';
import { appwriteDatabaseConfig, database } from '@/appwrite/config';
import { ID } from 'appwrite';
import { nanoid } from 'nanoid';

type Props = {
	form: UseFormReturn<FormData>;
	onSubmit: (data: FormData) => Promise<void>;
};

const ApplicationDataForm: React.FC<Props> = ({ form, onSubmit }) => {
	const uploadFile = useFileUpload();

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-6'>
				<FormField
					control={form.control}
					name='jobTitle'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Job Title</FormLabel>
							<FormControl>
								<Input placeholder='Job title' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormLabel>Job description</FormLabel>
				<TinyEditor
					initialData={form.getValues('jobDescription') ?? ''}
					onChange={(data: any) => form.setValue('jobDescription', data)}
					textareaName='jobDescription'
				/>
				<FormMessage />

				<div className='md:grid grid-cols-2 items-center gap-2'>
					<FormField
						control={form.control}
						name='companyName'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Company Name</FormLabel>
								<FormControl>
									<Input placeholder='Company name' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='companyDomain'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Company Domain</FormLabel>
								<FormControl>
									<Input placeholder='Company domain' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className='md:grid grid-cols-2 items-center gap-2'>
					<FormField
						control={form.control}
						name='salary'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Salary</FormLabel>
								<FormControl>
									<Input placeholder='Salary' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='salaryType'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Salary Type</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value ?? undefined}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='Select type of salary' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value={SalaryType.MONTHLY}>Monthly</SelectItem>
										<SelectItem value={SalaryType.PER_ANUM}>Yearly</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className='md:grid grid-cols-2 items-center gap-2'>
					<FormField
						control={form.control}
						name='salaryCurrency'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Salary Currency</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value ?? undefined}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='Select currency type' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value={SalaryCurrency.PLN}>PLN</SelectItem>
										<SelectItem value={SalaryCurrency.EUR}>EUR</SelectItem>
										<SelectItem value={SalaryCurrency.GBP}>GBP</SelectItem>
										<SelectItem value={SalaryCurrency.INR}>INR</SelectItem>
										<SelectItem value={SalaryCurrency.USD}>USD</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='applicationStatus'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Application Status</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value ?? undefined}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='Select status of the application' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value={ApplicationStatus.APPLIED}>Applied</SelectItem>
										<SelectItem value={ApplicationStatus.IN_PROGRESS}>In progress</SelectItem>
										<SelectItem value={ApplicationStatus.SUCCESS}>Success</SelectItem>
										<SelectItem value={ApplicationStatus.NO_REPLY}>No reply</SelectItem>
										<SelectItem value={ApplicationStatus.REJECTED_NO_FEEDBACK}>Rejected no feedback</SelectItem>
										<SelectItem value={ApplicationStatus.REJECTED_WITH_FEEDBACK}>Rejected with feedback</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<FormField
					control={form.control}
					name='interviewDate'
					render={({ field }) => (
						<FormItem className='flex flex-col'>
							<FormLabel>Interview Date</FormLabel>
							<Popover>
								{/* <PopoverTrigger asChild>
									<FormControl>
										<Button
											variant={'outline'}
											className={cn('w-[240px] pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
										>
											{field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
											<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
										</Button>
									</FormControl>
								</PopoverTrigger> */}
								{/* <PopoverContent className='w-auto p-0' align='start'>
									<Calendar mode='single' selected={new Date(field.value)} onSelect={field.onChange} initialFocus />
								</PopoverContent> */}
							</Popover>
							<FormControl>
								<DateTimePicker value={field.value} onChange={field.onChange} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='links'
					render={({ field }) => (
						<FormItem className='flex flex-col'>
							<FormLabel>Upload Files</FormLabel>
							<FormControl>
								<Input
									id='fileUploader'
									type='file'
									multiple
									name='link'
									onChange={async (e) => {
										const files = e.target.files;
										if (files?.length) {
											const uploadedFileUrls = await uploadFile(Array.from(files));

											if (uploadedFileUrls) {
												form.setValue('links', uploadedFileUrls.join(FILES_SEPARATOR));
											}
										}
									}}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type='submit'>Submit</Button>
			</form>
		</Form>
	);
};

export default ApplicationDataForm;
