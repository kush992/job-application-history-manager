import Loader from '@/components/Loader';
import { Analytics } from '@vercel/analytics/next';
import { Suspense } from 'react';

export default function Home() {
	return (
		<Suspense fallback={<Loader />}>
			<main className="flex flex-col h-full gap-4 max-w-6xl mx-auto p-4">
				<div>
					<h1 className="scroll-m-20 text-2xl font-bold tracking-tight lg:text-3xl">
						JobJourney: Manage Your Job Hunt Like a Pro!
					</h1>
					<p className="leading-7 [&:not(:first-child)]:mt-6">
						Tired of juggling spreadsheets for your job
						applications?
					</p>
				</div>

				<div>
					<h2 className="mt-10 scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight transition-colors first:mt-0">
						Introducing JobJourney!
					</h2>
					<p className="leading-7 [&:not(:first-child)]:mt-6">
						JobJourney is a web application that helps you manage
						and track your job applications across different
						platforms, all in one place. {"Here's"} what you can do:
					</p>
				</div>

				<div>
					<h3 className="mt-8 scroll-m-20 text-lg font-semibold tracking-tight">
						✅ Track Applications (Live!)
					</h3>
					<ul className="my-6 ml-6 list-disc [&>li]:mt-2">
						<li>Add details about each application</li>
						<li>Upload relevant documents and screenshots</li>
						<li>
							Track application status (applied, interview
							scheduled, etc.)
						</li>
					</ul>
				</div>
				<div>
					<h3 className="mt-8 scroll-m-20 text-lg font-semibold tracking-tight">
						🧪 Currently Testing
					</h3>
					<ul className="my-6 ml-6 list-disc [&>li]:mt-2">
						<li>Authentication for public users</li>
						<li>File uploading for authenticated users</li>
					</ul>
				</div>
				<div>
					<h3 className="mt-8 scroll-m-20 text-lg font-semibold tracking-tight">
						🚧 Under Construction (Coming Soon!)
					</h3>
					<ul className="my-6 ml-6 list-disc [&>li]:mt-2">
						<li>Interview notes and feedback section</li>
						<li>
							Dashboard view with charts and graphics for analysis
						</li>
						<li>
							Creation of interview questions collections based on
							the data gathered by all users if allowed by user.
						</li>
					</ul>
				</div>

				<div>
					<h3 className="mt-8 scroll-m-20 text-lg font-semibold tracking-tight">
						Want Early Access?
					</h3>
					<p className="leading-7 [&:not(:first-child)]:mt-6">
						JobJourney is currently in the testing phase. If{' '}
						{"you're"} interested in helping me build a better job
						hunting experience, {"I'd"} love to hear from you! Reach
						out to me on LinkedIn for early access or to provide
						feedback:{' '}
						<a
							className="italic underline"
							href="https://www.linkedin.com/in/kush-bhalodi-b11991184/"
							target="__blank"
							rel="noopener noreferrer"
						>
							Kush Bhalodi
						</a>
					</p>
				</div>
				<div>
					<h3 className="mt-8 scroll-m-20 text-lg font-semibold tracking-tight">
						Stay tuned for exciting updates!
					</h3>
					<p className="leading-7 [&:not(:first-child)]:mt-6">
						<strong>P.S.</strong> Check out my portfolio:{' '}
						<a
							className="italic underline"
							href="https://kushbhalodi.com/"
							target="__blank"
							rel="noopener noreferrer"
						>
							{'<KushBhalodi />'}
						</a>
					</p>
					<p className="leading-7 [&:not(:first-child)]:mt-6">
						<strong>P.P.S.</strong> You can find the code for
						JobJourney on Github:{' '}
						<a
							href="https://github.com/kush992"
							className="italic underline"
							target="__blank"
							rel="noopener noreferrer"
						>
							kush992
						</a>
					</p>
				</div>

				<p>Touched</p>

				<Analytics />
			</main>
		</Suspense>
	);
}
