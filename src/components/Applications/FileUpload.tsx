import React from 'react';

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useUploadFile } from '@/hooks/useUploadFile';
import { FILES_SEPARATOR } from '@/utils/constants';
import { getFileName } from '@/utils/utility';

import DocumentInfoCard from '../ui/document-info-card';

type Props = {
	form: any;
};

const FileUpload = ({ form }: Props) => {
	const { uploadFiles, deleteFile, checkFileAlreadyUploaded, fileStatuses, getFileStatusFromLink } = useUploadFile();

	const isShowFileStatus = fileStatuses.some((status) => status.isLoading);

	const removeFile = async (fileName: string) => {
		// cast the retrieved value to string | undefined to satisfy react-hook-form's generic typing
		const links = (form.getValues('links' as any) as string | undefined)?.split(FILES_SEPARATOR);
		const newLinks = links?.filter((link: string) => !link.includes(fileName)).join(FILES_SEPARATOR);
		await deleteFile(fileName).then(() => form.setValue('links' as string, newLinks));
	};
	return (
		<FormField
			control={form.control}
			name="links"
			render={({ field }) => (
				<FormItem className="flex flex-col">
					<FormLabel>Upload Files</FormLabel>
					<FormControl>
						<Input
							id="fileUploader"
							type="file"
							multiple
							name="link"
							onChange={async (e) => {
								const files = e.target.files;

								if (files?.length) {
									// Check if the files are already uploaded
									const newFiles = Array.from(files).filter(
										(file) => !checkFileAlreadyUploaded(file, form.getValues('links')),
									);

									const uploadedFileUrls = await uploadFiles(Array.from(newFiles));

									if (uploadedFileUrls) {
										if (!form.getValues('links')) {
											form.setValue('links', uploadedFileUrls.join(FILES_SEPARATOR));
										} else {
											const newLinks = uploadedFileUrls.join(FILES_SEPARATOR);
											form.setValue(
												'links',
												form.getValues('links') + FILES_SEPARATOR + newLinks,
											); // joining the recent with initial links
										}
									}
								}
							}}
						/>
					</FormControl>

					<FormDescription>File should be less than 10MB.</FormDescription>

					{/* show current progress of files */}
					{isShowFileStatus &&
						fileStatuses.map((status) => <DocumentInfoCard key={status.file.name} {...status} />)}

					{/* show all the files associated to this application */}
					{form
						.getValues('links')
						?.split(FILES_SEPARATOR)
						.map((link: string, index: number) => (
							<DocumentInfoCard
								key={`${index + 1} - ${getFileName(link)}`}
								fileName={getFileName(link)}
								removeFile={removeFile}
								// isLoading={getFileStatusFromLink(link)}
								// isSuccess={getFileStatusFromLink(link)}
								// error={fileStatuses?.[index]?.error}
								{...getFileStatusFromLink(link)}
							/>
						))}
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default FileUpload;
