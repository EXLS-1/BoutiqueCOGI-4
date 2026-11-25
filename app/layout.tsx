// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import React, { Suspense } from "react";
import localFont from "next/font/local";
import { headers } from "next/headers";

const inter = localFont({
  src: "../public/fonts/inter-latin-wght-normal.woff2",
  weight: "100 900", // police variable (axe wght)
  variable: "--font-sans",
  display: "swap",
});
const playfair = localFont({
  src: "../public/fonts/playfair-display-latin-wght-normal.woff2",
  weight: "400 900", // police variable (axe wght)
  variable: "--font-playfair",
  display: "swap",
});
const lato = localFont({
  src: [
    { path: "../public/fonts/lato-latin-300-normal.woff2", weight: "300" },
    { path: "../public/fonts/lato-latin-400-normal.woff2", weight: "400" },
    { path: "../public/fonts/lato-latin-700-normal.woff2", weight: "700" },
    { path: "../public/fonts/lato-latin-900-normal.woff2", weight: "900" },
  ],
  variable: "--font-lato",
  display: "swap",
});
const cormorant = localFont({
  src: "../public/fonts/cormorant-garamond-latin-wght-normal.woff2",
  weight: "300 700", // police variable (axe wght)
  variable: "--font-cormorant",
  display: "swap",
});

setRedisLogger(createRedisLogger(logger));

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: "Boutique COGI",
  description: "Boutique en ligne de mode élégante - Habits pour femmes, hommes et enfants",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Récupération de la session côté serveur pour éviter le flash du skeleton (FOUC)
  const authSession = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <html lang="fr" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className={`${inter.variable} ${
          
         
          {/* Injection directe de la session pour supprimer le délai d'hydratation */}
          

          
            { /* pt-28 correspond à la hauteur de navbar (14) + navbar-secondary (14) */}
            <main className="min-h-screen pt-28">
              {children}
              
              {/* Chargez vos scripts ici de manière optimisée */}

            </main>
        
      </body>
    </html>
  );
}
