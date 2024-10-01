export type InterviewQuestion = {
	id: number;
	question: string;
	answer: string;
	isAnswerCorrect: boolean;
	correctAnswer: string;
	$id: string;
	$tenant: string;
	$createdAt: string;
	$updatedAt: string;
	$permissions: any[];
	$databaseId: string;
	$collectionId: string;
};

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
	interviewQuestionsTable?: InterviewQuestion[];
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

export type Response<T> = {
	total: number;
	documents: T[];
};


