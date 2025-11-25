"use client";
import { Space_Grotesk } from "next/font/google";
import Portada from "./portada/page";
import SobreNosotros from "./sobreNosotros/page";
import Servicios from "./servicios/page";
import Footer from "./Footer/page";
import Portafolio from "./portafolio/page";
import FadeInSection from "../componentes/FadeInSection";
import Image from "next/image";
import BotonBlanco from "@/componentes/BotonBlanco";
import Link from "next/link";
import { RadialOrbit } from "../componentes/RadialOrbit";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap" });

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-[#0f172a] relative">
      {/* Blue Radial Glow Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `radial-gradient(circle 600px at 50% 50%, rgba(59,130,246,0.3), transparent)`,
        }}
      />

      {/* Contenido */}
      <div className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12">
        <FadeInSection delay={0}>
          <div className="-mx-4 sm:-mx-6 md:-mx-8 lg:-mx-12">
            <Portada></Portada>
          </div>
        </FadeInSection>

        <FadeInSection delay={0} y={80}>
          <div className="-mx-6 sm:-mx-6 md:-mx-8 lg:-mx-20">
            <div className="relative grid grid-cols-1 md:grid-cols-5 items-center px-12 md:px-20 lg:px-14 py-30 md:py-32 gap-8">
              {/* Orbit animation left */}
              <div className="hidden md:flex md:col-span-2 justify-center items-center">
                    <RadialOrbit
                      orbitItems={[
                        { id: 1, name: "Paciente", src: "/medgenlog.jpg" },
                        { id: 2, name: "Agenda", src: "/psicol.jpg" },
                        { id: 3, name: "Historial", src: "/cardio.jpg" },
                        { id: 4, name: "Recetas", src: "/kines.jpg" },
                        { id: 5, name: "Pagos", src: "/pediatria.jpg" },
                        { id: 6, name: "Pagos", src: "/nutric.jpg" },
                        { id: 7, name: "Pagos", src: "/oftalm.jpg" },  
                      ]}
                      stageSize={340}
                      imageSize={80}
                      centerImage={{ src: "/logomedify.png", alt: "Medify" }}
                    />
              </div>
              {/* Texto principal right */}
              <div className="md:col-span-3">
                <h2 className={`text-3xl md:text-6xl font-extrabold text-white tracking-tight leading-snug ${spaceGrotesk.className}`}>¿Necesitas <strong className="bg-gradient-to-r from-blue-400 to-teal-500 bg-clip-text text-transparent">digitalizar</strong> tu práctica médica?</h2>
                <p className={`mt-8 text-justify md:text-3xl text-white/85 leading-relaxed max-w-4xl ${spaceGrotesk.className}`}>Moderniza tu consulta con tecnología médica especializada. Desde sistemas de gestión de pacientes hasta reservas en linea: todas nuestras soluciones están diseñadas para optimizar la atención médica, proteger datos sensibles y darte la mejor herramienta para llevar tu gestión médica al siguiente nivel.</p>
              </div>
            </div>
          </div>
        </FadeInSection>

        <FadeInSection delay={0.3}>
          <div className="-mx-4 sm:-mx-6 md:-mx-8 lg:-mx-12 mb-32">
            <Servicios></Servicios>
          </div>
        </FadeInSection>

        <FadeInSection delay={0.4}>
          <div className="my-32">
            <Portafolio></Portafolio>
          </div>
        </FadeInSection>

        <FadeInSection delay={0.5}>
          <SobreNosotros></SobreNosotros>
        </FadeInSection>

        {/* Bloque 3: Actualización continua - Fondo wallet 
      <div
  className="
    relative overflow-hidden
    bg-[url('/wallet.png')] bg-cover bg-center
    w-full
    ring-1 ring-white/10 rounded-4xl shadow-2xl
    my-32
  "
>
*/}

        {/*
  <div
    className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/35 to-transparent"
    aria-hidden="true"
  ></div>

  <div className="relative grid grid-cols-1 md:grid-cols-5 items-center px-6 md:px-10 lg:px-14 py-16 md:py-24">
    <div className="col-span-4">
      <h2 className="text-3xl md:text-6xl font-bold text-white tracking-tight leading-tight">
        Tu sistema médico <strong className="text-blue-300">se actualiza</strong> contigo
      </h2>
      <p className="mt-6 text-lg md:text-2xl text-white/90 max-w-3xl">
        No te dejamos solo después de la implementación. Nuestro compromiso es
        acompañarte constantemente, adaptando el sistema a los cambios en tu práctica médica,
        actualizaciones regulatorias y nuevas necesidades de atención al paciente.
      </p>

      <div className="mt-10 flex md:justify-end">
        <Link href={"/soporte"}>
          <BotonBlanco contenido={"Soporte Médico Especializado"} />
        </Link>
      </div>
    </div>
    <div className="hidden md:block"></div>
  </div>
</div>


      <div
  className="
    relative overflow-hidden
    bg-[url('/morado1.png')] bg-cover bg-center
    w-full
    ring-1 ring-white/10 rounded-4xl shadow-2xl
    px-6 md:px-10 lg:px-14 py-24 md:py-32
  "
>
*/}



        <div></div>
        {/* Botón flotante WhatsApp profesional y en contexto */}
        <a
          href="https://wa.me/56977889900?text=Hola,%20quiero%20información%20sobre%20Medify"
          target="_blank"
          rel="noopener noreferrer"
          className={`wsp-float-btn ${spaceGrotesk.className}`}
          aria-label="Contáctanos"
        >
          <span className="wsp-icon-wrap">
            <svg className="wsp-icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
              <path fill="#25D366" d="M20.52 3.48A11.94 11.94 0 0 0 12 .06 11.94 11.94 0 0 0 3.48 3.48C.51 6.46-.52 10.73.6 14.64L.03 23.97l9.33-.57a11.94 11.94 0 0 0 4.91 1.02h.01c3.19 0 6.2-1.24 8.46-3.5A11.94 11.94 0 0 0 24 12a11.94 11.94 0 0 0-3.48-8.52ZM12 21.5h-.01a9.9 9.9 0 0 1-4.45-1.05l-.32-.15-5.53.34.35-5.5-.15-.33A9.9 9.9 0 0 1 2.5 12 9.5 9.5 0 1 1 12 21.5Zm5.21-7.16c-.29-.15-1.7-.84-1.96-.94-.26-.1-.45-.15-.64.15-.19.29-.74.94-.91 1.13-.17.19-.34.21-.63.08-.29-.15-1.22-.45-2.33-1.45-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.43-.51.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.08-.15-.64-1.55-.88-2.12-.23-.56-.47-.48-.64-.49l-.55-.01c-.19 0-.5.07-.77.36-.26.29-1.01.98-1.01 2.39 0 1.41 1.03 2.77 1.18 2.96.15.19 2.03 3.1 4.92 4.35.69.3 1.23.48 1.65.61.69.22 1.31.19 1.8.11.55-.08 1.7-.7 1.94-1.37.24-.67.24-1.25.17-1.37-.07-.12-.26-.19-.55-.34Z" />
            </svg>
          </span>
          <span className="wsp-text">Contáctanos</span>
        </a>
      </div>
    </div>
  );
}
