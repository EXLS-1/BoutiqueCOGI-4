"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/components/ui/cn";

export interface SignInButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Bouton atomique de connexion. Redirige vers la page de connexion par défaut.
 * Utilisable dans une navbar, un footer ou une page d'accueil.
 */
export function SignInButton({
  href = "/auth/signin",
  className,
  children,
  ...props
}: SignInButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (href) router.push(href);
  };

  return (
    <Button
      type="button"
      onClick={handleClick}
      className={cn("w-auto", className)}
      {...props}
    >
      {children ?? "Se connecter"}
    </Button>
  );
}
