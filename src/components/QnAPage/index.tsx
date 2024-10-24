'use client';

import { database, appwriteDbConfig } from '@/appwrite/config';
import { QnAAccordion } from '@/components/QnAAccordion';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import PageDescription from '@/components/ui/page-description';
import PageTitle from '@/components/ui/page-title';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InterviewQuestionsData, Response } from '@/types/apiResponseTypes';
import { appRoutes } from '@/utils/constants';
import { Query } from 'node-appwrite';
import React, { useEffect, useState } from 'react';
import { QnAShowType } from './utility';

type Props = {
	userId: string;
};

const QnAPage: React.FC<Props> = ({ userId }) => {
	const [isFetching, setIsFetching] = useState<boolean>(false);
	const [documents, setDocuments] = useState<
		Response<InterviewQuestionsData>
	>({} as Response<InterviewQuestionsData>);
	const [curQnAType, setCurQnAType] = useState<QnAShowType>(
		QnAShowType.PUBLIC,
	);

	useEffect(() => {
		async function fetchApplicationData() {
			setIsFetching(true);

			const query =
				curQnAType === QnAShowType.PUBLIC
					? [Query.equal('isPrivate', false)]
					: [
							Query.equal('userId', userId),
							Query.equal('isPrivate', true),
						];

			try {
				const response: Response<InterviewQuestionsData> =
					await database.listDocuments(
						appwriteDbConfig.applicationDb,
						appwriteDbConfig.applicationDbInterviewQuestionsCollectionId,
						query,
					);

				if (!!response.documents) {
					setDocuments(response);
				} else {
					console.error('No documents found');
					setDocuments({} as Response<InterviewQuestionsData>);
				}
			} catch (error) {
				console.error(error);
			} finally {
				setIsFetching(false);
			}
		}
		fetchApplicationData();
	}, [curQnAType, userId]);

	function handleTabChange(type: QnAShowType) {
		setCurQnAType(type);
	}

	return (
		<div className="flex flex-col gap-6 ">
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbLink href={appRoutes.home}>Home</BreadcrumbLink>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>Interview Questions</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<div>
				<PageTitle title="Q&A from interviews" />
				<PageDescription description="This is a collection of questions and answers posted by all the users that are available publicly" />
			</div>

			<Tabs
				defaultValue={QnAShowType.PUBLIC}
				className="w-full"
				onValueChange={(value) => handleTabChange(value as QnAShowType)}
			>
				<TabsList className="w-full border">
					<TabsTrigger className="w-full" value={QnAShowType.PUBLIC}>
						Public
					</TabsTrigger>
					<TabsTrigger className="w-full" value={QnAShowType.PRIVATE}>
						Private
					</TabsTrigger>
				</TabsList>

				<TabsContent
					value={QnAShowType.PUBLIC}
					className="text-muted-foreground text-sm"
				>
					Collection made by all the QnA that are marked as public
				</TabsContent>
				<TabsContent
					value={QnAShowType.PRIVATE}
					className="text-muted-foreground text-sm"
				>
					Collection made by all the QnA that are posted by you
				</TabsContent>
			</Tabs>
			<div className="border p-4 rounded-md bg-background">
				<QnAAccordion
					questionsAndAnswers={
						documents?.documents
							?.map((d) => d.questionsAndAnswers)
							.flat() || []
					}
				/>
			</div>
		</div>
	);
};

export default QnAPage;
