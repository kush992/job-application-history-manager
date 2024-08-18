export const baseUrl = () => {
	let baseUrl = '';
	if (process.env.VERCEL_URL) {
		baseUrl = `https://${process.env.VERCEL_URL}`;
	} else if (process.env.NEXT_PUBLIC_VERCEL_URL) {
		baseUrl = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
	} else {
		// Fallback to localhost if environment variables are not available
		baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
	}

	return baseUrl;
};
