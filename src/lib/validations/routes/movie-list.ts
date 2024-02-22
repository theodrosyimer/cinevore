import { movieList } from '@/db/schema/planetscale'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const insertMovieListSchema = createInsertSchema(movieList)

export const selectMovieListSchema = createSelectSchema(movieList)
