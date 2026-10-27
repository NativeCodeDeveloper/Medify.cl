"use client";
import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Building2, ChevronRight, MapPin, BadgeCheck,
  UserRound, Search, ChevronDown,
} from "lucide-react";
import { usePerfiles } from "./usePerfiles";

/* ─── Datos ──────────────────────────────────────────────────────────── */
/* Solo lo que Medify hace de verdad: no cobra ni gestiona reservas, no valida títulos automáticamente */
const BENEFITS = [
  { title: "Perfiles revisados",    text: "Nuestro equipo revisa cada perfil antes de publicarlo." },
  { title: "Contacto directo",      text: "Agenda en la agenda del profesional o escríbele por WhatsApp." },
  { title: "Opiniones reales",      text: "Lee las reseñas de otros pacientes antes de elegir." },
  { title: "Sin costo para ti",     text: "Buscar y contactar profesionales en Medify es gratis." },
];


const STATS = [
  { valor: "+2.500", label: "Profesionales" },
  { valor: "+35.000", label: "Pacientes" },
  { valor: "+50", label: "Especialidades" },
  { valor: "+120.000", label: "Reservas realizadas" },
];

/* Opciones de los filtros: salen de los perfiles cargados (estáticos + registrados) */
function opcionesFiltros(perfiles) {
  const unicos = (fn) => [...new Set(perfiles.map(fn).filter(Boolean))];
  return {
    ciudades: ["Todas las ciudades", ...unicos((p) => p.ciudad || p.comuna || p.ubicacion)],
    modalidades: ["Todas las modalidades", ...unicos((p) => p.modalidad_atencion)],
    especialidades: ["Todos los campos de estudio", ...unicos((p) => p.especialidad_principal)],
  };
}

/* ─── Hero con imagen y gradiente verde ──────────────────────────────── */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#1d1d1f] pb-16 pt-10">
      {/* Imagen derecha — corte limpio sin gradientes */}
      <div className="absolute inset-y-0 right-0 hidden w-[40%] lg:block">
        <Image
          src="/imgmedifyhero.png"
          alt="Profesional de salud"
          fill
          sizes="40vw"
          className="object-cover object-top"
          priority
        />
        {/* fade izquierdo para integrar con fondo oscuro */}
        <div
          className="absolute inset-y-0 left-0 w-32"
          style={{ background: "linear-gradient(to right, #1d1d1f, transparent)" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1100px] px-5 sm:px-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-[#00C853]">
          Marketplace · Red Medify
        </p>
        <h1
          className="font-semibold leading-[1.06] text-white"
          style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", letterSpacing: "-0.03em", maxWidth: "640px" }}
        >
          Encuentra y reserva con los mejores profesionales de salud de Chile
        </h1>
        <p className="mt-4 font-light leading-relaxed text-white/70" style={{ fontSize: "16px", maxWidth: "480px" }}>
          Psicólogos, kinesiólogos, nutricionistas, médicos y más. Agenda online en minutos.
        </p>
      </div>
    </section>
  );
}

