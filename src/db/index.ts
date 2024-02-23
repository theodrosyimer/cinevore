import * as schema from '@/db/schema/planetscale'
import { env } from '@/env.js'
import { Client } from '@planetscale/database'
import { drizzle } from 'drizzle-orm/planetscale-serverless'

export const db = drizzle(new Client({ url: env.DATABASE_URL }), {
  schema,
})
