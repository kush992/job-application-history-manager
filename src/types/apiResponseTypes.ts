export type DocumentsData = {
	$collectionId: string;
	$createdAt: Date;
	$databaseId: string;
	$id: string;
	$permissions: any[];
	$updatedAt: Date;
	link: string;
	userId: string;
};

export type InterviewQuestionsData = {
	$collectionId: string;
	$createdAt: string;
	$databaseId: string;
	$id: string;
	$permissions: any[];
	$updatedAt: string;
	questionsAndAnswers: string[];
	jobApplications: string;
	isPrivate: boolean;
	userId: string;
};

export type Response<T> = {
	total: number;
	documents: T[];
};
