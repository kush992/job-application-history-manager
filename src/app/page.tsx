import Loader from '@/components/Loader';
import { Analytics } from '@vercel/analytics/next';
import { Suspense } from 'react';

export default function Home() {
	return (
		<Suspense fallback={<Loader />}>
			<main className='flex flex-col justify-center items-center h-full gap-8 max-w-6xl mx-auto p-4 '>
				<div className=''>
					<h1 className='font-bold text-xl'>JobJourney: Manage Your Job Hunt Like a Pro!</h1>
					<p>
						<strong>Tired of juggling spreadsheets for your job applications?</strong>
					</p>
					<div className='flex flex-col gap-2 my-3'>
						<div>
							<p>
								<strong>Introducing JobJourney!</strong>
							</p>
							<p>
								JobJourney is a web application that helps you manage and track your job applications across different platforms, all
								in one place. {"Here's"} what you can do:
							</p>
						</div>
						<div>
							<p>
								<strong>✅ Track Applications (Live!)</strong>
							</p>
							<ul className='my-1'>
								<li>Add details about each application</li>
								<li>Upload relevant documents and screenshots</li>
								<li>Track application status (applied, interview scheduled, etc.)</li>
							</ul>
						</div>
						<div>
							<p>
								<strong>🧪 Currently Testing</strong>
							</p>
							<ul className='my-1'>
								<li>Authentication for public users</li>
								<li>File uploading for authenticated users</li>
							</ul>
						</div>
						<div>
							<p>
								<strong>🚧 Under Construction (Coming Soon!)</strong>
							</p>
							<ul className='my-1'>
								<li>Interview notes and feedback section</li>
								<li>Dashboard view with charts and graphics for analysis</li>
								<li>Creation of interview questions collections based on the data gathered by all users if allowed by user.</li>
							</ul>
						</div>

						<div>
							<p>
								<strong>Want Early Access?</strong>
							</p>
							<p>
								JobJourney is currently in the testing phase. If {"you're"} interested in helping me build a better job hunting
								experience, {"I'd"} love to hear from you! Reach out to me on LinkedIn for early access or to provide feedback:{' '}
								<a
									className='italic underline'
									href='https://www.linkedin.com/in/kush-bhalodi-b11991184/'
									target='__blank'
									rel='noopener noreferrer'
								>
									Kush Bhalodi
								</a>
							</p>
						</div>
						<div>
							<p>
								<strong>Stay tuned for exciting updates!</strong> ✨
							</p>
							<p>
								<strong>P.S.</strong> Check out my portfolio:{' '}
								<a className='italic underline' href='https://kushbhalodi.com/' target='__blank' rel='noopener noreferrer'>
									{'<KushBhalodi />'}
								</a>
							</p>
							<p>
								<strong>P.P.S.</strong> You can find the code for JobJourney on Github:{' '}
								<a href='https://github.com/kush992' className='italic underline' target='__blank' rel='noopener noreferrer'>
									kush992
								</a>
							</p>
						</div>
					</div>
				</div>

				<Analytics />
			</main>
		</Suspense>
	);
}
