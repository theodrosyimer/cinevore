import { movieList } from "@/db"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

export const insertMovieListSchema = createInsertSchema(movieList)

export const selectListSchema = createSelectSchema(movieList)
