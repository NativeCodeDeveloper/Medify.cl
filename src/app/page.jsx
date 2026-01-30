"use client";
import { Poppins } from "next/font/google";
import Portada from "./portada/page";
import ComoFunciona from "./comoFunciona/page";
import Servicios from "./servicios/page";
import Footer from "./Footer/page";
import Portafolio from "./portafolio/page";
import FadeInSection from "../componentes/FadeInSection";
import Image from "next/image";
import BotonBlanco from "@/componentes/BotonBlanco";
import Link from "next/link";
import { RadialOrbit } from "../componentes/RadialOrbit";
import PortadaCelulares from "@/app/portadaCelulares/page";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600"], display: "swap" });

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-[#ffffffcd] relative">
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
            <div className="hidden md:block">
              <Portada />
            </div>
            <div className="block md:hidden">
              <PortadaCelulares />
            </div>
          </div>
        </FadeInSection>

        <FadeInSection delay={0} y={80}>
          <div className="-mx-6 sm:-mx-6 md:-mx-8 lg:-mx-20">
            <div className="relative grid grid-cols-1 md:grid-cols-5 items-center justify-items-center px-12 md:px-20 lg:px-14 py-30 md:py-32 gap-6">
              {/* Orbit animation left - Centrado */}
              <div className="hidden lg:flex md:col-span-2 justify-center items-center">
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
                  stageSize={400}
                  imageSize={110}
                  centerImage={{ src: "/logomedify.png", alt: "Medify" }}
                />
              </div>

              {/* Columna Derecha: Nueva integración de features - Centrado */}
              <div className="md:col-span-3 flex items-center justify-center">
                <div className="space-y-6 max-w-xl">

                  {/* Feature 1: Agendamiento online */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center">
                      <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className={`${poppins.className} text-xl md:text-2xl font-normal text-slate-800`}>
                      Agendamiento online
                    </h3>
                  </div>

                  {/* Feature 2: Fichas e historial clínico */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center">
                      <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className={`${poppins.className} text-xl md:text-2xl font-normal text-slate-800`}>
                      Fichas e historial clínico
                    </h3>
                  </div>

                  {/* Feature 3: Pagos y control financiero */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center">
                      <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className={`${poppins.className} text-xl md:text-2xl font-normal text-slate-800`}>
                      Pagos y control financiero
                    </h3>
                  </div>

                  {/* Feature 4: Recordatorios automáticos */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center">
                      <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className={`${poppins.className} text-xl md:text-2xl font-normal text-slate-800`}>
                      Recordatorios automáticos
                    </h3>
                  </div>

                  {/* Feature 5: Mensajes y seguimiento */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center">
                      <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className={`${poppins.className} text-xl md:text-2xl font-normal text-slate-800`}>
                      Mensajes y seguimiento
                    </h3>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-4">
                    <a
                      href="https://wa.me/56977889900?text=Hola,%20quiero%20información%20sobre%20Medify"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-full font-semibold text-base md:text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      <span>Todo en un solo lugar, hecho para profesionales</span>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                    </a>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </FadeInSection>

        {/* Nueva Sección: ¿Cuáles problemas soluciona Medify? */}
        <FadeInSection delay={0.2}>
          <section className="w-full bg-white py-20 md:py-24">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">

              {/* Título y Subtítulo */}
              <div className="text-center mb-16">
                <h2 className={`${poppins.className} text-3xl sm:text-4xl md:text-5xl font-normal tracking-tighter text-slate-900 mb-4`}>
                  ¿Qué problemas soluciona Medify?
                </h2>
                <p className={`${poppins.className} text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto`}>
                  Todo lo que necesitas para tu consulta en un solo lugar.
                </p>
              </div>

              {/* Grid de 3 Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Card 1: Más orden */}
                <div className="bg-slate-50 rounded-2xl p-8 hover:shadow-xl transition-shadow duration-300">
                  {/* Icono */}
                  <div className="w-16 h-16 rounded-xl bg-teal-100 flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>

                  {/* Título */}
                  <h3 className={`${poppins.className} text-2xl font-normal text-slate-900 mb-4`}>
                    Más orden
                  </h3>

                  {/* Descripción */}
                  <p className={`${poppins.className} text-base text-slate-600 leading-relaxed mb-6`}>
                    Gestiona tu agenda, pagos y fichas sin enredarte en el papeleo.
                  </p>

                  {/* 
                    TODO: Integrar imagen aquí cuando estén listas (descomentar y reemplazar src)
                    <div className="relative w-full h-40 rounded-xl overflow-hidden mt-6">
                      <Image src="/ruta-imagen-orden.jpg" alt="Más orden" fill className="object-cover" />
                    </div>
                  */}
                </div>

                {/* Card 2: Más pacientes */}
                <div className="bg-slate-50 rounded-2xl p-8 hover:shadow-xl transition-shadow duration-300">
                  {/* Icono */}
                  <div className="w-16 h-16 rounded-xl bg-teal-100 flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>

                  {/* Título */}
                  <h3 className={`${poppins.className} text-2xl font-normal text-slate-900 mb-4`}>
                    Más pacientes
                  </h3>

                  {/* Descripción */}
                  <p className={`${poppins.className} text-base text-slate-600 leading-relaxed mb-6`}>
                    Aumenta tu visibilidad y llega a más pacientes en nuestro ecosistema.
                  </p>

                  {/* 
                    TODO: Integrar imagen aquí cuando estén listas (descomentar y reemplazar src)
                    <div className="relative w-full h-40 rounded-xl overflow-hidden mt-6">
                      <Image src="/ruta-imagen-pacientes.jpg" alt="Más pacientes" fill className="object-cover" />
                    </div>
                  */}
                </div>

                {/* Card 3: Más control */}
                <div className="bg-slate-50 rounded-2xl p-8 hover:shadow-xl transition-shadow duration-300">
                  {/* Icono */}
                  <div className="w-16 h-16 rounded-xl bg-teal-100 flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>

                  {/* Título */}
                  <h3 className={`${poppins.className} text-2xl font-normal text-slate-900 mb-4`}>
                    Más control
                  </h3>

                  {/* Descripción */}
                  <p className={`${poppins.className} text-base text-slate-600 leading-relaxed mb-6`}>
                    Simplifica tus pagos, recordatorios y tareas desde un solo lugar.
                  </p>

                  {/*   
                    TODO: Integrar imagen aquí cuando estén listas (descomentar y reemplazar src)
                    <div className="relative w-full h-40 rounded-xl overflow-hidden mt-6">
                      <Image src="/ruta-imagen-control.jpg" alt="Más control" fill className="object-cover" />
                    </div>
                  */}
                </div>

              </div>
            </div>
          </section>
        </FadeInSection>

        <FadeInSection delay={0.3}>
          <div className="-mx-4 sm:-mx-6 md:-mx-8 lg:-mx-12 mb-32">
            <Servicios></Servicios>
          </div>
        </FadeInSection>

        {/* <FadeInSection delay={0.4}>
          <div className="my-32">
            <Portafolio></Portafolio>
          </div>
        </FadeInSection> */}

        <FadeInSection delay={0.5}>
          <ComoFunciona />
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
          className={`wsp-float-btn ${poppins.className}`}
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
