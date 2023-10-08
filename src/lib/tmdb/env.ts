import { z } from 'zod'

const envSchema = z.object({
  // DATABASE_URL: z.string().nonempty(),
  DB_HOST: z.string().nonempty(),
  DB_ADMIN: z.string().nonempty(),
  DB_PASSWORD: z.string().nonempty(),
  DB_NAME: z.string().nonempty(),
  DB_PORT: z.coerce.number().min(4).max(4),
  TMDB_API_KEY: z.string().nonempty(),
  TMDB_API_VERSION: z.string().nonempty(),
  TMDB_BASE_URI: z.string().url(),
  TMDB_IMAGE_BASE_URI: z.string().url(),
})

export const env = envSchema.parse(process.env)
