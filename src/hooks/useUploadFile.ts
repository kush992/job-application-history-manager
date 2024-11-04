import { useState, useCallback } from 'react';

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
};

export const useUploadFile = (): UseFileUploadReturn => {
	const [fileStatuses, setFileStatuses] = useState<UploadFileStatus[]>([]);

	const updateFileStatus = (
		file: File,
		update: Partial<UploadFileStatus>,
	) => {
		setFileStatuses((prevStatuses) =>
			prevStatuses.map((status) =>
				status.file === file ? { ...status, ...update } : status,
			),
		);
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
				return;
			}

			try {
				// Step 1: Get the signed URL
				const res = await fetch('/api/files/upload', {
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
					throw new Error('Failed to get signed URL');
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

				if (!uploadRes.ok) {
					throw new Error('Failed to upload the file');
				}

				// Mark file as successfully uploaded
				updateFileStatus(file, { isLoading: false, isSuccess: true });
				return publicUrl;
			} catch (err: any) {
				console.error(`Upload error for file ${file.name}:`, err);
				updateFileStatus(file, {
					isLoading: false,
					isSuccess: false,
					error: err.message || 'An unexpected error occurred',
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
			const res = await fetch('/api/files/delete', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					fileName,
				}),
			});

			if (!res.ok) {
				throw new Error('Failed to get signed URL');
			}

			const response = await res.json();

			if (!response) {
				throw new Error('An error occurred with remove file');
			}

			return response;
		} catch (err: any) {
			console.error(`Upload error for file ${fileName}:`, err);
		}
	}, []);

	return {
		uploadFiles,
		fileStatuses,
		resetStatuses,
		deleteFile,
	};
};
