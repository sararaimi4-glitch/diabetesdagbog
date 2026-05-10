import { db } from '$lib/server/db';
import { diary } from '$lib/server/db/schema';
import { json } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export async function POST({ request, locals }) {
	if (!locals.user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	const {
		bloodSugar,
		medicineTaken,
		insulinReminder,
		exerciseMinutes,
		food,
		symptoms,
		content
	} = await request.json();

	const newPost = await db
		.insert(diary)
		.values({
			userId: locals.user.id,
			bloodSugar,
			medicineTaken,
			insulinReminder,
			exerciseMinutes,
			food,
			symptoms,
			content
		})
		.returning();

	return json(newPost[0], { status: 201 });
}

export async function GET({ locals }) {
	if (!locals.user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	const posts = await db.query.diary.findMany({
		where: eq(diary.userId, locals.user.id)
	});

	return json(posts);
}