import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { SignOutButton } from "@/components/auth/signout-button";

export const metadata = {
  title: "Mon compte - Boutique COGI",
  description: "Gérez votre profil Boutique COGI.",
};

/**
 * Page de profil protégée.
 * Redirige vers /auth/signin si aucune session valide.
 */
export default async function AccountPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8"
        >
          ← Retour à l'accueil
        </Link>

        <div className="rounded-xl border border-border p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white font-semibold">
              {session.user.name?.[0]?.toUpperCase() || "U"}
            </div>
            <div>
              <h2 className="text-xl font-playfair font-bold">
                {session.user.name || "Utilisateur"}
              </h2>
              <p className="text-muted-foreground text-sm">
                {session.user.email || "—"}
              </p>
            </div>
          </div>

          <div className="grid gap-4 text-sm">
            <div className="flex items-center justify-between px-4 py-2 rounded-lg border border-border/50">
              <span className="text-muted-foreground">E-mail</span>
              <span className="font-medium">{session.user.email}</span>
            </div>
            <div className="flex items-center justify-between px-4 py-2 rounded-lg border border-border/50">
              <span className="text-muted-foreground">Rôle</span>
              <span className="font-medium text-primary">
                {session.user.role || "user"}
              </span>
            </div>
            <div className="flex items-center justify-between px-4 py-2 rounded-lg border border-border/50">
              <span className="text-muted-foreground">Statut</span>
              <span className="font-medium text-success">Actif</span>
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <SignOutButton label="Déconnexion" redirectTo="/auth/signin" />
          </div>
        </div>
      </div>
    </div>
  );
}
