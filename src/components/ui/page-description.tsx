import React from 'react';

type Props = {
	description: string;
};

const PageDescription: React.FC<Props> = ({ description }) => {
	return <p className="mt-2 text-muted-foreground">{description}</p>;
};

export default PageDescription;
