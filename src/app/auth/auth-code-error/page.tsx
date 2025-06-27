import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function AuthCodeErrorPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md mx-auto">
				<Card>
					<CardHeader className="text-center">
						<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
							<AlertTriangle className="h-6 w-6 text-red-600" />
						</div>
						<CardTitle className="text-xl font-semibold text-gray-900">Authentication Error</CardTitle>
						<CardDescription>There was a problem confirming your email address</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<Alert className="border-red-200 bg-red-50">
							<AlertDescription className="text-red-700">
								The confirmation link may have expired or been used already. Please try signing up again
								or contact support if the problem persists.
							</AlertDescription>
						</Alert>

						<div className="space-y-3">
							<Link href="/auth/signup" className="block">
								<Button className="w-full">Try Signing Up Again</Button>
							</Link>
							<Link href="/auth/signin" className="block">
								<Button variant="outline" className="w-full">
									Sign In Instead
								</Button>
							</Link>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
