import { integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";


export const UsersTable = pgTable("users", {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  email: varchar('email').notNull().unique(),
  imageUrl:varchar('imageUrl'),
});

export const ResumeScanDetails = pgTable("resumeScanDetails" ,{
  id: serial("id").primaryKey(),
  email: varchar('email').notNull(),
  skill: varchar("skill"),
  yearOfExp:varchar("yearOfExp").notNull().default("0"),
  createdAt: varchar("createdAt").notNull(),
  scanId: varchar("scanId").notNull()
});

export const MockInterview = pgTable("mockInterview", {
  id: serial('id').primaryKey(),
  jsonMockResp: text('jsonMockResp').notNull(),
  jobDescription: varchar('jobDescription').notNull(),
  jobExperience: varchar('jobExperience').notNull(),
  createdBy: varchar("createdBy").notNull(),
  createdAt: varchar("createdAt").notNull(),
  mockId: varchar("mockId").notNull(),
});