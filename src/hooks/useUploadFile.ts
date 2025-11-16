import { apiRoutes, FILES_SEPARATOR } from '@/utils/constants';
import { useState, useCallback } from 'react';
import { toast } from './use-toast';
import { handleApiError } from '@/utils/utility';

type UploadFileStatus = {
	file: File;
	isLoading: boolean;
	isSuccess: boolean;
	error: string | null;
};

type UseFileUploadReturn = {
	uploadFiles: (files: File[]) => Promise<any[]>;
	deleteFile: (fileName: string) => Promise<any>;
	fileStatuses: UploadFileStatus[];
	resetStatuses: () => void;
	checkFileAlreadyUploaded: (file: File, uploadedFilesUrl?: string | null) => boolean;
};

export const useUploadFile = (): UseFileUploadReturn => {
	const [fileStatuses, setFileStatuses] = useState<UploadFileStatus[]>([]);

	const updateFileStatus = (file: File, update: Partial<UploadFileStatus>) => {
		setFileStatuses((prevStatuses) =>
			prevStatuses.map((status) => (status.file === file ? { ...status, ...update } : status)),
		);
	};

	const checkFileAlreadyUploaded = (file: File, uploadedFilesUrl?: string | null): boolean => {
		const existingFileNames = uploadedFilesUrl?.split(FILES_SEPARATOR).map((url) => url.split('/').pop() || '');

		const isUploaded = existingFileNames?.includes(file.name);

		if (isUploaded) {
			toast({
				title: 'Info',
				description: `File ${file.name} is already uploaded.`,
				variant: 'default',
			});
		}
		return !!isUploaded;
	};

	const uploadFiles = useCallback(async (files: File[]) => {
		// Initialize statuses for all files
		setFileStatuses(
			files.map((file) => ({
				file,
				isLoading: true,
				isSuccess: false,
				error: null,
			})),
		);

		const uploadPromises = files.map(async (file) => {
			if (file.size > 10 * 1024 * 1024) {
				updateFileStatus(file, {
					isLoading: false,
					isSuccess: false,
					error: 'File size should be less than 10MB',
				});
				toast({
					title: 'Error',
					description: `File ${file.name} exceeds the size limit of 10MB.`,
					variant: 'destructive',
				});
				return;
			}

			try {
				// Step 1: Get the signed URL
				const res = await fetch(apiRoutes.files.upload, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						fileName: file.name,
						contentType: file.type,
					}),
				});

				if (!res.ok) {
					await handleApiError(res);
				}

				const { url, publicUrl } = await res.json();

				if (!url) {
					throw new Error('Signed URL is missing in the response');
				}

				// Step 2: Upload the file using the signed URL
				const uploadRes = await fetch(url, {
					method: 'PUT',
					headers: {
						'Content-Type': file.type,
					},
					body: file,
				});

				console.info('uploadRes', uploadRes);

				if (!uploadRes.ok) {
					await handleApiError(uploadRes);
				}

				// Mark file as successfully uploaded
				updateFileStatus(file, { isLoading: false, isSuccess: true });
				return publicUrl;
			} catch (err: any) {
				console.error(`Upload error for file ${file.name}:`, err);
				updateFileStatus(file, {
					isLoading: false,
					isSuccess: false,
					error: JSON.stringify(err) || 'An unexpected error occurred',
				});
			}
		});

		// Wait for all uploads to complete
		const uploadAll = await Promise.all(uploadPromises);
		return uploadAll;
	}, []);

	const resetStatuses = useCallback(() => {
		setFileStatuses([]);
	}, []);

	const deleteFile = useCallback(async (fileName: string) => {
		try {
			const res = await fetch(apiRoutes.files.delete, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					fileName,
				}),
			});

			if (!res.ok) {
				await handleApiError(res);
			}

			const response = await res.json();

			if (!response) {
				throw new Error('An error occurred with remove file');
			}

			setFileStatuses((prevStatuses) => prevStatuses.filter((status) => status.file.name !== fileName));

			toast({
				title: 'Success',
				description: `File ${fileName} has been successfully deleted.`,
				variant: 'success',
			});

			return response;
		} catch (err: any) {
			console.error(`Upload error for file ${fileName}:`, err);
			await handleApiError(err);
		}
	}, []);

	return {
		uploadFiles,
		fileStatuses,
		resetStatuses,
		deleteFile,
		checkFileAlreadyUploaded,
	};
};
