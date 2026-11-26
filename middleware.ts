import { authMiddleware } from "@clerk/nextjs";

/**
 * Middleware d'authentification Clerk.
 * Protège toutes les routes sauf celles listées dans publicRoutes.
 */
export default authMiddleware({
  publicRoutes: [
    "/",
    "/auth/sign-in(.*)",
    "/auth/sign-up(.*)",
    "/api/webhooks(.*)",
  ],
  ignoredRoutes: ["/api/(.*)"],
});

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/(api|trpc)(.*)",
  ],
};

// Ancienne config better-auth supprimée (Clerk configuré ci-dessus)
