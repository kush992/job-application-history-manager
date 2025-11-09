export const appRoutes = {
	home: '/',

	// Application routes
	application: '/applications',
	addApplication: '/applications/add',
	addWithAiApplication: '/applications/add-with-ai',
	updateApplication: (applicationId: string) => `/applications/${applicationId}/edit`,
	viewApplication: (applicationId: string) => `/applications/${applicationId}`,

	// Interview Questions routes
	interviewQuestions: '/interview-questions',
	addInterviewQuestions: '/interview-questions/add',
	updateInterviewQuestions: '/interview-questions/update',

	// Static routes
	faq: '/faq',
	pricing: '/pricing',
	aboutUs: '/about-us',
	contactUs: '/contact',
	privacyPolicy: '/privacy-policy',
	termsOfService: '/terms-of-service',

	// Auth routes
	signUp: '/auth/signup',
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
		getAll: '/api/v2/applications',
		getOne: '/api/v2/applications/getOne',
		add: '/api/v2/applications/add',
		addWithAi: '/api/v2/applications/add-with-ai',
		update: '/api/v2/applications/update',
		delete: '/api/v2/applications/delete',
	},
	applicationDocuments: {
		add: '/api/v1/application-documents/add',
		update: '/api/v1/application-documents/update',
	},
	interviewQuestions: {
		getAll: '/api/v1/interview-questions/getAll',
		getOne: '/api/v1/interview-questions/getOne',
		add: '/api/v1/interview-questions/add',
		update: '/api/v1/interview-questions/update',
		delete: '/api/v1/interview-questions/delete',
	},
	files: {
		upload: '/api/v2/files/upload',
		delete: '/api/v2/files/delete',
	},
	journeys: {
		getAll: '/api/v2/journeys/getAll',
		getOne: '/api/v2/journeys/getOne',
		add: '/api/v2/journeys/add',
		update: '/api/v2/journeys/update',
		delete: '/api/v2/journeys/delete',
	},
	statistics: '/api/v2/statistics',
	ai: {
		generateJourneyInsight: '/api/v2/ai/generate-insight',
	},
	journeyInsights: '/api/v2/journey-insights',
};

export const FILES_SEPARATOR = ',____,';
