/** @type {import('next').NextConfig} */
const nextConfig = {
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