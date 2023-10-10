import { movieList } from '@/db/planetscale'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const insertMovieListSchema = createInsertSchema(movieList)

export const selectMovieListSchema = createSelectSchema(movieList)
