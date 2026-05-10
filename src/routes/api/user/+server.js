import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import bcrypt from 'bcryptjs';

export async function POST({ request }) {
	const { username, password } = await request.json();

	const hashedPassword = await bcrypt.hash(password, 10);

	await db.insert(user).values({
		username,
		password: hashedPassword
	});

	return new Response(JSON.stringify({ success: true }), {
		status: 201
	});
}
