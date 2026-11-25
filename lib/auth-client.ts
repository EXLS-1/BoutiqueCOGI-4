import { createAuthClient } from "better-auth/react";

/**
 * Client BetterAuth côté navigateur.
 * Permet signIn.email, signUp.email, signOut, useSession, etc.
 */
export const authClient = createAuthClient({
  baseURL:
    process.env.NEXT_PUBLIC_AUTH_URL ??
    (process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : "http://localhost:3000"),
});
