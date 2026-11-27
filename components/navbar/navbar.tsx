// components/navbar/navbar.tsx

"use client";

import Link from "next/link";
import {
  Show,
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
  const { isLoaded } = useAuth();

  if (!isLoaded) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 h-14 border-b border-cyan-200 bg-cyan-100 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-playfair font-bold text-3xl text-red-500 hover:text-cyan-400 transition-colors">
            COGI
          </span>
        </Link>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-3 h-14 underlined">
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-cyan-400">
            <Link
              href="/"
              className="hover:text-primary transition-colors"
            >
              Recherche
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-cyan-400">
            <Link
              href="/"
              className="hover:text-primary transition-colors"
            >
              Devise
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-cyan-400">
            <Link
              href="/"
              className="hover:text-primary transition-colors"
            >
              Favori
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-cyan-400">
            <Link
              href="/"
              className="hover:text-primary transition-colors"
            >
              Panier
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-3 text-cyan-400">
          <Show when="signed-in">
            <Link
              href="/account"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Mon compte
            </Link>
            <UserButton
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
          </Show>
          <Show when="signed-out">
            <SignInButton mode="redirect" />
            <SignUpButton mode="redirect" />
          </Show>
        </div>
      </div>
    </nav>
  );
}
