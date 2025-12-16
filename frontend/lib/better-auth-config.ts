// File: lib/better-auth-config.ts
// Better Auth configuration for FastAPI backend integration

import { betterAuth } from "better-auth"

export const auth = betterAuth({
  database: {
    // We're using FastAPI backend, not direct DB access
    provider: "custom",
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Phase II doesn't require email verification
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days (matches JWT expiration)
    updateAge: 60 * 60 * 24, // Update session every 24 hours
  },
  socialProviders: {
    // No OAuth in Phase II
  },
})
