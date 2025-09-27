// export type JobApplicationData = {
// 	userId: string;
// 	jobTitle: string;
// 	notes: string;
// 	deletedAt: null | string;
// 	salary: string;
// 	salaryType: string;
// 	applicationStatus: null | string;
// 	salaryCurrency: string;
// 	feedbackFromCompany: null | string;
// 	companyName: string;
// 	companyDomain: string;
// 	interviewDate: null | Date;
// 	isSoftDeleted: null | boolean;
// 	links: null | string;
// 	$id: string;
// 	$tenant: string;
// 	$createdAt: string;
// 	$updatedAt: string;
// 	$permissions: any[];
// 	interviewQuestions?: InterviewQuestionsData;
// 	documents: DocumentsData[];
// 	$databaseId: string;
// 	$collectionId: string;
// 	location?: string;
// 	jobLink?: string;
// 	jobPostedOn?: JobSites;
// 	workMode?: WorkMode;
// 	contractType?: ContractType;
// };

// export enum JobSites {
// 	LINKEDIN = 'LINKEDIN',
// 	GLASSDOOR = 'GLASSDOOR',
// 	INDEED = 'INDEED',
// 	JUST_JOIN_IT = 'JUST_JOIN_IT',
// }

// export enum ContractType {
// 	FULL_TIME = 'FULL_TIME',
// 	PART_TIME = 'PART_TIME',
// 	CONTRACT = 'CONTRACT',
// 	INTERNSHIP = 'INTERNSHIP',
// 	FREELANCE = 'FREELANCE',
// }

// export enum WorkMode {
// 	REMOTE = 'REMOTE',
// 	HYBRID = 'HYBRID',
// 	ON_SITE = 'ON_SITE',
// }

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
