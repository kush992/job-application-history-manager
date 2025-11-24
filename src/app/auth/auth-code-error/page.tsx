// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Alert, AlertDescription } from '@/components/ui/alert';
// import { Button } from '@/components/ui/button';
// import { AlertTriangle } from 'lucide-react';
// import Link from 'next/link';

// export default function AuthCodeErrorPage() {
// 	return (
// 		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
// 			<div className="max-w-md mx-auto">
// 				<Card>
// 					<CardHeader className="text-center">
// 						<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
// 							<AlertTriangle className="h-6 w-6 text-red-600" />
// 						</div>
// 						<CardTitle className="text-xl font-semibold text-primary">Authentication Error</CardTitle>
// 						<CardDescription>There was a problem confirming your email address</CardDescription>
// 					</CardHeader>
// 					<CardContent className="space-y-4">
// 						<Alert className="border-red-200 bg-red-50">
// 							<AlertDescription className="text-red-700">
// 								The confirmation link may have expired or been used already. Please try signing up again
// 								or contact support if the problem persists.
// 							</AlertDescription>
// 						</Alert>

// 						<div className="space-y-3">
// 							<Link href="/auth/signup" className="block">
// 								<Button className="w-full">Try Signing Up Again</Button>
// 							</Link>
// 							<Link href="/auth/signin" className="block">
// 								<Button variant="outline" className="w-full">
// 									Sign In Instead
// 								</Button>
// 							</Link>
// 						</div>
// 					</CardContent>
// 				</Card>
// 			</div>
// 		</div>
// 	);
// }

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { appRoutes } from '@/utils/constants';

export default function AuthCodeErrorPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-background py-8 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md mx-auto">
				<Card>
					<CardHeader className="text-center">
						<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
							<AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
						</div>
						<CardTitle className="text-xl font-semibold text-primary">Authentication Error</CardTitle>
						<CardDescription>There was a problem with Google authentication</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
							<AlertDescription className="text-red-700 dark:text-red-300">
								The authentication process was interrupted or failed. This can happen if you closed the
								Google sign-in window or denied permissions.
							</AlertDescription>
						</Alert>

						<div className="space-y-3">
							<Link href={appRoutes.signUp} className="block">
								<Button className="w-full">Try Signing In Again</Button>
							</Link>
						</div>

						<div className="pt-4">
							<p className="text-xs text-center text-muted-foreground">
								Need help?{' '}
								<a href="/contact" className="underline hover:text-primary">
									Contact Support
								</a>
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
