import { apiRoutes } from '@/utils/constants';

// TODO: test the endpoints thoroughly before activating the file uploads
export const applicationDocsQueries = {
	add: async (link: string, applicationId: string) => {
		// Note: `applicationId` is the id of item from `job-applications` collection for creating relation with newly created document in `documents` collection
		try {
			const response = await fetch(apiRoutes.applicationDocuments.add, {
				method: 'POST',
				body: JSON.stringify({
					link,
					applicationId,
				}),
			});

			if (response.ok) {
				return await response.json();
			} else {
				throw new Error(`Error creating application: ${response.statusText} | ${response.status}`);
			}
		} catch (error) {
			console.error(error);
			throw new Error(`Error creating application: ${error}`);
		}
	},
	update: async (link: string, documentId: string) => {
		// Note: `documentId` is the id of item from `documents` collection to update
		try {
			const response = await fetch(`${apiRoutes.applicationDocuments.update}?documentId=${documentId}`, {
				method: 'PUT',
				body: JSON.stringify({ link }),
			});

			if (response.ok) {
				return await response.json();
			} else {
				throw new Error(`Error updating application: ${response.statusText} | ${response.status}`);
			}
		} catch (error) {
			console.error(error);
			throw new Error(`Error updating application: ${error}`);
		}
	},
};

// TODO: check all the cases of link updating and adding new
export const addLinks = (link: string, id: string) => {
	if (link) {
		return applicationDocsQueries.update(link, id);
	} else {
		return applicationDocsQueries.add(link, id);
	}
};
