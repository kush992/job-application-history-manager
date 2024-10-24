export const config = {
	appwriteUrl: String(process.env.NEXT_PUBLIC_APPWRITE_API_ENDPOINT),
	appwriteProjectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
	appwriteApiKey: String(process.env.NEXT_PUBLIC_APPWRITE_API_KEY),
	tinymceApiKey: String(process.env.NEXT_PUBLIC_TINYMCE_API_KEY),
	uiShowData: String(process.env.NEXT_PUBLIC_UI_SHOW_DATA),
	uiShowUploader: String(process.env.NEXT_PUBLIC_UI_SHOW_UPLOADER),
	hashKeyForData: String(process.env.NEXT_PUBLIC_HASH_KEY_FOR_DATA),
	dataFetchingLimitForAppwrite: Number(
		process.env.NEXT_PUBLIC_TABLE_DATA_FETCHING_LIMIT_FOR_APPWRITE,
	),
};
