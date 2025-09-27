import SignInForm from '@/components/Auth/SignInForm';

export default function SignInPage() {
	return (
		<div className="md:min-h-screen flex items-center justify-center bg-gradient-to-b from-secondary to-transparent dark:from-background py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-extrabold text-primary">Sign In</h1>
					<p className="mt-2 text-sm text-secondary-foreground">Access your account</p>
				</div>
				<SignInForm />
			</div>
		</div>
	);
}
