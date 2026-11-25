"use server";

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { headers } from "next/headers";
import { prisma } from "./prisma";

/**
 * Instance BetterAuth configurée avec l'adaptateur Prisma (PostgreSQL / Supabase).
 * - emailAndPassword : authentification classique e-mail / mot de passe (hash scrypt).
 * - session : cookie sécurisé, durée 7 jours, renouvellement toutes les 24h.
 * - nextCookies plugin : permet de définir les cookies depuis des Server Actions / RSC.
 */
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  plugins: [nextCookies()],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // passez à `true` en production pour confirmer l'e-mail
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 jours
    updateAge: 60 * 60 * 24, // 24h
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60, // 1h
    },
  },
  account: {
    accountLinking: {
      enabled: true,
      emailVerification: false,
    },
  },
  advanced: {
    defaultTrust: false,
  },
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.User;

/**
 * Récupère la session utilisateur côté serveur (RSC, Route Handler, Server Action).
 * Valide la session via les cookies (résultat sécurisé, pas seulement l'existence du cookie).
 */
export const getSession = async () => {
  return auth.api.getSession({ headers: await headers() });
};
