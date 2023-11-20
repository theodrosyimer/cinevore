import * as z from 'zod'
import { comment } from '@/db/planetscale'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

const insertRefineOptions = {
  authorId: z.string(),
  content: z.string(),
  // resourceType: z.string(),
  // resourceId: z.number(),
}

const insertOptionalRefineOptions = {
  content: z.string().optional(),
}

export const insertCommentSchema = createInsertSchema(
  comment,
  insertRefineOptions,
)
export const userCommentSchema = createInsertSchema(comment).pick({
  content: true,
})

export const userCommentPATCHSchema = createInsertSchema(comment).pick({
  content: true,
})

export const userCommentGETSchema = createSelectSchema(comment)
