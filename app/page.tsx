// app/page.tsx

import { Suspense } from "react";


export default async function Home() {

  return (

    <>

      <section className="py-16 bg-white min-h-75"> 
        {/* Ajout d'une hauteur minimale pour le loader */}
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-playfair font-bold uppercase mb-10 text-center">
            ARTICLES
          </h2>
          <Suspense fallback={<div className="text-center text-cyan-400 text-lg">Chargement des produits...</div>}>
          </Suspense>
        </div>
      </section>


      {/* Section Newsletter adaptée au design system */}
      <section className="bg-cyan-50 text-cyan-400 border-t border-cyan-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-playfair font-bold uppercase mb-6">
              NEWSLETTER
            </h2>

          </div>
        </div>
      </section>
      
    </>
  );
}
