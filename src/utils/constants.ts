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
	userSettings: '/user/settings',
};

// For react-query
export enum QueryKeys {
	APPLICATIONS_PAGE = 'APPLICATIONS_PAGE',
	APPLICATION_BY_ID = 'APPLICATION_BY_ID',
	QUESTIONS_AND_ANSWERS_PAGE = 'QUESTIONS_AND_ANSWERS_PAGE',
}

// API structure
export const apiRoutes = {
	applications: {
		getAll: '/api/applications/getAll',
		getOne: '/api/applications/getOne',
		add: '/api/applications/add',
		update: '/api/applications/update',
		delete: '/api/applications/delete',
	},
	applicationDocuments: {
		add: '/api/application-documents/add',
		update: '/api/application-documents/update',
	},
	interviewQuestions: {
		getAll: '/api/interview-questions/getAll',
		getOne: '/api/interview-questions/getOne',
		add: '/api/interview-questions/add',
		update: '/api/interview-questions/update',
		delete: '/api/interview-questions/delete',
	},
	files: {
		upload: '/api/files/upload',
		delete: '/api/files/delete',
	},
	usersPrefs: {
		update: '/api/user/prefs/update',
	},
};
