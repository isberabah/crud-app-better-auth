import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/drizzle";
import { nextCookies } from "better-auth/next-js";
import { SCHEME } from "@/db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: SCHEME,
  }),
  emailAndPassword: {
    enabled: true,
    
  },
  user:{
      additionalFields:{
        role:{
          type:"string",
          defaultValue:"user"
        }
      }
  },
  plugins: [nextCookies()],
});
