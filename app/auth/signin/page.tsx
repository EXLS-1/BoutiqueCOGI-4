import Link from "next/link";
import { SignInForm } from "@/components/auth/signin-form";
import { SignUpButton } from "@/components/auth/signup-button";

export const metadata = {
  title: "Connexion - Boutique COGI",
  description: "Connectez-vous à votre compte Boutique COGI.",
};

/**
 * Page de connexion (minimaliste, sécurisée).
 * Délègue la saisie au composant atomique SignInForm.
 */
export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="mx-auto mb-8 flex max-w-[64px] items-center justify-center rounded-full bg-primary p-2">
          <span className="text-white font-playfair font-bold text-lg">
            COGI
          </span>
        </div>

        <h2 className="text-2xl font-playfair font-bold mb-2">Se connecter</h2>
        <p className="text-muted-foreground mb-8">
          Bienvenue. Saisissez vos identifiants ci-dessous.
        </p>

        <SignInForm
          onSuccess={() => {}}
          onError={() => {}}
        />

        <p className="mt-8 text-center text-sm">
          Pas encore de compte ?{" "}
          <Link
            href="/auth/signup"
            className="text-primary font-medium underline underline-offset-4 hover:underline"
          >
            Créez un compte
          </Link>
        </p>
      </div>
    </div>
  );
}
