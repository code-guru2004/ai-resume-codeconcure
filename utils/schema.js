import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";


export const UsersTable = pgTable("users", {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  email: varchar('email').notNull().unique(),
  imageUrl:varchar('imageUrl'),
});