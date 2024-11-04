'use server';
import { Client, Account, ID } from 'node-appwrite';
import { cookies } from 'next/headers';
import { config } from '@/config/config';
import { redirect } from 'next/navigation';

export async function createSessionClient() {
	const client = new Client()
		.setEndpoint(config.appwriteUrl)
		.setProject(config.appwriteProjectId);

	const session = cookies().get('session');
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
	const client = new Client()
		.setEndpoint(config.appwriteUrl)
		.setProject(config.appwriteProjectId)
		.setKey(config.appwriteApiKey);

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

export async function signUpWithEmail(formData: FormData) {
	'use server';

	const email = formData.get('email')?.toString();
	const password = formData.get('password')?.toString();
	const name = formData.get('name')?.toString();

	if (!email || !password || !name) {
		throw new Error('Email, password and name are required fields.');
	}

	const { account } = await createAdminClient();

	try {
		await account.create(ID.unique(), email, password, name);
		const session = await account.createEmailPasswordSession(
			email,
			password,
		);
		cookies().set('session', session.secret, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: true,
		});

		if (session?.$id) {
			redirect('/applications');
		}
	} catch (error) {
		console.error(JSON.stringify(error));
		throw new Error('An error occured', {
			cause: JSON.stringify(error),
		});
	}
}

export async function loginWithEmail(formData: FormData) {
	('use server');

	console.log('formData', formData);

	const email = formData?.get('email')?.toString();
	const password = formData?.get('password')?.toString();

	if (!email || !password) {
		throw new Error('Email and password are required fields');
	}

	const { account } = await createAdminClient();

	try {
		const session = await account.createEmailPasswordSession(
			email,
			password,
		);
		cookies().set('session', session.secret, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: true,
		});

		if (session?.$id) {
			redirect('/applications');
		}
	} catch (error) {
		console.error(JSON.stringify(error));
		throw new Error('An error occured', {
			cause: JSON.stringify(error),
		});
	}
}

export async function signOut() {
	const { account } = await createSessionClient();

	cookies().delete('session');
	await account.deleteSession('current');

	redirect('/');
}
