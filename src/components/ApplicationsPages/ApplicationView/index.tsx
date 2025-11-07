'use client';

import React from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { appRoutes, FILES_SEPARATOR } from '@/utils/constants';
import { formatDate } from '@/utils/date';
import Loader from '../../ui/loader';
import { Separator } from '@/components/ui/separator';
import { Button } from '../../ui/button';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '../../ui/breadcrumb';
import { Badge } from '../../ui/badge';
import {
	applicationStatusMapping,
	contractTypeMapping,
	getApplicationStatusColor,
	getFileName,
	getWorkModeColor,
	workModeMapping,
} from '@/utils/utility';
import { CircleDollarSign, ExternalLink, ExternalLinkIcon, Pencil } from 'lucide-react';
import { ApplicationStatus } from '@/types/schema';
import { useApplications } from '@/hooks/useApplications';
import ErrorDisplay from '../../ui/error-display';
import DOMPurify from 'dompurify';

type Props = {
	documentId: string;
	userId: string;
};

const ApplicationView: React.FC<Props> = ({ documentId }) => {
	const { application, errorApplication, isLoadingApplication, isFetchingApplication } = useApplications({
		documentId,
		enableSingle: true,
	});

	const salaryDetail =
		application?.salary &&
		`${application?.salary} ${application?.salary_currency?.toLowerCase()} / ${application?.salary_type?.toLowerCase()}`;

	const isHtmlContent = (content: string) => {
		return (
			content.includes('<div') || content.includes('<p') || content.includes('<br') || content.includes('<span')
		);
	};

	return (
		<div className="flex flex-col gap-6 mb-4 md:container">
			<Breadcrumb className="py-4 px-4 md:px-0">
				<BreadcrumbList className="overflow-x-scroll flex-nowrap no-scrollbar">
					<BreadcrumbLink href={appRoutes.home}>Home</BreadcrumbLink>
					<BreadcrumbSeparator />
					<BreadcrumbLink href={appRoutes.application}>Applications</BreadcrumbLink>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage className="whitespace-nowrap">{application?.job_title}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			{errorApplication && (
				<div className="p-4">
					<ErrorDisplay error={errorApplication} />
				</div>
			)}
			{(isFetchingApplication || isLoadingApplication) && <Loader />}
			{!isFetchingApplication && !isLoadingApplication && application?.id && (
				<>
					<div className="flex flex-col gap-4 md:rounded-md md:border p-4 bg-background motion-preset-focus">
						<div className="flex justify-between items-start">
							<div>
								<p className="text-sm">{application?.company_name}</p>
								<h1 className="text-2xl font-semibold !mt-0 !mb-2">{application?.job_title}</h1>
								<div className="flex items-center gap-1 my-4 flex-wrap">
									<Badge
										variant={getApplicationStatusColor(
											application?.application_status as ApplicationStatus,
										)}
									>
										{applicationStatusMapping[application.application_status as ApplicationStatus]}
									</Badge>
									{application.contract_type && (
										<Badge variant="feature">
											{contractTypeMapping[application.contract_type]}
										</Badge>
									)}
									{application.work_mode && (
										<Badge variant={getWorkModeColor(application?.work_mode)}>
											{workModeMapping[application.work_mode]}
										</Badge>
									)}
								</div>
								{application.location && (
									<p className="text-muted-foreground text-xs">{application?.location}</p>
								)}
								{application.job_link && (
									<a
										href={application.job_link}
										target="_blank"
										className="text-sm hover:underline flex items-center gap-1"
									>
										Job Link <ExternalLink className="h-4 w-4" />
									</a>
								)}
							</div>
							<div>
								<Link href={`${appRoutes.updateApplication}/${documentId}`} className="underline">
									<Button size="icon">
										<Pencil className="w-4 h-4" />
									</Button>
								</Link>
							</div>
						</div>

						<Separator className="my-2" />

						<div>
							<h2 className="text-base">Job Activity</h2>
							<div className="flex flex-col gap-2">
								{application?.interview_date && (
									<p className="text-sm flex flex-col">
										<span>● Interview</span>
										<span className="text-muted-foreground">
											{formatDate(application?.interview_date)}
										</span>
									</p>
								)}
								<p className="text-sm flex flex-col">
									<span>● Applied</span>
									<span className="text-muted-foreground">{formatDate(application?.created_at)}</span>
								</p>
							</div>
							{salaryDetail && (
								<p className="text-sm text-muted-foreground flex items-center gap-1">
									<CircleDollarSign className="w-4 h-4" /> {salaryDetail}
								</p>
							)}
						</div>
					</div>

					<div className="md:border p-4 md:rounded-md bg-background motion-preset-focus-sm overflow-hidden ">
						{application?.links && (
							<div id="documentsData">
								<h2 className="text-lg font-semibold !mt-3">Documents Added</h2>
								{application?.links &&
									application?.links.split(FILES_SEPARATOR).map((link: string, index: number) => (
										<a
											key={index + 1}
											href={link}
											className="text-sm w-fit text-wrap cursor-pointer"
											target="__blank"
											rel="noopener noreferrer"
										>
											<Button
												variant="link"
												className="px-0 text-wrap h-full flex items-center text-sm justify-start text-left w-fit gap-2 cursor-pointer"
											>
												<ExternalLinkIcon className="h-4 w-4" /> {getFileName(link)}
											</Button>
										</a>
									))}
								<Separator className="my-3" />
							</div>
						)}

						<div id="applicationData">
							<h2 className="text-lg font-semibold !m-0">Application Data</h2>
							{isHtmlContent(application?.notes || '') ? (
								<div
									className="rounded-md text-wrap break-words prose prose-blockquote:!text-muted-foreground !text-muted-foreground prose-headings:!text-muted-foreground prose:!text-muted-foreground prose-p:!text-muted-foreground prose-strong:!text-muted-foreground prose-ul:!text-muted-foreground prose-ol:!text-muted-foreground prose-a:!text-muted-foreground prose-a:!underline prose-h1:!text-lg prose-h2:!text-md prose-h3:!text-md prose-h4:!text-md prose-h5:!text-md prose-h6:!text-md prose-sm prose-img:rounded-xl max-w-none"
									dangerouslySetInnerHTML={{
										__html: DOMPurify.sanitize(application?.notes || ''),
									}}
								/>
							) : (
								<ReactMarkdown>{application?.notes}</ReactMarkdown>
							)}
						</div>
					</div>

					{/* {data?.interview_questions && (
						<div className="border p-4 rounded-md bg-background" id="interviewQuestions">
							<h2 className="text-lg font-semibold !m-0">Interview Questions Data</h2>
							<QnAAccordion questionsAndAnswers={data?.interview_questions?.questionsAndAnswers} />
						</div>
					)} */}
				</>
			)}
		</div>
	);
};

export default ApplicationView;
