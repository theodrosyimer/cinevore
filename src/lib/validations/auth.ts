import { user } from '@/db/planetscale'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

const registerRefineOptions = {
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string(),
}

const loginRefineOptionsd = {
  email: z.string().email(),
  password: z.string(),
}

export const userRegisterConfirmPassword = z.object({
  // email: z.string().email(),
  // password: z.string().min(5),
  confirmPassword: z.string().min(5),
  // name: z.string().min(3),
})

export const insertLoginUserSchema = createInsertSchema(
  user,
  loginRefineOptionsd
)

const insertUserSchema = createInsertSchema(user, registerRefineOptions)
export const userRegisterAuthSchema = z.intersection(
  insertUserSchema,
  userRegisterConfirmPassword
)
