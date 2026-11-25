"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/components/ui/cn";

export interface SignInFormProps {
  onSuccess?: (email: string) => void;
  onError?: (message: string) => void;
  className?: string;
}

export function SignInForm({
  onSuccess,
  onError,
  className,
}: SignInFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: `${window.location.origin}/account`,
      });

      if (error) {
        const msg = error.message || "Échec de la connexion.";
        setMessage({ type: "error", text: msg });
        onError?.(msg);
        return;
      }

      setMessage({ type: "success", text: "Connexion réussie." });
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
        <Label htmlFor="signin-email">E-mail</Label>
        <Input
          id="signin-email"
          type="email"
          placeholder="prenom@exemple.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="signin-password">Mot de passe</Label>
        <Input
          id="signin-password"
          type="password"
          placeholder="••••••••"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
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
        {loading ? "Connexion en cours..." : "Se connecter"}
      </Button>
    </form>
  );
}
