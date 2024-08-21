export const formatDate = (input: string | Date): string => {
	const date = typeof input === 'string' ? new Date(input) : input;

	if (isNaN(date?.getTime())) {
		return '-';
	}

	return new Intl.DateTimeFormat(undefined, {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric',
		hour12: true, // Use 12-hour time format, set to false for 24-hour format
	}).format(date);
};