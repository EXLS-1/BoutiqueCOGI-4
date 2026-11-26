"use client";

import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
  SignUpButton,
  useAuth,
} from "@clerk/nextjs";

/**
 * Barre de navigation atomique et réutilisable avec Clerk.
 * Affiche les boutons Connexion / Inscription si l'utilisateur est anonyme,
 * et le lien Mon compte + bouton utilisateur s'il est authentifié.
 */
export default function Navbar() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return null;
  }

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
        </div>

        <div className="flex items-center gap-3">
          <SignedIn>
            <Link
              href="/account"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Mon compte
            </Link>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  dropdownMenu: "border border-background/50 bg-background",
                  dropdownMenuItem:
                    "text-sm text-foreground hover:bg-accent hover:text-accent-foreground",
                  userButton:
                    "flex h-8 w-8 items-center justify-center rounded-full",
                  userButtonAvatar: "h-8 w-8 rounded-full",
                },
              }}
            />
          </SignedIn>
          <SignedOut>
            <SignInButton
              mode="redirect"
              href="/auth/sign-in"
              appearance={{
                elements: {
                  rootButton:
                    "flex h-9 w-auto items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                },
              }}
            />
            <SignUpButton
              mode="redirect"
              href="/auth/sign-up"
              appearance={{
                elements: {
                  rootButton:
                    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90",
                },
              }}
            />
          </SignedOut>
        </div>
      </div>
    </nav>
  );
}
