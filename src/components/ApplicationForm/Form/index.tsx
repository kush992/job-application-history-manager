import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ApplicationStatus, FILES_SEPARATOR, JobApplicationFormData, SalaryCurrency, SalaryType } from '../utility';
import { Input } from '@/components/ui/input';
import TinyEditor from '@/components/TinyEditor';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { DateTimePicker } from '@/components/ui/date-time-picker';
import { config } from '@/config/config';
import { useUploadFile } from '@/hooks/useUploadFile';
import DocumentInfoCard from '@/components/DocumentInfoCard';
import { getFileName } from '@/utils/utility';

type Props = {
	form: UseFormReturn<JobApplicationFormData>;
	onSubmit: (data: JobApplicationFormData) => Promise<void>;
};

const ApplicationDataForm: React.FC<Props> = ({ form, onSubmit }) => {
	const { uploadFiles, fileStatuses } = useUploadFile();

	const isShowFileStatus = fileStatuses.some((status) => status.isLoading);
	const initialLinks = form.getValues('links');

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-6 bg-background p-4 md:m-4 rounded-md border"
			>
				<FormField
					control={form.control}
					name="jobTitle"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Job Title</FormLabel>
							<FormControl>
								<Input placeholder="Job title" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormItem>
					<FormLabel>Job description</FormLabel>
					<TinyEditor
						initialData={form.getValues('jobDescription') ?? ''}
						onChange={(data: string) => form.setValue('jobDescription', data)}
						textareaName="jobDescription"
					/>
					<FormMessage />
				</FormItem>

				<div className="md:grid grid-cols-2 items-center gap-2">
					<FormField
						control={form.control}
						name="companyName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Company Name</FormLabel>
								<FormControl>
									<Input placeholder="Company name" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="companyDomain"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Company Domain</FormLabel>
								<FormControl>
									<Input placeholder="Company domain" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="md:grid grid-cols-2 items-center gap-2">
					<FormField
						control={form.control}
						name="salary"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Salary</FormLabel>
								<FormControl>
									<Input placeholder="Salary" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="salaryType"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Salary Type</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value ?? undefined}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select type of salary" />
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

				<div className="md:grid grid-cols-2 items-center gap-2">
					<FormField
						control={form.control}
						name="salaryCurrency"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Salary Currency</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value ?? undefined}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select currency type" />
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
						name="applicationStatus"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Application Status</FormLabel>
								<Select onValueChange={field.onChange} value={field.value ?? undefined}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select status of the application" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value={ApplicationStatus.APPLIED}>Applied</SelectItem>
										<SelectItem value={ApplicationStatus.IN_PROGRESS}>In progress</SelectItem>
										<SelectItem value={ApplicationStatus.SUCCESS}>Success</SelectItem>
										<SelectItem value={ApplicationStatus.NO_REPLY}>No reply</SelectItem>
										<SelectItem value={ApplicationStatus.REJECTED_NO_FEEDBACK}>
											Rejected no feedback
										</SelectItem>
										<SelectItem value={ApplicationStatus.REJECTED_WITH_FEEDBACK}>
											Rejected with feedback
										</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				{/* FIXME: add separate input fields for date and time */}
				<FormField
					control={form.control}
					name="interviewDate"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel>Interview Date</FormLabel>
							<FormControl>
								<DateTimePicker value={field.value} onChange={field.onChange} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* TODO: resolve me and add security */}
				{config.uiShowUploader === '1' && (
					<FormField
						control={form.control}
						name="links"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<FormLabel>Upload Files</FormLabel>
								<FormControl>
									<Input
										id="fileUploader"
										type="file"
										multiple
										name="link"
										onChange={async (e) => {
											const files = e.target.files;

											if (files?.length) {
												const uploadedFileUrls = await uploadFiles(Array.from(files));

												if (uploadedFileUrls) {
													if (!initialLinks) {
														form.setValue('links', uploadedFileUrls.join(FILES_SEPARATOR));
													} else {
														const newLinks = uploadedFileUrls.join(FILES_SEPARATOR);
														form.setValue(
															'links',
															initialLinks + FILES_SEPARATOR + newLinks,
														); // joining the recent with initial links
													}
												}
											}
										}}
									/>
								</FormControl>

								<FormDescription>File should be less than 10MB.</FormDescription>

								{/* show current progress of files */}
								{isShowFileStatus &&
									fileStatuses.map((status) => (
										<DocumentInfoCard key={status.file.name} {...status} />
									))}

								{/* show all the files associated to this application */}
								{initialLinks
									?.split(FILES_SEPARATOR)
									.map((link, index) => (
										<DocumentInfoCard
											key={`${index + 1} - ${getFileName(link)}`}
											fileName={getFileName(link)}
										/>
									))}
								<FormMessage />
							</FormItem>
						)}
					/>
				)}

				<Button type="submit" disabled={form.formState.isSubmitting}>
					Submit
				</Button>
			</form>
		</Form>
	);
};

export default ApplicationDataForm;
