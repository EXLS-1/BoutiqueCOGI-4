import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

/**
 * URL de l'API cible derrière le proxy.
 * Doit être définie dans les variables d'environnement côté serveur :
 *   API_BASE_URL=https://api.votredomaine.com
 */
const API_BASE_URL = process.env.API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error(
    "[api/proxy] La variable d'environnement API_BASE_URL est requise. " +
      "Ajoutez-la à votre fichier .env (ex: API_BASE_URL=https://api.votredomaine.com).",
  );
}

/**
 * En-têtes à ne jamais retransmettre (hop-by-hop / spécifiques à la requête entrante).
 */
const HOP_BY_HOP_HEADERS = [
  "host",
  "connection",
  "keep-alive",
  "transfer-encoding",
  "upgrade",
  "proxy-authorization",
  "proxy-connection",
  "te",
  "trailers",
  "content-length",
];

/**
 * Résout `params` de manière compatible aussi bien avec Next.js < 15
 * (objet synchrone) qu'avec Next.js >= 15 (promesse).
 */
async function resolveParams(
  params: { path: string[] } | Promise<{ path: string[] }>,
): Promise<{ path: string[] }> {
  return (await params) as { path: string[] };
}

/**
 * Transfère la requête entrante vers l'API cible et renvoie sa réponse
 * telle quelle (statut, en-têtes, corps streamé).
 */
async function proxyRequest(
  request: NextRequest,
  path: string[],
): Promise<Response> {
  // --- Authentification Clerk (remplace l'ancien middleware) ---
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  // --- Construction de l'URL cible ---
  const base = API_BASE_URL!.replace(/\/+$/, "");
  const targetUrl = new URL(`${base}/${path.join("/")}`);
  targetUrl.search = request.nextUrl.search; // forward des query params

  // --- En-têtes de la requête vers le backend ---
  const headers = new Headers(request.headers);

  for (const header of HOP_BY_HOP_HEADERS) {
    headers.delete(header);
  }

  // Contexte utile pour l'API cible (identité utilisateur authentifiée)
  headers.set("x-user-id", userId);
  headers.set("x-forwarded-host", request.nextUrl.host);
  headers.set(
    "x-forwarded-proto",
    request.nextUrl.protocol.replace(/:$/, ""),
  );
  headers.set("x-forwarded-for", request.headers.get("x-forwarded-for") ?? "");

  const init: RequestInit = {
    method: request.method,
    headers,
  };

  // Forward du corps pour les méthodes qui en ont un (Node.js: duplex requis)
  if (request.method && !["GET", "HEAD"].includes(request.method)) {
    (init as RequestInit & { duplex?: string }).duplex = "half";
    init.body = request.body;
  }

  // --- Appel vers l'API cible ---
  const response = await fetch(targetUrl.toString(), init);

  // --- Renvoi de la réponse brute au client ---
  const responseHeaders = new Headers(response.headers);

  for (const header of HOP_BY_HOP_HEADERS) {
    responseHeaders.delete(header);
  }

  return new NextResponse(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: responseHeaders,
  });
}

/**
 * Point d'entrée unique du proxy. Toutes les méthodes HTTP sont supportées.
 *
 * Exemples d'appels côté client :
 *   GET    /api/proxy/produits
 *   POST   /api/proxy/commandes
 *   PUT    /api/proxy/utilisateurs/123
 *   DELETE /api/proxy/articles/456
 *
 * Le path situé après /api/proxy/ est transmis tel quel à l'API cible.
 */
const handler = async (
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
): Promise<Response> => {
  const resolvedParams = await resolveParams(params);
  return proxyRequest(request, resolvedParams.path);
};

export const GET = handler;
export const HEAD = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
export const OPTIONS = handler;