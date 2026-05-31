"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

/* ─── Mock data ─────────────────────────────────────────────────────── */
const PROFESSIONALS = [
  {
    id: "dennis-beltran",
    name: "Dennis Beltrán",
    role: "Psicóloga",
    rating: 4.9,
    reviews: 204,
    description: "Psicóloga clínica especializada en terapia cognitivo-conductual.",
    image: "/dennisbeltran.png",
    location: "Chillán",
    available: true,
  },
  {
    id: "marcelo-vilches",
    name: "Marcelo Vilches",
    role: "Tecnólogo Médico",
    rating: 4.8,
    reviews: 180,
    description: "Tecnólogo Médico especializado en morfofisiopatología y citodiagnóstico.",
    image: "/marcelovilches.png",
    location: "Chillán",
    available: true,
  },
  {
    id: "cristian-becerra",
    name: "Cristian Becerra",
    role: "Medicina Complementaria",
    rating: 4.7,
    reviews: 139,
    description: "Medicina Complementaria, especializado en Medicina Tradicional China, acupuntura y Reiki.",
    image: "/cristianbecerra.png",
    location: "Chillán",
    available: true,
  },
];

const SPECIALTIES_OPTIONS = [...new Set(PROFESSIONALS.map((p) => p.role))];
const CITIES_OPTIONS = [...new Set(PROFESSIONALS.map((p) => p.location))];

