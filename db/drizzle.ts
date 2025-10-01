import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import "dotenv/config";
import * as schema from "./schema";

/*  if (!process.env.DATABASE_URL!) {
  throw new Error("DATABASE_URL environment variable is not set");
}  */

const sql = neon("postgresql://neondb_owner:npg_xA5Ee2pLqVjW@ep-muddy-mud-ad08lmt6-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require");
const db = drizzle(sql, { schema });
export { db };
