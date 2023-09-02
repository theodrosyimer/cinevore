/* eslint-disable newline-per-chained-call */
import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
  // clientPrefix: 'PUBLIC_',
  server: {
    // DATABASE_URL: z.string().url(),
    SERVER_PORT: z.coerce.number().min(1),
    NODE_ENV: z.enum(['development', 'test', 'production']),
    DB_HOST: z.string().min(1),
    DB_ADMIN: z.string().min(1),
    DB_PASSWORD: z.string().min(1),
    DB_NAME: z.string().min(1),
    DB_PORT: z.coerce.number().min(1),
    JWT_SECRET: z.string().min(1),
    CLIENT_URL: z.string().min(1),
  },
  // client: { PUBLIC_CLIENT_URL: z.string().min(1) },
  /**
   * What object holds the environment variables at runtime.
   * Often `process.env` or `import.meta.env`
   */
  runtimeEnv: process.env,
})
