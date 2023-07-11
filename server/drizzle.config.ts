import type { Config } from "drizzle-kit"

export default {
  schema: "./**/schema/*.ts",
  out: "./drizzle",
  driver: 'mysql2',
  dbCredentials: {
    host: process.env.DB_HOST ?? '',
    user: process.env.DB_ADMIN ?? '',
    database: process.env.DB_NAME ?? '',
    port: Number(process.env.DB_PORT),
  }
} satisfies Config
