import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

/**
 * Middleware de protection des routes (Next.js 16 : renommez ce fichier en `proxy.ts`
 * et exportez `proxy` si vous utilisez la convention "proxy" de Next 16).
 *
 * - Les routes protégées redirigent vers /auth/signin si aucune session valide.
 * - Les routes d'authentification redirigent vers /account si déjà connecté.
 */
export async function middleware(request: Request) {
  const { pathname } = new URL(request.url);

  const protectedRoutes = ["/account", "/profile", "/orders", "/dashboard"];
  const authRoutes = ["/auth/signin", "/auth/signup"];

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );
  const isAuthRoute = authRoutes.includes(pathname);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (isProtected && !session) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL("/account", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|_vercel|.*\\..*).*)"],
};
