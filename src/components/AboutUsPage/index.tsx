import React from 'react';
import { aboutUsContent } from './utility';

const AboutUsPage: React.FC = () => {
	return (
		<div className="md:text-center flex flex-col gap-4 md:gap-8 motion-preset-slide-down">
			<div>
				<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
					{aboutUsContent.title}
				</h1>
				<p className="leading-7 [&:not(:first-child)]:mt-6">{aboutUsContent.headline}</p>
			</div>

			<div>
				<h2 className="mt-8 text-2xl font-semibold tracking-tight">{aboutUsContent.goal.title}</h2>
				<p className="leading-7 [&:not(:first-child)]:mt-6">{aboutUsContent.goal.description}</p>
			</div>
		</div>
	);
};

export default AboutUsPage;
