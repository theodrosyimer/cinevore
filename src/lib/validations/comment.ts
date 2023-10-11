import * as z from 'zod'
import { comment } from '@/db/planetscale'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

const insertRefineOptions = {
  authorId: z.string(),
  content: z.string(),
}

const insertOptionalRefineOptions = {
  content: z.string().optional(),
}

export const commentPOSTSchema = createInsertSchema(
  comment,
  insertRefineOptions,
)
export const commentPATCHSchema = createInsertSchema(comment).partial()

export const commentGETSchema = createSelectSchema(comment)

export const commentPatchSchema = z.object({
  title: z.string().min(3).max(128).optional(),

  // TODO: Type this properly from editorjs block types?
  content: z.any().optional(),
})
