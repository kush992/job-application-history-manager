'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FormFieldProps {
	id: string;
	label: string;
	type?: string;
	placeholder?: string;
	error?: string;
	register?: any;
	required?: boolean;
}

export function FormField({
	id,
	label,
	type = 'text',
	placeholder,
	error,
	register,
	required = false,
}: FormFieldProps) {
	return (
		<div className="space-y-2">
			<Label htmlFor={id}>
				{label}
				{required && <span className="text-red-500 ml-1">*</span>}
			</Label>
			<Input
				id={id}
				type={type}
				placeholder={placeholder}
				{...register}
				className={error ? 'border-red-500 focus:border-red-500' : ''}
			/>
			{error && <p className="text-sm text-red-600">{error}</p>}
		</div>
	);
}
