"use client";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const STEPS = [
  {
    num: "01",
    title: "Crea tu perfil.",
    desc: "Regístrate gratis y completa tu especialidad, servicios, valores, dirección y foto. Mientras más completo esté tu perfil, más fácil es que te encuentren.",
    cta: null,
  },
  {
    num: "02",
    title: "Lo revisamos y publicamos.",
    desc: "Nuestro equipo revisa tus datos. Cuando tu perfil se publica te avisamos por correo, y apareces en el marketplace y en el mapa de ubicaciones.",
    cta: { label: "Crear mi perfil", href: "/unirse" },
    // Planes desactivados por ahora (registro gratuito). Al activar los pagos:
    // cta: { label: "Ver planes", href: "/precios" },
    featured: true,
  },
  {
    num: "03",
    title: "Los pacientes te contactan.",
    desc: "Te encuentran por especialidad o comuna, revisan tu perfil y reseñas, y agendan en tu agenda online o te escriben por WhatsApp. Sin intermediarios ni comisiones.",
    cta: null,
  },
];

export default function ComoFunciona() {
  return (
    <section
      id="como-funciona"
      className={`${inter.className} w-full bg-white px-6 py-[100px]`}
    >
      <div className="max-w-[980px] mx-auto">

        {/* Header */}
        <div className="mb-16">
          <p
            className="font-semibold text-[#6e6e73] uppercase mb-4"
            style={{ fontSize: "12px", letterSpacing: "0.08em" }}
          >
            Cómo funciona
          </p>
          <h2
            className="font-semibold text-[#1d1d1f] leading-[1.1] mb-5 max-w-[560px]"
            style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", letterSpacing: "-0.025em" }}
          >
            Tu consulta, visible. En tres pasos.
          </h2>
          <p className="text-[19px] font-light text-[#6e6e73] leading-[1.6] max-w-[480px]">
            Crea tu perfil gratis, nuestro equipo lo revisa y los pacientes te encuentran y te contactan directamente.
          </p>
        </div>

        {/* Steps — separados por línea 1px */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-[#d2d2d7] rounded-2xl overflow-hidden">
          {STEPS.map((step) => (
            <div
              key={step.num}
              className="px-8 py-10 flex flex-col"
              style={{ background: step.featured ? "#f5f5f7" : "#ffffff" }}
            >
              <span
                className="font-semibold mb-8 block"
                style={{ fontSize: "12px", color: "#00C853", letterSpacing: "0.08em" }}
              >
                {step.num}
              </span>
              <h3
                className="font-semibold text-[#1d1d1f] leading-[1.2] mb-4"
                style={{ fontSize: "21px", letterSpacing: "-0.015em" }}
              >
                {step.title}
              </h3>
              <p
                className="font-light text-[#6e6e73] leading-[1.65] flex-1"
                style={{ fontSize: "15px" }}
              >
                {step.desc}
              </p>
              {step.cta && (
                <div className="mt-8">
                  <Link
                    href={step.cta.href}
                    className="inline-flex items-center justify-center rounded-full bg-[#00C853] hover:bg-[#00b347] px-[18px] py-[10px] text-[15px] font-normal text-white transition-colors duration-150"
                  >
                    {step.cta.label}
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom callout */}
        <div className="mt-4 rounded-2xl bg-[#f5f5f7] px-8 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p
              className="font-semibold text-[#1d1d1f] mb-2"
              style={{ fontSize: "21px", letterSpacing: "-0.015em" }}
            >
              Tu perfil, siempre al día.
            </p>
            <p
              className="font-light text-[#6e6e73] leading-[1.6] max-w-[480px]"
              style={{ fontSize: "15px" }}
            >
              Cambia tus servicios, valores, foto o link de agenda cuando quieras desde tu cuenta. Sin trámites.
            </p>
          </div>
          <Link
            href="/unirse" /* antes /precios: planes desactivados por ahora */
            className="flex-shrink-0 inline-flex items-center justify-center rounded-full bg-[#1d1d1f] hover:bg-[#000000] px-[22px] py-[12px] text-[17px] font-normal text-white transition-colors duration-150"
          >
            Comenzar ahora
          </Link>
        </div>

      </div>
    </section>
  );
}