/* ─── Barra de búsqueda flotante ─────────────────────────────────────── */
function SearchBar({ search, setSearch, city, setCity, modality, setModality, specialty, setSpecialty, onBuscar, opciones }) {
  const selectClassName = "mt-1 h-8 w-full appearance-none bg-transparent pr-8 text-[14px] font-medium text-[#1d1d1f] outline-none cursor-pointer";

  return (
    <div className="relative z-20 mx-auto -mt-5 max-w-[1100px] px-5 sm:px-8">
      <form
        onSubmit={(e) => { e.preventDefault(); onBuscar(); }}
        className="overflow-hidden rounded-2xl border border-[#d2d2d7] bg-white shadow-[0_12px_45px_rgba(0,0,0,0.14)]"
      >
        <div className="grid border-b border-[#e1e1e5] md:grid-cols-3">
          <label className="relative min-h-[76px] border-b border-[#e1e1e5] px-5 py-3 md:border-b-0 md:border-r">
            <span className="block text-[10px] font-bold uppercase tracking-[0.12em] text-[#86868b]">Campo de estudio</span>
            <select value={specialty} onChange={(e) => setSpecialty(e.target.value)} className={selectClassName}>
              {opciones.especialidades.map((option) => <option key={option}>{option}</option>)}
            </select>
            <ChevronDown size={15} className="pointer-events-none absolute bottom-[25px] right-5 text-[#86868b]" />
          </label>

          <label className="relative min-h-[76px] border-b border-[#e1e1e5] px-5 py-3 md:border-b-0 md:border-r">
            <span className="block text-[10px] font-bold uppercase tracking-[0.12em] text-[#86868b]">Ciudad</span>
            <select value={city} onChange={(e) => setCity(e.target.value)} className={selectClassName}>
              {opciones.ciudades.map((option) => <option key={option}>{option}</option>)}
            </select>
            <ChevronDown size={15} className="pointer-events-none absolute bottom-[25px] right-5 text-[#86868b]" />
          </label>

          <label className="relative min-h-[76px] px-5 py-3">
            <span className="block text-[10px] font-bold uppercase tracking-[0.12em] text-[#86868b]">Modalidad</span>
            <select value={modality} onChange={(e) => setModality(e.target.value)} className={selectClassName}>
              {opciones.modalidades.map((option) => <option key={option}>{option}</option>)}
            </select>
            <ChevronDown size={15} className="pointer-events-none absolute bottom-[25px] right-5 text-[#86868b]" />
          </label>
        </div>

        <div className="flex flex-col gap-3 p-3 sm:flex-row">
          <label className="flex min-h-12 flex-1 items-center gap-3 rounded-xl bg-[#f5f5f7] px-4 ring-1 ring-transparent transition focus-within:bg-white focus-within:ring-[#00C853]">
            <Search size={18} className="shrink-0 text-[#6e6e73]" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar profesional o centro por nombre"
              aria-label="Buscar profesional o centro por nombre"
              className="h-12 w-full bg-transparent text-[14px] text-[#1d1d1f] placeholder:text-[#86868b] outline-none"
            />
          </label>
          <button type="submit" className="h-12 rounded-xl bg-[#00C853] px-8 text-[13px] font-semibold text-white transition hover:bg-[#00b84c] focus:outline-none focus:ring-2 focus:ring-[#00C853] focus:ring-offset-2">
            Buscar
          </button>
        </div>
      </form>
    </div>
  );
}

