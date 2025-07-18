import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ApplicationStatus, FILES_SEPARATOR, SalaryCurrency, SalaryType } from '../utility';
import { Input } from '@/components/ui/input';
import TinyEditor from '@/components/TinyEditor';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { DateTimePicker } from '@/components/ui/date-time-picker';
import { config } from '@/config/config';
import { useUploadFile } from '@/hooks/useUploadFile';
import DocumentInfoCard from '@/components/DocumentInfoCard';
import { getFileName } from '@/utils/utility';
import { Briefcase, Building2, CalendarIcon, Loader } from 'lucide-react';
import { JobApplication, JobApplicationFormData, JobSites } from '@/types/schema';

type Props = {
	form: UseFormReturn<JobApplicationFormData>;
	onSubmit: (data: JobApplicationFormData) => Promise<void>;
};

const ApplicationDataForm: React.FC<Props> = ({ form, onSubmit }) => {
	const { uploadFiles, deleteFile, fileStatuses } = useUploadFile();

	const isShowFileStatus = fileStatuses.some((status) => status.isLoading);
	const initialLinks = form.getValues('links');

	const removeFile = (fileName: string) => {
		const links = form.getValues('links')?.split(FILES_SEPARATOR);
		const newLinks = links?.filter((link) => !link.includes(fileName)).join(FILES_SEPARATOR);
		form.setValue('links', newLinks);
		deleteFile(fileName);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				// className="flex flex-col gap-6 bg-background p-4 md:m-4 rounded-md border"
				className="space-y-8"
			>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{/* Job Details Section */}
					<div className="space-y-6">
						<div className="flex items-center space-x-2 gap-2">
							<Briefcase className="h-5 w-5 text-primary" />
							<p className="text-xl font-semibold">Job Details</p>
						</div>

						<FormField
							control={form.control}
							name="job_title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Job Title *</FormLabel>
									<FormControl>
										<Input placeholder="Job title" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="grid grid-cols-2 gap-4">
							<FormField
								control={form.control}
								name="work_mode"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Work Mode</FormLabel>
										<Select onValueChange={field.onChange} defaultValue={field.value ?? undefined}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Work mode" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="REMOTE">Remote</SelectItem>
												<SelectItem value="HYBRID">Hybrid</SelectItem>
												<SelectItem value="ON_SITE">On Site</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="contract_type"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Contract Type</FormLabel>
										<Select onValueChange={field.onChange} defaultValue={field.value ?? undefined}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Contract type" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="FULL_TIME">Full Time</SelectItem>
												<SelectItem value="PART_TIME">Part Time</SelectItem>
												<SelectItem value="CONTRACT">Contract</SelectItem>
												<SelectItem value="INTERNSHIP">Internship</SelectItem>
												<SelectItem value="FREELANCE">Freelance</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
							<FormField
								control={form.control}
								name="salary"
								render={({ field }) => (
									<FormItem className="col-span-1">
										<FormLabel>Salary</FormLabel>
										<FormControl>
											<Input placeholder="50000" {...field} value={field.value ?? ''} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="salary_currency"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Salary Currency</FormLabel>
										<Select onValueChange={field.onChange} defaultValue={field.value ?? undefined}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Currency type" />
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
								name="salary_type"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Salary Type</FormLabel>
										<Select onValueChange={field.onChange} defaultValue={field.value ?? undefined}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Salary type" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value={SalaryType.HOURLY}>Hourly</SelectItem>
												<SelectItem value={SalaryType.MONTHLY}>Monthly</SelectItem>
												<SelectItem value={SalaryType.PER_ANUM}>Yearly</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>

					{/* Company Details Section */}
					<div className="space-y-6">
						<div className="flex items-center space-x-2 gap-2">
							<Building2 className="h-5 w-5 text-primary" />
							<p className="text-xl font-semibold">Company Details</p>
						</div>

						<FormField
							control={form.control}
							name="company_name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Company Name *</FormLabel>
									<FormControl>
										<Input placeholder="Company name" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="company_domain"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Company Domain</FormLabel>
									<FormControl>
										<Input placeholder="Company domain" {...field} value={field.value ?? ''} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>

				{/* Application Details */}
				<div className="space-y-6">
					<div className="flex items-center space-x-2 gap-2">
						<CalendarIcon className="h-5 w-5 text-primary" />
						<p className="text-xl font-semibold">Application Details</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<FormField
							control={form.control}
							name="application_status"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Application Status</FormLabel>
									<Select
										onValueChange={field.onChange}
										value={field.value ?? ApplicationStatus.APPLIED}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Application status" />
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

						<FormField
							control={form.control}
							name="interview_date"
							render={({ field }) => (
								<FormItem className="">
									<FormLabel>Interview Date</FormLabel>

									<FormControl>
										<DateTimePicker
											value={(field.value && new Date(field?.value)) ?? new Date()}
											onChange={(data) => data && form.setValue('interview_date', new Date(data))}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<FormField
							control={form.control}
							name="job_link"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Job Link</FormLabel>
									<FormControl>
										<Input placeholder="Job Link" {...field} value={field.value as string} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="job_posted_on"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Job Posted On</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value ?? JobSites.LINKEDIN}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Job board" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="LINKEDIN">LinkedIn</SelectItem>
											<SelectItem value="GLASSDOOR">Glassdoor</SelectItem>
											<SelectItem value="INDEED">Indeed</SelectItem>
											<SelectItem value="JUST_JOIN_IT">Just Join IT</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="location"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Location</FormLabel>
									<FormControl>
										<Input placeholder="Location of role" {...field} value={field.value ?? ''} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<FormItem>
						<FormLabel>Notes *</FormLabel>
						<TinyEditor
							initialData={form.getValues('notes') ?? ''}
							onChange={(data: string) => form.setValue('notes', data)}
							textareaName="notes"
						/>
						<FormMessage />
					</FormItem>

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
															form.setValue(
																'links',
																uploadedFileUrls.join(FILES_SEPARATOR),
															);
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
												removeFile={removeFile}
											/>
										))}
									<FormMessage />
								</FormItem>
							)}
						/>
					)}
				</div>

				<Button type="submit" disabled={form.formState.isSubmitting}>
					{form.formState.isSubmitting ? <Loader className="animate-spin" /> : 'Submit'}
				</Button>
			</form>
		</Form>
	);
};

export default ApplicationDataForm;
