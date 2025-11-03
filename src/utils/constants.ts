export const appRoutes = {
	home: '/',
	// signIn: '/auth/signin',
	signUp: '/auth/signup',
	application: '/applications',
	addApplication: '/applications/add',
	addWithAiApplication: '/applications/add-with-ai',
	updateApplication: '/applications/update',
	viewApplication: '/applications/view',
	interviewQuestions: '/interview-questions',
	addInterviewQuestions: '/interview-questions/add',
	updateInterviewQuestions: '/interview-questions/update',
	faq: '/faq',
	pricing: '/pricing',
	aboutUs: '/about-us',
	contactUs: '/contact',
	privacyPolicy: '/privacy-policy',
	termsOfService: '/terms-of-service',
	userSettings: '/user/settings',
	authCallback: '/auth/callback',
	authCodeError: '/auth/auth-code-error',
	authConfirm: '/auth/confirm',
	// Journey routes
	journeys: '/journeys',
	addJourney: '/journeys/add',
	editJourney: '/journeys/edit',
	viewJourney: '/journeys',
	profileView: '/profile',
	journeyApplications: (journeyId: string) => `/journeys/${journeyId}/applications`,
};

// For react-query
export enum QueryKeys {
	JOURNEYS_PAGE = 'JOURNEYS_PAGE',
	JOURNEY_BY_ID = 'JOURNEY_BY_ID',
	APPLICATIONS_PAGE = 'APPLICATIONS_PAGE',
	APPLICATION_BY_ID = 'APPLICATION_BY_ID',
	QUESTIONS_AND_ANSWERS_PAGE = 'QUESTIONS_AND_ANSWERS_PAGE',
	STATISTICS = 'STATISTICS',
	INSIGHTS = 'INSIGHTS',
}

// API structure
export const apiRoutes = {
	applications: {
		getAll: '/api/applications/getAll',
		getOne: '/api/applications/getOne',
		add: '/api/applications/add',
		addWithAi: '/api/applications/add-with-ai',
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
	journeys: {
		getAll: '/api/journeys/getAll',
		getOne: '/api/journeys/getOne',
		add: '/api/journeys/add',
		update: '/api/journeys/update',
		delete: '/api/journeys/delete',
	},
	statistics: '/api/statistics',
	ai: {
		generateJourneyInsight: '/api/ai/generate-insight',
	},
	journeyInsights: '/api/journey-insights',
};
