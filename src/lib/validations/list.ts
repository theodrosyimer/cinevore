import { list } from '@/db/planetscale'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import * as z from 'zod'

export const insertListSchema = createInsertSchema(list)
export const listPATCHSchema = insertListSchema.partial().pick({
  title: true,
  description: true,
  isPrivate: true,
})

const selectRefineOptions = {
  createdAt: z.coerce.date(),
  publishedAt: z.coerce.date(),
}

export const selectListSchema = createSelectSchema(list, selectRefineOptions)
