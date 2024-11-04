export const appRoutes = {
	home: '/',
	login: '/login',
	signUp: '/signup',
	application: '/applications',
	addApplication: '/applications/add',
	updateApplication: '/applications/update',
	viewApplication: '/applications/view',
	interviewQuestions: '/interview-questions',
	addInterviewQuestions: '/interview-questions/add',
	updateInterviewQuestions: '/interview-questions/update',
	faq: '/faq',
	pricing: '/pricing',
	aboutUs: '/about-us',
	contactUs: '/contact-us',
	privacyPolicy: '/privacy-policy',
	termsOfService: '/terms-of-service',
};

export enum QueryKeys {
	APPLICATIONS_PAGE = 'APPLICATIONS_PAGE',
	APPLICATION_BY_ID = 'APPLICATION_BY_ID',
	QUESTIONS_AND_ANSWERS_PAGE = 'QUESTIONS_AND_ANSWERS_PAGE',
}