export const formatDate = (input: string | Date): string => {
	const date = typeof input === 'string' ? new Date(input) : input;

	if (isNaN(date?.getTime())) {
		return '-';
	}

	return new Intl.DateTimeFormat(undefined, {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		// second: 'numeric',
		hour12: false, // Use 12-hour time format, set to false for 24-hour format
	}).format(date);
};

export function transformDate(input: string | Date): string {
	const now = new Date();
	const date = typeof input === 'string' ? new Date(input) : input;

	const diffInMs = now.getTime() - date.getTime();
	const diffInSec = Math.floor(diffInMs / 1000);
	const diffInMin = Math.floor(diffInSec / 60);
	const diffInHours = Math.floor(diffInMin / 60);
	const diffInDays = Math.floor(diffInHours / 24);

	// Current date
	if (diffInSec < 60) {
		return `${diffInSec}s ago`;
	}

	// Less than an hour ago
	if (diffInMin < 60) {
		return `${diffInMin}m ago`;
	}

	// Less than a day ago
	if (diffInHours < 24) {
		return `${diffInHours}h ago`;
	}

	// Yesterday
	if (diffInDays < 2) {
		return `${diffInDays}d ago`;
	}

	// For dates older than one day
	const options: Intl.DateTimeFormatOptions = {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	};
	return date.toLocaleDateString('en-US', options);
}
