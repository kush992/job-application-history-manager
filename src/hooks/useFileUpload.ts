export function useFileUpload() {
	return async (file: File) => {
		try {
			const filename = purifyFileName(file.name);
			const formDataToSend = new FormData();
			formDataToSend.append('file', file); // Add the file to the FormData
			formDataToSend.append('filename', filename); // Optionally add the filename as a separate field

			const result = await fetch(`/api/files/uploadFiles?file=${filename}`, {
				method: 'POST',
				body: formDataToSend,
			});

			if (!result.ok) {
				throw new Error('Failed to fetch upload URL');
			}

			const responseText = await result.text();
			let responseJson;
			try {
				responseJson = JSON.parse(responseText);
			} catch (e) {
				throw new Error('Invalid JSON response');
			}

			const resp = responseJson;

			const formData = new FormData();
			Object.entries(resp.fields).forEach(([key, value]) => {
				formData.append(key, value as string | Blob);
			});

			formData.append('file', file as Blob | File);

			const response = await uploadImagesToGcpBucket(formData, resp.url, filename);
			return response;
		} catch (error) {
			console.error('Error in file upload:', error);
			return false;
		}
	};
}

async function uploadImagesToGcpBucket(formData: FormData, url: string, fileName: string) {
	try {
		const upload = await fetch(url, {
			method: 'POST',
			body: formData,
		});

		if (!upload.ok) {
			throw new Error('Failed to upload file');
		}

		console.log('UPLOAD_SUCCESS', upload);
		return `https://storage.googleapis.com/job-application-manager/${fileName}`;
	} catch (error) {
		console.error('Error in file upload:', error);
		return false;
	}
}

function purifyFileName(fileName: string) {
	return fileName.replace(/[^a-zA-Z0-9.]/g, '-');
}
