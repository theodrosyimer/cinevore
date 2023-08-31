import type { Config } from "drizzle-kit"
import * as dotenv from "dotenv"
dotenv.config()

export default {
  schema: "./**/models/schema.ts",
  out: "./drizzle",
  driver: 'mysql2',
  dbCredentials: {
    host: process.env.DB_HOST ?? '',
    user: process.env.DB_ADMIN ?? '',
    database: process.env.DRIZZLE_DB_NAME ?? '',
    port: Number(process.env.DB_PORT),
  }
} satisfies Config
