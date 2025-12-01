// import { apiRoutes, FILES_SEPARATOR } from '@/utils/constants';
// import { useState, useCallback } from 'react';
// import { toast } from './use-toast';
// import { handleApiError } from '@/utils/utility';

// type UploadFileStatus = {
// 	file: File;
// 	isLoading: boolean;
// 	isSuccess: boolean;
// 	error: string | null;
// };

// type UseFileUploadReturn = {
// 	uploadFiles: (files: File[]) => Promise<any[]>;
// 	deleteFile: (fileName: string) => Promise<any>;
// 	fileStatuses: UploadFileStatus[];
// 	resetStatuses: () => void;
// 	checkFileAlreadyUploaded: (file: File, uploadedFilesUrl?: string | null) => boolean;
// };

// export const useUploadFile = (): UseFileUploadReturn => {
// 	const [fileStatuses, setFileStatuses] = useState<UploadFileStatus[]>([]);

// 	const updateFileStatus = (file: File, update: Partial<UploadFileStatus>) => {
// 		setFileStatuses((prevStatuses) =>
// 			prevStatuses.map((status) => (status.file === file ? { ...status, ...update } : status)),
// 		);
// 	};

// 	const checkFileAlreadyUploaded = (file: File, uploadedFilesUrl?: string | null): boolean => {
// 		const existingFileNames = uploadedFilesUrl?.split(FILES_SEPARATOR).map((url) => url.split('/').pop() || '');

// 		const isUploaded = existingFileNames?.includes(file.name);

// 		if (isUploaded) {
// 			toast({
// 				title: 'Info',
// 				description: `File ${file.name} is already uploaded.`,
// 				variant: 'default',
// 			});
// 		}
// 		return !!isUploaded;
// 	};

// 	const uploadFiles = useCallback(async (files: File[]) => {
// 		// Initialize statuses for all files
// 		setFileStatuses(
// 			files.map((file) => ({
// 				file,
// 				isLoading: true,
// 				isSuccess: false,
// 				error: null,
// 			})),
// 		);

// 		const uploadPromises = files.map(async (file) => {
// 			if (file.size > 10 * 1024 * 1024) {
// 				updateFileStatus(file, {
// 					isLoading: false,
// 					isSuccess: false,
// 					error: 'File size should be less than 10MB',
// 				});
// 				toast({
// 					title: 'Error',
// 					description: `File ${file.name} exceeds the size limit of 10MB.`,
// 					variant: 'destructive',
// 				});
// 				return;
// 			}

// 			try {
// 				// Step 1: Get the signed URL
// 				const res = await fetch(apiRoutes.files.upload, {
// 					method: 'POST',
// 					headers: {
// 						'Content-Type': 'application/json',
// 					},
// 					body: JSON.stringify({
// 						fileName: file.name,
// 						contentType: file.type,
// 					}),
// 				});

// 				if (!res.ok) {
// 					await handleApiError(res);
// 				}

// 				const { url, publicUrl } = await res.json();

// 				if (!url) {
// 					throw new Error('Signed URL is missing in the response');
// 				}

// 				// Step 2: Upload the file using the signed URL
// 				const uploadRes = await fetch(url, {
// 					method: 'PUT',
// 					headers: {
// 						'Content-Type': file.type,
// 					},
// 					body: file,
// 				});

// 				if (!uploadRes.ok) {
// 					await handleApiError(uploadRes);
// 				}

// 				// Mark file as successfully uploaded
// 				updateFileStatus(file, { isLoading: false, isSuccess: true });
// 				return publicUrl;
// 			} catch (err: any) {
// 				console.error(`Upload error for file ${file.name}:`, err);
// 				updateFileStatus(file, {
// 					isLoading: false,
// 					isSuccess: false,
// 					error: JSON.stringify(err) || 'An unexpected error occurred',
// 				});
// 			}
// 		});

// 		// Wait for all uploads to complete
// 		const uploadAll = await Promise.all(uploadPromises);
// 		return uploadAll;
// 	}, []);

// 	const resetStatuses = useCallback(() => {
// 		setFileStatuses([]);
// 	}, []);

// 	const deleteFile = useCallback(async (fileName: string) => {
// 		try {
// 			const res = await fetch(apiRoutes.files.delete, {
// 				method: 'POST',
// 				headers: {
// 					'Content-Type': 'application/json',
// 				},
// 				body: JSON.stringify({
// 					fileName,
// 				}),
// 			});

// 			if (!res.ok) {
// 				await handleApiError(res);
// 			}

// 			const response = await res.json();

