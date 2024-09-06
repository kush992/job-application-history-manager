// src/lib/server/appwrite.js
'use server';
import { Client, Account, ID } from 'node-appwrite';
import { cookies } from 'next/headers';
import { config } from '@/config/config';
import { redirect } from 'next/navigation';

export async function createSessionClient() {
	const client = new Client().setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId);

	const session = cookies().get('my-custom-session');
	if (!session || !session.value) {
		throw new Error('No session');
	}

	client.setSession(session.value);

	return {
		get account() {
			return new Account(client);
		},
	};
}

export async function createAdminClient() {
	const client = new Client().setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId).setKey(config.appwriteApiKey);

	return {
		get account() {
			return new Account(client);
		},
	};
}

export async function getLoggedInUser() {
	try {
		const { account } = await createSessionClient();
		return await account.get();
	} catch (error) {
		return null;
	}
}

export async function signUpWithEmail(formData: any) {
	'use server';

	const email = formData.get('email');
	const password = formData.get('password');
	const name = formData.get('name');

	const { account } = await createAdminClient();

	try {
		await account.create(ID.unique(), email, password, name);
		const session = await account.createEmailPasswordSession(email, password);
		cookies().set('my-custom-session', session.secret, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: true,
		});

		redirect('/applications');
	} catch (error) {
		console.error(error);
	}
}

export async function signOut() {
	'use server';

	const { account } = await createSessionClient();

	cookies().delete('my-custom-session');
	await account.deleteSession('current');

	redirect('/');
}
