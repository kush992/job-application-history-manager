import { GoogleGenerativeAI } from '@google/generative-ai';
import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { config } from '@/config/config';
import { jobApplicationSchema } from '@/lib/supabase/schema';
import { createClient } from '@/lib/supabase/server';
import { appRoutes } from '@/utils/constants';

const genAI = new GoogleGenerativeAI(process.env.LLM_API_KEY!);

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
	try {
		// Create Supabase client
		const supabase = createClient();

		// Check authentication
		const {
			data: { user },
			error: authError,
		} = await supabase.auth.getUser();

		if (authError || !user) {
			return NextResponse.json(
				{ error: 'Unauthorized', details: authError ? JSON.stringify(authError) : 'User not found' },
				{ status: 401 },
			);
		}

		// Get search parameters
		const searchParams = request.nextUrl.searchParams;
		// const limit = Number.parseInt(searchParams.get('limit'));
		const limit = config.dataFetchingLimitForAppwrite;
		const search_query = searchParams.get('search_query');
		const status_filter = searchParams.get('status_filter');
		const work_mode_filter = searchParams.get('work_mode_filter');
		const contract_type_filter = searchParams.get('contract_type_filter');
		const journey_id = searchParams.get('journey_id');

		// Fetch active journey to get all applications under it by default for applications list page.
		// If journey_id is provided in search params, we need to use that instead as it can be a different page on UI.
		let journeyQuery = supabase.from('journeys').select().eq('user_id', user.id);

		if (journey_id) {
			journeyQuery = journeyQuery.eq('id', journey_id);
		} else {
			journeyQuery = journeyQuery.eq('is_active', true);
		}

		const { data: journeyData, error: journeryFetchError } = await journeyQuery.single();

		if (journeryFetchError) {
			console.error('Supabase error:', journeryFetchError);

			if (journeryFetchError.code === 'PGRST116') {
				console.info('No active journey found, redirecting to create journey page.');
				return NextResponse.redirect(`${request.nextUrl.origin}${appRoutes.journeys}`); // Redirect to create journey if no active journey found
			}

			return NextResponse.json(
				{
					error: 'Failed to fetch active journey',
					details: JSON.stringify(journeryFetchError),
				},
				{ status: 500 },
			);
		}

		// Build the query
		let query = supabase
			.from('job_applications')
			.select(
				// 	`
				// 	*,
				// 	journeys:journey_id (
				// 	id,
				// 	title,
				// 	description,
				// 	is_active
				// 	)
				// `,
				`id,
				job_title,
				company_name,
				application_status,
				salary,
				created_at`,
			)
			.eq('user_id', user.id)
			.order('created_at', { ascending: false })
			.limit(limit);

		// Add filters
		if (search_query) {
			query = query.or(`company_name.ilike.%${search_query}%,job_title.ilike.%${search_query}%`);
		}

		if (status_filter) {
			const statuses = status_filter.split(',');
			query = query.in('application_status', statuses);
		}

		if (work_mode_filter) {
			const workModes = work_mode_filter.split(',');
			query = query.in('work_mode', workModes);
		}

		if (contract_type_filter) {
			const contractTypes = contract_type_filter.split(',');
			query = query.in('contract_type', contractTypes);
		}

		query = query.eq('journey_id', journeyData.id);

		// Execute the query
		const { data: applications, error } = await query;

		if (error) {
			console.error('Supabase error:', error);
			return NextResponse.json(
				{
					error: 'Failed to fetch applications',
					details: JSON.stringify(error),
				},
				{ status: 500 },
			);
		}

		return NextResponse.json({ data: applications || [], journey: journeyData }, { status: 200 });
	} catch (error) {
		console.error('Applications fetch error:', error);
		return NextResponse.json(
			{
				error: 'An unexpected error occurred',
			},
			{ status: 500 },
		);
	}
}

