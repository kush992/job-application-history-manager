import {
	GitHubLogoIcon,
	GlobeIcon,
	LinkedInLogoIcon,
} from '@radix-ui/react-icons';
import { Bug, Mail } from 'lucide-react';
import React from 'react';

const Footer = () => {
	return (
		<footer className="md:rounded-md p-4 max-w-6xl mx-auto md:mb-4">
			<p className="leading-7 text-xs text-muted-foreground text-center !my-0">
				KushBhalodi © 2024
			</p>
			<div className="flex items-center gap-1 w-full justify-center my-2">
				<a
					href="https://www.linkedin.com/in/kush-bhalodi-b11991184/"
					target="_blank"
					rel="noreferrer"
				>
					<LinkedInLogoIcon className="w-5 h-5" />
				</a>
				<a
					target="_blank"
					href="mailto:kushbhalodi.project@gmail.com"
					className="underline italic"
				>
					<Mail className="w-5 h-5" />
				</a>
				<a
					target="_blank"
					href="https://github.com/kush992"
					rel="noreferrer"
				>
					<GitHubLogoIcon className="w-5 h-5" />
				</a>
				<a target="_blank" href="https://kushbhalodi.com">
					<GlobeIcon className="w-5 h-5" />
				</a>
			</div>
			<a
				href="https://github.com/kush992/job-application-history-manager/issues"
				target="_blank"
				rel="noreferrer"
				className="hover:underline text-sm"
			>
				<div className="flex gap-1 items-center justify-center text-muted-foreground">
					Report bugs here <Bug className="w-5 h-5" />
				</div>
			</a>
		</footer>
	);
};

export default Footer;
