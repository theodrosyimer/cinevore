import { user } from '@/db/schema/planetscale'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import * as z from 'zod'

export const userNameSchema = z.object({
  name: z.string().min(3).max(32),
})

const insertRefineOptions = {
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z
    .string()
    .min(12)
    .max(25)
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{12,}$/g,
      {
        message:
          'Password must contain at least 12 characters, one uppercase, one lowercase, one number and one of these special characters: #?!@$ %^&*-',
      },
    ),
}

export const insertUserSchema = createInsertSchema(user, insertRefineOptions)

export const userPatchSchema = createInsertSchema(user, {
  email: z.string().email().optional(),
})

export const userPOSTSchema = insertUserSchema.pick({
  name: true,
  email: true,
  password: true,
})

const selectRefineOptions = {
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
}

export const selectUserSchema = createSelectSchema(user, selectRefineOptions)

export const userGETSchema = selectUserSchema.omit({
  password: true,
})

export const userSettingsFormSchema = createSelectSchema(user, {
  name: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.',
    }),
  email: z
    .string({
      required_error: 'Please select an email to display.',
    })
    .email(),
  bio: z.string().max(160).min(4).optional(),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: 'Please enter a valid URL.' }),
      }),
    )
    .optional(),
})

// Example usage:
//
// export const userPostWithoutRoleSchema = insertUserSchema.omit({ role: true })

// throws an error
// const userWithoutRole = userPostWithoutRoleSchema.parse({
//   name: 'John Doe',
//   email: 'johndoe@test.com',
//   role: 'admin',
// })
