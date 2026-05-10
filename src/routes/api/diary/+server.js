import { db } from '$lib/server/db';
import { diary } from '$lib/server/db/schema';
import { json } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export async function POST({ request }) {
	const userId = 1;

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
			userId,
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

export async function GET() {
	const posts = await db.query.diary.findMany({
		where: eq(diary.userId, 1)
	});

	return json(posts);
}