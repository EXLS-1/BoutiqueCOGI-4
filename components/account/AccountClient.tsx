"use client";

import { useAuth, useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";

/**
 * Composant client de la page de profil protégé.
 * Redirige vers /auth/sign-in si aucune session valide.
 */
export default function AccountClient() {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();

  if (!isLoaded) {
    return <div className="min-h-screen flex items-center justify-center">Chargement…</div>;
  }

  if (!isSignedIn) {
    redirect("/auth/sign-in");
    return null;
  }

  return (
    <section className="flex min-h-screen items-center justify-center bg-background/50 px-4 py-12">
      <div className="max-w-md w-full space-y-6">
        <div className="flex items-center gap-2">
          <span className="font-playfair font-bold text-xl text-primary">COGI</span>
        </div>

        <div className="bg-background border border-background/50 p-8 rounded-lg shadow-sm space-y-4">
          <h2 className="text-2xl font-playfair font-bold">Mon compte</h2>
          <p className="text-sm text-muted-foreground">
            Bienvenue {user?.fullName ?? user?.primaryEmailAddress?.emailAddress ?? "Utilisateur"}.
          </p>
          <p className="text-sm text-muted-foreground">
            E-mail : {user?.primaryEmailAddress?.emailAddress}
          </p>
          <Link
            href="/"
            className="text-primary font-medium underline underline-offset-4 hover:underline"
          >
            Retour à l&apos;accueil
          </Link>
          <UserButton
            appearance={{
              elements: {
                userButton:
                  "flex w-full items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm font-medium",
                userButtonAvatar: "h-8 w-8 rounded-full",
              },
            }}
          />
        </div>
      </div>
    </section>
  );
}