import React from 'react';
import cn from 'classnames';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useUploadFile } from '@/hooks/useUploadFile';

type Props = {
	file: File;
	isLoading?: boolean;
	isSuccess?: boolean;
	error?: string | null;
};

const DocumentInfoCard: React.FC<Props> = ({ file, isLoading, isSuccess, error }) => {
	const { deleteFile, resetStatuses } = useUploadFile();

	return (
		<Card className='max-w-xs'>
			<CardHeader className='p-4 pb-0'>
				<CardTitle>{file.name}</CardTitle>
				{error && <CardDescription className='text-destructive'>{error}</CardDescription>}
			</CardHeader>
			<CardContent className='flex flex-col items-baseline gap-4 p-4 pt-0'>
				<div className='flex items-baseline gap-1 text-3xl font-bold tabular-nums leading-none'>
					<span className='text-sm font-normal text-muted-foreground'>Loading: {String(isLoading)}</span>
					<span
						className={cn('text-sm font-normal text-muted-foreground', {
							'text-successColor': isSuccess,
							'text-destructive': !isSuccess,
						})}
					>
						Success: {String(isSuccess)}
					</span>
				</div>
				<Button
					type='button'
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
						deleteFile(file).then((resp) => resetStatuses());
					}}
				>
					Remove file
				</Button>
			</CardContent>
		</Card>
	);
};

export default DocumentInfoCard;
