import Loader from '@/components/Loader';
import { Analytics } from '@vercel/analytics/next';
import { Suspense } from 'react';

export default function Home() {
	return (
		<Suspense fallback={<Loader />}>
			<main className='flex min-h-screen flex-col justify-center items-center h-full gap-8 max-w-5xl mx-auto p-4 '>
				<div className='text-center'>
					<h1 className='text-lg'>Hello, {"I'm"} Kush</h1>
					<br />
					<p className='text-xs'>
						This app is built for managing and keeping track of my applied jobs. If you are reading this, then it means that this
						application is not yet completely built and it is out because of my current job search.{' '}
						<b className='text-sm'>Data is unavailable to you</b>
					</p>
					<br />
					<p className='text-xs'>If you are interested in this app, feel free to bookmark this url and visit it in near future.</p>
					<p className='text-xs'>
						To connect with me, head over to <a href='https://kushbhalodi.com/'>kushbhalodi.com</a>
					</p>
				</div>

				<Analytics />
			</main>
		</Suspense>
	);
}
