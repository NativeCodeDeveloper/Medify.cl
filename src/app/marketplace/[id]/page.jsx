"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { PROFESSIONALS } from "../data/professionals";

/* ─── Star rating ─────────────────────────────────────────────────── */
function Stars({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <svg key={n} className="w-4 h-4" viewBox="0 0 20 20"
          fill={n <= Math.round(rating) ? "#F59E0B" : "#E5E7EB"}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ProfessionalProfile() {
  const params = useParams();
  const professional = PROFESSIONALS.find((p) => p.id === params.id);

  const whatsappHref = professional?.whatsappNumber
    ? `https://wa.me/${professional.whatsappNumber}?text=${encodeURIComponent(
        `Hola ${professional.name}, vi tu perfil en Medify y me gustaría agendar una hora.`
      )}`
    : `https://wa.me/56991749964`;

  /* ── Not found ── */
  if (!professional) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
        <p className="font-semibold text-[#1d1d1f] mb-3" style={{ fontSize: "21px" }}>
          Profesional no encontrado
        </p>
        <Link href="/marketplace" className="text-[#00C853] hover:underline underline-offset-4"
          style={{ fontSize: "15px" }}>
          Volver al Marketplace
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">

      {/* ── Header negro ── */}
      <div className="bg-[#000000]">
        <div className="max-w-[980px] mx-auto px-6 pt-14 pb-10">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8" style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>
            <Link href="/marketplace" className="hover:text-white transition-colors">
              Marketplace
            </Link>
            <span>/</span>
            <span style={{ color: "rgba(255,255,255,0.7)" }}>{professional.name}</span>
          </div>

          {/* Hero: foto + info */}
          <div className="flex flex-col sm:flex-row items-start gap-8">

            {/* Foto circular con ring verde */}
            <div className="flex-shrink-0"
              style={{ padding: "3px", borderRadius: "9999px", background: "linear-gradient(135deg,#00C853,#00e676)" }}>
              <div className="rounded-full overflow-hidden bg-[#1d1d1f]"
                style={{ width: "120px", height: "120px", border: "3px solid #000" }}>
                <Image src={professional.image} alt={professional.name}
                  width={120} height={120} className="w-full h-full object-cover object-top" />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="rounded-full px-3 py-1 font-medium"
                  style={{ fontSize: "12px", background: "rgba(0,200,83,0.15)", color: "#00C853" }}>
                  {professional.role}
                </span>
                {professional.consultationMode && (
                  <span className="rounded-full px-3 py-1 font-medium"
                    style={{ fontSize: "12px", background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)" }}>
                    {professional.consultationMode}
                  </span>
                )}
                {professional.available && (
                  <span className="rounded-full px-3 py-1 font-medium flex items-center gap-1.5"
                    style={{ fontSize: "12px", background: "rgba(0,200,83,0.08)", color: "rgba(255,255,255,0.5)" }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00C853]" />
                    Disponible
                  </span>
                )}
              </div>

              <h1 className="font-semibold text-white leading-tight mb-3"
                style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", letterSpacing: "-0.025em" }}>
                {professional.name}
              </h1>

              <div className="flex items-center gap-3 mb-4">
                <Stars rating={professional.rating} />
                <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)" }}>
                  {professional.rating} · {professional.reviews} reseñas
                </span>
              </div>

              <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.45)", lineHeight: 1.65, maxWidth: "540px" }}>
                {professional.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Contenido ── */}
      <div className="max-w-[980px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left: info clave → bio → especialidades */}
          <div className="lg:col-span-2 space-y-6">

            {/* ── Datos clave — lo primero que ve el paciente ── */}
            <div className="rounded-2xl border border-[#d2d2d7] overflow-hidden">
              {/* Fila de stats tipo Apple spec */}
              <div className="grid grid-cols-2 sm:grid-cols-3 divide-x divide-y divide-[#e5e5ea]">
                {[
                  {
                    label: "Valor sesión",
                    value: professional.price
                      ? `$${professional.price.toLocaleString("es-CL")}`
                      : "Consultar",
                    icon: (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33" />
                      </svg>
                    ),
                    highlight: true,
                  },
                  {
                    label: "Modalidad",
                    value: professional.consultationMode || "Consultar",
                    icon: (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
                      </svg>
                    ),
                  },
                  {
                    label: "Ubicación",
                    value: professional.location,
                    icon: (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    ),
                  },
                  {
                    label: "Experiencia",
                    value: professional.yearsExperience
                      ? `${professional.yearsExperience} años`
                      : "Consultar",
                    icon: (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    ),
                  },
                  {
                    label: "Disponibilidad",
                    value: professional.availability || "Consultar",
                    icon: (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    ),
                  },
                  {
                    label: "Reseñas",
                    value: `${professional.rating} · ${professional.reviews} reseñas`,
                    icon: (
                      <svg className="w-4 h-4" fill="#F59E0B" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ),
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col gap-2 px-5 py-5"
                    style={{ background: item.highlight ? "rgba(0,200,83,0.04)" : "#ffffff" }}
                  >
                    <div className="flex items-center gap-2">
                      <span style={{ color: item.highlight ? "#00C853" : "#6e6e73" }}>
                        {item.icon}
                      </span>
                      <span className="font-semibold uppercase text-[#6e6e73]"
                        style={{ fontSize: "10px", letterSpacing: "0.08em" }}>
                        {item.label}
                      </span>
                    </div>
                    <p
                      className="font-semibold"
                      style={{
                        fontSize: "15px",
                        letterSpacing: "-0.01em",
                        color: item.highlight ? "#00C853" : "#1d1d1f",
                      }}
                    >
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Sobre mí ── */}
            <div className="rounded-2xl border border-[#d2d2d7] p-7">
              <h2 className="font-semibold text-[#1d1d1f] mb-4"
                style={{ fontSize: "17px", letterSpacing: "-0.01em" }}>
                Sobre mí
              </h2>
              <p className="font-light text-[#424245] leading-relaxed whitespace-pre-line"
                style={{ fontSize: "15px" }}>
                {professional.fullBio || professional.description}
              </p>
            </div>

            {/* ── Especialidades ── */}
            {professional.specialties?.length > 0 && (
              <div className="rounded-2xl border border-[#d2d2d7] p-7">
                <h2 className="font-semibold text-[#1d1d1f] mb-4"
                  style={{ fontSize: "17px", letterSpacing: "-0.01em" }}>
                  Especialidades
                </h2>
                <div className="flex flex-wrap gap-2">
                  {professional.specialties.map((s) => (
                    <span key={s} className="rounded-xl px-3 py-1.5 font-light text-[#424245]"
                      style={{ fontSize: "13px", background: "#f5f5f7" }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: contacto sticky */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-[#d2d2d7] p-6 sticky top-[56px]">
              <h3 className="font-semibold text-[#1d1d1f] mb-5"
                style={{ fontSize: "17px", letterSpacing: "-0.01em" }}>
                Contactar
              </h3>

              {/* Email */}
              <div className="flex items-start gap-3 mb-4 pb-4" style={{ borderBottom: "1px solid #e5e5ea" }}>
                <div className="w-9 h-9 rounded-xl bg-[#f5f5f7] flex items-center justify-center flex-shrink-0 text-[#6e6e73]">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-[#6e6e73] uppercase mb-0.5" style={{ fontSize: "10px", letterSpacing: "0.08em" }}>Email</p>
                  <p className="font-light text-[#1d1d1f] truncate" style={{ fontSize: "13px" }}>
                    {professional.email}
                  </p>
                </div>
              </div>

              {/* Ubicación */}
              <div className="flex items-start gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-[#f5f5f7] flex items-center justify-center flex-shrink-0 text-[#6e6e73]">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-[#6e6e73] uppercase mb-0.5" style={{ fontSize: "10px", letterSpacing: "0.08em" }}>Ubicación</p>
                  <p className="font-light text-[#1d1d1f]" style={{ fontSize: "13px" }}>
                    {professional.location}
                  </p>
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-3">
                <a
                  href={professional.personalWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center rounded-full text-white transition-colors duration-150"
                  style={{ fontSize: "15px", fontWeight: 400, padding: "13px", background: "#00C853" }}
                >
                  Agendar hora
                </a>

                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-[#d2d2d7] transition-colors duration-150 hover:border-[#1d1d1f]"
                  style={{ fontSize: "15px", fontWeight: 400, padding: "12px", color: "#1d1d1f" }}
                >
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.488" />
                  </svg>
                  Escribir por WhatsApp
                </a>
              </div>

              <p className="text-center mt-4 font-light text-[#6e6e73]" style={{ fontSize: "11px" }}>
                Al agendar aceptas los{" "}
                <Link href="/politica" className="text-[#00C853] hover:underline underline-offset-4">
                  términos de Medify
                </Link>
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
