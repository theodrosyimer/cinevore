// import * as dotenv from 'dotenv'
// dotenv.config({ path: '.env.local' })

import * as schema from '@/db/schema/planetscale'
import { Client } from '@planetscale/database'
import { drizzle } from 'drizzle-orm/planetscale-serverless'
import { env } from '@/env.mjs'

export const db = drizzle(new Client({ url: env.DATABASE_URL }).connection(), {
  schema,
})
