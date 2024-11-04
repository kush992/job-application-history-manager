import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';

export default function PrivacyPolicyPage() {
	const lastUpdated = 'November 4, 2023'; // Replace with your actual last updated date

	return (
		<div className="mx-auto py-8">
			<Card className="w-full max-w-3xl mx-auto">
				<CardHeader>
					<CardTitle className="text-3xl font-bold text-center">
						Privacy Policy
					</CardTitle>
					<CardDescription className="text-center">
						Last Updated: {lastUpdated}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<p className="pb-8 text-center">
						At JobJourney, we prioritize your privacy and are
						committed to protecting your personal information. This
						Privacy Policy describes how we collect, use, and secure
						your data.
					</p>
					<Accordion type="single" collapsible className="w-full">
						<AccordionItem value="item-1">
							<AccordionTrigger>
								1. Information Collection
							</AccordionTrigger>
							<AccordionContent>
								<p className="mb-2">
									We collect information that you provide when
									you:
								</p>
								<ul className="list-disc list-inside mb-4">
									<li>Register and create an account</li>
									<li>
										Add job application details, files, and
										notes
									</li>
									<li>Use the interview questions feature</li>
								</ul>
								<p className="mb-2">
									Types of information include:
								</p>
								<ul className="list-disc list-inside">
									<li>
										<strong>Personal Information:</strong>{' '}
										Name, email address, and login details
										used for authentication
									</li>
									<li>
										<strong>Application Data:</strong> Job
										application details you enter, including
										company names, positions, and interview
										notes
									</li>
									<li>
										<strong>Uploaded Files:</strong> Files
										and images attached to your job
										applications
									</li>
								</ul>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-2">
							<AccordionTrigger>
								2. Information Use
							</AccordionTrigger>
							<AccordionContent>
								<p className="mb-2">We use your data for:</p>
								<ul className="list-disc list-inside">
									<li>
										<strong>Account Management:</strong> To
										set up and manage your account,
										including authentication and access to
										features
									</li>
									<li>
										<strong>Application Tracking:</strong>{' '}
										Storing job application details, files,
										and interview notes
									</li>
									<li>
										<strong>Improvements:</strong> To
										improve our platform and develop new
										features that enhance user experience
									</li>
								</ul>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-3">
							<AccordionTrigger>
								3. Data Sharing and Disclosure
							</AccordionTrigger>
							<AccordionContent>
								<p>
									Your personal data is not shared with third
									parties without your consent, except:
								</p>
								<ul className="list-disc list-inside">
									<li>
										If required by law or to protect our
										rights
									</li>
									<li>
										For analytics purposes (anonymized data
										only)
									</li>
								</ul>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-4">
							<AccordionTrigger>
								4. Data Security
							</AccordionTrigger>
							<AccordionContent>
								<p>
									We implement industry-standard security
									practices to protect your data, including:
								</p>
								<ul className="list-disc list-inside">
									<li>
										Secure storage of files and application
										data
									</li>
									<li>
										Encryption of sensitive data during
										transmission
									</li>
									<li>
										Limited access by authorized personnel
										only
									</li>
								</ul>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-5">
							<AccordionTrigger>5. User Rights</AccordionTrigger>
							<AccordionContent>
								<p>
									You have the right to access, modify, and
									delete your data at any time. Contact us at{' '}
									<a
										href="mailto:contact@jobjourney.com"
										className="text-primary hover:underline"
									>
										contact@jobjourney.com
									</a>{' '}
									for any data-related requests.
								</p>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-6">
							<AccordionTrigger>
								6. Changes to Privacy Policy
							</AccordionTrigger>
							<AccordionContent>
								<p>
									We may update this policy as our services
									evolve. All changes will be posted on this
									page with an updated date.
								</p>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
					<p className="text-sm text-muted-foreground text-center pt-6">
						If you have any questions about this Privacy Policy,
						please contact us at{' '}
						<a
							href="mailto:contact@jobjourney.com"
							className="text-primary hover:underline"
						>
							contact@jobjourney.com
						</a>
						.
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
