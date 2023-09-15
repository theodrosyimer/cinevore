import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    // This is optional because it's only used in development.
    // See https://next-auth.js.org/deployment.
    NEXTAUTH_URL: z.string().url().optional(),
    NEXTAUTH_SECRET: z.string().min(1),
    GITHUB_CLIENT_ID: z.string().min(1),
    GITHUB_CLIENT_SECRET: z.string().min(1),
    GITHUB_ACCESS_TOKEN: z.string().min(1),
    // DATABASE_URL: z.string().min(1),
    DB_HOST: z.string().min(1),
    DB_ADMIN: z.string().min(1),
    DB_PASSWORD: z.string().min(1),
    // DB_NAME: z.string().min(1),
    DRIZZLE_DB_NAME: z.string().min(1),
    DB_PORT: z.coerce.number().min(1),
    // JWT_SECRET: z.string().min(1),
    TMDB_API_KEY: z.string().min(1),
    TMDB_BASE_URI: z.string().url(),
    TMDB_IMAGE_BASE_URI: z.string().url(),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().min(1),
    // SERVER_URL: z.string().min(1)
  },
  // experimental__runtimeEnv: {
  //   NEXT_PUBLIC_APP_URL: z.string().min(1),
  //   SERVER_URL: z.string().min(1),
  // },
  runtimeEnv: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GITHUB_ACCESS_TOKEN: process.env.GITHUB_ACCESS_TOKEN,
    // DATABASE_URL: process.env.DATABASE_URL,
    // SERVER_URL: process.env.SERVER_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    DB_HOST: process.env.DB_HOST,
    DB_ADMIN: process.env.DB_ADMIN,
    DB_PASSWORD: process.env.DB_PASSWORD,
    // DB_NAME: process.env.DB_NAME,
    DRIZZLE_DB_NAME: process.env.DRIZZLE_DB_NAME,
    DB_PORT: process.env.DB_PORT,
    // JWT_SECRET: process.env.JWT_SECRET,
    TMDB_API_KEY: process.env.TMDB_API_KEY,
    TMDB_BASE_URI: process.env.TMDB_BASE_URI,
    TMDB_IMAGE_BASE_URI: process.env.TMDB_IMAGE_BASE_URI,
  },
})
