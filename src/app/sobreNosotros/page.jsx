"use client";
import Image from "next/image";
import CarruselInfinito from "@/componentes/CarruselInfinito";
import FadeInSection from "@/componentes/FadeInSection";
import Link from "next/link";

const VALORES = [
  {
    title: "Accesibilidad",
    desc: "Cualquier persona en Chile debe poder encontrar al especialista que necesita, sin barreras de distancia ni burocracia.",
  },
  {
    title: "Confianza",
    desc: "Cada profesional en Medify tiene credenciales verificadas. Los pacientes eligen con información real.",
  },
  {
    title: "Simplicidad",
    desc: "Reservar una hora médica debería ser tan fácil como pedir un taxi. Lo diseñamos así.",
  },
  {
    title: "Privacidad",
    desc: "Los datos de pacientes y profesionales son tratados con los más altos estándares de seguridad.",
  },
];

const ESPECIALIDADES = [
  { nombre: "Terapeuta Ocupacional", imagen: "/terapeuta.jpg" },
  { nombre: "Medicina General", imagen: "/medgen.jpg" },
  { nombre: "Oftalmología", imagen: "/oftalmologo.jpg" },
  { nombre: "Psicología", imagen: "/psico.jpg" },
  { nombre: "Nutrición", imagen: "/nutri.jpg" },
  { nombre: "Odontología", imagen: "/odonto.jpg" },
  { nombre: "Kinesiología", imagen: "/kine.jpg" },
];

export default function SobreNosotros() {
  return (
    <div className="min-h-screen w-full bg-white">

      {/* ── Header ── */}
      <div className="bg-[#000000] px-6 pt-16 pb-14">
        <div className="max-w-[680px] mx-auto text-center">
          <p className="font-semibold text-[#6e6e73] uppercase mb-4" style={{ fontSize: "12px", letterSpacing: "0.08em" }}>
            Nosotros
          </p>
          <h1 className="font-semibold text-white leading-[1.06] mb-5" style={{ fontSize: "clamp(2rem,5.5vw,3.5rem)", letterSpacing: "-0.035em" }}>
            Conectando la salud de Chile.
          </h1>
          <p className="font-light leading-relaxed" style={{ fontSize: "17px", color: "rgba(255,255,255,0.4)" }}>
            Somos el puente entre profesionales de salud y las personas que los necesitan, en cualquier rincón del país.
          </p>
        </div>
      </div>

      {/* ── Misión + Visión ── */}
      <FadeInSection delay={0}>
        <section className="px-6 py-[80px] bg-white">
          <div className="max-w-[980px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

            <div>
              <p className="font-semibold text-[#6e6e73] uppercase mb-6" style={{ fontSize: "12px", letterSpacing: "0.08em" }}>
                Quiénes somos
              </p>
              <p className="font-light text-[#424245] leading-relaxed mb-8" style={{ fontSize: "17px" }}>
                Medify nació para cambiar la forma en que los chilenos acceden a los profesionales de salud. Somos un marketplace que conecta pacientes con psicólogos, kinesiólogos, médicos y más — sin burocracia, sin esperas, desde cualquier lugar.
              </p>

              <div className="space-y-7">
                <div>
                  <h3 className="font-semibold text-[#1d1d1f] mb-2" style={{ fontSize: "19px", letterSpacing: "-0.015em" }}>
                    Misión
                  </h3>
                  <p className="font-light text-[#6e6e73] leading-relaxed" style={{ fontSize: "15px" }}>
                    Democratizar el acceso a la salud en Chile, conectando a las personas con los profesionales que necesitan, donde y cuando lo necesiten.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#1d1d1f] mb-2" style={{ fontSize: "19px", letterSpacing: "-0.015em" }}>
                    Visión
                  </h3>
                  <p className="font-light text-[#6e6e73] leading-relaxed" style={{ fontSize: "15px" }}>
                    Ser la plataforma de referencia en salud de Chile y Latinoamérica — donde cada persona encuentre al especialista indicado y cada profesional pueda crecer su práctica.
                  </p>
                </div>
              </div>
            </div>

            {/* Mockups */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-sm h-72 bg-[#f5f5f7] rounded-3xl overflow-hidden">
                <Image
                  src="/logofavicom.png"
                  alt="Medify en acción"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* ── Valores ── */}
      <FadeInSection delay={0.1}>
        <section className="bg-[#f5f5f7] px-6 py-[80px]">
          <div className="max-w-[980px] mx-auto">
            <div className="mb-12">
              <p className="font-semibold text-[#6e6e73] uppercase mb-4" style={{ fontSize: "12px", letterSpacing: "0.08em" }}>
                Lo que nos guía
              </p>
              <h2 className="font-semibold text-[#1d1d1f] leading-[1.1]" style={{ fontSize: "clamp(1.6rem,3.5vw,2.4rem)", letterSpacing: "-0.025em" }}>
                Los valores detrás de Medify.
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#d2d2d7] rounded-2xl overflow-hidden">
              {VALORES.map((v) => (
                <div key={v.title} className="bg-white px-8 py-8">
                  <h3 className="font-semibold text-[#1d1d1f] mb-3" style={{ fontSize: "17px", letterSpacing: "-0.01em" }}>
                    {v.title}
                  </h3>
                  <p className="font-light text-[#6e6e73] leading-relaxed" style={{ fontSize: "15px" }}>
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* ── Especialidades ── */}
      <FadeInSection delay={0.1}>
        <section className="bg-white px-6 py-[80px]">
          <div className="max-w-[980px] mx-auto mb-12">
            <p className="font-semibold text-[#6e6e73] uppercase mb-4" style={{ fontSize: "12px", letterSpacing: "0.08em" }}>
              Especialidades
            </p>
            <h2 className="font-semibold text-[#1d1d1f] leading-[1.1]" style={{ fontSize: "clamp(1.6rem,3.5vw,2.4rem)", letterSpacing: "-0.025em" }}>
              Un especialista para cada necesidad.
            </h2>
          </div>
          <CarruselInfinito especialidades={ESPECIALIDADES} />
        </section>
      </FadeInSection>

      {/* ── CTA ── */}
      <FadeInSection delay={0.1}>
        <section className="bg-[#000000] px-6 py-[80px]">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="font-semibold text-white mb-5" style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", letterSpacing: "-0.03em" }}>
              ¿Listo para dar el siguiente paso?
            </h2>
            <p className="font-light leading-relaxed mb-10" style={{ fontSize: "17px", color: "rgba(255,255,255,0.45)" }}>
              Ya sea que busques un especialista o quieras crecer tu práctica, Medify es el lugar.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/marketplace"
                className="inline-flex items-center justify-center rounded-full text-white transition-colors duration-150"
                style={{ fontSize: "17px", fontWeight: 400, padding: "13px 28px", background: "#00C853" }}
              >
                Buscar especialista
              </Link>
              <Link
                href="/precios"
                className="inline-flex items-center justify-center rounded-full text-white transition-all duration-150"
                style={{
                  fontSize: "17px",
                  fontWeight: 400,
                  padding: "12px 28px",
                  border: "1px solid rgba(255,255,255,0.25)",
                  background: "rgba(255,255,255,0.06)",
                }}
              >
                Ver planes
              </Link>
            </div>
          </div>
        </section>
      </FadeInSection>

    </div>
  );
}
