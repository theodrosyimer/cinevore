import type { Config } from "drizzle-kit"
import { env } from "@env.mjs"


export default {
  schema: "./drizzle/schema.ts",
  out: "./drizzle",
  driver: 'mysql2',
  dbCredentials: {
    host: env.DB_HOST ?? '',
    user: env.DB_ADMIN ?? '',
    database: env.DRIZZLE_DB_NAME ?? '',
    port: Number(env.DB_PORT),
  }
} satisfies Config
