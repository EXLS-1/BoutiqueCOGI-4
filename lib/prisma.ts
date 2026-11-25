import { PrismaClient } from "@prisma/client";

/**
 * Singleton Prisma Client.
 * Évite de créer plusieurs instances du client en développement (hot-reload Next.js).
 * Connecté à la base de données Supabase PostgreSQL via DATABASE_URL.
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
