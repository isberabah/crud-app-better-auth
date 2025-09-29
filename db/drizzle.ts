import { drizzle } from 'drizzle-orm/neon-http';
import { SCHEME } from './schema';

export const db = drizzle(process.env.DATABASE_URL!,{schema:SCHEME});
