'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle } from 'lucide-react';

interface FormMessageProps {
	type: 'success' | 'error';
	message: string;
}

export function FormMessage({ type, message }: FormMessageProps) {
	return (
		<Alert variant={type === 'error' ? 'destructive' : 'default'}>
			<AlertDescription className="flex items-center gap-2 w-full justify-start">
				{type === 'error' ? (
					<XCircle className="h-4 w-4 text-destructive" />
				) : (
					<CheckCircle className="h-4 w-4 text-green-600" />
				)}
				{message}
			</AlertDescription>
		</Alert>
	);
}
