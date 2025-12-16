// File: lib/auth-client.ts
// Spec: specs/001-competition-todo-app/file.md § FR-1 (Authentication with Better Auth)

import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001",
})

export const { useSession, signIn, signUp, signOut } = authClient