// 			if (!response) {
// 				throw new Error('An error occurred with remove file');
// 			}

// 			setFileStatuses((prevStatuses) => prevStatuses.filter((status) => status.file.name !== fileName));

// 			toast({
// 				title: 'Success',
// 				description: `File ${fileName} has been successfully deleted.`,
// 				variant: 'success',
// 			});

// 			return response;
// 		} catch (err: any) {
// 			console.error(`Upload error for file ${fileName}:`, err);
// 			await handleApiError(err);
// 		}
// 	}, []);

// 	return {
// 		uploadFiles,
// 		fileStatuses,
// 		resetStatuses,
// 		deleteFile,
// 		checkFileAlreadyUploaded,
// 	};
// };

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback,useState } from 'react';

import { apiRoutes, FILES_SEPARATOR } from '@/utils/constants';
import { getFileName, handleApiError } from '@/utils/utility';

import { toast } from './use-toast';

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
	getFileStatusFromLink: (link: string) => UploadFileStatus | undefined;
};

export const useUploadFile = (): UseFileUploadReturn => {
	const [fileStatuses, setFileStatuses] = useState<UploadFileStatus[]>([]);
	const queryClient = useQueryClient();

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

	// Mutation for uploading a single file
	const uploadFileMutation = useMutation({
		mutationFn: async (file: File) => {
			if (file.size > 10 * 1024 * 1024) {
				throw new Error('File size should be less than 10MB');
			}

			// Step 1: Get the signed URL
			const res = await fetch(apiRoutes.files.upload, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ fileName: file.name, contentType: file.type }),
			});

			if (!res.ok) await handleApiError(res);

			const { url, publicUrl } = await res.json();
			if (!url) throw new Error('Signed URL is missing in the response');

			// Step 2: Upload the file using the signed URL
			const uploadRes = await fetch(url, {
				method: 'PUT',
				headers: { 'Content-Type': file.type },
				body: file,
			});

			if (!uploadRes.ok) await handleApiError(uploadRes);

			return publicUrl;
		},
	});

	// Mutation for deleting a file
	const deleteFileMutation = useMutation({
		mutationFn: async (fileName: string) => {
			const res = await fetch(apiRoutes.files.delete, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ fileName }),
			});

			if (!res.ok) await handleApiError(res);

			const response = await res.json();
			if (!response) throw new Error('An error occurred with remove file');
			return response;
		},
		onSuccess: (_, fileName) => {
			setFileStatuses((prevStatuses) => prevStatuses.filter((status) => status.file.name !== fileName));
			toast({
				title: 'Success',
				description: `File ${fileName} has been successfully deleted.`,
				variant: 'success',
			});
			// Optionally invalidate queries here
			// queryClient.invalidateQueries(['files']);
		},
		onError: (err: any, fileName) => {
			toast({
				title: 'Error',
				description: `Failed to delete file ${fileName}: ${err.message || err}`,
				variant: 'destructive',
			});
		},
	});

	// Upload multiple files
	const uploadFiles = useCallback(
		async (files: File[]) => {
			setFileStatuses(
				files.map((file) => ({
					file,
					isLoading: true,
					isSuccess: false,
					error: null,
				})),
			);

			const uploadResults = await Promise.all(
				files.map(async (file) => {
					try {
						const publicUrl = await uploadFileMutation.mutateAsync(file);
						updateFileStatus(file, { isLoading: false, isSuccess: true });
						toast({
							title: 'Success',
							description: `${file.name} uploaded successfully`,
							variant: 'success',
						});
						return publicUrl;
					} catch (err: any) {
						updateFileStatus(file, {
							isLoading: false,
							isSuccess: false,
							error: err.message || 'An unexpected error occurred',
						});
						toast({
							title: 'Error',
							description: `File ${file.name}: ${err.message || err}`,
							variant: 'destructive',
						});
						return null;
					}
				}),
			);
			return uploadResults;
		},
		[uploadFileMutation],
	);

	const resetStatuses = useCallback(() => {
		setFileStatuses([]);
	}, []);

	const deleteFile = useCallback(
		async (fileName: string) => {
			return await deleteFileMutation.mutateAsync(fileName);
		},
		[deleteFileMutation],
	);

	const getFileStatusFromLink = (link: string): UploadFileStatus | undefined => {
		return fileStatuses.find((status) => status.file.name === getFileName(link));
	};

	return {
		uploadFiles,
		fileStatuses,
		resetStatuses,
		deleteFile,
		checkFileAlreadyUploaded,
		getFileStatusFromLink,
	};
};
