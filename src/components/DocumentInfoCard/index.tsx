import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CircleCheck, CircleX, Loader } from 'lucide-react';

type Props = {
	file?: File;
	fileName?: string;
	isLoading?: boolean;
	isSuccess?: boolean;
	error?: string | null;
	isShowRemoveBtn?: boolean;
	removeFile?: (fileName: string) => void;
};

const DocumentInfoCard: React.FC<Props> = ({
	file,
	fileName,
	isLoading,
	isSuccess,
	error,
	isShowRemoveBtn = true,
	removeFile,
}) => {
	return (
		<Card className="flex items-center justify-between py-2">
			<CardHeader className="py-0">
				<CardTitle className="text-base flex items-center my-0 py-0">
					{file?.name || fileName} &nbsp;
					<div>
						{file && isLoading && <Loader className="w-4 h-4" />}
						{file && !isLoading && isSuccess && <CircleCheck className="!text-successColor w-4 h-4" />}
						{file && !isLoading && !isSuccess && <CircleX className="!text-destructive w-4 h-4" />}
					</div>
				</CardTitle>
				{error && <CardDescription className="text-destructive">{error}</CardDescription>}
			</CardHeader>
			{isShowRemoveBtn && (
				<CardContent className="pb-0">
					<Button
						type="button"
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							fileName && removeFile?.(fileName);
						}}
						disabled={!fileName}
						size="sm"
						variant="destructive"
					>
						<CircleX className="mr-1" />
						Remove file
					</Button>
				</CardContent>
			)}
		</Card>
	);
};

export default DocumentInfoCard;
