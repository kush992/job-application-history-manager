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
	editJourney: (journeyId: string) => `/journeys/${journeyId}/edit`,
	viewJourney: (journeyId: string) => `/journeys/${journeyId}`,
	profileView: '/profile',
	journeyApplications: (journeyId: string) => `/journeys/${journeyId}/applications`,

	// interview-experiences
	interviewExperiences: '/interview-experiences',
	addInterviewExperiences: '/interview-experiences/add',
	viewInterviewExperience: (id: string) => `/interview-experiences/${id}`,
	editInterviewExperience: (id: string) => `/interview-experiences/${id}/edit`,
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
	INTERVIEW_EXPERIENCES = 'INTERVIEW_EXPERIENCES',
}

// API structure - RESTful endpoints
export const apiRoutes = {
	applications: {
		getAll: '/api/v2/applications',
		getOne: (id: string) => `/api/v2/applications/${id}`,
		add: '/api/v2/applications',
		addWithAi: '/api/v2/applications', // Same endpoint, but with { text: ... } in body
		edit: (id: string) => `/api/v2/applications/${id}`,
		delete: (id: string) => `/api/v2/applications/${id}`,
		search: '/api/v2/applications/search',
	},
	interviewQuestions: {
		getAll: '/api/v1/interview-questions',
		getOne: (id: string) => `/api/v1/interview-questions/${id}`,
		add: '/api/v1/interview-questions',
		update: (id: string) => `/api/v1/interview-questions/${id}`,
		delete: (id: string) => `/api/v1/interview-questions/${id}`,
	},
	files: {
		upload: '/api/v2/files/upload',
		delete: '/api/v2/files/delete',
	},
	journeys: {
		getAll: '/api/v2/journeys',
		getOne: (id: string) => `/api/v2/journeys/${id}`,
		add: '/api/v2/journeys',
		update: (id: string) => `/api/v2/journeys/${id}`,
		delete: (id: string) => `/api/v2/journeys/${id}`,
		statistics: (id: string) => `/api/v2/journeys/${id}/statistics`,
		insights: (id: string) => `/api/v2/journeys/${id}/insights`,
	},
	interviewExperiences: {
		getAll: '/api/v2/interview-experiences',
		getOne: (id: string) => `/api/v2/interview-experiences/${id}`,
		add: '/api/v2/interview-experiences',
		update: (id: string) => `/api/v2/interview-experiences/${id}`,
		delete: (id: string) => `/api/v2/interview-experiences/${id}`,
		upvote: (id: string) => `/api/v2/interview-experiences/${id}/upvote`,
	},
};

export const FILES_SEPARATOR = ',____,';
