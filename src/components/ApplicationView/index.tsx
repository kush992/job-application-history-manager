'use client';
import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { Divider, notification } from 'antd';
import { appwriteDatabaseConfig, database } from '@/appwrite/config';
import { JobApplicationData } from '@/types/apiResponseTypes';
import { appRoutes } from '@/utils/constants';
import { formatDate, transformDate } from '@/utils/date';
import Loader from '../Loader';
import { DollarCircleOutlined, EditOutlined } from '@ant-design/icons';
import { Separator } from '@/components/ui/separator';
import DOMPurify from 'dompurify';
import { FILES_SEPARATOR } from '../ApplicationForm/utility';
import { Button } from '../ui/button';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../ui/breadcrumb';
import { Badge } from '../ui/badge';
import { ArrowUpRight } from 'lucide-react';
import { getFileName } from '@/utils/utility';

type Props = {
	documentId: string;
};

const ApplicationView = ({ documentId }: Props) => {
	const [isFetching, setIsFetching] = useState<boolean>(false);
	const [applicationData, setApplicationData] = useState<JobApplicationData>({} as JobApplicationData);
	const [api, contextHolder] = notification.useNotification();

	const salaryDetail =
		applicationData.salary &&
		`${applicationData?.salary} ${applicationData?.salaryCurrency?.toLowerCase()} / ${applicationData?.salaryType?.toLowerCase()}`;

	const openNotification = useCallback(() => {
		api.error({
			message: 'Application data not found',
		});
	}, [api]);

	useEffect(() => {
		async function fetchApplicationData() {
			setIsFetching(true);
			try {
				const response: JobApplicationData = await database.getDocument(
					appwriteDatabaseConfig.applicationDatabase,
					appwriteDatabaseConfig.applicationDatabaseCollectionId,
					documentId,
				);
				setApplicationData(response);
			} catch (error) {
				console.error(error);
				openNotification();
			} finally {
				setIsFetching(false);
			}
		}
		fetchApplicationData();
	}, [documentId, openNotification]);

	return (
		<div className='flex flex-col gap-6 p-4'>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbLink href={appRoutes.home}>Home</BreadcrumbLink>
					<BreadcrumbSeparator />
					<BreadcrumbLink href={appRoutes.applicationPage}>Applications</BreadcrumbLink>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>{applicationData?.jobTitle}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			{isFetching && <Loader />}
			{!isFetching && !applicationData.$id && contextHolder}
			{!isFetching && applicationData.$id && (
				<>
					<div className='flex flex-col gap-4 rounded-md border p-4 bg-background'>
						<div className='flex justify-between items-start'>
							<div>
								<p className='text-sm'>{applicationData.companyName}</p>
								<h1 className='text-2xl font-semibold !mt-0 !mb-2'>{applicationData.jobTitle}</h1>
								<Badge>{applicationData?.applicationStatus}</Badge>
							</div>
							<div>
								<Link href={`${appRoutes.updateApplicationPage}/${documentId}`} className='underline'>
									<Button size='icon'>
										<EditOutlined />
									</Button>
								</Link>
							</div>
						</div>

						<Separator className='my-2' />

						<div>
							<h2 className='text-base'>Job Activity</h2>
							<div className='flex flex-col gap-2'>
								{applicationData?.interviewDate && (
									<p className='text-sm flex flex-col'>
										<span>● Interview</span>
										<span className='text-muted-foreground'>{formatDate(applicationData.interviewDate)}</span>
									</p>
								)}
								<p className='text-sm flex flex-col'>
									<span>● Applied</span>
									<span className='text-muted-foreground'>{formatDate(applicationData.$createdAt)}</span>
								</p>
							</div>
							{salaryDetail && (
								<p className='text-sm text-muted-foreground'>
									<DollarCircleOutlined /> {salaryDetail}
								</p>
							)}
						</div>
					</div>

					<div className='border p-4 rounded-md bg-background'>
						{applicationData.links && (
							<div>
								<h2 className='text-lg font-semibold !mt-3'>Documents Added</h2>
								{applicationData.links &&
									applicationData.links.split(FILES_SEPARATOR).map((link, index) => (
										<a key={index + 1} href={link} className='text-sm w-fit text-wrap' target='__blank' rel='noopener noreferrer'>
											<Button
												variant='link'
												className='over px-0 text-wrap h-full flex items-center justify-between text-left w-full'
											>
												{getFileName(link)}
											</Button>
										</a>
									))}
								<Divider />
							</div>
						)}
						{applicationData?.feedbackFromCompany && (
							<div>
								<h2 className='text-lg font-semibold !mt-3'>Additional details after applying</h2>
								<div
									className='rounded-md prose !text-muted-foreground prose-headings:!text-muted-foreground prose:!text-muted-foreground prose-p:!text-muted-foreground prose-strong:!text-muted-foreground prose-ul:!text-muted-foreground prose-ol:!text-muted-foreground prose-a:!text-muted-foreground prose-a:!underline prose-h1:!text-lg prose-h2:!text-md prose-h3:!text-md prose-h4:!text-md prose-h5:!text-md prose-h6:!text-md prose-sm prose-img:rounded-xl max-w-none'
									dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(applicationData?.feedbackFromCompany) }}
								/>
								<Divider />
							</div>
						)}
						<div>
							<h2 className='text-lg font-semibold !m-0'>Application Data</h2>
							<div
								className='rounded-md prose prose-blockquote:!text-muted-foreground !text-muted-foreground prose-headings:!text-muted-foreground prose:!text-muted-foreground prose-p:!text-muted-foreground prose-strong:!text-muted-foreground prose-ul:!text-muted-foreground prose-ol:!text-muted-foreground prose-a:!text-muted-foreground prose-a:!underline prose-h1:!text-lg prose-h2:!text-md prose-h3:!text-md prose-h4:!text-md prose-h5:!text-md prose-h6:!text-md prose-sm prose-img:rounded-xl max-w-none'
								dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(applicationData?.jobDescription) }}
							/>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default ApplicationView;
