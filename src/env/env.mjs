import { z } from 'zod'
import { createEnv } from '@t3-oss/env-nextjs'

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']),
    NEXT_PUBLIC_EMAIL_USERNAME: z.string(),
    NEXT_PUBLIC_EMAIL_APP_PASSWORD: z.string(),
    NEXT_PUBLIC_PERSONAL_EMAIL: z.string(),
  },
  client: {},
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_EMAIL_USERNAME: process.env.NEXT_PUBLIC_EMAIL_USERNAME,
    NEXT_PUBLIC_EMAIL_APP_PASSWORD: process.env.NEXT_PUBLIC_EMAIL_APP_PASSWORD,
    NEXT_PUBLIC_PERSONAL_EMAIL: process.env.NEXT_PUBLIC_PERSONAL_EMAIL,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
})
