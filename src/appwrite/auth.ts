import { Models, OAuthProvider } from 'appwrite';
import { auth } from './config';
import { baseUrl } from '@/utils/utility';

class ApplicationAuth {
	async login(): Promise<void> {
		try {
			await auth.createOAuth2Session(OAuthProvider.Google, baseUrl(), baseUrl());
		} catch (error) {
			console.error('Login failed:', error);
		}
	}

	async getUserId(): Promise<string | null> {
		try {
			const session = await auth.getSession('current');
			return session.userId;
		} catch (error) {
			console.error('Failed to get user ID:', error);
			return null;
		}
	}

	async getSession(): Promise<Models.Session> {
		try {
			const session = await auth.getSession('current');
			return session;
		} catch (error) {
			console.error('Failed to get session:', error);
			return {} as Models.Session;
		}
	}

	async isLoggedIn(): Promise<boolean> {
		try {
			const session = await auth.getSession('current');
			return !!session.userId;
		} catch (error) {
			console.error('Failed to check login status:', error);
			return false;
		}
	}

	async logout(): Promise<void> {
		try {
			await auth.deleteSession('current');
			localStorage.clear();
		} catch (error) {
			console.error('Logout failed:', error);
		}
	}

	async updateSession(): Promise<void> {
		try {
			await auth.updateSession('current');
		} catch (error) {
			console.error('Failed to update session:', error);
		}
	}
}

export default ApplicationAuth;
