import { z } from "zod"

export const userAuthSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
  name: z.string().min(3),
})
