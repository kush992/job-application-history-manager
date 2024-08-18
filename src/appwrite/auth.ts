import { Models, OAuthProvider } from 'appwrite';
import { auth } from './config';

class ApplicationAuth {
	// private authProvider: typeof auth = auth;

	// constructor(authProvider: typeof auth) {
	// 	this.authProvider = auth;
	// }

	async login(): Promise<void> {
		try {
			auth.createOAuth2Session(OAuthProvider.Google, 'http://localhost:3000/', 'http://localhost:3000/');
		} catch (error) {
			console.error('Login failed:', error);
		}
	}

	async getUserId(): Promise<string | null> {
		try {
			const session = await this.authProvider.getSession('current');
			return session.userId;
		} catch (error) {
			console.error('Failed to get user ID:', error);
			return null;
		}
	}

	async getSession(): Promise<Models.Session> {
		try {
			const session = await this.authProvider.getSession('current');
			return session;
		} catch (error) {
			console.error('Failed to get session:', error);
			return {} as Models.Session;
		}
	}

	async isLoggedIn(): Promise<boolean> {
		try {
			const session = await this.authProvider.getSession('current');
			return !!session.userId;
		} catch (error) {
			console.error('Failed to check login status:', error);
			return false;
		}
	}

	async logout(): Promise<void> {
		try {
			await this.authProvider.deleteSession('current');
		} catch (error) {
			console.error('Logout failed:', error);
		}
	}

	async updateSession(): Promise<void> {
		try {
			await this.authProvider.updateSession('current');
		} catch (error) {
			console.error('Failed to update session:', error);
		}
	}
}

export default ApplicationAuth;
