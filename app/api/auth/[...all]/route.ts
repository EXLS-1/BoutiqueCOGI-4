import { auth } from "@clerk/nextjs/server";

export const GET = async (request: Request) => {
  const { userId } = await auth();
  if (!userId) {
    return new Response(JSON.stringify({ error: "Non authentifié" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
  return new Response(JSON.stringify({ userId, authenticated: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

export const POST = GET;
