import { z } from 'zod'

const envSchema = z.object({
  NEXTAUTH_URL: z.string().url().nonempty(),
  NEXTAUTH_SECRET: z.string().nonempty(),
  GITHUB_CLIENT_ID: z.string().nonempty(),
  GITHUB_CLIENT_SECRET: z.string().nonempty(),
  GITHUB_ACCESS_TOKEN: z.string().nonempty(),
  // DATABASE_URL: z.string().nonempty(),
  DB_HOST: z.string().nonempty(),
  DB_ADMIN: z.string().nonempty(),
  DB_PASSWORD: z.string().nonempty(),
  DB_NAME: z.string().nonempty(),
  DB_PORT: z.coerce.number().min(4).max(4),
  TMDB_API_KEY: z.string().nonempty(),
  TMDB_API_VERSION: z.string().nonempty(),
  TMDB_BASE_URI: z.string().url().nonempty(),
  TMDB_IMAGE_BASE_URI: z.string().url().nonempty(),
  STRIPE_API_KEY: z.string().nonempty(),
  STRIPE_WEBHOOK_SECRET: z.string().nonempty(),
  STRIPE_PRO_MONTHLY_PLAN_ID: z.string().nonempty(),
})

export const env = envSchema.parse(process.env)
