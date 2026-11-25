import Link from "next/link";
import { getSession } from "@/lib/auth";
import { SignInButton } from "@/components/auth/signin-button";
import { SignUpButton } from "@/components/auth/signup-button";
import { SignOutButton } from "@/components/auth/signout-button";

/**
 * Barre de navigation atomique et réutilisable.
 * Affiche les boutons Connexion / Inscription si l'utilisateur est anonyme,
 * et le bouton Mon compte + Déconnexion s'il est authentifié.
 */
export default async function Navbar() {
  const session = await getSession();

  return (
    <nav className="sticky top-0 z-50 border-b border-background/50 bg-background/80 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-playfair font-bold text-xl text-primary">
            COGI
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link
            href="/"
            className="text-foreground hover:text-primary transition-colors"
          >
            Accueil
          </Link>
          {session ? (
            <Link
              href="/account"
              className="text-primary font-medium"
              aria-current="page"
            >
              Mon compte
            </Link>
          ) : (
            <Link
              href="/auth/signin"
              className="text-foreground hover:text-primary transition-colors"
            >
              Connexion
            </Link>
          )}
        </div>

        <div className="flex items-center gap-3">
          {session ? (
            <>
              <Link
                href="/account"
                className="text-sm font-medium text-foreground hover:text-primary"
              >
                Mon compte
              </Link>
              <SignOutButton redirectTo="/auth/signin" />
            </>
          ) : (
            <>
              <SignInButton variant="outline" size="sm" />
              <SignUpButton size="sm" />
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
