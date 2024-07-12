import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const employeeTable = pgTable('employee_table', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  lastName: text('lastName'),
  nni:text('nni').notNull().unique(),
  age: integer('age').notNull(),
  phone: integer('phone').notNull().unique(),
  email: text('email').notNull().unique(),
  code: text('code').notNull().unique(),
});


export type InsertEmployee = typeof employeeTable.$inferInsert;
export type SelectEmployee = typeof employeeTable.$inferSelect;
