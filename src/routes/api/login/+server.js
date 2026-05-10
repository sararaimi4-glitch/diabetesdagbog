import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '$env/dynamic/private';

import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export async function POST({ request, cookies }) {
	const { username, password } = await request.json();

	const userData = await db.query.user.findFirst({
		where: eq(user.username, username)
	});

	if (!userData) {
		return new Response(JSON.stringify({ error: 'User not found' }), {
			status: 404
		});
	}

	const isPasswordValid = await bcrypt.compare(password, userData.password);

	if (!isPasswordValid) {
		return new Response(JSON.stringify({ error: 'Invalid password' }), {
			status: 401
		});
	}

	const token = jwt.sign(
    { id: userData.id, username },
    env.JWT_SECRET,
    { expiresIn: '1h' }
);

cookies.set('session', token, {
    path: '/',
    httpOnly: true,
    maxAge: 60 * 60
});

	return new Response(JSON.stringify({ message: 'Login successful' }), {
		status: 200
	});
}
