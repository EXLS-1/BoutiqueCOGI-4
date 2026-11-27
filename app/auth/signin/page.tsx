import { redirect } from "next/navigation";

/**
 * Page de connexion redirigée vers Clerk.
 * better-auth a été retiré du projet ; Clerk gère l'authentification.
 */
export default function SignInPage() {
  redirect("/auth/sign-in");
}
