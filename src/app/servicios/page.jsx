"use client";
import { Michroma, Space_Grotesk } from "next/font/google";
import CardSwap, { Card } from '../../componentes/CardSwap';
import FadeInSection from '../../componentes/FadeInSection';
import Typeanimation from "@/components/ui/typeanimation";

const michroma = Michroma({ subsets: ["latin"], weight: "400", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "600", "700"], display: "swap" });

export default function ServiciosPage() {
  return (
    <div className="min-h-screen w-full relative bg-white text-neutral-900">

      {/* VIDEO DE FONDO - COMENTADO PARA USO FUTURO */}
      {/* 
      <video 
        autoPlay 
        muted 
        loop 
        playsInline 
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videoondas.mp4" type="video/mp4" />
      </video>
      
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/75 to-black/90" />
      
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #3b82f6 1px, transparent 1px),
                      radial-gradient(circle at 75% 75%, #3b82f6 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }} />
      </div>
      */}
      
      {/* Contenedor principal */}
      <div className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-6 py-8 md:py-12">
      
      {/* Fondo decorativo removido para fondo blanco profesional */}

      {/* Main Section - Texto y Tarjetas lado a lado */}
      <FadeInSection delay={0}>
      <div className="px-12 lg:px-24 mb-18 py-12 md:py-50">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* Columna Izquierda - Texto */}
          <div className="flex flex-col items-center">
            <h2 className={`text-base/20 font-semibold text-[#0c3690] mb-4 ${spaceGrotesk.className}`}>Gestión Médica Innovadora</h2>
            <h1 className={`text-center lg:text-5xl xl:text-6xl font-bold tracking-tight text-neutral-900 mb-6 leading-tight ${spaceGrotesk.className}`}>
            <strong className="bg-gradient-to-r from-blue-400 to-teal-500 bg-clip-text text-transparent">La forma de gestionar tu consulta ha cambiado.</strong>
            </h1>
            <p className="text-justify lg:text-xl text-neutral-700 leading-relaxed mb-8">
              Descubre nuestras soluciones tecnológicas especializadas para el sector de la salud. 
              Desde gestión básica hasta sistemas de reservas en la nube.
            </p>
          </div>

          {/* Columna Derecha - CardSwap */}
          <div className="flex items-center justify-center relative" style={{ height: '350px' }}>
        <CardSwap 
          width={670}
          height={500}
          cardDistance={65}
          verticalDistance={80}
          delay={5000}
          pauseOnHover={true}
          skewAmount={8}
          easing="bounce"
        >
          <Card customClass="rounded-3xl overflow-hidden border shadow-2xl bg-white/15 backdrop-blur-lg" style={{
            borderColor: "rgba(42, 93, 119, 0.6)"
          }}>
            <div className="p-10 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="inline-block px-4 py-2 bg-[#e6f3ff] rounded-full text-sm font-semibold text-[#4f7ee4] uppercase tracking-wide">
                    <strong className="bg-gradient-to-r from-blue-400 to-teal-500 bg-clip-text text-transparent">AGENDA EN LINEA</strong>
                  </span>
                  <svg className="w-12 h-12 text-[#2563eb]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="bg-[#0a1b30]/500 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <h3 className={`text-4xl font-bold text-neutral-900 mb-4 leading-tight ${spaceGrotesk.className}`}>
                    <strong className="bg-gradient-to-r from-blue-400 to-teal-500 bg-clip-text text-transparent">SISTEMA DE GESTIÓN DE PACIENTES</strong>
                  </h3>
                  <ul className="text-white/95 text-lg leading-relaxed mb-6 space-y-2 list-disc list-inside">
                    <li className="text-white/700">Gestiona tu consulta de forma profesional.</li>
                    <li className="text-white/700">Historias clínicas digitales.</li>
                    <li className="text-white/700">Agenda inteligente.</li>
                    <li className="text-white/700">Respaldos automáticos.</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>

          <Card customClass="rounded-3xl overflow-hidden border shadow-2xl bg-white/15 backdrop-blur-lg" style={{
            borderColor: "rgba(42, 93, 119, 0.6)"
          }}>
            <div className="p-10 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="inline-block px-4 py-2 bg-[#e6f3ff] rounded-full text-sm font-semibold text-[#2563eb] uppercase tracking-wide">
                    <strong className="bg-gradient-to-r from-blue-400 to-teal-500 bg-clip-text text-transparent">CONECCIÓN A CONSULTA REMOTA</strong>
                  </span>
                  <svg className="w-12 h-12 text-[#2563eb]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="bg-[#0a1b30]/430 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <h3 className={`text-4xl font-bold text-neutral-900 mb-4 leading-tight ${spaceGrotesk.className}`}>
                    <strong className="bg-gradient-to-r from-blue-400 to-teal-500 bg-clip-text text-transparent">PLATAFORMA TELEMEDICINA</strong>
                  </h3>
                  <ul className="text-white/95 text-lg leading-relaxed mb-6 space-y-2 list-disc list-inside">
                    <li className="text-white/700">Consultas al ancance con faclilidad.</li>
                    <li className="text-white/700">Historias clínicas digitales.</li>
                    <li className="text-white/700">Agenda inteligente.</li>
                    <li className="text-white/700">Respaldos automáticos.</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>

          <Card customClass="rounded-3xl overflow-hidden border shadow-2xl bg-white/15 backdrop-blur-lg" style={{
            borderColor: "rgba(42, 93, 119, 0.6)"
          }}>
            <div className="p-10 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="inline-block px-4 py-2 bg-[#e6f3ff] rounded-full text-sm font-semibold text-[#2563eb] uppercase tracking-wide">
                    <strong className="bg-gradient-to-r from-blue-400 to-teal-500 bg-clip-text text-transparent">GESTIÓN TOTAL</strong>
                  </span>
                  <svg className="w-12 h-12 text-[#2563eb]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="bg-[#0a1b30]/430 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <h3 className={`text-4xl font-bold text-neutral-900 mb-4 leading-tight ${spaceGrotesk.className}`}>
                    <strong className="bg-gradient-to-r from-blue-400 to-teal-500 bg-clip-text text-transparent">GESTIÓN DE AGENDA AVANZADA</strong>
                  </h3>
                  <ul className="text-white/95 text-lg leading-relaxed mb-6 space-y-2 list-disc list-inside">
                    <li className="text-white/700">Sitema de consultas completo.</li>
                    <li className="text-white/700">Gestión de reservas.</li>
                    <li className="text-white/700">Ingreso de pacientes.</li>
                    <li className="text-white/700">Analítica avanzada en tiempo real.</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </CardSwap>
          </div>
        </div>
      </div> {/* Cierre Main Section rounded */}
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
    </div>

    
  );
}
