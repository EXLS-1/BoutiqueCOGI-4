import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

/**
 * Récupère l'état d'authentification côté serveur (Server Components, Route Handlers).
 * Retourne { userId, sessionId, getToken }.
 */
export async function getServerAuth() {
  const { userId, sessionId, getToken } = await auth();
  return { userId, sessionId, getToken };
}

/**
 * Exige une authentification. Redirige vers /auth/sign-in si non connecté.
 * À utiliser dans les Server Components, layouts et Route Handlers.
 */
export async function requireAuth() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/auth/sign-in");
  }
  return { userId };
}

/**
 * Authentification optionnelle. Retourne l'état sans rediriger.
 * Utile pour les pages partiellement publiques.
 */
export async function optionalAuth() {
  return await auth();
}

/**
 * Vérifie que l'utilisateur est authentifié dans une Route Handler.
 * Retourne { unauthorized: true } si non authentifié, sinon { userId, authorized: true }.
 */
export async function requireAuthApi() {
  const { userId } = await auth();
  if (!userId) {
    return { unauthorized: true };
  }
  return { userId, authorized: true };
}
