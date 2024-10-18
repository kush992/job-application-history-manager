export const appRoutes = {
	home: '/',
	applicationPage: '/applications',
	addApplicationPage: '/applications/add',
	updateApplicationPage: '/applications/update',
	viewApplicationPage: '/applications/view',
	interviewQuestionsPage: '/interview-questions',
	addInterviewQuestionsPage: '/interview-questions/add',
	updateInterviewQuestionsPage: '/interview-questions/update',
	aboutPage: '/about',
	loginPage: '/login',
	signUpPage: '/signup',
};

export enum QueryKeys {
	APPLICATIONS_PAGE = 'APPLICATIONS_PAGE',
	APPLICATION_BY_ID = 'APPLICATION_BY_ID',
	QUESTIONS_AND_ANSWERS_PAGE = 'QUESTIONS_AND_ANSWERS_PAGE',
}