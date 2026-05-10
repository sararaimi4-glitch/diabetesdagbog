import { pgTable, integer, text, serial,numeric } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
  id: serial('id').primaryKey(),
  username: text('username').notNull().unique(),
  password: text('password').notNull()
});

export const diary = pgTable('diary', {
	id: serial('id').primaryKey(),

	bloodSugar: numeric('blood_sugar').notNull(),
	medicineTaken: integer('medicine_taken').notNull(),
	insulinReminder: integer('insulin_reminder').notNull(),
	exerciseMinutes: integer('exercise_minutes').notNull(),

	food: text('food'),
	symptoms: text('symptoms'),
	content: text('content'),

	userId: integer('user_id').notNull()
});