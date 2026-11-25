"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "better-auth/react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { SignOut } from "lucide-react";
import { cn } from "@/components/ui/cn";

export interface SignOutButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  redirectTo?: string;
  className?: string;
  label?: string;
}

/**
 * Bouton de déconnexion atomique.
 * Rendu uniquement si l'utilisateur est authentifié (via useSession).
 * Appelle authClient.signOut puis redirige.
 */
export function SignOutButton({
  redirectTo = "/",
  className,
  label = "Déconnexion",
  ...props
}: SignOutButtonProps) {
  const router = useRouter();
  const session = useSession();

  const handleSignOut = async () => {
    try {
      await authClient.signOut({
        callbackURL: `${window.location.origin}${redirectTo}`,
      });
    } catch {
      // Échec silencieux : on redirige quand même pour nettoyer l'état client.
    } finally {
      router.push(redirectTo);
      router.refresh();
    }
  };

  if (!session.data) return null;

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={handleSignOut}
      className={cn(className)}
      {...props}
    >
      <SignOut className="mr-2 h-4 w-4" />
      {label}
    </Button>
  );
}
