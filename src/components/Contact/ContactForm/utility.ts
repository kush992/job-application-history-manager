import { z } from 'zod';

export const contactFormSchema = z.object({
	name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters'),
	email: z.string().email('Please enter a valid email address'),
	message: z
		.string()
		.min(10, 'Message must be at least 10 characters')
		.max(1000, 'Message must be less than 1000 characters'),
	privacyPolicy: z.boolean().refine((val) => val === true, {
		message: 'You must agree to the privacy policy',
	}),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
