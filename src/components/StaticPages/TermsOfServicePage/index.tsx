import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function TermsOfServicePage() {
	const lastUpdated = 'November 4, 2024';

	return (
		<div className="mx-auto py-8 motion-preset-slide-down">
			<Card className="w-full max-w-3xl mx-auto">
				<CardHeader>
					<CardTitle className="text-3xl font-bold">Terms of Service</CardTitle>
					<CardDescription>Last Updated: {lastUpdated}</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<p>Welcome to JobJourney! By using our platform, you agree to the following terms:</p>

					<section>
						<h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
						<p>
							By creating an account on JobJourney, you acknowledge and accept our Terms of Service and
							Privacy Policy. If you do not agree, please discontinue use of our services.
						</p>
					</section>

					<Separator />

					<section>
						<h2 className="text-xl font-semibold mb-2">2. User Responsibilities</h2>
						<ul className="list-disc pl-6 space-y-2">
							<li>
								<strong>Account Security:</strong> You are responsible for keeping your account secure.
								Do not share your password with others, and promptly notify us if you suspect
								unauthorized access.
							</li>
							<li>
								<strong>Data Accuracy:</strong> You are responsible for the accuracy of the information
								you provide, including job application details and interview notes.
							</li>
							<li>
								<strong>Acceptable Use:</strong> Do not use JobJourney to upload harmful, illegal, or
								offensive content. We reserve the right to terminate accounts that violate these terms.
							</li>
						</ul>
					</section>

					<Separator />

					<section>
						<h2 className="text-xl font-semibold mb-2">3. Intellectual Property</h2>
						<p>
							JobJourney owns all intellectual property rights to the {"platform's"} design,
							functionality, and content (excluding user-uploaded content). Users are granted a limited
							license to use the platform for personal job application management.
						</p>
					</section>

					<Separator />

					<section>
						<h2 className="text-xl font-semibold mb-2">4. Limitation of Liability</h2>
						<p>JobJourney is not liable for:</p>
						<ul className="list-disc pl-6 mt-2 space-y-2">
							<li>Any damages resulting from the use or inability to use our platform</li>
							<li>Data loss due to technical issues or user error</li>
						</ul>
					</section>

					<Separator />

					<section>
						<h2 className="text-xl font-semibold mb-2">5. Modification of Services</h2>
						<p>
							JobJourney may modify or discontinue features at any time without notice. We are not liable
							for any changes to the availability or functionality of the platform.
						</p>
					</section>

					<Separator />

					<section>
						<h2 className="text-xl font-semibold mb-2">6. Changes to Terms</h2>
						<p>
							We may revise these Terms of Service from time to time. Continued use of the platform after
							changes indicates acceptance of the new terms.
						</p>
					</section>

					<Separator />

					<p>
						For further inquiries or support, please contact{' '}
						<a href="mailto:contact@jobjourney.com" className="text-primary hover:underline">
							contact@jobjourney.com
						</a>
						.
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