// POST /api/v2/applications - Create a new application (regular or with AI)
export async function POST(request: NextRequest) {
	try {
		// Create Supabase client
		const supabase = createClient();

		// Check authentication
		const {
			data: { user },
			error: authError,
		} = await supabase.auth.getUser();

		if (authError || !user) {
			return NextResponse.json(
				{ error: 'Unauthorized', details: authError ? JSON.stringify(authError) : 'User not found' },
				{ status: 401 },
			);
		}

		const { data: journey, error: journeryFetchError } = await supabase
			.from('journeys')
			.select('id')
			.eq('is_active', true)
			.single();

		if (journeryFetchError) {
			console.error('Supabase error:', journeryFetchError);
			return NextResponse.json(
				{
					error: 'Failed to fetch active journey',
					details: JSON.stringify(journeryFetchError),
				},
				{ status: 500 },
			);
		}

		if (!journey) {
			return NextResponse.json(
				{ error: 'No active journey found - A journey is required for adding an application' },
				{ status: 400, statusText: 'Bad Request' },
			);
		}

		// Parse request body
		const body = await request.json();

		// Check if this is an AI request (has 'text' field)
		if (body.text) {
			// Handle AI-based application creation
			const { text } = body;

			if (!text) {
				return NextResponse.json({ error: 'Missing job text' }, { status: 400 });
			}

			const prompt = `
				You are a structured data extractor AI. 
				Given a raw job post text, extract and return a JSON object following this exact TypeScript schema:

				{
				"job_title": string,
				"notes": string | null,
				"salary": string | null,
				"salary_type": "HOURLY" | "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY" | null,
				"salary_currency": "USD" | "EUR" | "GBP" | "PLN" | "CAD" | "AUD" | "INR" | null,
				"application_status": "APPLIED" (always default),
				"company_name": string,
				"company_domain": string | null,
				"interview_date": null,
				"links": string | null,
				"location": string | null,
				"job_link": string | null,
				"job_posted_on": "LINKEDIN" | "INDEED" | "GLASSDOOR" | "MONSTER" | "COMPANY_WEBSITE" | "REFERRAL" | "OTHER" | "JUST_JOIN_IT" | null,
				"work_mode": "REMOTE" | "HYBRID" | "ONSITE" | null,
				"contract_type": "FULL_TIME" | "PART_TIME" | "CONTRACT" | "FREELANCE" | "INTERNSHIP" | "B2B" | null,
				"applied_at": string (ISO date)
				}

				validate your output with the below schema:
				{
					job_title: z.string().nonempty('Job title is a required field'),
					notes: z.string().optional().nullable(),
					salary: z.string().optional().nullable(),
					salary_type: z.nativeEnum(SalaryType).default(SalaryType.MONTHLY).optional().nullable(),
					salary_currency: z.nativeEnum(SalaryCurrency).default(SalaryCurrency.PLN).optional().nullable(),
					application_status: z.nativeEnum(ApplicationStatus).default(ApplicationStatus.APPLIED).optional().nullable(),
					company_name: z.string().nonempty('Company name is a required field'),
					company_domain: z.string().optional().nullable(),
					interview_date: z.date().optional().nullable(),
					links: z.string().optional().nullable(),
					location: z.string().optional().nullable(),
					job_link: z.string().optional().nullable(),
					job_posted_on: z.nativeEnum(JobSites).default(JobSites.LINKEDIN).optional().nullable(),
					work_mode: z.nativeEnum(WorkMode).default(WorkMode.REMOTE).optional().nullable(),
					contract_type: z.nativeEnum(ContractType).default(ContractType.FULL_TIME).optional().nullable(),
					applied_at: z.string().default(() => new Date().toISOString()),
				}

				Rules:
				- If salary is not mentioned → salary, salary_type, and salary_currency = null.
				- "notes" must contain all available job details: company intro, company overview, company culture , job description, requirements, responsibilities, job poster, comparison between candidates, application education level, what we are looking for, nice to have, what we offer, compensation etc.
				- Use readable paragraph formatting for "notes".
				- Always ensure the JSON is valid and matches the schema.
				- Do not include extra commentary — only return valid JSON.
				- Remove all JavaScript/TypeScript specific types or syntax.
				- Sanitize all the HTML tags and transform them into markdown format in the "notes" field.
				- Create table structures if necessary to preserve the data in notes field for small bits of data such as Job function, Industries, Employment Type, Job ID, Seniority level, etc.
				- After every block of information in notes, add a line break for better readability.
				- Do not put "undefined", "null" or any other such values to any of the schema attribute.
				- job_title and company_name are required. If you cannot find this two, then return empty response.
				- DO NOT PUT any PLACEHOLDER.
				- If the JSON object generated does not match with the schema, then return error.
				- If for eg: Salary: 7,000 - 8,000 USD per month is found in similar format, then it means it is part of "notes". User entered salary should be exact numbers so it won't be in any range.

				Now, extract data from this text:
				"""${text}"""
			`;

			const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });

			const result = await model.generateContent(prompt);
			const output = result.response.text();

			// Try parsing safely
			let json: any = null;
			try {
				json = JSON.parse(output.replace(/```json|```/g, '').trim());
			} catch (err) {
				console.error('JSON parse error:', err, output);
				return NextResponse.json(
					{ error: 'Failed to parse response from Gemini', raw: output },
					{ status: 500 },
				);
			}

			const validatedData = jobApplicationSchema.parse(json);

			// Convert dates to ISO strings for database storage
			const applicationData = {
				...validatedData,
				user_id: user.id,
				journey_id: journey.id,
				interview_date: validatedData.interview_date?.toISOString() || null,
				applied_at: validatedData.applied_at || new Date().toISOString(),
			};

			// Insert the job application into the database
			const { data: insertData, error } = await supabase
				.from('job_applications')
				.insert([applicationData])
				.select()
				.single();

			if (error) {
				console.error('Supabase error:', error);
				return NextResponse.json(
					{
						error: 'Failed to create application',
						details: error,
					},
					{ status: 500 },
				);
			}

			return NextResponse.json(
				{
					message: 'Application created successfully',
					data: insertData,
				},
				{ status: 201 },
			);
		} else {
			// Handle regular application creation
			const validatedData = jobApplicationSchema.parse(body);

			// Convert dates to ISO strings for database storage
			const applicationData = {
				...validatedData,
				user_id: user.id,
				journey_id: journey.id,
				interview_date: validatedData.interview_date?.toISOString() || null,
				applied_at: validatedData.applied_at || new Date().toISOString(),
			};

			// Insert the job application into the database
			const { data: insertData, error } = await supabase
				.from('job_applications')
				.insert([applicationData])
				.select()
				.single();

			if (error) {
				console.error('Supabase error:', error);
				return NextResponse.json(
					{
						error: 'Failed to create application',
						details: JSON.stringify(error),
					},
					{ status: 500 },
				);
			}

			return NextResponse.json(
				{
					message: 'Application created successfully',
					data: insertData,
				},
				{ status: 201 },
			);
		}
	} catch (error) {
		console.error('Application creation error:', error);

		// Handle validation errors
		if (error instanceof z.ZodError) {
			return NextResponse.json(
				{
					error: 'Invalid form data',
					details: error.errors.map((err) => ({
						field: err.path.join('.'),
						message: err.message,
					})),
				},
				{ status: 400 },
			);
		}

		return NextResponse.json(
			{
				error: error instanceof SyntaxError ? 'Invalid JSON format' : 'An unexpected error occurred',
				details: JSON.stringify(error),
			},
			{ status: error instanceof SyntaxError ? 400 : 500 },
		);
	}
}
