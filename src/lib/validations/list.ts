import { list } from '@/db/planetscale'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import * as z from 'zod'

export const insertListSchema = createInsertSchema(list)

const selectRefineOptions = {
  createdAt: z.coerce.date(),
  publishedAt: z.coerce.date(),
}

export const selectListSchema = createSelectSchema(list, selectRefineOptions)
