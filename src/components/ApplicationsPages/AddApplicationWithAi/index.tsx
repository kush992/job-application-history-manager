'use client';

import { FC, useState } from 'react';
import { apiRoutes, appRoutes } from '@/utils/constants';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import PageTitle from '@/components/ui/page-title';
import PageDescription from '@/components/ui/page-description';
import { Card, CardContent } from '@/components/ui/card';
import ErrorDisplay from '@/components/ui/error-display';
import TinyEditor from '@/components/ui/tiny-editor';
import { Button } from '@/components/ui/button';

type Props = {
	documentId?: string;
	isUpdateForm?: boolean;
	isViewOnlyForm?: boolean;
	userId: string;
};

const AddApplicationWithAi: FC<Props> = ({ documentId, isUpdateForm, userId }) => {
	const [initialData, setInitialData] = useState<string>('');
	const [data, setData] = useState<any>({});

	async function extractJobData(rawText: string) {
		const response = await fetch(apiRoutes.applications.addWithAi, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ text: rawText }),
		});

		if (!response.ok) {
			const result = await response.json();
			setData({ error: result });
			return;
		}

		const result = await response.json();
		setData(result);
		return result;
	}

	return (
		<div className="flex flex-col gap-6 md:container">
			<div className="px-4 md:px-0 pt-4">
				<Breadcrumb className="mb-4">
					<BreadcrumbList>
						<BreadcrumbLink href={appRoutes.home}>Home</BreadcrumbLink>
						<BreadcrumbSeparator />
						<BreadcrumbLink href={appRoutes.application}>Applications</BreadcrumbLink>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>{isUpdateForm ? 'Update' : 'Add'}</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
				<PageTitle title={isUpdateForm ? 'Update' : 'Add latest applied'} />
				<PageDescription description="Fill up all the details that are available" />
			</div>

			<Card className="bg-background rounded-none border-[0px] md:rounded-xl md:border mb-6">
				<CardContent className="pt-6 px-4 md:px-6">
					<form>
						<TinyEditor
							initialData={initialData ?? ''}
							onChange={(e) => setInitialData(e)}
							textareaName="job_application_data"
						/>
						<Button
							type="button"
							className="mt-4"
							onClick={(e) => {
								e.preventDefault();
								extractJobData(initialData);
							}}
						>
							Save
						</Button>
					</form>
				</CardContent>
			</Card>

			{data?.error ? (
				<ErrorDisplay error={data?.error} />
			) : (
				<pre className="bg-background text-status-success text-sm rounded-md border p-4 overflow-x-auto">
					<code>{JSON.stringify(data, null, 2)}</code>
				</pre>
			)}
		</div>
	);
};

export default AddApplicationWithAi;
