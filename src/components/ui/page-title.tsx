import React from 'react';

type Props = {
	title: string;
};

const PageTitle: React.FC<Props> = ({ title }) => {
	return <h1 className="text-4xl font-bold tracking-tight">{title}</h1>;
};

export default PageTitle;
