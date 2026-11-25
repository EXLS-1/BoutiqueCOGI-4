"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/components/ui/cn";

export interface SignUpFormProps {
  onSuccess?: (email: string) => void;
  onError?: (message: string) => void;
  className?: string;
}

export function SignUpForm({
  onSuccess,
  onError,
  className,
}: SignUpFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (password !== confirmPassword) {
      const msg = "Les mots de passe ne correspondent pas.";
      setMessage({ type: "error", text: msg });
      onError?.(msg);
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      const msg = "Le mot de passe doit contenir au moins 8 caractères.";
      setMessage({ type: "error", text: msg });
      onError?.(msg);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        callbackURL: `${window.location.origin}/auth/signin?registered=1`,
      });

      if (error) {
        const msg = error.message || "Échec de l'inscription.";
        setMessage({ type: "error", text: msg });
        onError?.(msg);
        return;
      }

      setMessage({
        type: "success",
        text: "Compte créé avec succès. Vous pouvez vous connecter.",
      });
      onSuccess?.(email);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erreur inattendue.";
      setMessage({ type: "error", text: msg });
      onError?.(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("space-y-4 w-full max-w-md", className)}
    >
      <div className="space-y-2">
        <Label htmlFor="signup-name">Nom complet</Label>
        <Input
          id="signup-name"
          type="text"
          placeholder="Jean Dupont"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="signup-email">E-mail</Label>
        <Input
          id="signup-email"
          type="email"
          placeholder="prenom@exemple.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="signup-password">Mot de passe</Label>
        <Input
          id="signup-password"
          type="password"
          placeholder="••••••••"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="signup-confirm-password">Confirmer le mot de passe</Label>
        <Input
          id="signup-confirm-password"
          type="password"
          placeholder="••••••••"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete="new-password"
        />
      </div>

      {message && (
        <div
          role="alert"
          className={cn(
            "rounded-md border px-3 py-2 text-sm",
            message.type === "error"
              ? "border-destructive/50 bg-destructive text-destructive"
              : "border-success/50 bg-success text-success",
          )}
        >
          {message.text}
        </div>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? "Création du compte..." : "S'inscrire"}
      </Button>
    </form>
  );
}
