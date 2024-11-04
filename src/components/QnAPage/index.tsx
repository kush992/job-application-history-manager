'use client';

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
import { appRoutes, QueryKeys } from '@/utils/constants';
import React, { useState } from 'react';
import { QnAShowType } from './utility';
import { useQuery } from '@tanstack/react-query';
import { fetchQnAData } from '@/lib/server/appwrite-queries';

type Props = {
	userId: string;
};

const QnAPage: React.FC<Props> = ({ userId }) => {
	const [curQnAType, setCurQnAType] = useState<QnAShowType>(
		QnAShowType.PUBLIC,
	);

	const { data, error, isFetching, isLoading, refetch, isRefetching } =
		useQuery({
			queryKey: [
				QueryKeys.QUESTIONS_AND_ANSWERS_PAGE,
				userId,
				curQnAType,
			],
			queryFn: () => fetchQnAData(userId, curQnAType),
		});

	function handleTabChange(type: QnAShowType) {
		setCurQnAType(type);
		refetch();
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

			{isLoading && <div>Loading...</div>}
			{error && <div>Something went wrong</div>}
			{(isFetching || isRefetching) && <div>Fetching...</div>}
			{!isFetching && !isRefetching && !isLoading && (
				<div className="border p-4 rounded-md bg-background">
					<QnAAccordion
						questionsAndAnswers={
							data?.documents
								?.map((d) => d.questionsAndAnswers)
								.flat() || []
						}
					/>
				</div>
			)}
		</div>
	);
};

export default QnAPage;
