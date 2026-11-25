"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/components/ui/cn";

export interface SignUpButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Bouton atomique d'inscription. Redirige vers la page d'inscription par défaut.
 * Utilisable dans une navbar, un footer ou une page d'accueil.
 */
export function SignUpButton({
  href = "/auth/signup",
  className,
  children,
  ...props
}: SignUpButtonProps) {
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
      {children ?? "S'inscrire"}
    </Button>
  );
}
