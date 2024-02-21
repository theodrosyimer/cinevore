import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    NEXTAUTH_URL: z.string().url().optional(),
    NEXTAUTH_SECRET: z.string().min(1),
    GITHUB_CLIENT_ID: z.string().min(1),
    GITHUB_CLIENT_SECRET: z.string().min(1),
    GITHUB_ACCESS_TOKEN: z.string().min(1),
    DATABASE_URL: z.string().min(1),
    // DATABASE_HOST: z.string().min(1),
    // DATABASE_USERNAME: z.string().min(1),
    // DATABASE_PASSWORD: z.string().min(1),
    // DATABASE_NAME: z.string().min(1),
    TMDB_API_KEY: z.string().min(1),
    TMDB_API_VERSION: z.string().min(1),
    TMDB_BASE_URI: z.string().url(),
    IMDB_BASE_URI: z.string().url(),
    TMDB_IMAGE_BASE_URI: z.string().url(),
    TMDB_IMAGE_BASE_URI_HTTP: z.string().url(),
    UPLOADTHING_SECRET: z.string().min(1),
    UPLOADTHING_APP_ID: z.string().min(1),
    STRIPE_API_KEY: z.string().min(1),
    STRIPE_WEBHOOK_SECRET: z.string().min(1),
    STRIPE_PRO_MONTHLY_PLAN_ID: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GITHUB_ACCESS_TOKEN: process.env.GITHUB_ACCESS_TOKEN,
    DATABASE_URL: process.env.DATABASE_URL,
    // DATABASE_HOST: process.env.DATABASE_HOST,
    // DATABASE_USERNAME: process.env.DATABASE_USERNAME,
    // DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    // DATABASE_NAME: process.env.DATABASE_NAME,
    TMDB_API_KEY: process.env.TMDB_API_KEY,
    TMDB_API_VERSION: process.env.TMDB_API_VERSION,
    TMDB_BASE_URI: process.env.TMDB_BASE_URI,
    IMDB_BASE_URI: process.env.IMDB_BASE_URI,
    TMDB_IMAGE_BASE_URI: process.env.TMDB_IMAGE_BASE_URI,
    TMDB_IMAGE_BASE_URI_HTTP: process.env.TMDB_IMAGE_BASE_URI,
    UPLOADTHING_SECRET: process.env.UPLOADTHING_SECRET,
    UPLOADTHING_APP_ID: process.env.UPLOADTHING_APP_ID,
    STRIPE_API_KEY: process.env.STRIPE_API_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    STRIPE_PRO_MONTHLY_PLAN_ID: process.env.STRIPE_PRO_MONTHLY_PLAN_ID,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined.
   * `SOME_VAR: z.string()` and `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
})
