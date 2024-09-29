import React from 'react';
import cn from 'classnames';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type Props = {
	fileName: string;
	isLoading?: boolean;
	isSuccess?: boolean;
	error?: string;
};

const DocumentInfoCard: React.FC<Props> = ({ fileName, isLoading, isSuccess, error }) => {
	return (
		<Card className='max-w-xs'>
			<CardHeader className='p-4 pb-0'>
				<CardTitle>{fileName}</CardTitle>
				{error && <CardDescription className='text-destructive'>{error}</CardDescription>}
			</CardHeader>
			<CardContent className='flex flex-row items-baseline gap-4 p-4 pt-0'>
				<div className='flex items-baseline gap-1 text-3xl font-bold tabular-nums leading-none'>
					<p className='text-sm font-normal text-muted-foreground'>Loading: {String(isLoading)}</p>
					<span
						className={cn('text-sm font-normal text-muted-foreground', {
							'text-successColor': isSuccess,
							'text-destructive': !isSuccess,
						})}
					>
						Success: {String(isSuccess)}
					</span>
				</div>
			</CardContent>
		</Card>
	);
};

export default DocumentInfoCard;
