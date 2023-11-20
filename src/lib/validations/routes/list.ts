import { list } from '@/db/planetscale'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import * as z from 'zod'

const insertListRefineOptions = {
  title: z
    .string()
    .min(1, { message: 'Your title must contain at least 1 character(s)' })
    .max(2000),
  isPrivate: z.coerce.boolean(),
  description: z.string().max(2000),
}

export const insertListSchema = createInsertSchema(
  list,
  insertListRefineOptions,
).pick({
  title: true,
  description: true,
  isPrivate: true,
})
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
