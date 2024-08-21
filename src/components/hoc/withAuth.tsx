'use client';

import React, { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import ApplicationAuth from '@/appwrite/auth';
import Loader from '../Loader';

const withAuth = (WrappedComponent: React.ComponentType) => {
	const WithAuthComponent = (props: any) => {
		const [isLoading, setIsLoading] = useState(true);
		const [isAuthenticated, setIsAuthenticated] = useState(false);

		useEffect(() => {
			const checkAuth = async () => {
				const auth = new ApplicationAuth();
				const loggedIn = await auth.isLoggedIn();
				if (!loggedIn) {
					setIsAuthenticated(false);
				} else {
					setIsAuthenticated(true);
				}
				setIsLoading(false);
			};

			checkAuth();
		}, []);

		if (isLoading) {
			return <Loader />;
		}

		if (!isAuthenticated) {
			return <p>please authenticate</p>;
		}

		return <WrappedComponent {...props} />;
	};

	WithAuthComponent.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

	return WithAuthComponent;
};

export default withAuth;
