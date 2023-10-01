import type { Config } from "drizzle-kit"
// import { env } from "./src/env.mjs"
// import * as dotenv from "dotenv"
// dotenv.config({ path: '.env.local' })

export default {
  schema: "./src/db-planetscale/index.ts",
  out: "./drizzle",
  driver: 'mysql2',
  dbCredentials: {
    host: process.env.DB_HOST ?? '',
    user: process.env.DB_ADMIN ?? '',
    database: process.env.DRIZZLE_DB_NAME ?? '',
    port: Number(process.env.DB_PORT),
    // password: process.env.DB_PASSWORD,
  }
} satisfies Config
