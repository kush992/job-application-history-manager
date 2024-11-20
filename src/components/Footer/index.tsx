import { Github, Globe, Linkedin, Mail } from 'lucide-react';
import React from 'react';
import { Separator } from '../ui/separator';
import { footerLinks } from './utility';
import Link from 'next/link';

const Footer = () => {
	return (
		<footer className="p-4 sm:p-6 bg-background">
			<div className="mx-auto max-w-5xl flex flex-col items-center gap-4">
				<div>
					<a href="https://flowbite.com" className="flex items-center">
						<span className="self-center text-2xl font-semibold whitespace-nowrap tracking-tighter">
							JobJourney
						</span>
					</a>
				</div>
				<ul className="flex flex-wrap justify-center items-center gap-4 mx-0">
					{footerLinks.map((link) => (
						<li key={link.href} className="list-none">
							<Link href={link.href} className="hover:underline">
								{link.title}
							</Link>
						</li>
					))}
				</ul>

				<div className="flex items-center gap-1 w-full justify-center">
					<a href="https://www.linkedin.com/in/kush-bhalodi-b11991184/" target="_blank" rel="noreferrer">
						<Linkedin className="w-5 h-5" />
					</a>
					<a target="_blank" href="mailto:kushbhalodi.project@gmail.com" className="underline italic">
						<Mail className="w-5 h-5" />
					</a>
					<a target="_blank" href="https://github.com/kush992" rel="noreferrer">
						<Github className="w-5 h-5" />
					</a>
					<a target="_blank" href="https://kushbhalodi.com">
						<Globe className="w-5 h-5" />
					</a>
				</div>
			</div>

			<Separator className="my-4" />

			<div className="flex items-center w-full mt-4">
				<span className="text-sm text-muted-foreground text-center w-full">
					© 2022{' '}
					<a href="https://kushbhalodi.com" target="_blank" className="hover:underline">
						KushBhalodi™
					</a>
					. All Rights Reserved.
				</span>
			</div>
		</footer>
	);
};

export default Footer;
