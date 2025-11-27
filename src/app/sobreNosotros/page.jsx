"use client";
import Image from "next/image";
import { motion } from "motion/react";
import Threads from "@/componentes/Threads";
import CarruselInfinito from "@/componentes/CarruselInfinito";
import FadeInSection from "@/componentes/FadeInSection";
import { Michroma, Space_Grotesk } from "next/font/google";
import { Safari } from "@/components/ui/safari";
import { Iphone } from "@/components/ui/iphone";
import { SparklesText } from "@/components/ui/sparkles-text";
import { LampContainer } from "@/components/ui/lamp";
const michroma = Michroma({ subsets: ["latin"], weight: "400" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap" });

export default function SobreNosotros() {
  return (
    <div className="min-h-screen w-full bg-white text-neutral-900 space-y-12 scroll-smooth">
      {/* Bloque 1: Intro - Azul marino claro */}
      <FadeInSection delay={0}>
        <section className="space-x-4 md:space-x-6 lg:space-x-8 relative overflow-hidden grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12 lg:gap-16 px-6 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-12 md:py-16 lg:py-24 ring-1 shadow-2xl backdrop-blur-sm rounded-3xl md:rounded-[2.5rem]" style={{
          background: "#fff",
          borderColor: "rgba(42, 93, 119, 0.08)",
          boxShadow: "0 8px 32px rgba(42, 93, 119, 0.08)"
        }}>
          <div>
            <h1
              className={`${spaceGrotesk.className} leading-tight tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-neutral-900 font-bold`}
            >
             <strong className="bg-gradient-to-r from-blue-400 to-teal-500 bg-clip-text text-transparent">Sobre Medify</strong>
            </h1>
            <p className={`mt-4 sm:mt-6 text-justify sm:text-lg md:text-xl lg:text-2xl text-neutral-900/90 ${spaceGrotesk.className}`}>
                            Somos especialistas en desarrollo de soluciones tecnológicas para
                            el sector salud y especialidades que trabajen con sistema de
                            reservas por medio de horas y calendarios, enfocados en crear
                            sistemas seguros, intuitivos y conformes con los más altos
                            estándares de confidencialidad.
                            Nuestro objetivo es modernizar la práctica médica con herramientas
                            digitales que optimizan la gestión clínica, mejoran la atención al
                            paciente y simplifican los procesos administrativos de tu consulta
                            o negocio.
              Somos especialistas en desarrollo de soluciones tecnológicas para
              el sector salud y especialidades que trabajen con sistema de
              reservas por medio de horas y calendarios, enfocados en crear
              sistemas seguros, intuitivos y conformes con los más altos
              estándares de confidencialidad.
            </p>
            <p className={`mt-4 sm:mt-6 text-justify sm:text-lg md:text-xl lg:text-2xl text-neutral-900/90 ${spaceGrotesk.className}`}>
              Nuestro objetivo es modernizar la práctica médica con herramientas
              digitales que optimizan la gestión clínica, mejoran la atención al
              paciente y simplifican los procesos administrativos de tu consulta
              o negocio.
            </p>
          </div>

          <div className="order-first md:order-none w-full flex flex-col md:flex-row items-center justify-center gap-6 md:gap-0">
            {/* iPhone - Móvil */}
            <div className="w-32 md:w-1/4 lg:w-1/5 flex-shrink-0 md:relative md:z-40 md:mr-[-40px] lg:mr-[-35px] md:drop-shadow-2xl md:mt-6 lg:mt-12">
              <Iphone
                src="/medifycel.jpg"
                objectFit="cover"
                objectPosition="30% 40%"
              />
            </div>

            {/* Safari - Computadora */}
            <div className="w-full md:w-3/4 lg:w-4/5">
              <Safari
                url="medify.cl"
                imageSrc="/loginmedifynew.jpg"
                className="rounded-2xl md:rounded-3xl shadow-xl"
              />
            </div>
          </div>
        </section>
      </FadeInSection>{" "}
      {/* Bloque 2: Video + texto 
      <section className="relative overflow-hidden grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12 lg:gap-16 px-4 sm:px-6 md:px-10 lg:px-14 py-12 sm:py-16 md:py-20 lg:py-24 bg-neutral-900/40 ring-1 ring-white/10 rounded-3xl md:rounded-4xl shadow-2xl backdrop-blur-sm">
        <div>
          {/* Video visible en md+ /*
          <video
            src="/exito.mp4"
            className="w-full h-auto rounded-2xl md:rounded-3xl ring-1 ring-white/10 shadow-xl hidden md:block"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>

        <div>
          <p className={`text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 ${spaceGrotesk.className}`}>
            Desarrollamos soluciones exclusivamente para el sector salud. Cada sistema 
            que creamos cumple con estrictos protocolos de seguridad, incluyendo 
            cumplimiento HIPAA, cifrado de extremo a extremo y auditorías de seguridad 
            continuas para proteger la información sensible de los pacientes.
          </p>
        </div>
      </section>
*/}
      {/* Bloque 2: Especialidades Médicas - Azul marino medio */}
      <FadeInSection delay={0.2}>
        <section className="relative overflow-hidden px-6 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-12 md:py-16 lg:py-20 ring-1 shadow-2xl backdrop-blur-sm rounded-3xl md:rounded-[2.5rem]" style={{
          background: "#fff",
          borderColor: "rgba(42, 93, 119, 0.08)",
          boxShadow: "0 8px 32px rgba(42, 93, 119, 0.08)"
        }}>
          <div className="text-center mb-12 md:mb-16">
            <h2
              className={`${spaceGrotesk.className} leading-tight tracking-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-neutral-900 font-bold`}
            >
              <strong className="bg-gradient-to-r from-blue-400 to-teal-500 bg-clip-text text-transparent">Medify es lo que tu Consulta necesita</strong>
            </h2>
            <p className={`mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-neutral-900/90 max-w-3xl mx-auto ${spaceGrotesk.className}`}>
                            Solución tecnológica especializada para cada área de
                            especialidad
            </p>
          </div>

          <CarruselInfinito
            especialidades={[
              {
                nombre: "Pediatría",
                imagen: "/terapeuta.jpg",
              /* descripcion:
                  "Cuidado infantil especializado con seguimiento del desarrollo y sistemas de agenda online",
                tecnologias: [
                  "Control niño sano",
                  "Control de Vacunas",
                  "Agenda online",
                  "Historial clinico",
                ], */
              },
              
              {
                nombre: "Medicina General",
                imagen: "/medgen.jpg",
                /* descripcion:
                  "Historia clínica en la nube, control ingreso de datos y seguimiento de pacientes",
                tecnologias: [
                  "Historia Clínica",
                  "Seguimiento de controles",
                  "Agenda online",
                  "Estado de Tratamiento",
                ], */
              },

              {
                nombre: "Oftalmología",
                imagen: "/oftalmologo.jpg",
                /* descripcion:
                  "Gestión avanzada y seguimiento de tratamientos oculares",
                tecnologias: [
                  "Historia clínica",
                  "Seguimientos de Controles",
                  "Agenda online",
                  "Diagnóstico",
                ], */
              },

              {
                nombre: "Salón de maquillaje",
                imagen: "/maquilladora2.jpg",
               /* descripcion:
                  "Maquillaje profesional con asesoría personalizada y gestión de citas eficiente",
                tecnologias: [
                  "Maquillajes Profesionales",
                  "Maquillaje para eventos",
                  "Agenda online",
                  "Cuidado de la piel",
                ], */
              },
              {
                nombre: "Psicología",
                imagen: "/psico.jpg",
               /* descripcion:
                  "Salud mental digital con telepsiquiatría segura y máxima protección de la privacidad del paciente",
                tecnologias: 
                ["Telepsiquiatría", 
                  "Evaluaciones", 
                  "Seguimiento"
                  ], */
              },

              {
                nombre: "Nutrición",
                imagen: "/nutri.jpg",
                /* descripcion:
                  "Planes nutricionales personalizados y seguimiento continuo de objetivos de salud",
                tecnologias: [
                  "Seguimiento",
                  "Educación",
                  "Objetivos",
                  "Analytics",
                ], */
              },

              {
                nombre: "Odontología",
                imagen: "/odonto.jpg",
                /*descripcion:
                  "Odontograma digital completo con planificación de tratamientos y seguimiento de ortodoncia",
                tecnologias: 
                ["Ortodoncia", 
                  "Recordatorios", 
                  "Seguimiento"
                  ], */
              },

              {
                nombre: "Kinesiología",
                imagen: "/kine.jpg",
               /* descripcion:
                  "Optimización del rendimiento deportivo con prevención de lesiones y rehabilitación especializada",
                tecnologias: [
                  "Evaluación Física",
                  "Prevención",
                  "Performance",
                  "Rehabilitación",
                  "Analytics",
                ], */
              },
            ]}
          />
        </section>
      </FadeInSection>
      {/* Bloque 3: Misión / Visión / Valores / Propuesta de Valor - Azul marino más oscuro 
      <section className="relative overflow-hidden px-6 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-slate-900/80 via-blue-950/90 to-slate-950/80 ring-1 ring-blue-600/20 shadow-2xl shadow-blue-950/60 backdrop-blur-sm rounded-3xl md:rounded-[2.5rem]">
        <h2
          className={`${spaceGrotesk.className} leading-tight tracking-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white text-center font-bold`}
        >
          Nuestro Compromiso con la Salud
        </h2>
        <p className={`mt-4 sm:mt-6 text-center text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto ${spaceGrotesk.className}`}>
          Especializados en tecnología médica que combina innovación, seguridad
          y cumplimiento normativo para entregar soluciones que transforman la
          práctica médica.
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          -- Misión 
          <div className="group rounded-2xl ring-1 ring-blue-500/20 bg-gradient-to-br from-blue-900/40 to-slate-900/40 p-6 hover:ring-blue-400/60 hover:bg-blue-900/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/20">
            <h3
              className={`${spaceGrotesk.className} text-xl sm:text-2xl text-white flex items-center gap-2 font-semibold`}
            >
              <span aria-hidden>🎯</span> Misión
            </h3>
            <p className={`mt-3 text-white/85 ${spaceGrotesk.className}`}>
              Desarrollar sistemas médicos digitales seguros que optimizan la
              gestión clínica, mejoran la experiencia del paciente y empoderan a
              los profesionales de la salud con herramientas tecnológicas de
              vanguardia.
            </p>
          </div>

          -- Visión 
          <div className="group rounded-2xl ring-1 ring-blue-500/20 bg-gradient-to-br from-blue-900/40 to-slate-900/40 p-6 hover:ring-blue-400/60 hover:bg-blue-900/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/20">
            <h3
              className={`${spaceGrotesk.className} text-xl sm:text-2xl text-white flex items-center gap-2 font-semibold`}
            >
              <span aria-hidden>👁</span> Visión
            </h3>
            <p className={`mt-3 text-white/85 ${spaceGrotesk.className}`}>
              Ser líderes en Latinoamérica en tecnología médica, democratizando
              el acceso a soluciones digitales avanzadas para clínicas,
              hospitales y profesionales de la salud independientes.
            </p>
          </div>

          -- Valores 
          <div className="group rounded-2xl ring-1 ring-blue-500/20 bg-gradient-to-br from-blue-900/40 to-slate-900/40 p-6 hover:ring-blue-400/60 hover:bg-blue-900/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/20">
            <h3
              className={`${spaceGrotesk.className} text-xl sm:text-2xl text-white flex items-center gap-2 font-semibold`}
            >
              <span aria-hidden>💎</span> Valores
            </h3>
            <ul className={`mt-3 space-y-2 text-white/85 ${spaceGrotesk.className}`}>
              <li>
                <strong className="text-white">Confidencialidad:</strong>{" "}
                protección absoluta de datos médicos.
              </li>
              <li>
                <strong className="text-white">Precisión:</strong> sistemas
                confiables para decisiones críticas.
              </li>
              <li>
                <strong className="text-white">Cumplimiento:</strong> adherencia
                estricta a regulaciones médicas.
              </li>
              <li>
                <strong className="text-white">Innovación:</strong> tecnología
                de punta para el sector salud.
              </li>
              <li>
                <strong className="text-white">Empatía:</strong> soluciones
                centradas en el bienestar.
              </li>
            </ul>
          </div>

          -- Propuesta de Valor
          <div className="group rounded-2xl ring-1 ring-blue-500/20 bg-gradient-to-br from-blue-900/40 to-slate-900/40 p-6 hover:ring-blue-400/60 hover:bg-blue-900/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/20">
            <h3
              className={`${spaceGrotesk.className} text-xl sm:text-2xl text-white flex items-center gap-2 font-semibold`}
            >
              <span aria-hidden>⚡</span> Propuesta de Valor
            </h3>
            <p className={`mt-3 text-white/85 ${spaceGrotesk.className}`}>
              Sistemas médicos personalizados que garantizan seguridad de datos,
              cumplimiento HIPAA y optimización de flujos de trabajo clínicos,
              permitiendo que los médicos se enfoquen en lo más importante: sus
              pacientes.
            </p>
          </div>
        </div>
      </section>
      */}
      {/* Bloque 4: CTA con animación Lamp 
      <LampContainer className="rounded-4xl h-[300px] md:h-[600px]">
        <motion.h2
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className={`${spaceGrotesk.className} rounded-4xl mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-transparent`}
        >
        <strong className="bg-gradient-to-r from-teal-400 to-teal-400 bg-clip-text text-transparent">¿Listo para modernizar tu consulta?</strong> 
        </motion.h2>
      </LampContainer>*/}
      <div className="flex justify-center rounded-2xl items-center py-24 px-4 md:px-24 lg:px-24 ">
      <SparklesText colors={{ first: "#00FFD0", second: "#FF00C3" }} className="text-center bg-blend-color-burn text-6xl">
       <strong className="bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">¿Listo para modernizar tu consulta?</strong>
      </SparklesText>
      </div>
    </div>
  );
}
