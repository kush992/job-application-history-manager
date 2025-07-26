'use client';

import React from 'react';
import Link from 'next/link';
import { appRoutes, QueryKeys } from '@/utils/constants';
import { formatDate } from '@/utils/date';
import Loader from '../Loader';
import { Separator } from '@/components/ui/separator';
import DOMPurify from 'dompurify';
import { FILES_SEPARATOR } from '../ApplicationForm/utility';
import { Button } from '../ui/button';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '../ui/breadcrumb';
import { Badge } from '../ui/badge';
import {
	applicationStatusMapping,
	contractTypeMapping,
	getApplicationStatusColor,
	getFileName,
	getWorkModeColor,
	workModeMapping,
} from '@/utils/utility';
import { useQuery } from '@tanstack/react-query';
import { applicationDataQueries } from '@/lib/server/application-queries';
import { CircleDollarSign, ExternalLink, ExternalLinkIcon, Pencil } from 'lucide-react';
import { ApplicationStatus } from '@/types/schema';

type Props = {
	documentId: string;
	userId: string;
};

const ApplicationView: React.FC<Props> = ({ documentId, userId }) => {
	const { data, error, isLoading, isFetching } = useQuery({
		queryKey: [QueryKeys.APPLICATION_BY_ID, documentId, userId],
		queryFn: () => applicationDataQueries.getOne(documentId),
		enabled: !!userId,
		staleTime: 1000 * 60 * 5, // 5 minutes
	});

	console.log('ApplicationView data:', data);

	const salaryDetail =
		data?.salary && `${data?.salary} ${data?.salary_currency?.toLowerCase()} / ${data?.salary_type?.toLowerCase()}`;

	return (
		<div className="flex flex-col gap-6 mb-4 md:container">
			<Breadcrumb className="py-4 px-4 md:px-0">
				<BreadcrumbList className="overflow-x-scroll flex-nowrap no-scrollbar">
					<BreadcrumbLink href={appRoutes.home}>Home</BreadcrumbLink>
					<BreadcrumbSeparator />
					<BreadcrumbLink href={appRoutes.application}>Applications</BreadcrumbLink>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage className="whitespace-nowrap">{data?.job_title}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			{(isFetching || isLoading) && <Loader />}
			{!isFetching && !isLoading && data?.id && (
				<>
					<div className="flex flex-col gap-4 md:rounded-md md:border p-4 bg-background motion-preset-focus">
						<div className="flex justify-between items-start">
							<div>
								<p className="text-sm">{data?.company_name}</p>
								<h1 className="text-2xl font-semibold !mt-0 !mb-2">{data?.job_title}</h1>
								<div className="flex items-center gap-1 my-4 flex-wrap">
									<Badge
										variant={getApplicationStatusColor(
											data?.application_status as ApplicationStatus,
										)}
									>
										{applicationStatusMapping[data.application_status as ApplicationStatus]}
									</Badge>
									{data.contract_type && (
										<Badge variant="feature">{contractTypeMapping[data.contract_type]}</Badge>
									)}
									{data.work_mode && (
										<Badge variant={getWorkModeColor(data?.work_mode)}>
											{workModeMapping[data.work_mode]}
										</Badge>
									)}
								</div>
								{data.location && <p className="text-muted-foreground text-xs">{data?.location}</p>}
								{data.job_link && (
									<a
										href={data.job_link}
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
								{data?.interview_date && (
									<p className="text-sm flex flex-col">
										<span>● Interview</span>
										<span className="text-muted-foreground">
											{formatDate(data?.interview_date)}
										</span>
									</p>
								)}
								<p className="text-sm flex flex-col">
									<span>● Applied</span>
									<span className="text-muted-foreground">{formatDate(data?.created_at)}</span>
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
						{data?.links && (
							<div id="documentsData">
								<h2 className="text-lg font-semibold !mt-3">Documents Added</h2>
								{data?.links &&
									data?.links.split(FILES_SEPARATOR).map((link: string, index: number) => (
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
												<ExternalLinkIcon className='h-4 w-4' /> {getFileName(link)}
											</Button>
										</a>
									))}
								<Separator className="my-3" />
							</div>
						)}

						<div id="applicationData">
							<h2 className="text-lg font-semibold !m-0">Application Data</h2>
							<div
								className="rounded-md text-wrap break-words prose prose-blockquote:!text-muted-foreground !text-muted-foreground prose-headings:!text-muted-foreground prose:!text-muted-foreground prose-p:!text-muted-foreground prose-strong:!text-muted-foreground prose-ul:!text-muted-foreground prose-ol:!text-muted-foreground prose-a:!text-muted-foreground prose-a:!underline prose-h1:!text-lg prose-h2:!text-md prose-h3:!text-md prose-h4:!text-md prose-h5:!text-md prose-h6:!text-md prose-sm prose-img:rounded-xl max-w-none"
								dangerouslySetInnerHTML={{
									__html: DOMPurify.sanitize(data?.notes || ''),
								}}
							/>
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
