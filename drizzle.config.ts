import type { Config } from "drizzle-kit"
import { env } from "@/env.mjs"
// import * as dotenv from "dotenv"
// dotenv.config({ path: '.env.local' })

export default {
  schema: "./src/db/schema/planetscale/index.ts",
  out: "./drizzle",
  driver: 'mysql2',
  dbCredentials: {
    connectionString: env.DATABASE_URL ?? '',
    // host: env.DATABASE_HOST ?? '',
    // user: env.DATABASE_USERNAME ?? '',
    // database: env.DATABASE_NAME ?? '',
    // password: env.DATABASE_PASSWORD,
    // port: Number(env.DB_PORT),
  }
} satisfies Config
