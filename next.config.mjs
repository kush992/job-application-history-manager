/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
		  {
			protocol: 'https',
			hostname: 'img.kushbhalodi.com',
			port: '',
			pathname: '/**',
		  },
		],
	  },
	webpack: (config, { isServer }) => {
		if (!isServer) {
		  config.resolve.fallback = {
			https: false,
			net: false,
		  };
		}
		return config;
	  },
};

export default nextConfig;