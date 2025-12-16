import { betterAuth } from "better-auth"

export const auth = betterAuth({
  database: {
    // Better Auth will use your backend API instead of direct database access
    type: "sqlite", // Dummy type, we'll use API calls instead
    // This is a hybrid approach: Better Auth handles client-side auth flow,
    // but delegates to your FastAPI backend for actual authentication
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  // JWT configuration to match your backend
  jwt: {
    enabled: true,
    expiresIn: 60 * 60 * 24 * 7, // 7 days to match your backend
    issuer: "hackathon-todo-app",
  },
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET || "your-secret-key-min-32-characters-long",
})
