export const config = {
	appwriteUrl: String(process.env.NEXT_PUBLIC_APPWRITE_API_ENDPOINT),
	appwriteProjectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
	appwriteApiKey: String(process.env.NEXT_PUBLIC_APPWRITE_API_KEY),
	tinymceApiKey: String(process.env.NEXT_PUBLIC_TINYMCE_API_KEY),
};
