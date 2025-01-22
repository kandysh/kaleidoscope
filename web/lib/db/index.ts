import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@/lib/db/schema";
import { Pool } from "pg";

export const client = new Pool({
  connectionString: process.env.UP_POSTGRES_URL as string
});

export const db = drizzle(client, { schema });