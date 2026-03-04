import { Poppins, Inter, Lora } from "next/font/google";
import Image from "next/image";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600"], display: "swap" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap" });
const lora = Lora({ subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap" });

export default function Portada() {
  return (
    <main className="bg-white min-h-screen px-3 sm:px-6 lg:px-8 md:px-4 md:pt-4 md:pb-4">
      {/* HERO SECTION */}
      <section className="relative w-full h-[calc(100vh-4rem-2rem)] rounded-3xl overflow-hidden">
        {/* Full Width Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/doctores2.png"
            alt="Personal de salud profesional"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950/75 via-blue-950/20 to-blue-950/0" />
          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-blue-950/40 via-blue-900/10 to-transparent" />
        </div>

        {/* Content Container - centrado verticalmente */}
        <div className="relative z-10 w-full h-full flex items-center">
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-6">
            <div className="max-w-2xl">
              <p className={`${inter.className} text-sm sm:text-base font-semibold tracking-widest text-teal-300 uppercase mb-4`}>
                Plataforma de salud digital
              </p>
              <h1 className={`${poppins.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white leading-tight mb-6`}>
                El ecosistema de salud digital para profesionales.
              </h1>
              <p className={`${inter.className} text-lg sm:text-xl md:text-2xl text-white/80 font-normal leading-relaxed mb-10`}>
                Transforma tu consulta, eleva tu impacto.
              </p>
            </div>

            <div className="grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
              {[
                { label: "Todo en un solo lugar, agenda, pacientes y pagos.", value: "Organiza" },
                { label: "Tu agenda ya no será la preocupación.", value: "Ordena" },
                { label: "Medify se encarga del resto.", value: "Prioriza" },
              ].map((item) => (
                <article
                  key={item.label}
                  className="min-w-0 rounded-2xl border border-white/30 bg-white/15 p-4 shadow-sm backdrop-blur-md sm:p-5"
                >
                  <p className="truncate text-base font-semibold leading-tight text-white sm:text-lg">
                    {item.value}
                  </p>
                  <p className="mt-1 text-[11px] leading-snug text-white/70 sm:text-xs">
                    {item.label}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION - Rediseñada según referencia */}
      <section className="w-full bg-gradient-to-b from-white to-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Título principal de la sección */}
          <div className="text-center mb-16">
            <h2 className={`${poppins.className} text-3xl sm:text-4xl md:text-5xl font-normal tracking-tighter text-slate-900 mb-4`}>
              Qué es Medify y por qué lo necesitas para tu consulta
            </h2>
            <p className={`${inter.className} text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto`}>
              Una clínica digital hecha para profesionales de la salud en Chile.
            </p>
          </div>

          {/* Grid de Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">

            {/* Feature 1: Hecho para ti */}
            <div className="flex flex-col items-center text-center">
              {/* Icono circular con fondo */}
              <div className="w-24 h-24 rounded-full bg-teal-100 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-12 h-12 text-teal-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </div>

              {/* Título */}
              <h3 className={`${poppins.className} text-2xl font-normal tracking-tight text-slate-900 mb-4`}>
                Hecho para ti
              </h3>

              {/* Descripción */}
              <p className={`${inter.className} text-base text-slate-600 leading-relaxed`}>
                Psicología, nutrición, kinesiología, fonoaudiología, medicina y más.
              </p>
            </div>

            {/* Feature 2: Cómo funciona */}
            <div className="flex flex-col items-center text-center">
              {/* Icono circular con fondo */}
              <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-12 h-12 text-blue-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>

              {/* Título */}
              <h3 className={`${poppins.className} text-2xl font-normal tracking-tight text-slate-900 mb-4`}>
                Cómo funciona
              </h3>

              {/* Descripción */}
              <p className={`${inter.className} text-base text-slate-600 leading-relaxed`}>
                Digitaliza tu consulta, facilita tus procesos y brinda una mejor experiencia
              </p>
            </div>

            {/* Feature 3: Soluciona tus problemas */}
            <div className="flex flex-col items-center text-center">
              {/* Icono circular con fondo */}
              <div className="w-24 h-24 rounded-full bg-cyan-100 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-12 h-12 text-cyan-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>

              {/* Título */}
              <h3 className={`${poppins.className} text-2xl font-normal tracking-tight text-slate-900 mb-4`}>
                Soluciona tus problemas
              </h3>

              {/* Descripción */}
              <p className={`${inter.className} text-base text-slate-600 leading-relaxed`}>
                Agenda, fichas clínicas, pagos, recordatorios y mucho más.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}

    </main>
  );
}
