export type JobApplicationData = {
	userId: string;
	jobTitle: string;
	jobDescription: string;
	deletedAt: null | string;
	salary: string;
	salaryType: string;
	applicationStatus: null | string;
	salaryCurrency: string;
	feedbackFromCompany: null | string;
	companyName: string;
	companyDomain: string;
	interviewDate: null | Date;
	isSoftDeleted: null | boolean;
	links: null | string;
	$id: string;
	$tenant: string;
	$createdAt: string;
	$updatedAt: string;
	$permissions: any[];
	interviewQuestions?: InterviewQuestionsData;
	documents: DocumentsData[];
	$databaseId: string;
	$collectionId: string;
};

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
};

export type Response<T> = {
	total: number;
	documents: T[];
};
