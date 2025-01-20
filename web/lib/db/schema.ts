import { sql } from "drizzle-orm";
import { bigserial, pgTable, uuid, varchar, date } from "drizzle-orm/pg-core";

export const mediaTable = pgTable("Media", {
  id: uuid('uuid7').default(sql`gen_random_uuid()`).primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  type: varchar({ length: 255 }),
  size: bigserial({ mode: 'number' }),
  lastModiiedDate: date({ mode: 'date' }),
});


