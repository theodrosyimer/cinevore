import { movieReview } from '@/db/planetscale'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import * as z from 'zod'

const insertRefineOptions = {}

export const insertReviewSchema = createInsertSchema(movieReview)

export const reviewPOSTSchema = insertReviewSchema.pick({})
export const reviewGETSchema = createSelectSchema(movieReview)