/* ─── Beneficios ─────────────────────────────────────────────────────── */
function Benefits() {
  return (
    <section className="border-b border-[#d2d2d7] bg-white py-9">
      <div className="mx-auto grid max-w-[1100px] gap-5 px-5 sm:px-8 sm:grid-cols-2 xl:grid-cols-4">
        {BENEFITS.map((b) => (
          <div key={b.title} className="border-l-2 border-[#00C853] pl-4">
            <h3 className="text-[13px] font-semibold text-[#1d1d1f]">{b.title}</h3>
            <p className="mt-1 text-[12px] leading-5 text-[#6e6e73]">{b.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Tarjeta de marketplace ────────────────────────────────────────── */
function ProfessionalCard({ p }) {
  const esProfesional = p.es_profesional !== false;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-[#dedee3] bg-white shadow-[0_10px_35px_rgba(29,29,31,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[#b8e8ca] hover:shadow-[0_20px_50px_rgba(29,29,31,0.12)]">
      <div className="relative h-56 overflow-hidden bg-[#eef1ef]">
        <Image
          src={p.imagen_url || "/doctores1.png"}
          alt={p.nombre}
          fill
          sizes="(max-width:768px) 100vw, (max-width:1100px) 50vw, 33vw"
          className="object-cover object-top transition duration-500 group-hover:scale-[1.025]"
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#00a846]">{p.especialidad_principal}</p>
            <h3 className="mt-1 flex items-center gap-2 text-[19px] font-semibold leading-tight tracking-[-0.025em] text-[#1d1d1f]">
              {p.nombre}
              {esProfesional && <BadgeCheck size={24} className="shrink-0 fill-[#00C853] text-white" />}
            </h3>
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-[#f6f7f6] p-3.5">
          <div className="flex items-start gap-2.5">
            <MapPin size={16} className="mt-0.5 shrink-0 text-[#00a846]" />
            <div>
              <p className="text-[12px] font-semibold text-[#1d1d1f]">{p.ciudad || p.ubicacion}</p>
              <p className="mt-0.5 text-[11px] leading-4 text-[#6e6e73]">{p.direccion || p.ubicacion}</p>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-5">
          {/* Lleva al perfil en Medify; desde ahí el paciente puede agendar o escribir por WhatsApp */}
          <Link
            href={`/marketplace/${p.id}`}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#111d17] px-4 py-3 text-[12px] font-semibold text-white transition hover:bg-[#00a846] focus:outline-none focus:ring-2 focus:ring-[#00C853] focus:ring-offset-2"
          >
            <UserRound size={15} /> Ver perfil
          </Link>
        </div>
      </div>
    </article>
  );
}

/* ─── Grid de profesionales ──────────────────────────────────────────── */
function ProfessionalsSection({ professionals }) {
  return (
    <section className="bg-[#f5f5f7] py-10">
      <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
        <div className="mb-5 flex items-baseline justify-between">
          <h2 className="font-semibold text-[#1d1d1f]" style={{ fontSize: "18px", letterSpacing: "-0.02em" }}>
            Profesionales destacados
          </h2>
          <span className="text-[12px] text-[#6e6e73]">
            {professionals.length} resultado{professionals.length !== 1 ? "s" : ""}
          </span>
        </div>
        {professionals.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {professionals.map((p) => <ProfessionalCard key={p.id} p={p} />)}
          </div>
        ) : (
          <div className="rounded-2xl bg-white py-16 text-center border border-[#d2d2d7]">
            <p className="font-semibold text-[#1d1d1f]">Sin resultados</p>
            <p className="mt-1 text-[13px] text-[#6e6e73]">Prueba con otros filtros.</p>
          </div>
        )}
      </div>
    </section>
  );
}

/* ─── Centros Médicos y Clínicas (carrusel horizontal) ─────────────── */
/* Primero los centros registrados en /unirse y aprobados; después los cargados a mano en el código. */
function ClinicsSection({ perfiles }) {
  const centros = perfiles.filter((p) => p.es_profesional === false);
  const filaRef = useRef(null);
  if (!centros.length) return null;

  const mover = (dir) => {
    const fila = filaRef.current;
    if (fila) fila.scrollBy({ left: dir * fila.clientWidth * 0.9, behavior: "smooth" });
  };

  return (
    <section className="border-t border-[#d2d2d7] bg-white py-10">
      <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-semibold text-[#1d1d1f]" style={{ fontSize: "18px", letterSpacing: "-0.02em" }}>
              Centros médicos y clínicas
            </h2>
            <p className="mt-1 text-[12px] text-[#6e6e73]">Instituciones de la Red Medify</p>
          </div>
          {centros.length > 1 && (
            <div className="hidden gap-2 sm:flex">
              {[-1, 1].map((dir) => (
                <button key={dir} type="button" onClick={() => mover(dir)} aria-label={dir < 0 ? "Anteriores" : "Siguientes"}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d2d2d7] text-[#6e6e73] transition hover:border-[#1d1d1f] hover:text-[#1d1d1f]">
                  <ChevronRight size={16} className={dir < 0 ? "rotate-180" : ""} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Fila deslizable: con el dedo en celular, con las flechas o el trackpad en escritorio */}
        <div ref={filaRef}
          className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-5 px-5 pb-2 sm:mx-0 sm:scroll-px-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {centros.map((c) => {
            const etiquetas = (c.especialidades?.length ? c.especialidades : (c.servicios ?? []).map((sv) => sv.nombre)).slice(0, 3);
            const lugar = c.comuna && c.region ? `${c.comuna}, ${c.region}` : (c.ubicacion || c.ciudad);
            return (
              <article key={c.id}
                className="flex w-[85%] flex-shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-[#d2d2d7] bg-white transition hover:shadow-md sm:w-[calc((100%-1.5rem)/3)]">
                <div className="flex items-center gap-3 border-b border-[#f5f5f7] p-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#f5f5f7]">
                    {c.imagen_url
                      ? <Image src={c.imagen_url} alt="" width={44} height={44} className="h-full w-full object-cover" />
                      : <Building2 size={20} className="text-[#6e6e73]" strokeWidth={1.6} />}
                  </span>
                  <div className="min-w-0">
                    {c.tipo && <p className="text-[10px] font-semibold uppercase tracking-wide text-[#86868b]">{c.tipo}</p>}
                    <h3 className="truncate font-semibold text-[#1d1d1f]" style={{ fontSize: "13px", letterSpacing: "-0.01em" }}>{c.nombre}</h3>
                    {lugar && <p className="truncate text-[11px] text-[#86868b]">{lugar}</p>}
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-4">
                  {etiquetas.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {etiquetas.map((e) => (
                        <span key={e} className="rounded-full bg-[#f5f5f7] px-2.5 py-1 text-[10px] font-semibold text-[#6e6e73]">{e}</span>
                      ))}
                    </div>
                  )}
                  <div className="mt-auto flex items-center justify-between gap-3 pt-4">
                    <span className="text-[11px] text-[#86868b]">
                      {c.profesionales_count ? `${c.profesionales_count} profesionales` : c.especialidad_principal}
                    </span>
                    <Link href={`/marketplace/${c.id}`}
                      className="flex flex-shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-semibold text-white transition hover:opacity-90"
                      style={{ background: "#00C853" }}>
                      Ver más <ChevronRight size={11} />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Ubicaciones de profesionales y consultas ──────────────────────── */
const FILTROS_MAPA = [
  { key: "todos", label: "Todos" },
  { key: "profesional", label: "Profesionales" },
  { key: "centro", label: "Clínicas" },
];

function NearbyMap({ perfiles }) {
  const [busqueda, setBusqueda] = useState("");
  const [tipo, setTipo] = useState("todos");
  const listaRef = useRef(null);

  // Todos los que tienen ubicación: coordenadas (perfiles cargados a mano) o mapa de Google (registrados)
  const conUbicacion = perfiles.filter((p) => p.url_mapa || (p.lat && p.lng));
  const q = busqueda.trim().toLowerCase();
  const visibles = conUbicacion.filter((p) =>
    (tipo === "todos" || (tipo === "profesional" ? p.es_profesional !== false : p.es_profesional === false)) &&
    (!q || [p.nombre, p.especialidad_principal, p.ubicacion, p.comuna].some((v) => v?.toLowerCase().includes(q)))
  );

  const [selectedId, setSelectedId] = useState(null);
  const selected = visibles.find((p) => p.id === selectedId) || visibles[0];
  const mapUrl = selected?.url_mapa || (selected && `https://maps.google.com/maps?q=${selected.lat},${selected.lng}&z=15&output=embed`);

  // Flechas del carrusel: avanzan ~3 tarjetas hacia arriba/abajo
  const mover = (dir) => listaRef.current?.scrollBy({ top: dir * 210, behavior: "smooth" });

  return (
    <section className="border-t border-[#d2d2d7] bg-[#f5f5f7]">
      <div className="mx-auto max-w-[1100px] px-5 py-10 sm:px-8">
        <div className="overflow-hidden rounded-2xl border border-[#d2d2d7] bg-white lg:grid lg:grid-cols-[320px_1fr]">

          {/* Panel izquierdo: filtros + carrusel vertical */}
          <div className="flex flex-col border-b border-[#d2d2d7] p-6 lg:border-b-0 lg:border-r">
            <h2 className="font-semibold text-[#1d1d1f]" style={{ fontSize: "18px", letterSpacing: "-0.02em" }}>
              Ubicaciones disponibles
            </h2>
            <p className="mt-1.5 text-[12px] leading-5 text-[#6e6e73]">
              Busca un profesional o clínica y revisa su ubicación antes de agendar.
            </p>

            <div className="relative mt-4">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#86868b]" />
              <input
                type="search"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar por nombre, especialidad o comuna"
                className="w-full rounded-xl border border-[#d2d2d7] bg-[#f5f5f7] py-2.5 pl-9 pr-3 text-[13px] text-[#1d1d1f] outline-none transition focus:border-[#00C853] focus:bg-white focus:ring-2 focus:ring-[#00C853]/10"
              />
            </div>
            <div className="mt-3 grid grid-cols-3 rounded-xl bg-[#f5f5f7] p-1">
              {FILTROS_MAPA.map((f) => (
                <button key={f.key} type="button" onClick={() => setTipo(f.key)}
                  className="rounded-lg py-1.5 text-[12px] transition"
                  style={{
                    fontWeight: tipo === f.key ? 600 : 400,
                    color: tipo === f.key ? "#1d1d1f" : "#6e6e73",
                    background: tipo === f.key ? "#ffffff" : "transparent",
                    boxShadow: tipo === f.key ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                  }}>
                  {f.label}
                </button>
              ))}
            </div>

            {/* Carrusel vertical: altura fija, se desplaza hacia abajo con la rueda o con las flechas */}
            <div className="relative mt-4">
              <button type="button" onClick={() => mover(-1)} aria-label="Ver anteriores"
                className="absolute -top-1 left-1/2 z-10 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full border border-[#d2d2d7] bg-white text-[#6e6e73] shadow-sm hover:text-[#1d1d1f]">
                <ChevronDown size={14} className="rotate-180" />
              </button>
              <div ref={listaRef}
                className="h-[300px] snap-y snap-mandatory space-y-2 overflow-y-auto py-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {visibles.length === 0 ? (
                  <p className="py-10 text-center text-[12px] text-[#86868b]">Sin resultados para esta búsqueda.</p>
                ) : visibles.map((p) => (
                  <button
                    type="button"
                    key={p.id}
                    onClick={() => setSelectedId(p.id)}
                    className={`flex w-full snap-start items-center gap-3 rounded-xl p-2.5 text-left transition ${selected?.id === p.id ? "bg-[#f5f5f7] ring-1 ring-[#d2d2d7]" : "hover:bg-[#f5f5f7]"}`}
                  >
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full"
                      style={{ border: `2px solid ${selected?.id === p.id ? "#00C853" : "#e5e5ea"}` }}>
                      <Image src={p.imagen_url || "/doctores1.png"} alt={p.nombre} fill sizes="40px" className="object-cover object-top" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[12px] font-semibold text-[#1d1d1f]">{p.nombre}</p>
                      <p className="truncate text-[11px] text-[#86868b]">{p.especialidad_principal} · {p.comuna || p.ubicacion}</p>
                    </div>
                    <ChevronRight size={15} className={selected?.id === p.id ? "text-[#00a846]" : "text-[#a1a1a6]"} />
                  </button>
                ))}
              </div>
              <button type="button" onClick={() => mover(1)} aria-label="Ver siguientes"
                className="absolute -bottom-1 left-1/2 z-10 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full border border-[#d2d2d7] bg-white text-[#6e6e73] shadow-sm hover:text-[#1d1d1f]">
                <ChevronDown size={14} />
              </button>
            </div>
            <p className="mt-3 text-center text-[11px] text-[#86868b]">
              {visibles.length} {visibles.length === 1 ? "ubicación" : "ubicaciones"}
            </p>
          </div>

          {/* Mapa */}
          <div className="relative min-h-[390px] bg-[#e8ece9] lg:min-h-0">
            {selected ? (
              <iframe
                key={selected.id}
                src={mapUrl}
                title={`Ubicación de ${selected.nombre}`}
                className="absolute inset-0 h-full w-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <p className="absolute inset-0 flex items-center justify-center text-[13px] text-[#6e6e73]">Selecciona una ubicación</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Stats ──────────────────────────────────────────────────────────── */
function Stats() {
  return (
    <section className="border-t border-[#d2d2d7] bg-white">
      <div className="mx-auto grid max-w-[1100px] grid-cols-2 px-5 sm:px-8 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className={`py-7 text-center ${i < 3 ? "border-r-0 lg:border-r border-[#d2d2d7]" : ""} ${i < 2 ? "border-b border-[#d2d2d7] lg:border-b-0" : ""}`}
          >
            <p className="font-semibold text-[#1d1d1f]" style={{ fontSize: "clamp(1.3rem,2.2vw,1.8rem)", letterSpacing: "-0.03em" }}>
              {s.valor}
            </p>
            <p className="mt-0.5 text-[11px] text-[#6e6e73]">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── CTA para profesionales ─────────────────────────────────────────── */
function ProCta() {
  return (
    <section className="bg-[#f5f5f7] px-5 py-8 sm:px-8">
      <div className="mx-auto max-w-[1100px]">
        {/* h-[160px] fuerza la altura compacta; overflow-hidden hace el corte horizontal */}
        <div className="overflow-hidden rounded-2xl bg-[#1d1d1f] lg:flex lg:h-[160px]">

          {/* Foto con corte limpio — sin gradientes */}
          <div className="relative hidden w-[200px] shrink-0 lg:block">
            <Image
              src="/jovenprof.jpg"
              alt="Profesional de salud"
              fill
              sizes="200px"
              className="object-cover object-top"
            />
          </div>

          {/* Línea separadora */}
          <div className="hidden w-px shrink-0 bg-white/10 lg:block" />

          {/* Contenido — centrado verticalmente */}
          <div className="flex flex-1 flex-col justify-center gap-4 p-6 lg:flex-row lg:items-center lg:gap-8">

            {/* Texto */}
            <div className="flex-1">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-[#00C853]">
                Para profesionales y centros
              </p>
              <h2
                className="font-semibold leading-tight text-white"
                style={{ fontSize: "clamp(1rem,1.8vw,1.4rem)", letterSpacing: "-0.02em" }}
              >
                ¿Eres profesional de la salud?
              </h2>
              <p className="mt-1 text-[12px] font-light text-white/50">
                Únete a Red Medify. Perfil propio, agenda online y más pacientes.
              </p>
            </div>

            {/* Bullets */}
            <div className="hidden shrink-0 grid-cols-2 gap-x-6 gap-y-1.5 lg:grid">
              {["Perfil verificado", "Agenda online", "Nuevos pacientes", "Pagos directos"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "#00C853" }} />
                  <span className="text-[12px] font-semibold text-white/70">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex shrink-0 items-center">
              <Link
                href="/unirse"
                className="rounded-xl px-6 py-2.5 text-[13px] font-semibold text-white transition hover:opacity-90"
                style={{ background: "#00C853" }}
              >
                Unirme
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Main ───────────────────────────────────────────────────────────── */
export default function Marketplace() {
  const [search, setSearch]     = useState("");
  const [city, setCity]         = useState("Todas las ciudades");
  const [modality, setModality] = useState("Todas las modalidades");
  const [specialty, setSpecialty] = useState("Todos los campos de estudio");

  const perfiles = usePerfiles();
  const opciones = useMemo(() => opcionesFiltros(perfiles), [perfiles]);

  const filtered = perfiles.filter((p) => {
    const q = search.toLowerCase();
    return (
      (!q || p.nombre.toLowerCase().includes(q) || p.tipo?.toLowerCase().includes(q)) &&
      (city === "Todas las ciudades" || (p.ciudad || p.comuna || p.ubicacion) === city) &&
      (modality === "Todas las modalidades" || p.modalidad_atencion === modality || p.modalidad_atencion === "Ambas") &&
      (specialty === "Todos los campos de estudio" || p.especialidad_principal === specialty)
    );
  });

  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <SearchBar
        search={search} setSearch={setSearch}
        city={city} setCity={setCity}
        modality={modality} setModality={setModality}
        specialty={specialty} setSpecialty={setSpecialty}
        onBuscar={() => document.getElementById("profesionales")?.scrollIntoView({ behavior: "smooth" })}
        opciones={opciones}
      />
      <Benefits />
      <div id="profesionales">
        <ProfessionalsSection professionals={filtered} />
      </div>
      <ClinicsSection perfiles={perfiles} />
      <NearbyMap perfiles={perfiles} />
      <Stats />
      <ProCta />
    </div>
  );
}