/* ─── Star rating ─────────────────────────────────────────────────── */
function Stars({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <svg
          key={n}
          className="w-3.5 h-3.5"
          viewBox="0 0 20 20"
          fill={n <= Math.round(rating) ? "#F59E0B" : "#E5E7EB"}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

/* ─── Professional card ───────────────────────────────────────────── */
function ProfessionalCard({ p }) {
  return (
    <div className="bg-white rounded-2xl border border-[#d2d2d7] overflow-hidden flex flex-col hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-shadow duration-200">
      {/* Image */}
      <div className="relative w-full aspect-[4/3] bg-[#f5f5f7]">
        <Image
          src={p.image}
          alt={p.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-top"
        />
        {p.available && (
          <span
            className="absolute top-3 right-3 rounded-full px-2.5 py-1 text-white"
            style={{ fontSize: "11px", fontWeight: 500, background: "#00C853" }}
          >
            Disponible
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <p style={{ fontSize: "12px", color: "#6e6e73", marginBottom: "4px" }}>
          {p.role}
        </p>
        <h3
          className="font-semibold text-[#1d1d1f] mb-2"
          style={{ fontSize: "17px", letterSpacing: "-0.015em" }}
        >
          {p.name}
        </h3>

        <div className="flex items-center gap-2 mb-3">
          <Stars rating={p.rating} />
          <span style={{ fontSize: "12px", color: "#6e6e73" }}>
            {p.rating} ({p.reviews})
          </span>
        </div>

        <p
          className="font-light text-[#6e6e73] leading-relaxed flex-1 mb-4"
          style={{ fontSize: "14px" }}
        >
          {p.description}
        </p>

        <div className="flex items-center gap-1.5 mb-4" style={{ color: "#6e6e73", fontSize: "13px" }}>
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {p.location}
        </div>

        <Link
          href={`/marketplace/${p.id}`}
          className="inline-flex items-center justify-center rounded-full text-white transition-colors duration-150"
          style={{ fontSize: "15px", fontWeight: 400, padding: "10px 20px", background: "#00C853" }}
        >
          Ver perfil
        </Link>
      </div>
    </div>
  );
}

/* ─── Main page ───────────────────────────────────────────────────── */
export default function Marketplace() {
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [city, setCity] = useState("");
  const [available, setAvailable] = useState(false);

  const filtered = PROFESSIONALS.filter((p) => {
    const q = search.toLowerCase();
    return (
      (p.name.toLowerCase().includes(q) || p.role.toLowerCase().includes(q)) &&
      (specialty ? p.role === specialty : true) &&
      (city ? p.location === city : true) &&
      (available ? p.available : true)
    );
  });

  return (
    <div className="min-h-screen bg-white">

      {/* ── Header ── */}
      <div className="bg-[#f5f5f7] px-6 pt-16 pb-12">
        <div className="max-w-[980px] mx-auto">
          <p
            className="font-semibold text-[#6e6e73] uppercase mb-3"
            style={{ fontSize: "12px", letterSpacing: "0.08em" }}
          >
            Marketplace
          </p>
          <h1
            className="font-semibold text-[#1d1d1f] leading-[1.1] mb-4"
            style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", letterSpacing: "-0.025em" }}
          >
            Encuentra al especialista que necesitas.
          </h1>
          <p className="text-[17px] font-light text-[#6e6e73] leading-relaxed max-w-xl">
            Todos los profesionales en Medify son verificados. Reserva tu hora directamente, sin llamadas.
          </p>
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="border-b border-[#d2d2d7] bg-white sticky top-[44px] z-40">
        <div className="max-w-[980px] mx-auto px-6">
          <div className="flex flex-wrap items-center gap-3 py-3">

            {/* Search */}
            <div className="relative flex-1 min-w-[180px] max-w-[280px]">
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#86868b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Nombre o especialidad..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#d2d2d7] bg-[#f5f5f7] text-[#1d1d1f] placeholder-[#86868b] outline-none focus:bg-white focus:border-[#00C853] focus:ring-2 focus:ring-[#00C853]/10 transition-all"
                style={{ fontSize: "14px" }}
              />
            </div>

            {/* Divider */}
            <div className="h-6 w-px bg-[#d2d2d7] hidden sm:block" />

            {/* Specialty */}
            <div className="relative">
              <select
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                className="appearance-none rounded-xl border px-4 pr-9 py-2.5 outline-none focus:border-[#00C853] focus:ring-2 focus:ring-[#00C853]/10 transition-all bg-white cursor-pointer"
                style={{
                  fontSize: "14px",
                  borderColor: specialty ? "#00C853" : "#d2d2d7",
                  color: specialty ? "#00C853" : "#6e6e73",
                  fontWeight: specialty ? 500 : 400,
                }}
              >
                <option value="">Especialidad</option>
                {SPECIALTIES_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none text-[#86868b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* City */}
            <div className="relative">
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="appearance-none rounded-xl border px-4 pr-9 py-2.5 outline-none focus:border-[#00C853] focus:ring-2 focus:ring-[#00C853]/10 transition-all bg-white cursor-pointer"
                style={{
                  fontSize: "14px",
                  borderColor: city ? "#00C853" : "#d2d2d7",
                  color: city ? "#00C853" : "#6e6e73",
                  fontWeight: city ? 500 : 400,
                }}
              >
                <option value="">Ciudad</option>
                {CITIES_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none text-[#86868b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* Divider */}
            <div className="h-6 w-px bg-[#d2d2d7] hidden sm:block" />

            {/* Available toggle — Apple-style pill */}
            <button
              onClick={() => setAvailable((v) => !v)}
              className="flex items-center gap-2 rounded-xl px-4 py-2.5 transition-all duration-150 border"
              style={{
                fontSize: "14px",
                fontWeight: 400,
                borderColor: available ? "#00C853" : "#d2d2d7",
                color: available ? "#00C853" : "#6e6e73",
                background: available ? "rgba(0,200,83,0.07)" : "#ffffff",
              }}
            >
              {/* Toggle pill */}
              <span
                className="relative flex-shrink-0 transition-all duration-200"
                style={{
                  width: "30px",
                  height: "18px",
                  borderRadius: "9px",
                  background: available ? "#00C853" : "#d2d2d7",
                  display: "inline-block",
                }}
              >
                <span
                  className="absolute top-[3px] transition-all duration-200"
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: "#ffffff",
                    left: available ? "15px" : "3px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.18)",
                  }}
                />
              </span>
              Disponibles ahora
            </button>

            {/* Clear */}
            {(search || specialty || city || available) && (
              <button
                onClick={() => { setSearch(""); setSpecialty(""); setCity(""); setAvailable(false); }}
                className="flex items-center gap-1.5 rounded-xl px-3 py-2.5 border border-[#d2d2d7] text-[#6e6e73] hover:text-[#1d1d1f] hover:border-[#1d1d1f] transition-all duration-150"
                style={{ fontSize: "13px" }}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Limpiar
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Results ── */}
      <div className="max-w-[980px] mx-auto px-6 py-12">
        {/* Count */}
        <p className="font-normal text-[#6e6e73] mb-8" style={{ fontSize: "14px" }}>
          {filtered.length} profesionale{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
        </p>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((p) => (
              <ProfessionalCard key={p.id} p={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-[#f5f5f7] rounded-2xl">
            <p className="font-semibold text-[#1d1d1f] mb-2" style={{ fontSize: "17px" }}>
              Sin resultados
            </p>
            <p className="font-light text-[#6e6e73] mb-6" style={{ fontSize: "15px" }}>
              No encontramos profesionales con esos filtros.
            </p>
            <button
              onClick={() => { setSearch(""); setSpecialty(""); setCity(""); setAvailable(false); }}
              className="inline-flex items-center justify-center rounded-full border border-[#00C853] px-5 py-2.5 text-[#00C853] hover:bg-[#00C853] hover:text-white transition-colors duration-150"
              style={{ fontSize: "15px" }}
            >
              Ver todos
            </button>
          </div>
        )}

        {/* Load more */}
        {filtered.length > 0 && (
          <div className="mt-12 text-center">
            <button
              className="inline-flex items-center justify-center rounded-full border border-[#d2d2d7] px-6 py-3 text-[#1d1d1f] hover:border-[#1d1d1f] transition-colors duration-150"
              style={{ fontSize: "15px" }}
            >
              Ver más profesionales
            </button>
          </div>
        )}
      </div>

      {/* ── CTA profesionales ── */}
      <div className="bg-[#f5f5f7] border-t border-[#d2d2d7] px-6 py-16">
        <div className="max-w-[680px] mx-auto text-center">
          <p
            className="font-semibold text-[#6e6e73] uppercase mb-4"
            style={{ fontSize: "12px", letterSpacing: "0.08em" }}
          >
            ¿Eres profesional?
          </p>
          <h2
            className="font-semibold text-[#1d1d1f] leading-[1.1] mb-4"
            style={{ fontSize: "clamp(1.5rem,3.5vw,2.2rem)", letterSpacing: "-0.025em" }}
          >
            Únete a Medify y llega a más pacientes.
          </h2>
          <p className="font-light text-[#6e6e73] leading-relaxed mb-8" style={{ fontSize: "17px" }}>
            Crea tu perfil, elige tu plan y empieza a recibir reservas directas desde todo Chile.
          </p>
          <Link
            href="/precios"
            className="inline-flex items-center justify-center rounded-full text-white transition-colors duration-150"
            style={{ fontSize: "17px", fontWeight: 400, padding: "13px 28px", background: "#00C853" }}
          >
            Ver planes y precios
          </Link>
        </div>
      </div>
    </div>
  );
}
