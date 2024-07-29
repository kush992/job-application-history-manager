export const formatDate = (input: string | Date): string => {
	const date = typeof input === 'string' ? new Date(input) : input;

	if (isNaN(date.getTime())) {
		return '-';
	}

	return new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	}).format(date);
};
