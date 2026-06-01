"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
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

/* ─── Carrusel de reseñas ────────────────────────────────────────── */
function ReviewCarousel({ reviews }) {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx(i => (i - 1 + reviews.length) % reviews.length);
  const next = () => setIdx(i => (i + 1) % reviews.length);
  const r = reviews[idx];

  return (
    <div className="mb-7">
      <div className="rounded-2xl border border-[#d2d2d7] p-5 relative">
        {/* Reseña actual */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#f5f5f7] flex items-center justify-center flex-shrink-0">
              <span className="font-semibold text-[#6e6e73]" style={{ fontSize: "12px" }}>
                {r.author.charAt(0)}
              </span>
            </div>
            <div>
              <p className="font-medium text-[#1d1d1f]" style={{ fontSize: "13px" }}>{r.author}</p>
              <p className="font-light text-[#6e6e73]" style={{ fontSize: "11px" }}>{r.date}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {[1,2,3,4,5].map(n => (
              <svg key={n} className="w-3.5 h-3.5" viewBox="0 0 20 20" fill={n <= r.rating ? "#F59E0B" : "#E5E7EB"}>
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
        <p className="font-light text-[#424245] leading-relaxed" style={{ fontSize: "14px" }}>
          {r.comment}
        </p>
      </div>

      {/* Controles + contador */}
      <div className="flex items-center justify-between mt-3 px-1">
        <p className="font-light text-[#6e6e73]" style={{ fontSize: "12px" }}>
          {idx + 1} de {reviews.length} reseñas
        </p>
        <div className="flex items-center gap-2">
          <button onClick={prev}
            className="w-8 h-8 rounded-full border border-[#d2d2d7] flex items-center justify-center hover:border-[#1d1d1f] transition-colors">
            <svg className="w-4 h-4 text-[#1d1d1f]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          {/* Dots */}
          <div className="flex gap-1">
            {reviews.slice(0, Math.min(reviews.length, 5)).map((_, i) => (
              <button key={i} onClick={() => setIdx(i)}
                className="rounded-full transition-all"
                style={{ width: i === idx ? "16px" : "6px", height: "6px", background: i === idx ? "#1d1d1f" : "#d2d2d7" }} />
            ))}
            {reviews.length > 5 && <span style={{ fontSize: "10px", color: "#6e6e73" }}>…</span>}
          </div>
          <button onClick={next}
            className="w-8 h-8 rounded-full border border-[#d2d2d7] flex items-center justify-center hover:border-[#1d1d1f] transition-colors">
            <svg className="w-4 h-4 text-[#1d1d1f]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Star selector interactivo ─────────────────────────────────── */
function StarSelector({ value, onChange }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button key={n} type="button"
          onClick={() => onChange(n)}
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(0)}
          className="transition-transform hover:scale-110">
          <svg className="w-7 h-7" viewBox="0 0 20 20"
            fill={(hovered || value) >= n ? "#F59E0B" : "#E5E7EB"}>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      ))}
    </div>
  );
}

export default function ProfessionalProfile() {
  const params = useParams();
  const professional = PROFESSIONALS.find((p) => p.id === params.id);

  const [reviews, setReviews] = useState(professional?.resenas || []);
  const [newReview, setNewReview] = useState({ calificacion: 0, autor: "", comentario: "" });
  const [reviewSent, setReviewSent] = useState(false);

  const handleReviewSubmit = () => {
    if (!newReview.calificacion || !newReview.autor.trim() || !newReview.comentario.trim()) return;
    // TODO: POST /api/reviews/{professional.id}
    setReviews(prev => [{ id: Date.now(), ...newReview, date: new Date().toISOString().slice(0, 10) }, ...prev]);
    setNewReview({ calificacion: 0, autor: "", comentario: "" });
    setReviewSent(true);
    setTimeout(() => setReviewSent(false), 3000);
  };

  const whatsappHref = professional?.numero_whatsapp
    ? `https://wa.me/${professional.numero_whatsapp}?text=${encodeURIComponent(
        `Hola ${professional.nombre}, vi tu perfil en Medify y me gustaría agendar una hora.`
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
            <span style={{ color: "rgba(255,255,255,0.7)" }}>{professional.nombre}</span>
          </div>

          {/* Hero: foto + info */}
          <div className="flex flex-col sm:flex-row items-start gap-8">

            {/* Foto circular con ring verde */}
            <div className="flex-shrink-0"
              style={{ padding: "3px", borderRadius: "9999px", background: "linear-gradient(135deg,#00C853,#00e676)" }}>
              <div className="rounded-full overflow-hidden bg-[#1d1d1f]"
                style={{ width: "120px", height: "120px", border: "3px solid #000" }}>
                <Image src={professional.image} alt={professional.nombre}
                  width={120} height={120} className="w-full h-full object-cover object-top" />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="rounded-full px-3 py-1 font-medium"
                  style={{ fontSize: "12px", background: "rgba(0,200,83,0.15)", color: "#00C853" }}>
                  {professional.especialidad_principal}
                </span>
                {professional.modalidad_atencion && (
                  <span className="rounded-full px-3 py-1 font-medium"
                    style={{ fontSize: "12px", background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)" }}>
                    {professional.modalidad_atencion}
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
                {professional.nombre}
              </h1>

              <div className="flex items-center gap-3 mb-4">
                <Stars rating={professional.calificacion} />
                <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)" }}>
                  {professional.calificacion} · {professional.reviews} reseñas
                </span>
              </div>

              <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.45)", lineHeight: 1.65, maxWidth: "540px" }}>
                {professional.descripcion}
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
                    value: professional.modalidad_atencion || "Consultar",
                    icon: (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
                      </svg>
                    ),
                  },
                  {
                    label: "Ubicación",
                    value: professional.ubicacion,
                    icon: (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    ),
                  },
                  {
                    label: "Experiencia",
                    value: professional.anos_experiencia
                      ? `${professional.anos_experiencia} años`
                      : "Consultar",
                    icon: (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    ),
                  },
                  {
                    label: "Disponibilidad",
                    value: professional.disponibilidad || "Consultar",
                    icon: (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    ),
                  },
                  {
                    label: "Reseñas",
                    value: `${professional.calificacion} · ${professional.reviews} reseñas`,
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
                {professional.biografia || professional.descripcion}
              </p>
            </div>

            {/* ── Especialidades ── */}
            {professional.especialidades?.length > 0 && (
              <div className="rounded-2xl border border-[#d2d2d7] p-7">
                <h2 className="font-semibold text-[#1d1d1f] mb-4"
                  style={{ fontSize: "17px", letterSpacing: "-0.01em" }}>
                  Especialidades
                </h2>
                <div className="flex flex-wrap gap-2">
                  {professional.especialidades.map((s) => (
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
                    {professional.correo}
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
                    {professional.ubicacion}
                  </p>
                </div>
              </div>

              {/* Redes sociales — solo aparece si tiene al menos una */}
              {(professional.instagram || professional.facebook || professional.linkedin || professional.twitter) && (
                <div className="mb-5 pb-5" style={{ borderBottom: "1px solid #e5e5ea" }}>
                  <p className="font-semibold text-[#6e6e73] uppercase mb-3" style={{ fontSize: "10px", letterSpacing: "0.08em" }}>
                    Redes sociales
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {professional.instagram && (
                      <a href={professional.instagram} target="_blank" rel="noopener noreferrer"
                        className="w-9 h-9 rounded-xl bg-[#f5f5f7] flex items-center justify-center hover:bg-[#e5e5ea] transition-colors"
                        title="Instagram">
                        <svg className="w-4 h-4 text-[#1d1d1f]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                        </svg>
                      </a>
                    )}
                    {professional.facebook && (
                      <a href={professional.facebook} target="_blank" rel="noopener noreferrer"
                        className="w-9 h-9 rounded-xl bg-[#f5f5f7] flex items-center justify-center hover:bg-[#e5e5ea] transition-colors"
                        title="Facebook">
                        <svg className="w-4 h-4 text-[#1d1d1f]" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                        </svg>
                      </a>
                    )}
                    {professional.linkedin && (
                      <a href={professional.linkedin} target="_blank" rel="noopener noreferrer"
                        className="w-9 h-9 rounded-xl bg-[#f5f5f7] flex items-center justify-center hover:bg-[#e5e5ea] transition-colors"
                        title="LinkedIn">
                        <svg className="w-4 h-4 text-[#1d1d1f]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>
                    )}
                    {professional.twitter && (
                      <a href={professional.twitter} target="_blank" rel="noopener noreferrer"
                        className="w-9 h-9 rounded-xl bg-[#f5f5f7] flex items-center justify-center hover:bg-[#e5e5ea] transition-colors"
                        title="X (Twitter)">
                        <svg className="w-4 h-4 text-[#1d1d1f]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* CTAs */}
              <div className="space-y-3">
                <a
                  href={professional.sitio_web}
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

        {/* ── Mapa de ubicación ── */}
        {professional.url_mapa && (
          <div className="mt-8">
            <h2 className="font-semibold text-[#1d1d1f] mb-4"
              style={{ fontSize: "17px", letterSpacing: "-0.01em" }}>
              Ubicación
            </h2>
            <div className="relative rounded-2xl overflow-hidden border border-[#d2d2d7]"
              style={{ height: "320px" }}>
              {/* Mapa iframe */}
              <iframe
                src={professional.url_mapa}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Ubicación de ${professional.nombre}`}
              />
              {/* Card del profesional sobre el mapa */}
              <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-2xl p-3 shadow-xl"
                style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(8px)", border: "1px solid rgba(0,0,0,0.06)" }}>
                <div className="w-11 h-11 rounded-full overflow-hidden bg-[#f5f5f7] flex-shrink-0">
                  <img src={professional.image} alt={professional.nombre}
                    className="w-full h-full object-cover object-top" />
                </div>
                <div>
                  <p className="font-semibold text-[#1d1d1f]" style={{ fontSize: "13px", letterSpacing: "-0.01em" }}>
                    {professional.nombre}
                  </p>
                  <p className="font-light text-[#6e6e73]" style={{ fontSize: "11px" }}>
                    {professional.direccion || professional.ubicacion}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Reseñas de pacientes ── */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-[#1d1d1f]"
              style={{ fontSize: "17px", letterSpacing: "-0.01em" }}>
              Reseñas de pacientes
            </h2>
            <div className="flex items-center gap-2">
              <Stars rating={professional.calificacion} />
              <span className="font-medium text-[#1d1d1f]" style={{ fontSize: "14px" }}>
                {professional.calificacion}
              </span>
              <span className="font-light text-[#6e6e73]" style={{ fontSize: "13px" }}>
                ({reviews.length} reseñas)
              </span>
            </div>
          </div>

          {/* Carrusel de reseñas */}
          {reviews.length === 0 ? (
            <div className="rounded-2xl bg-[#f5f5f7] px-6 py-8 text-center mb-7">
              <p className="font-light text-[#6e6e73]" style={{ fontSize: "14px" }}>
                Sé el primero en dejar una reseña.
              </p>
            </div>
          ) : (
            <ReviewCarousel reviews={reviews} />
          )}

          {/* Formulario nueva reseña */}
          <div className="rounded-2xl bg-[#f5f5f7] p-6">
            <h3 className="font-semibold text-[#1d1d1f] mb-4" style={{ fontSize: "15px", letterSpacing: "-0.01em" }}>
              Califica tu experiencia
            </h3>

            <div className="space-y-4">
              {/* Estrellas */}
              <div>
                <p className="font-semibold text-[#6e6e73] uppercase mb-2" style={{ fontSize: "10px", letterSpacing: "0.08em" }}>
                  Tu calificación *
                </p>
                <StarSelector value={newReview.calificacion} onChange={v => setNewReview(p => ({ ...p, rating: v }))} />
              </div>

              {/* Nombre */}
              <div>
                <p className="font-semibold text-[#6e6e73] uppercase mb-2" style={{ fontSize: "10px", letterSpacing: "0.08em" }}>
                  Tu nombre *
                </p>
                <input
                  type="text"
                  placeholder="Ej: María G."
                  maxLength={40}
                  value={newReview.autor}
                  onChange={e => setNewReview(p => ({ ...p, author: e.target.value }))}
                  className="w-full rounded-xl border border-[#d2d2d7] px-4 py-2.5 text-[#1d1d1f] outline-none focus:border-[#00C853] focus:ring-2 focus:ring-[#00C853]/10 transition-all bg-white"
                  style={{ fontSize: "14px" }}
                />
              </div>

              {/* Comentario */}
              <div>
                <p className="font-semibold text-[#6e6e73] uppercase mb-2" style={{ fontSize: "10px", letterSpacing: "0.08em" }}>
                  Tu comentario * <span className="font-light normal-case">(máx. 200 caracteres)</span>
                </p>
                <textarea
                  rows={3}
                  maxLength={200}
                  placeholder="Cuenta brevemente cómo fue tu experiencia..."
                  value={newReview.comentario}
                  onChange={e => setNewReview(p => ({ ...p, comment: e.target.value }))}
                  className="w-full rounded-xl border border-[#d2d2d7] px-4 py-2.5 text-[#1d1d1f] outline-none focus:border-[#00C853] focus:ring-2 focus:ring-[#00C853]/10 transition-all bg-white resize-none"
                  style={{ fontSize: "14px" }}
                />
                <p className="text-right font-light text-[#86868b] mt-1" style={{ fontSize: "11px" }}>
                  {newReview.comentario.length}/200
                </p>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={handleReviewSubmit}
                  disabled={!newReview.calificacion || !newReview.autor.trim() || !newReview.comentario.trim()}
                  className="inline-flex items-center justify-center rounded-full text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ fontSize: "14px", fontWeight: 400, padding: "11px 24px", background: "#00C853" }}>
                  Enviar reseña
                </button>
                {reviewSent && (
                  <span className="flex items-center gap-1.5 font-medium text-[#00C853]" style={{ fontSize: "13px" }}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    ¡Gracias por tu reseña!
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
