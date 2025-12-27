"use client";
import { Space_Grotesk, Michroma } from "next/font/google";
import Image from "next/image";
import { Space_Grotesk, Montserrat } from "next/font/google";
import { Space_Grotesk, Inter } from "next/font/google";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["600", "700"], display: "swap" });
const michroma = Michroma({ subsets: ["latin"], weight: "400", display: "swap" });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["700"], display: "swap" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "700"], display: "swap" });
  
export default function Portada() {
  return (
    <main>
      <section
        className="relative min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/doctorfondo.jpg')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 mt-16 sm:mt-20" />

        <div className="relative z-12 max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 md:pt-40 pb-16 sm:pb-20 md:pb-24 grid grid-cols-1 md:grid-cols-2 items-center gap-6 sm:gap-8">
          {/* Columna izquierda: texto principal */}
          <div className="space-y-4 sm:space-y-6 md:space-y-8 flex flex-col items-center justify-center text-center">
            <p className="text-center text-xs sm:text-sm font-semibold text-cyan-700 uppercase tracking-wide">Plataforma para profesionales de la salud</p>
            
            <h1 className={`${inter.className} text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight 
            font-regular leading-tight text-center mb-4 sm:mb-6 md:mb-8 mt-6 sm:mt-8 md:mt-12 breack-words`}>
              <strong className="bg-gradient-to-r from-blue-400 to-teal-500 bg-clip-text text-transparent">
                GESTIÓN CLÍNICA EN LA NUBE
              </strong>
            </h1>
            
            {/* Contenedor con diseño profesional */}
            <div className="bg-white/40 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl border border-slate-200/50 mt-6 sm:mt-6 md:mt-8 flex flex-col items-center text-center">
              <p className="text-center text-base sm:text-lg text-slate-700 leading-relaxed mb-4 sm:mb-6">
                Optimiza la gestión de tu consulta médica con nuestra plataforma integral diseñada para profesionales de la salud.
              </p>
              {/* Lista de características */}
                <ul className="space-y-3 sm:space-y-4 text-slate-800 flex flex-col items-start text-left w-full max-w-xl mx-auto">
                <li className="flex items-center gap-2 sm:gap-3">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm sm:text-base font-medium">Sistema de gestión clínica en la nube</span>
                </li>
                <li className="flex items-center gap-2 sm:gap-3">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm sm:text-base font-medium">Ficha clínica digital con historial completo</span>
                </li>
                <li className="flex items-center gap-2 sm:gap-3">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm sm:text-base font-medium">Agenda inteligente y recordatorios automáticos</span>
                </li>
                <li className="flex items-center gap-2 sm:gap-3">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm sm:text-base font-medium">Posicionamiento web para tu consulta médica</span>
                </li>
                <li className="flex items-center gap-2 sm:gap-3">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm sm:text-base font-medium">Pagos y cobros automatizados</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-wrap gap-3 sm:gap-4 pt-2 items-center justify-center mt-6 sm:mt-6 md:mt-8">
              <a href="/contacto" className="inline-block px-6 sm:px-8 py-3 sm:py-3.5 bg-cyan-600 text-white 
              rounded-lg shadow-lg hover:bg-cyan-700 hover:shadow-xl transition-all font-semibold text-sm sm:text-base">
                Comienza ahora
              </a>
            </div>
          </div>

          {/* Columna derecha: logo grande visible en TODOS los dispositivos */}
          <div className="flex items-center justify-center md:justify-end mt-6 md:mt-2">
            <Image 
              src="/pngmedify.png" 
              alt="Medify" 
              width={1200} 
              height={1200} 
              className="object-contain w-64 sm:w-80 md:w-96 lg:w-[32rem] xl:w-[36rem] 2xl:w-[40rem] 
              h-auto drop-shadow-[0_0_30px_rgba(8,145,178,0.5)] brightness-105 
              hover:drop-shadow-[0_0_50px_rgba(8,145,178,0.7)] hover:brightness-110 transition-all duration-300" 
              priority 
            />
          </div>
        </div>
      </section>
    </main>
  );
}
