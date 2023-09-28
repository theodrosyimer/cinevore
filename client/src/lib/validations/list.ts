import { list } from "@/schema"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

export const insertListSchema = createInsertSchema(list)

export const selectListSchema = createSelectSchema(list)
