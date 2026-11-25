import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utilitaire atomique pour fusionner les classes Tailwind CSS.
 * Réutilisable dans l'ensemble du design system (shadcn/ui compatible).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
