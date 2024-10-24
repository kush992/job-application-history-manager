import { z } from 'zod';

const passwordRegex = new RegExp(
	'^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$',
);

export const signUpFormSchema = z.object({
	name: z
		.string()
		.min(2, { message: 'Name must be atleast 2 characters' })
		.max(128, { message: 'Name must be atmost 128 characters' }),
	email: z.string().email({ message: 'Valid email is required' }),
	password: z
		.string()
		.min(8, { message: 'Password should be atleast 8 characters long' })
		.max(256, { message: 'Password should be atmost 256 characters long' })
		.regex(passwordRegex, { message: 'Password should be strong' }),
});

export const loginFormSchema = z.object({
	email: z.string().email({ message: 'Valid email is required' }),
	password: z
		.string()
		.min(8, { message: 'Password should be atleast 8 characters long' })
		.max(256, { message: 'Password should be atmost 256 characters long' }),
});
