"use client";
import { Michroma, Space_Grotesk } from "next/font/google";
import CardSwap from '../../componentes/CardSwap';
import FadeInSection from '../../componentes/FadeInSection';
import Typeanimation from "@/components/ui/typeanimation";
import { Check, MoveRight, PhoneCall } from "lucide-react";
import Image from "next/image";
import Pricing1 from "../../components/ui/pricing1";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";


const michroma = Michroma({ subsets: ["latin"], weight: "400", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "600", "700"], display: "swap" });

export default function ServiciosPage() {
  return (
    <div className="min-h-screen w-full relative bg-white text-neutral-900">

      {/* Scroll Animation Section */}
      <div className="w-full">
        <ContainerScroll
          titleComponent={
            <div className="max-w-3xl mx-auto text-center">
              <h2 className={`text-base/20 font-semibold text-[#0c3690] mb-4 ${spaceGrotesk.className}`}>
                Gestión Médica Innovadora
              </h2>
              <h1 className={`text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 mb-6 leading-tight ${spaceGrotesk.className}`}>
                <strong className="bg-gradient-to-r from-blue-400 to-teal-500 bg-clip-text text-transparent">
                  La forma de gestionar tu consulta ha cambiado.
                </strong>
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-neutral-700 leading-relaxed px-6 sm:px-8 md:px-12 lg:px-0 max-w-2xl mx-auto">
                Descubre nuestras soluciones tecnológicas especializadas para el sector de la salud. 
                Desde gestión básica hasta sistemas de reservas en la nube.
              </p>
            </div>
          }
        >
          <Image
            src="/medifyipadgrafico.jpg"
            alt="Plataforma de gestión médica Medify"
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-cover h-full object-left-top"
            draggable={false}
          />
        </ContainerScroll>
      </div>

      {/* Nueva estructura: texto arriba, integraciones abajo */}
      <FadeInSection delay={0}>
        <div className="w-full flex flex-col items-center justify-center -mt-32 md:-mt-40">
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
