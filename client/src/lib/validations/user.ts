import { user } from "@/db"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import * as z from "zod"

export const userNameSchema = z.object({
  name: z.string().min(3).max(32),
})

// For admin actions
export const insertUserSchema = createInsertSchema(user, {
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8).max(25).regex(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/g,
    {
      message: 'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one of these special characters: #?!@$ %^&*-',
    }
  )
})

export const userPatchSchema = createInsertSchema(user, {
  name: z.string().min(2).max(50).optional(),
  email: z.string().email().optional(),
  password: z.string().min(8).max(25).regex(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/g,
    {
      message: 'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one of these special characters: #?!@$ %^&*-',
    }),
})

export const userPostSchema = insertUserSchema.pick({ name: true, email: true, password: true })

export const selectUserSchema = createSelectSchema(user)

// Example usage:
//
// export const userPostWithoutRoleSchema = insertUserSchema.omit({ role: true })

// const userWithoutRole = userPostWithoutRoleSchema.parse({
//   name: 'John Doe',
//   email: 'johndoe@test.com',
//   role: 'admin',
// })
