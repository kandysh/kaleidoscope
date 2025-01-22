import "dotenv";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./lib/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.UP_POSTGRES_URL as string,
  },
  verbose: true,
  strict: true,
});