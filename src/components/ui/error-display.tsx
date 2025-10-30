import React from 'react';

type Props = {
	error: unknown;
};

const ErrorDisplay = ({ error }: Props) => {
	return (
		<pre className="bg-destructive-foreground text-destructive text-sm p-4 rounded-md w-full overflow-x-auto">
			<code>{JSON.stringify(error, null, 2)}</code>
		</pre>
	);
};

export default ErrorDisplay;
