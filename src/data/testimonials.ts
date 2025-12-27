export type Testimonial = {
	name: string;
	role?: string;
	content: string;
	rating?: number;
	link?: string;
};

const testimonials: Testimonial[] = [
	{
		name: 'Milan Sachani',
		role: 'Senior Software Engineer',
		content: 'JobJourney transformed my job search. I landed my dream role thanks to their organized approach!',
		rating: 5,
	},
	{
		name: 'Rushil Bhatt',
		role: 'Senior Software Engineer',
		content:
			'JobJourney is a game-changer. I love how easy it is to track my applications, keep track of my applications and prepare for interviews.',
		rating: 5,
	},
	{
		name: 'Meet Parekh',
		role: 'Insight Analyst',
		content:
			"I love how JobJourney keeps all my applications in one place. It's intuitive and saves me so much time!",
		rating: 4,
		link: 'https://www.linkedin.com/in/meetmee/',
	},
	{
		name: 'Abhijit Sengupta',
		role: 'Client Solution Consultant',
		content:
			'JobJourney is a must-have for anyone looking for a job to manage the application process. Saved my time and effort.',
		rating: 4,
		link: 'https://www.linkedin.com/in/aedwulf/',
	},
];

export default testimonials;
