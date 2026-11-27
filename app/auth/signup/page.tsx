import { redirect } from "next/navigation";

/**
 * Page d'inscription redirigée vers Clerk.
 * better-auth a été retiré du projet ; Clerk gère l'authentification.
 */
export default function SignUpPage() {
  redirect("/auth/sign-up");
}
