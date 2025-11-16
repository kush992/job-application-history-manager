import React from 'react';
import { Button } from '@/components/ui/button';
import { CircleCheck, CircleX, Loader, Trash2Icon } from 'lucide-react';
import { Separator } from '../ui/separator';

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
	if (!file && !fileName) {
		return null; // No file or fileName provided, nothing to display
	}

	return (
		<>
			<div className="flex items-center justify-between py-2 gap-6">
				<div className="flex items-center gap-2 w-[70%]">
					<p className="text-sm">{file?.name || fileName} &nbsp;</p>
					<div>
						{(file || fileName) && isLoading && <Loader className="w-4 h-4 animate-spin" />}
						{(file || fileName) && isSuccess && <CircleCheck className="!text-successColor w-4 h-4" />}
						{(file || fileName) && error && <CircleX className="!text-destructive w-4 h-4" />}
					</div>
				</div>
				{error && <p className="text-destructive text-sm">{error}</p>}
				{isShowRemoveBtn && (
					<Button
						type="button"
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							fileName && removeFile?.(fileName);
						}}
						disabled={!fileName}
						size="icon"
						variant="destructive"
						className="font-normal"
					>
						<Trash2Icon className="h-4 w-4" />
					</Button>
				)}
			</div>
			<Separator />
		</>
	);
};

export default DocumentInfoCard;
