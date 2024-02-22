import { user } from '@/db/schema/planetscale'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

const registerRefineOptions = {
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string(),
}

const loginRefineOptionsd = {
  email: z.string().email(),
  password: z.string().nonempty({ message: 'Password is required' }),
  name: z.string().min(2).max(50),
}

export const userRegisterSchema = z
  .object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    password: z
      .string()
      .max(25)
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{12,}$/g,
        {
          message:
            'Password must contain at least 12 characters, one uppercase, one lowercase, one number and one of these special characters: #?!@$ %^&*-',
        },
      ),
    confirmPassword: z.string().nonempty({ message: 'Confirm your password' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export const insertLoginUserSchema = createInsertSchema(
  user,
  loginRefineOptionsd,
)

const insertUserSchema = createInsertSchema(user, registerRefineOptions)
export const userRegisterAuthSchema = z.intersection(
  insertUserSchema,
  userRegisterSchema,
)
