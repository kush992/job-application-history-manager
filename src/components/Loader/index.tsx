import { LoaderIcon } from 'lucide-react';
import React from 'react';

const Loader = () => {
	return (
		<div aria-label="Loading..." role="status" className="flex items-center min-h-screen bg-transparent w-full justify-center">
			<LoaderIcon className="animate-spin h-14 w-14 md:h-28 md:w-28 bg-gradient-radial" />
			<span className="text-4xl font-medium text-gray-500">Loading...</span>
		</div>
	);
};

export default Loader;
