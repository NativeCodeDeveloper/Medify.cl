"use client";
import { Michroma, Space_Grotesk } from "next/font/google";
import CardSwap from '../../componentes/CardSwap';
import FadeInSection from '../../componentes/FadeInSection';
import Typeanimation from "@/components/ui/typeanimation";
import { Check, MoveRight, PhoneCall } from "lucide-react";

import Pricing1 from "../../components/ui/pricing1";


const michroma = Michroma({ subsets: ["latin"], weight: "400", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "600", "700"], display: "swap" });

export default function ServiciosPage() {
  return (
    <div className="min-h-screen w-full relative bg-white text-neutral-900">


      {/* Nueva estructura: texto arriba, integraciones abajo */}
      <FadeInSection delay={0}>
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className={`text-base/20 font-semibold text-[#0c3690] mb-4 ${spaceGrotesk.className}`}>Gestión Médica Innovadora</h2>
          <h1 className={`text-center lg:text-5xl xl:text-6xl font-bold tracking-tight text-neutral-900 mb-6 leading-tight ${spaceGrotesk.className}`}>
            <strong className="bg-gradient-to-r from-blue-400 to-teal-500 bg-clip-text text-transparent">La forma de gestionar tu consulta ha cambiado.</strong>
          </h1>
          <p className="text-justify lg:text-xl text-neutral-700 leading-relaxed mb-8">
            Descubre nuestras soluciones tecnológicas especializadas para el sector de la salud. 
            Desde gestión básica hasta sistemas de reservas en la nube.
          </p>
        </div>
        <div className="w-full flex flex-col items-center justify-center">
          <Pricing1/>
        </div>
      </FadeInSection>


      {/* Call to Action Section */}
      <FadeInSection delay={0.2}>
      <div className="max-w-4xl mx-auto text-center mt-24 mb-12 px-6 lg:px-12 py-12 md:py-16">
        <h3 className={`text-pretty text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl lg:text-balance mb-6 ${spaceGrotesk.className}`}>
          ¿Necesitas una solución
        </h3>
        <Typeanimation
          words={[" personalizada?", " profesional?", " innovadora?", " especializada?"]}
          typingSpeed="normal"
          deletingSpeed="fast"
          gradientFrom="blue-400"
          gradientTo="teal-500"
          pauseDuration={3000}
          className={`text-4xl sm:text-5xl font-bold tracking-tight ${spaceGrotesk.className}`}
        />
        <p className="mx-auto mt-8 max-w-2xl text-lg text-neutral-900/90 leading-relaxed">
          Nuestro equipo de expertos puede desarrollar una solución médica específicamente diseñada para las necesidades que requiera el cliente.
        </p>
      </div>
      </FadeInSection>

      
      
      </div>
  );
}
