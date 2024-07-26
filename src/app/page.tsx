import Application from '@/components/Applications';
import { Analytics } from '@vercel/analytics/next';
import { Suspense } from 'react';

export default function Home() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<main className='flex min-h-screen flex-col gap-8 max-w-8xl mx-auto p-4 md:p-16'>
				<div className=''>
					<h1 className='text-lg'>Hello, {"I'm"} Kush</h1>
					<br />
					<p className='text-xs text-gray-700'>
						This app is built for managing and keeping track of my applied jobs. If you are reading this, then it means that this
						application is not yet completely built and it is out because of my current job search.{' '}
						<b className='text-gray-900'>Data is unavailable to you</b>
					</p>
					<br />
					<p className='text-xs text-gray-700'>
						If you are interested in this app, feel free to bookmark this url and visit it in near future.
					</p>
					<p className='text-xs text-gray-700'>
						To connect with me, head over to <a href='https://kushbhalodi.com/'>kushbhalodi.com</a>
					</p>
				</div>

				<Analytics />
				<Application />
			</main>
		</Suspense>
	);
}
