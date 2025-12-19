import { Dribbble, Github, Linkedin,Mail } from 'lucide-react';
import Link from 'next/link';
import type React from 'react';

export default function ContactInfo() {
	return (
		<div className="space-y-12 p-4 motion-preset-slide-down">
			{/* Visit our offices */}
			<section className="space-y-6">
				<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">Get in touch</h1>
				<p className="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground">
					Write one or two welcoming sentences that encourage contact. Include your response time commitment
					and highlight your {"team's"} readiness to help.
				</p>

				<div className="flex flex-col gap-4">
					<Link
						className="flex items-start gap-3 hover:underline"
						href="mailto:info@jobjourney.site"
					>
						<div className="pt-0.5">
							<Mail />
						</div>
						<span className="text-card-foreground text-base leading-6 font-medium">
							info@jobjourney.site
						</span>
					</Link>
					<Link
						className="flex items-start gap-3 hover:underline"
						href="mailto:kushbhalodi.project@gmail.com"
					>
						<div className="pt-0.5">
							<Mail />
						</div>
						<span className="text-card-foreground text-base leading-6 font-medium">
							kushbhalodi.project@gmail.com
						</span>
					</Link>
				</div>
			</section>

			{/* Follow us */}
			<section className="space-y-6">
				<h2 className="text-2xl font-bold">Follow us</h2>

				<div className="flex space-x-4">
					<SocialLink
						href="https://www.linkedin.com/company/jobjourney-2024"
						icon={<Linkedin className="h-6 w-6" />}
						label="Linkedin"
					/>
					<SocialLink
						href="https://github.com/kush992"
						icon={<Github className="h-6 w-6" />}
						label="GitHub"
					/>
					<SocialLink
						href="https://kushbhalodi.com"
						icon={<Dribbble className="h-6 w-6" />}
						label="Dribbble"
					/>
				</div>
			</section>
		</div>
	);
}

interface SocialLinkProps {
	href: string;
	icon: React.ReactNode;
	label: string;
}

function SocialLink({ href, icon, label }: SocialLinkProps) {
	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className="text-gray-400 hover:text-white transition-colors"
			aria-label={label}
		>
			{icon}
		</a>
	);
}
