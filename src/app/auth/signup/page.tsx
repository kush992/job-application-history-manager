import { CheckCircle,Shield, Zap } from 'lucide-react';

import { GoogleAuthButton } from '@/components/Auth/GoogleAuthButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function SignUpPage() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br dark:from-background py-8 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				{/* Header */}
				<div className="text-center">
					<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance leading-tight">
						Join Us Today
					</h1>
					<p className="text-lg text-secondary-foreground">Start tracking your job applications in seconds</p>
				</div>

				{/* Main Auth Card */}
				<Card className="w-full motion-preset-slide-down-md">
					<CardHeader className="text-center space-y-1">
						<CardTitle className="text-2xl font-semibold">Create Account</CardTitle>
						<CardDescription>Quick and easy signup with your Google account</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<GoogleAuthButton mode="signup" />

						{/* Benefits */}
						<div className="pt-4 space-y-6">
							<div className="flex items-start gap-3 text-sm">
								<Zap className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
								<div>
									<p className="font-medium text-foreground">Get Started in Seconds</p>
									<p className="text-muted-foreground">No forms to fill, no passwords to remember</p>
								</div>
							</div>
							<div className="flex items-start gap-3 text-sm">
								<Shield className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
								<div>
									<p className="font-medium text-foreground">Secure Authentication</p>
									<p className="text-muted-foreground">Powered by {"Google's"} security</p>
								</div>
							</div>
							<div className="flex items-start gap-3 text-sm">
								<CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-1" />
								<div>
									<p className="font-medium text-foreground">Verified Email</p>
									<p className="text-muted-foreground">Your email is automatically verified</p>
								</div>
							</div>
						</div>

						{/* Terms */}
						<p className="text-xs text-center text-muted-foreground pt-6">
							By signing up, you agree to our{' '}
							<a href="/terms-of-service" className="underline hover:text-primary">
								Terms of Service
							</a>{' '}
							and{' '}
							<a href="/privacy-policy" className="underline hover:text-primary">
								Privacy Policy
							</a>
						</p>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
