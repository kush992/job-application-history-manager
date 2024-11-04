import React from 'react';

type Props = {
	description: string;
};

const PageDescription: React.FC<Props> = ({ description }) => {
	return <p className="text-sm text-muted-foreground">{description}</p>;
};

export default PageDescription;
