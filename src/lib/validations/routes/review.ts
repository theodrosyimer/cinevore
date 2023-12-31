import { movieReview } from '@/db/schema/planetscale'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import * as z from 'zod'

const insertRefineOptions = {}

export const insertReviewSchema = createInsertSchema(movieReview)

export const reviewPOSTSchema = insertReviewSchema
export const reviewPATCHSchema = insertReviewSchema.pick({
  content: true,
})
export const reviewGETSchema = createSelectSchema(movieReview)
