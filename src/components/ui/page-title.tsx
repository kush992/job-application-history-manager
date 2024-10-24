import React from 'react';

type Props = {
	title: string;
};

const PageTitle: React.FC<Props> = ({ title }) => {
	return (
		<h1 className="mt-8 text-2xl font-semibold tracking-tight">{title}</h1>
	);
};

export default PageTitle;
