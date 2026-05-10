import { env } from '$env/dynamic/private';
import jwt from 'jsonwebtoken';

export async function handle({ event, resolve }) {
	const token = event.cookies.get('session');

	if (['/', '/login', '/api/login'].includes(event.url.pathname)) {
		return await resolve(event);
	}

	if (token) {
		try {
			const decoded = jwt.verify(token, env.JWT_SECRET);

			event.locals.user = decoded;

			return await resolve(event);
		} catch (err) {
			console.error('Token verification failed:', err);
		}
	}

	return new Response(JSON.stringify({ error: 'Unauthorized' }), {
		status: 401
	});
}