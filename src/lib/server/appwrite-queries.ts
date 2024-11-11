import { UserPreferences } from '@/types/user';
import { apiRoutes } from '@/utils/constants';

export const updateAccountSettings = async (data: UserPreferences) => {
	try {
		const response = await fetch(apiRoutes.usersPrefs.update, {
			method: 'PUT',
			body: JSON.stringify(data),
		});

		if (response.ok) {
			return response.status;
		}
	} catch (error) {
		console.error(error);
		return error;
	}
};
