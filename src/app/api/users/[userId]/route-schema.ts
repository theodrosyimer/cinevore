import { z } from 'zod'

export const routeContextSchema = z.object({
  params: z.object({
    userId: z.string(),
  }),
})
