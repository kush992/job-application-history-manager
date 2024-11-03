import Loader from '@/components/Loader';
import { Button } from '@/components/ui/button';
import { appRoutes } from '@/utils/constants';
import { Analytics } from '@vercel/analytics/next';
import { MoveRight } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

export default function Home() {
	const featureData = [
		{
			title: 'Seamless Application Management',
			tag: 'Manage',
			description:
				'Track each job application without the hassle of manual data entry. Upload screenshots, files, and relevant information for complete records.',
		},
		{
			title: 'Document & File Storage',
			tag: 'Storage',
			description:
				'Centralize everything – from resumes to feedback. Keep all related documents securely stored with each application.',
		},
		{
			title: 'Interview Insights',
			tag: 'Insights',
			description:
				'Record interview questions, answers, and notes. Optionally, share insights with others on our community page or keep it private for personal reference.',
		},
		{
			title: 'Status Sorting & Real-Time Updates',
			tag: 'Sorting',
			description:
				'Easily sort and review applications by status, prioritize tasks, and stay organized without clutter.',
		},
	];

	return (
		<Suspense fallback={<Loader />}>
			<main className="flex flex-col h-full gap-4 max-w-6xl mx-auto p-4">
				<section>
					<div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 z-10 relative">
						<a
							href="#"
							className="inline-flex justify-between items-center py-1 px-1 pe-4 mb-7 text-sm bg-lightGreenAccent rounded-full text-darkGreenAccent"
						>
							<span className="text-xs bg-darkGreenAccent rounded-full text-white px-4 py-1.5 me-3">
								New
							</span>
							<span className="text-sm font-medium">
								Jumbotron component was launched! See {"what's"}{' '}
								new
							</span>
							<svg
								className="w-2.5 h-2.5 ms-2 rtl:rotate-180"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 6 10"
							>
								<path
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="m1 9 4-4-4-4"
								/>
							</svg>
						</a>
						<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
							Welcome to JobJourney – Your Job Application Tracker
						</h1>
						<p className="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground">
							Streamline Your Job Search with Precision and Ease
						</p>
						<div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center my-6">
							<Link href={appRoutes.signUpPage}>
								<Button
									size="lg"
									className="flex items-center gap-2"
								>
									Get started <MoveRight />
								</Button>
							</Link>
							<Link href={appRoutes.signUpPage}>
								<Button
									size="lg"
									variant="outline"
									className="flex items-center gap-2"
								>
									Learn More
								</Button>
							</Link>
						</div>
					</div>
					<div className="bg-gradient-to-b from-secondary to-transparent dark:from-background w-full h-full absolute top-0 left-0 z-0"></div>
				</section>

				<section>
					<div className="py-4 px-4 mx-auto max-w-screen-xl text-center lg:py-8 z-10 relative">
						<h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
							Tired of spreadsheets for tracking job applications?
						</h2>
						<p className="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground">
							With JobJourney, effortlessly manage and track every
							application, from submissions to interviews, in a
							single portal. Forget Excel – our tool is designed
							to organize all your application data, including
							files, notes, and interview insights, all in one
							place for easy access and analysis.{' '}
						</p>
					</div>
				</section>

				<section>
					<div className="py-4 px-4 mx-auto max-w-screen-xl text-center lg:py-8 z-10 relative">
						<h2 className="mt-10 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
							How JobJourney Works
						</h2>
						<div className="grid md:grid-cols-2 gap-8">
							{featureData.map((data) => (
								<div
									key={data.tag}
									className="bg-background border rounded-lg p-8 md:p-12"
								>
									<p className="bg-lightGreenAccent text-darkGreenAccent text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md  mb-2">
										{data.tag}
									</p>
									<h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
										{data.title}
									</h3>
									<p className="text-lg font-normal text-muted-foreground mb-4">
										{data.description}
									</p>
								</div>
							))}
						</div>
					</div>
				</section>

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

				<Analytics />
			</main>
		</Suspense>
	);
}
