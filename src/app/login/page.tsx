import React, { Suspense } from 'react';
import { Input } from 'antd';
import { getLoggedInUser, loginWithEmail, signUpWithEmail } from '@/lib/server/appwrite';
import { redirect } from 'next/navigation';
import { EyeOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';

const LoginPage: React.FC = async () => {
	const user = await getLoggedInUser();
	if (user) redirect('/applications');

	return (
		<Suspense fallback='loading....'>
			<div className='font-[sans-serif] max-w-4xl flex items-center mx-auto md:h-screen p-4'>
				<div className='grid md:grid-cols-3 items-center shadow-[0_2px_10px_-3px_rgba(62,107,209,0.3)] rounded-xl overflow-hidden bg-white'>
					<div className='max-md:order-1 flex flex-col justify-center space-y-16 max-md:mt-16 min-h-full bg-gradient-to-r from-blue-500 to-blue-600 lg:px-8 px-4 py-4'>
						<div>
							<h4 className='text-white text-lg font-semibold'>Login</h4>
							<p className='text-xs text-gray-300 mt-3'>Welcome to our registration page! Get started by creating your account.</p>
						</div>
						<div>
							<h4 className='text-white text-lg font-semibold'>Simple & Secure Registration</h4>
							<p className='text-xs text-gray-300 mt-3'>
								This registration process is developed using the appwrite authentication system.
							</p>
						</div>
					</div>

					<form action={loginWithEmail} className='md:col-span-2 w-full py-6 px-6 sm:px-16'>
						<div className='mb-6'>
							<h3 className='text-gray-800 text-2xl font-bold'>Create an account</h3>
						</div>

						<div className='space-y-6'>
							<div>
								<label className='text-gray-800 text-sm mb-2 block'>Email Id</label>
								<div className='relative flex items-center'>
									<input
										name='email'
										type='email'
										required
										className='text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500'
										placeholder='Enter email'
									/>
								</div>
							</div>

							<div>
								<label className='text-gray-800 text-sm mb-2 block'>Password</label>
								<div className='relative flex items-center'>
									<input
										name='password'
										type='password'
										required
										className='text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500'
										placeholder='Enter password'
									/>
								</div>
							</div>
						</div>

						<div className='!mt-12'>
							<button
								type='submit'
								className='w-full py-3 px-4 tracking-wider text-sm rounded-md text-white bg-blue-500 hover:bg-blue-800 focus:outline-none transition-all'
							>
								Login
							</button>
						</div>
						<p className='text-gray-800 text-sm mt-6 text-center'>
							{"Don't"} have an account?{' '}
							<a href='/signup' className='text-blue-600 font-semibold hover:underline ml-1'>
								Signup here
							</a>
						</p>
					</form>
				</div>
			</div>
		</Suspense>
	);
};

export default LoginPage;
