"use client";
import { Space_Grotesk, Michroma } from "next/font/google";
import Image from "next/image";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["600", "700"], display: "swap" });
const michroma = Michroma({ subsets: ["latin"], weight: "400", display: "swap" });

export default function Portada() {
  return (
    <main>
      <section
        className="relative min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/doctorfondo.jpg')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 mt-20" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-40 pb-24 md:pt-48 grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          {/* Columna izquierda: texto principal */}
          <div className="space-y-6 md:pr-8">
              <p className="text-sm font-semibold text-cyan-700">Plataforma para profesionales de la salud</p>
              <h1 className={`${spaceGrotesk.className} text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight`}>Digitaliza tu consulta, cuida a más pacientes</h1>
              <p className="text-base md:text-lg text-slate-800 font-medium max-w-2xl leading-relaxed">Agenda, expedientes y telemedicina en una sola plataforma diseñada para agilizar tu día a día y mantener la confidencialidad de tus pacientes.</p>

             <div className="flex flex-wrap gap-4 mt-4">
              <a href="#" className="inline-block px-6 py-3 bg-cyan-600 text-white rounded-lg shadow hover:bg-cyan-700 transition font-semibold text-base">Comenzar gratis</a>
              <a href="#" className="inline-block px-6 py-3 border border-slate-200 text-slate-900 rounded-lg hover:bg-slate-50 transition font-semibold text-base">Solicitar demo</a>
             </div>


            {/* Logo para móviles (visible solo en <md), con texto junto al logo */}
            <div className="mt-8 flex justify-center md:hidden">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-4 shadow-lg overflow-hidden">
                <div className="flex items-center gap-3">
                  {/* texto responsive en móvil */}
                  <span className={`${michroma.className} text-3xl sm:text-4xl text-cyan-600 font-extrabold tracking-tight`}>Medify</span>
                  {/* logo responsive: width control vía clases Tailwind */}
                  <Image src="/imagelogo.png" alt="Medify" width={320} height={120} className="object-contain w-36 sm:w-44 md:w-48 h-auto" />
                </div>
              </div>
            </div>
           </div>

            {/* Columna derecha: logo con fondo translúcido que cubre las letras (visible en md+) */}
            <div className="hidden md:flex items-center justify-end">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 lg:p-8 shadow-xl overflow-hidden">
                <div className="flex items-center gap-4 lg:gap-6">
                  {/* texto responsive en escritorio */}
                  <span className={`${michroma.className} text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-cyan-600 font-extrabold tracking-tight`}>Medify</span>
                  {/* logo responsive: controlar anchura con clases */}
                  <Image src="/imagelogo.png" alt="Medify" width={360} height={140} className="object-contain w-36 md:w-44 lg:w-56 xl:w-64 h-auto" />
                </div>
              </div>
            </div>
         </div>
       </section>
     </main>
   );
 }
