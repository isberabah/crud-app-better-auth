/* import { drizzle } from "drizzle-orm/node-postgres";
import { SCHEME } from "./schema";
//import { Pool } from '@neondatabase/serverless';

import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true, // Neon requires SSL
});

export const db = drizzle(pool, { schema: SCHEME });
 */


// db/drizzle.ts
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { SCHEME } from './schema';

import 'dotenv/config';


// Create a Neon HTTP client
/* const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql ,schema: SCHEME }); */


export const db = drizzle(process.env.DATABASE_URL!);