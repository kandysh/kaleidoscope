import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@/lib/db/schema";
import { Pool } from "pg";

export const client = new Pool({
  connectionString: process.env.POSTGRES_CONNECTION_STRING as string
});

export const db = drizzle(client, { schema });