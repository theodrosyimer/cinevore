import { user } from "@/drizzle/schema"
import { createInsertSchema } from "drizzle-zod"
import * as z from "zod"

export const userNameSchema = z.object({
  name: z.string().min(3).max(32),
})

// For admin actions
export const insertUserSchema = createInsertSchema(user, {
  name: z.string().min(3).max(32),
  email: z.string().email(),
  password: z.string().min(8),
})

// export const requestSchemaWithoutRole = insertUserSchema.omit({ role: true })

// const userWithoutRole = requestSchemaWithoutRole.parse({
//   name: 'John Doe',
//   email: 'johndoe@test.com',
//   role: 'admin',
// })

export const requestSchema = insertUserSchema.pick({ name: true, email: true, password: true })

const userFromRequest = requestSchema.parse({
  name: 'John Doe',
  email: 'johndoe@test.com',
  password: 'admin',
})
