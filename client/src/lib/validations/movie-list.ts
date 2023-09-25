import { movieList } from "@/schema"
import { createInsertSchema } from "drizzle-zod"
import * as z from "zod"

// export const insertListSchema = createInsertSchema(list)

export const insertMovieListSchema = createInsertSchema(movieList, {
  movieId: z.number().optional(),
})

export const movieListPostSchema = insertMovieListSchema.pick({ movieId: true })
