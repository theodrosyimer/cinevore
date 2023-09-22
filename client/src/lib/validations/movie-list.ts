import * as z from "zod"

export const movieListPatchSchema = z.object({
  title: z.string().min(3).max(128),
  authorId: z.string(),
  movieId: z.number(),
})
