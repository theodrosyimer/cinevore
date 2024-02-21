import type { Config } from 'drizzle-kit'
import { env } from '@/env.js'

export default {
  schema: './src/db/schema/planetscale/index.ts',
  out: './drizzle',
  driver: 'mysql2',
  dbCredentials: {
    uri: env.DATABASE_URL,
    // host: env.DATABASE_HOST ?? '',
    // user: env.DATABASE_USERNAME ?? '',
    // database: env.DATABASE_NAME ?? '',
    // password: env.DATABASE_PASSWORD,
    // port: Number(env.DB_PORT),
  },
} satisfies Config
