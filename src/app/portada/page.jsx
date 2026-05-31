import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export default function Portada() {
  return (
    <section className={`${inter.className} relative w-full min-h-screen overflow-hidden`}>

      {/* ── Imagen de fondo ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/doctores2.png"
          alt="Profesionales de salud en Medify"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />

        {/* Overlay oscuro — Apple usa negro simple, no tints de color */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to right, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.38) 50%, rgba(0,0,0,0.10) 100%)",
          }}
        />

      </div>

      {/* ── Contenido ── */}
      <div className="relative z-10 w-full h-full min-h-screen flex flex-col justify-center">
        <div
          className="w-full mx-auto px-6"
          style={{ maxWidth: "980px", paddingTop: "120px", paddingBottom: "120px" }}
        >
          {/* Eyebrow — Apple usa texto muy pequeño y discreto */}
          <p
            className="text-white/60 font-normal mb-5"
            style={{ fontSize: "14px", letterSpacing: "0.01em" }}
          >
            Marketplace de salud · Chile
          </p>

          {/* Headline — Apple: pocas palabras, mucho peso, tracking muy cerrado */}
          <h1
            className="text-white font-semibold leading-[1.06] mb-6"
            style={{
              fontSize: "clamp(2.8rem, 6.5vw, 5.2rem)",
              letterSpacing: "-0.03em",
              maxWidth: "640px",
            }}
          >
            Agenda con el
            <br />
            especialista que
            <br />
            necesitas, hoy.
          </h1>

          {/* Subtítulo — Inter light, no bold, conciso */}
          <p
            className="text-white/70 font-light leading-[1.65] mb-10"
            style={{
              fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
              maxWidth: "420px",
              letterSpacing: "-0.01em",
            }}
          >
            Perfiles verificados. Reserva en minutos.
            <br />
            Sin llamadas, sin esperas. En todo Chile.
          </p>

          {/* CTAs — Apple: pill, peso regular, azul o negro */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/marketplace"
              className="inline-flex items-center justify-center rounded-full bg-[#00C853] hover:bg-[#00b347] text-white transition-colors duration-150"
              style={{ fontSize: "17px", fontWeight: 400, padding: "13px 24px" }}
            >
              Buscar especialista
            </Link>
            <Link
              href="/precios"
              className="inline-flex items-center justify-center rounded-full text-white transition-all duration-150"
              style={{
                fontSize: "17px",
                fontWeight: 400,
                padding: "12px 24px",
                border: "1px solid rgba(255,255,255,0.35)",
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(8px)",
              }}
            >
              Soy profesional
            </Link>
          </div>

          {/* Trust chips — pequeños, discretos, al fondo del hero */}
          <div className="mt-16 flex flex-wrap items-center gap-x-6 gap-y-2">
            {[
              "Profesionales verificados",
              "Reserva en tiempo real",
              "+15 especialidades",
              "Cobertura nacional",
            ].map((chip) => (
              <span
                key={chip}
                className="flex items-center gap-2 text-white/45"
                style={{ fontSize: "12px", letterSpacing: "0.01em" }}
              >
                <span
                  className="block w-1 h-1 rounded-full bg-white/30 flex-shrink-0"
                />
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
