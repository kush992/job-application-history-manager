import { z } from 'zod';

export const signUpSchema = z
	.object({
		name: z
			.string()
			.min(2, { message: 'Name must be at least 2 characters long.' })
			.max(50, { message: 'Name must be less than 50 characters.' })
			.trim(),
		email: z.string().email({ message: 'Please enter a valid email address.' }),
		password: z
			.string()
			.min(8, { message: 'Password must be at least 8 characters long.' })
			.regex(/[a-zA-Z]/, { message: 'Password must contain at least one letter.' })
			.regex(/[0-9]/, { message: 'Password must contain at least one number.' })
			.regex(/[^a-zA-Z0-9]/, {
				message: 'Password must contain at least one special character.',
			}),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	});

export const signInSchema = z.object({
	email: z.string().email({ message: 'Please enter a valid email address.' }),
	password: z.string().min(1, { message: 'Password is required.' }),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
export type SignInFormData = z.infer<typeof signInSchema>;
