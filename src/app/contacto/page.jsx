"use client";
import Link from "next/link";

const CHANNELS = [
  {
    label: "WhatsApp",
    value: "+56 9 9174 9964",
    cta: "Escribir ahora",
    href: "https://wa.me/56991749964?text=Hola,%20quiero%20información%20sobre%20Medify",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.488" />
      </svg>
    ),
  },
  {
    label: "Email comercial",
    value: "ventas@medify.cl",
    cta: "Enviar email",
    href: "mailto:ventas@medify.cl",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: "Soporte técnico",
    value: "soporte@medify.cl",
    cta: "Solicitar soporte",
    href: "mailto:soporte@medify.cl",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
];

const HOURS = [
  ["Lunes – Viernes", "9:00 – 18:00"],
  ["Sábados", "9:00 – 14:00"],
  ["WhatsApp", "Disponible 24/7"],
];

export default function Contacto() {
  return (
    <div className="min-h-screen bg-white">

      {/* Header */}
      <div className="bg-[#000000] px-6 pt-16 pb-14">
        <div className="max-w-[680px] mx-auto text-center">
          <p className="font-semibold text-[#6e6e73] uppercase mb-4" style={{ fontSize: "12px", letterSpacing: "0.08em" }}>
            Contacto
          </p>
          <h1 className="font-semibold text-white leading-[1.08] mb-5" style={{ fontSize: "clamp(2rem,5.5vw,3.5rem)", letterSpacing: "-0.035em" }}>
            Hablemos.
          </h1>
          <p className="font-light leading-relaxed" style={{ fontSize: "17px", color: "rgba(255,255,255,0.4)" }}>
            Escríbenos para saber cómo Medify puede ayudarte, ya sea como profesional o como paciente.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[980px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">

          {/* Left — channels + hours */}
          <div>
            <h2 className="font-semibold text-[#1d1d1f] mb-7" style={{ fontSize: "19px", letterSpacing: "-0.015em" }}>
              Canales de contacto
            </h2>

            <div className="space-y-3 mb-10">
              {CHANNELS.map((c) => (
                <div
                  key={c.label}
                  className="flex items-center gap-4 rounded-2xl border border-[#d2d2d7] p-5 hover:border-[#00C853]/40 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all duration-200"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#f5f5f7] flex items-center justify-center text-[#1d1d1f]">
                    {c.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-light text-[#6e6e73] mb-0.5" style={{ fontSize: "12px" }}>
                      {c.label}
                    </p>
                    <p className="font-semibold text-[#1d1d1f] truncate" style={{ fontSize: "15px", letterSpacing: "-0.01em" }}>
                      {c.value}
                    </p>
                  </div>
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 font-medium text-[#00C853] hover:underline underline-offset-4 transition-all"
                    style={{ fontSize: "13px" }}
                  >
                    {c.cta}
                  </a>
                </div>
              ))}
            </div>

            {/* Hours */}
            <div className="rounded-2xl bg-[#f5f5f7] p-6">
              <p className="font-semibold text-[#1d1d1f] mb-4" style={{ fontSize: "15px", letterSpacing: "-0.01em" }}>
                Horarios de atención
              </p>
              <div className="space-y-3">
                {HOURS.map(([day, hrs]) => (
                  <div key={day} className="flex justify-between items-center" style={{ borderBottom: "1px solid #e5e5ea", paddingBottom: "10px" }}>
                    <span className="font-light text-[#6e6e73]" style={{ fontSize: "14px" }}>{day}</span>
                    <span className="font-medium text-[#1d1d1f]" style={{ fontSize: "14px" }}>{hrs}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div>
            <h2 className="font-semibold text-[#1d1d1f] mb-7" style={{ fontSize: "19px", letterSpacing: "-0.015em" }}>
              Envíanos un mensaje
            </h2>

            <form className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#6e6e73] mb-2 uppercase" style={{ fontSize: "11px", letterSpacing: "0.06em" }}>
                    Nombre
                  </label>
                  <input
                    type="text"
                    placeholder="Tu nombre completo"
                    className="w-full rounded-xl border border-[#d2d2d7] px-4 py-3 text-[#1d1d1f] outline-none focus:border-[#00C853] focus:ring-2 focus:ring-[#00C853]/10 transition-all"
                    style={{ fontSize: "15px" }}
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#6e6e73] mb-2 uppercase" style={{ fontSize: "11px", letterSpacing: "0.06em" }}>
                    Especialidad
                  </label>
                  <select
                    className="w-full rounded-xl border border-[#d2d2d7] px-4 py-3 text-[#1d1d1f] outline-none focus:border-[#00C853] focus:ring-2 focus:ring-[#00C853]/10 transition-all bg-white"
                    style={{ fontSize: "15px" }}
                  >
                    <option value="">Seleccionar</option>
                    {["Psicología", "Kinesiología", "Nutrición", "Medicina General", "Odontología", "Pediatría", "Otra"].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#6e6e73] mb-2 uppercase" style={{ fontSize: "11px", letterSpacing: "0.06em" }}>
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    className="w-full rounded-xl border border-[#d2d2d7] px-4 py-3 text-[#1d1d1f] outline-none focus:border-[#00C853] focus:ring-2 focus:ring-[#00C853]/10 transition-all"
                    style={{ fontSize: "15px" }}
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#6e6e73] mb-2 uppercase" style={{ fontSize: "11px", letterSpacing: "0.06em" }}>
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    placeholder="+56 9 xxxx xxxx"
                    className="w-full rounded-xl border border-[#d2d2d7] px-4 py-3 text-[#1d1d1f] outline-none focus:border-[#00C853] focus:ring-2 focus:ring-[#00C853]/10 transition-all"
                    style={{ fontSize: "15px" }}
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#6e6e73] mb-2 uppercase" style={{ fontSize: "11px", letterSpacing: "0.06em" }}>
                  Mensaje
                </label>
                <textarea
                  rows={5}
                  placeholder="Cuéntanos cómo podemos ayudarte..."
                  className="w-full rounded-xl border border-[#d2d2d7] px-4 py-3 text-[#1d1d1f] outline-none focus:border-[#00C853] focus:ring-2 focus:ring-[#00C853]/10 transition-all resize-none"
                  style={{ fontSize: "15px" }}
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full text-white transition-colors duration-150"
                style={{ fontSize: "17px", fontWeight: 400, padding: "14px", background: "#00C853" }}
              >
                Enviar mensaje
              </button>

              <p className="text-center font-light text-[#6e6e73]" style={{ fontSize: "13px" }}>
                También puedes escribirnos directamente a{" "}
                <a href="https://wa.me/56991749964" target="_blank" rel="noopener noreferrer" className="text-[#00C853] hover:underline underline-offset-4">
                  WhatsApp
                </a>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
