"use client";
import Image from "next/image";
import CarruselInfinito from "@/componentes/CarruselInfinito";
import FadeInSection from "@/componentes/FadeInSection";
import Link from "next/link";

/* Solo promesas que Medify cumple hoy: no gestiona reservas ni pagos, no valida títulos automáticamente */
const VALORES = [
  {
    title: "Información clara",
    desc: "Cada perfil muestra especialidad, servicios, valores, dirección y modalidad de atención. Eliges con datos, no a ciegas.",
  },
  {
    title: "Contacto directo",
    desc: "Agendas con el profesional en su propia agenda o le escribes por WhatsApp. Sin intermediarios y sin comisiones.",
  },
  {
    title: "Perfiles revisados",
    desc: "Nuestro equipo revisa cada perfil antes de publicarlo y retira los que no cumplen nuestras reglas.",
  },
  {
    title: "Datos cuidados",
    desc: "Pedimos solo lo necesario, no vendemos información y cada profesional puede eliminar su cuenta cuando quiera.",
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
            Encontrar a tu profesional de salud no debería ser difícil.
          </h1>
          <p className="font-light leading-relaxed" style={{ fontSize: "17px", color: "rgba(255,255,255,0.4)" }}>
            Medify reúne a profesionales de la salud, clínicas y centros médicos de todo Chile en un solo lugar, con la información que necesitas para elegir.
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
                Medify nace en Chile, del mismo equipo que creó Agenda Clínica. Lo hicimos porque encontrar un buen profesional todavía depende de recomendaciones sueltas, perfiles desactualizados y llamadas sin respuesta. En Medify cada perfil reúne lo que importa para decidir: especialidad, servicios y valores, dirección, modalidad de atención y la opinión de otros pacientes.
              </p>

              <div className="space-y-7">
                <div>
                  <h3 className="font-semibold text-[#1d1d1f] mb-2" style={{ fontSize: "19px", letterSpacing: "-0.015em" }}>
                    Misión
                  </h3>
                  <p className="font-light text-[#6e6e73] leading-relaxed" style={{ fontSize: "15px" }}>
                    Que cualquier persona en Chile encuentre al profesional de salud indicado y pueda contactarlo directamente, sin intermediarios ni costos ocultos.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#1d1d1f] mb-2" style={{ fontSize: "19px", letterSpacing: "-0.015em" }}>
                    Visión
                  </h3>
                  <p className="font-light text-[#6e6e73] leading-relaxed" style={{ fontSize: "15px" }}>
                    Ser el lugar donde los chilenos buscan salud: un directorio confiable y al día, donde los buenos profesionales se hacen visibles por la calidad de su trabajo.
                  </p>
                </div>
              </div>
            </div>

            {/* Mockups */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-sm h-72 bg-[#f5f5f7] rounded-3xl overflow-hidden">
                <Image
                  src="/logofavicom.png"
                  alt="Logo de Medify"
                  fill
                  sizes="384px"
                  className="object-contain bg-[#1f2129] p-10"
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
                Lo que puedes esperar de Medify.
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
              Profesionales de muchas áreas, en un solo lugar.
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
              ¿Buscas un profesional o eres uno?
            </h2>
            <p className="font-light leading-relaxed mb-10" style={{ fontSize: "17px", color: "rgba(255,255,255,0.45)" }}>
              Encuentra a quien necesitas en minutos, o crea gratis el perfil de tu consulta y haz que te encuentren.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full text-white transition-colors duration-150"
                style={{ fontSize: "17px", fontWeight: 400, padding: "13px 28px", background: "#00C853" }}
              >
                Buscar profesional
              </Link>
              {/* Planes desactivados por ahora (registro gratuito). Antes: href="/precios", "Ver planes" */}
              <Link
                href="/unirse"
                className="inline-flex items-center justify-center rounded-full text-white transition-all duration-150"
                style={{
                  fontSize: "17px",
                  fontWeight: 400,
                  padding: "12px 28px",
                  border: "1px solid rgba(255,255,255,0.25)",
                  background: "rgba(255,255,255,0.06)",
                }}
              >
                Crear mi perfil gratis
              </Link>
            </div>
          </div>
        </section>
      </FadeInSection>

    </div>
  );
}
