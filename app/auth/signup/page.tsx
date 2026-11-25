import Link from "next/link";
import { SignUpForm } from "@/components/auth/signup-form";
import { SignInButton } from "@/components/auth/signin-button";

export const metadata = {
  title: "Inscription - Boutique COGI",
  description: "Créez votre compte Boutique COGI.",
};

/**
 * Page d'inscription (minimaliste, sécurisée).
 * Délègue la saisie au composant atomique SignUpForm.
 */
export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="mx-auto mb-8 flex max-w-[64px] items-center justify-center rounded-full bg-primary p-2">
          <span className="text-white font-playfair font-bold text-lg">
            COGI
          </span>
        </div>

        <h2 className="text-2xl font-playfair font-bold mb-2">Créer un compte</h2>
        <p className="text-muted-foreground mb-8">
          Rejoignez Boutique COGI en quelques secondes.
        </p>

        <SignUpForm
          onSuccess={() => {}}
          onError={() => {}}
        />

        <p className="mt-8 text-center text-sm">
          Vous avez déjà un compte ?{" "}
          <Link
            href="/auth/signin"
            className="text-primary font-medium underline underline-offset-4 hover:underline"
          >
            Connectez-vous
          </Link>
        </p>
      </div>
    </div>
  );
}
