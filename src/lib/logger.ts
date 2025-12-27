// Structured logger for API routes
type LogLevel = 'info' | 'warn' | 'error' | 'debug' | 'log';

function safeSerializeError(err: any) {
	if (!err) return null;
	if (typeof err === 'string') return err;
	if (err instanceof Error) {
		return {
			name: err.name,
			message: err.message,
			stack: err.stack,
			...(Object.keys(err).length ? { extra: { ...err } } : {}),
		};
	}
	try {
		return JSON.parse(JSON.stringify(err));
	} catch (e) {
		return String(err);
	}
}

export function apiLog(
	level: LogLevel,
	opts: {
		request?: any;
		userId?: string | null;
		requestId?: string | null;
		message?: string;
		error?: any;
		meta?: any;
	} = {},
) {
	const { request, userId = null, requestId = null, message = null, error = null, meta = null } = opts;
	let route: string | undefined;
	try {
		route = request?.nextUrl?.pathname ?? (request?.url ? new URL(request.url).pathname : undefined);
	} catch (_) {
		route = undefined;
	}

	const payload: any = {
		timestamp: new Date().toISOString(),
		level,
		route: route ?? 'unknown',
		userId: userId ?? null,
		requestId: requestId ?? null,
		message: message ?? null,
	};

	if (error) payload.error = safeSerializeError(error);
	if (meta) payload.meta = meta;

	const out = JSON.stringify(payload);
	if (level === 'error') console.error(out);
	else if (level === 'warn') console.warn(out);
	else if (level === 'info') console.info(out);
	else console.log(out);
}

export const logger = {
	info: (opts: any) => apiLog('info', opts),
	warn: (opts: any) => apiLog('warn', opts),
	error: (opts: any) => apiLog('error', opts),
	debug: (opts: any) => apiLog('debug', opts),
};

export default apiLog;
