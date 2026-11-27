// app/layout.tsx
import { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import React, { Suspense } from "react";
import Navbar from "@/components/navbar/navbar";


export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: "Boutique COGI",
  description: "Vente en ligne - Habillement et divers",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  

  return (
    <ClerkProvider>
      <html lang="fr" data-scroll-behavior="smooth" suppressHydrationWarning>
        <body className="font-sans">
          <Suspense fallback={<div className="min-h-screen pt-28">Chargement...</div>}>
            { /* pt-28 correspond à la hauteur de navbar (14) + navbar-secondary (14) */}
            <Navbar />
            <main className="min-h-screen pt-28">
              {children}
              {/* Chargez vos scripts ici de manière optimisée */}
            </main>
          </Suspense>
        </body>
      </html>
    </ClerkProvider>
  );
}
