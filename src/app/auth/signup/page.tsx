import SignUpForm from '@/components/Auth/SingUpForm';

export default function SignUpPage() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-extrabold text-gray-900">Join Us Today</h1>
					<p className="mt-2 text-sm text-gray-600">Create your account and get started</p>
				</div>
				<SignUpForm />
			</div>
		</div>
	);
}
