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
import { getFileName } from '@/utils/utility';
import { QnAAccordion } from '../QnAAccordion';
import { useQuery } from '@tanstack/react-query';
import { applicationDataQueries } from '@/lib/server/application-queries';
import { CircleDollarSign, ExternalLink, Pencil } from 'lucide-react';

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

	const salaryDetail =
		data?.salary && `${data?.salary} ${data?.salaryCurrency?.toLowerCase()} / ${data?.salaryType?.toLowerCase()}`;

	return (
		<div className="flex flex-col gap-6 p-4">
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbLink href={appRoutes.home}>Home</BreadcrumbLink>
					<BreadcrumbSeparator />
					<BreadcrumbLink href={appRoutes.application}>Applications</BreadcrumbLink>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>{data?.jobTitle}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			{(isFetching || isLoading) && <Loader />}
			{!isFetching && !isLoading && data?.$id && (
				<>
					<div className="flex flex-col gap-4 rounded-md border p-4 bg-background motion-preset-focus ">
						<div className="flex justify-between items-start">
							<div>
								<p className="text-sm">{data?.companyName}</p>
								<h1 className="text-2xl font-semibold !mt-0 !mb-2">{data?.jobTitle}</h1>
								<div className="flex items-center gap-1 my-2">
									<Badge variant="secondary">{data?.applicationStatus}</Badge>
									{data.contractType && (
										<>
											{' '}
											· <Badge variant="secondary">{data?.contractType}</Badge>
										</>
									)}
									{data.workMode && (
										<>
											{' '}
											·{' '}
											<Badge
												variant="secondary"
												className="bg-successColor text-lightGreenAccent hover:bg-successColor"
											>
												{data?.workMode}
											</Badge>
										</>
									)}
								</div>
								{data.location && <p className="text-muted-foreground">{data?.location}</p>}
								{data.jobLink && (
									<a
										href={data.jobLink}
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
										<Pencil />
									</Button>
								</Link>
							</div>
						</div>

						<Separator className="my-2" />

						<div>
							<h2 className="text-base">Job Activity</h2>
							<div className="flex flex-col gap-2">
								{data?.interviewDate && (
									<p className="text-sm flex flex-col">
										<span>● Interview</span>
										<span className="text-muted-foreground">{formatDate(data?.interviewDate)}</span>
									</p>
								)}
								<p className="text-sm flex flex-col">
									<span>● Applied</span>
									<span className="text-muted-foreground">{formatDate(data?.$createdAt)}</span>
								</p>
							</div>
							{salaryDetail && (
								<p className="text-sm text-muted-foreground">
									<CircleDollarSign /> {salaryDetail}
								</p>
							)}
						</div>
					</div>

					<div className="border p-4 rounded-md bg-background motion-preset-focus-sm overflow-hidden ">
						{data?.links && (
							<div id="documentsData">
								<h2 className="text-lg font-semibold !mt-3">Documents Added</h2>
								{data?.links &&
									data?.links.split(FILES_SEPARATOR).map((link: string, index: number) => (
										<a
											key={index + 1}
											href={link}
											className="text-sm w-fit text-wrap"
											target="__blank"
											rel="noopener noreferrer"
										>
											<Button
												variant="link"
												className="over px-0 text-wrap h-full flex items-center justify-between text-left w-full"
											>
												{getFileName(link)}
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
									__html: DOMPurify.sanitize(data?.notes),
								}}
							/>
						</div>
					</div>

					{data?.interviewQuestions && (
						<div className="border p-4 rounded-md bg-background" id="interviewQuestions">
							<h2 className="text-lg font-semibold !m-0">Interview Questions Data</h2>
							<QnAAccordion questionsAndAnswers={data?.interviewQuestions?.questionsAndAnswers} />
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default ApplicationView;
