import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import TinyEditor from '@/components/ui/tiny-editor';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { DateTimePicker } from '@/components/ui/date-time-picker';
import { config } from '@/config/config';
import { Briefcase, Building2, CalendarIcon, Loader } from 'lucide-react';
import {
	ApplicationStatus,
	ContractType,
	JobApplicationFormData,
	JobSites,
	SalaryCurrency,
	SalaryType,
	WorkMode,
} from '@/types/schema';
import FileUpload from '../../FileUpload';

type Props = {
	form: UseFormReturn<JobApplicationFormData>;
	onSubmit: (data: JobApplicationFormData) => Promise<void>;
};

const ApplicationDataForm: React.FC<Props> = ({ form, onSubmit }) => {
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
										<Select
											value={field.value ?? undefined} // Controlled component
											onValueChange={field.onChange}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Work mode" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{Object.values(WorkMode).map((type) => (
													<SelectItem key={type} value={type}>
														{type
															.replace(/_/g, ' ')
															.toLowerCase()
															.replace(/\b\w/g, (c) => c.toUpperCase())}
													</SelectItem>
												))}
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
										<Select
											value={field.value ?? undefined}
											onValueChange={field.onChange}
											defaultValue={field.value ?? undefined}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Contract type" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{Object.values(ContractType).map((type) => (
													<SelectItem key={type} value={type}>
														{type
															.replace(/_/g, ' ')
															.toLowerCase()
															.replace(/\b\w/g, (c) => c.toUpperCase())}
													</SelectItem>
												))}
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
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value ?? undefined}
											value={field.value ?? undefined}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Currency type" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{Object.values(SalaryCurrency).map((currency) => (
													<SelectItem key={currency} value={currency}>
														{currency}
													</SelectItem>
												))}
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
										<Select
											value={field.value ?? undefined}
											onValueChange={field.onChange}
											defaultValue={field.value ?? undefined}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Salary type" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{Object.values(SalaryType).map((type) => (
													<SelectItem key={type} value={type}>
														{type
															.replace(/_/g, ' ')
															.toLowerCase()
															.replace(/\b\w/g, (c) => c.toUpperCase())}
													</SelectItem>
												))}
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
											{Object.values(ApplicationStatus).map((status) => (
												<SelectItem key={status} value={status}>
													{status
														.replace(/_/g, ' ')
														.toLowerCase()
														.replace(/\b\w/g, (c) => c.toUpperCase())}
												</SelectItem>
											))}
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
											value={(field.value && new Date(field?.value)) ?? undefined}
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
										value={field.value ?? JobSites.LINKEDIN}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Job board" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{Object.values(JobSites).map((site) => (
												<SelectItem key={site} value={site}>
													{site
														.replace(/_/g, ' ')
														.toLowerCase()
														.replace(/\b\w/g, (c) => c.toUpperCase())}
												</SelectItem>
											))}
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
					{config.uiShowUploader === '1' && <FileUpload form={form} />}
				</div>

				<Button type="submit" disabled={form.formState.isSubmitting}>
					{form.formState.isSubmitting ? <Loader className="animate-spin" /> : 'Submit'}
				</Button>
			</form>
		</Form>
	);
};

export default ApplicationDataForm;
