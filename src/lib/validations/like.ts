import * as z from 'zod'
import { like } from '@/db/planetscale'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

const insertRefineOptions = {
  au: z.string(),
}

const insertOptionalRefineOptions = {
  content: z.string().optional(),
}

export const likePOSTSchema = createInsertSchema(like, {
  authorId: z.string(),
})
export const likePATCHSchema = createInsertSchema(like).partial()

export const likeGETSchema = createSelectSchema(like)

export const likePatchSchema = z.object({
  title: z.string().min(3).max(128).optional(),

  // TODO: Type this properly from editorjs block types?
  content: z.any().optional(),
})
