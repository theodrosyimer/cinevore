import { list } from "@/db-planetscale"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

export const insertListSchema = createInsertSchema(list)

export const selectListSchema = createSelectSchema(list)
