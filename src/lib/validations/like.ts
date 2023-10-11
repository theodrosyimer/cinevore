import * as z from 'zod'
import { like, list, movieReview } from '@/db/planetscale'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { insertListSchema } from '@/lib/validations/list'

const insertRefineOptions = {
  au: z.string(),
}

const insertOptionalRefineOptions = {
  content: z.string().optional(),
}

export const insertLikeSchema = createInsertSchema(movieReview)

export const likePOSTSchema = insertLikeSchema.pick({ id: true })
export const likePATCHSchema = createInsertSchema(like).partial()

export const likeGETSchema = createSelectSchema(like)

export const likePatchSchema = z.object({
  title: z.string().min(3).max(128).optional(),

  // TODO: Type this properly from editorjs block types?
  content: z.any().optional(),
})
