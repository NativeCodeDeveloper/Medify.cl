"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Brain, Dumbbell, Leaf, Stethoscope, Baby, Smile,
  HeartPulse, Building2, ChevronRight, MapPin, BadgeCheck,
  CalendarDays, ExternalLink,
} from "lucide-react";
import { PROFESSIONALS } from "./data/professionals";

/* ─── Datos ──────────────────────────────────────────────────────────── */
const SPECIALTIES = [
  { nombre: "Psicología",       Icon: Brain,       color: "#3b82f6", bg: "#eff6ff", count: "124" },
  { nombre: "Kinesiología",     Icon: Dumbbell,    color: "#6366f1", bg: "#eef2ff", count: "98"  },
  { nombre: "Nutrición",        Icon: Leaf,        color: "#00C853", bg: "#f0fdf4", count: "76"  },
  { nombre: "Medicina General", Icon: Stethoscope, color: "#0ea5e9", bg: "#f0f9ff", count: "62"  },
  { nombre: "Pediatría",        Icon: Baby,        color: "#f97316", bg: "#fff7ed", count: "48"  },
  { nombre: "Odontología",      Icon: Smile,       color: "#06b6d4", bg: "#ecfeff", count: "57"  },
  { nombre: "Psiquiatría",      Icon: HeartPulse,  color: "#8b5cf6", bg: "#f5f3ff", count: "31"  },
  { nombre: "Enfermería",       Icon: HeartPulse,  color: "#ec4899", bg: "#fdf2f8", count: "44"  },
];

const BENEFITS = [
  { title: "Profesionales verificados",   text: "Cada perfil pasa por un proceso de validación de credenciales." },
  { title: "Reserva online segura",       text: "Tu información y pagos están protegidos en todo momento." },
  { title: "Cancelación flexible",        text: "Reprograma sin costo si no puedes asistir a tu sesión." },
  { title: "Atención humana",             text: "Soporte personalizado siempre que lo necesites." },
];

const MOCK_CENTROS = [
  {
    nombre: "Centro Médico Providencia",
    tipo: "Centro Médico",
    ubicacion: "Providencia, Santiago",
    especialidades: ["Medicina General", "Psicología", "Nutrición"],
    profesionales: 12,
  },
  {
    nombre: "Clínica Dental Norte",
    tipo: "Centro Odontológico",
    ubicacion: "Ñuñoa, Santiago",
    especialidades: ["Odontología General", "Ortodoncia", "Implantología"],
    profesionales: 5,
  },
  {
    nombre: "Clínica Bienestar Chillán",
    tipo: "Clínica",
    ubicacion: "Chillán, Ñuble",
    especialidades: ["Kinesiología", "Medicina Complementaria", "Fisioterapia"],
    profesionales: 8,
  },
];

const STATS = [
  { valor: "+2.500", label: "Profesionales" },
  { valor: "+35.000", label: "Pacientes" },
  { valor: "+50", label: "Especialidades" },
  { valor: "+120.000", label: "Reservas realizadas" },
];

const CITY_OPTIONS     = ["Todas las ciudades", ...new Set(PROFESSIONALS.map((p) => p.ubicacion))];
const MODALITY_OPTIONS = ["Todas", "Online", "Presencial", "Ambas"];
const SPECIALTY_OPTIONS = ["Todas", ...new Set(PROFESSIONALS.map((p) => p.especialidad_principal))];

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
function SearchBar({ search, setSearch, city, setCity, modality, setModality, specialty, setSpecialty, onBuscar }) {
  return (
    <div className="relative z-20 mx-auto -mt-5 max-w-[1100px] px-5 sm:px-8">
      <form
        onSubmit={(e) => { e.preventDefault(); onBuscar(); }}
        className="overflow-hidden rounded-2xl border border-[#d2d2d7] bg-white shadow-[0_8px_40px_rgba(0,0,0,0.13)] lg:grid lg:grid-cols-[1fr_1fr_1fr_1fr_auto]"
      >
        <label className="flex min-h-[64px] items-center gap-3 border-b border-[#d2d2d7] px-5 lg:border-b-0 lg:border-r">
          <span className="min-w-0 flex-1">
            <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#86868b]">Especialista</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Nombre o especialidad..."
              className="mt-0.5 h-7 w-full bg-transparent text-[14px] text-[#1d1d1f] placeholder-[#86868b] outline-none"
            />
          </span>
        </label>

        <label className="flex min-h-[64px] items-center gap-3 border-b border-[#d2d2d7] px-5 lg:border-b-0 lg:border-r">
          <span className="min-w-0 flex-1">
            <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#86868b]">Ciudad</span>
            <select value={city} onChange={(e) => setCity(e.target.value)} className="mt-0.5 h-7 w-full appearance-none bg-transparent text-[14px] text-[#1d1d1f] outline-none cursor-pointer">
              {CITY_OPTIONS.map((c) => <option key={c}>{c}</option>)}
            </select>
          </span>
        </label>

        <label className="flex min-h-[64px] items-center gap-3 border-b border-[#d2d2d7] px-5 lg:border-b-0 lg:border-r">
          <span className="min-w-0 flex-1">
            <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#86868b]">Modalidad</span>
            <select value={modality} onChange={(e) => setModality(e.target.value)} className="mt-0.5 h-7 w-full appearance-none bg-transparent text-[14px] text-[#1d1d1f] outline-none cursor-pointer">
              {MODALITY_OPTIONS.map((m) => <option key={m}>{m}</option>)}
            </select>
          </span>
        </label>

        <label className="flex min-h-[64px] items-center gap-3 border-b border-[#d2d2d7] px-5 lg:border-b-0 lg:border-r">
          <span className="min-w-0 flex-1">
            <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#86868b]">Especialidad</span>
            <select value={specialty} onChange={(e) => setSpecialty(e.target.value)} className="mt-0.5 h-7 w-full appearance-none bg-transparent text-[14px] text-[#1d1d1f] outline-none cursor-pointer">
              {SPECIALTY_OPTIONS.map((s) => <option key={s}>{s}</option>)}
            </select>
          </span>
        </label>

        <div className="flex items-center p-3">
          <button type="submit" className="h-11 w-full rounded-xl px-8 text-[13px] font-semibold text-white transition hover:opacity-90" style={{ background: "#00C853", minWidth: "100px" }}>
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

/* ─── Especialidades con íconos alineados ────────────────────────────── */
function Specialties({ onSpecialtyClick }) {
  return (
    <section className="mx-auto max-w-[1100px] px-5 py-10 sm:px-8">
      <h2 className="mb-5 font-semibold text-[#1d1d1f]" style={{ fontSize: "18px", letterSpacing: "-0.02em" }}>
        Especialidades más buscadas
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
        {SPECIALTIES.map(({ nombre, Icon, color, bg, count }) => (
          <button
            key={nombre}
            onClick={() => onSpecialtyClick(nombre)}
            className="group flex flex-col items-center rounded-xl border border-[#d2d2d7] bg-white px-3 py-5 text-center transition hover:shadow-sm"
          >
            <span
              className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl"
              style={{ background: bg }}
            >
              <Icon size={20} style={{ color }} strokeWidth={1.8} />
            </span>
            <span className="block text-[12px] font-semibold leading-tight text-[#1d1d1f]">{nombre}</span>
            <span className="mt-1 block text-[11px] text-[#86868b]">{count} prof.</span>
          </button>
        ))}
      </div>
    </section>
  );
}

/* ─── Tarjeta de marketplace ────────────────────────────────────────── */
function ProfessionalCard({ p }) {
  const esProfesional = p.es_profesional !== false;
  const agendaUrl = p.url_contacto || p.sitio_web;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-[#dedee3] bg-white shadow-[0_10px_35px_rgba(29,29,31,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[#b8e8ca] hover:shadow-[0_20px_50px_rgba(29,29,31,0.12)]">
      <div className="relative h-56 overflow-hidden bg-[#eef1ef]">
        <Image
          src={p.imagen_url}
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
            <h3 className="mt-1 flex items-center gap-1.5 text-[19px] font-semibold leading-tight tracking-[-0.025em] text-[#1d1d1f]">
              {p.nombre}
              {esProfesional && <BadgeCheck size={17} className="shrink-0 fill-[#00C853] text-white" />}
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

        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-full border border-[#e4e4e7] px-2.5 py-1 text-[10px] font-semibold text-[#6e6e73]">
            {p.tipo || (esProfesional ? "Profesional independiente" : "Consulta médica")}
          </span>
          {p.modalidad_atencion && (
            <span className="rounded-full border border-[#e4e4e7] px-2.5 py-1 text-[10px] font-semibold text-[#6e6e73]">
              {p.modalidad_atencion}
            </span>
          )}
        </div>

        <div className="mt-auto pt-5">
          <a
            href={agendaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#111d17] px-4 py-3 text-[12px] font-semibold text-white transition hover:bg-[#00a846] focus:outline-none focus:ring-2 focus:ring-[#00C853] focus:ring-offset-2"
          >
            <CalendarDays size={15} /> Ver AgendaClínica <ExternalLink size={13} />
          </a>
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

/* ─── Centros Médicos y Clínicas ─────────────────────────────────────── */
function ClinicsSection() {
  return (
    <section className="border-t border-[#d2d2d7] bg-white py-10">
      <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
        <div className="mb-5 flex items-baseline justify-between">
          <div>
            <h2 className="font-semibold text-[#1d1d1f]" style={{ fontSize: "18px", letterSpacing: "-0.02em" }}>
              Centros Médicos y Clínicas
            </h2>
            <p className="mt-1 text-[12px] text-[#6e6e73]">Instituciones verificadas en la Red Medify</p>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {MOCK_CENTROS.map((c) => (
            <div
              key={c.nombre}
              className="flex flex-col overflow-hidden rounded-2xl border border-[#d2d2d7] bg-white transition hover:shadow-md"
            >
              {/* Header */}
              <div className="flex items-center gap-3 border-b border-[#f5f5f7] p-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f5f5f7]">
                  <Building2 size={20} className="text-[#6e6e73]" strokeWidth={1.6} />
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-[#86868b]">{c.tipo}</p>
                  <h3 className="truncate font-semibold text-[#1d1d1f]" style={{ fontSize: "13px", letterSpacing: "-0.01em" }}>
                    {c.nombre}
                  </h3>
                  <p className="text-[11px] text-[#86868b]">{c.ubicacion}</p>
                </div>
              </div>

              {/* Especialidades */}
              <div className="flex flex-1 flex-col p-4">
                <div className="flex flex-wrap gap-1.5">
                  {c.especialidades.map((e) => (
                    <span key={e} className="rounded-full bg-[#f5f5f7] px-2.5 py-1 text-[10px] font-semibold text-[#6e6e73]">
                      {e}
                    </span>
                  ))}
                </div>
                {/* mt-auto mantiene el footer siempre al pie */}
                <div className="mt-auto flex items-center justify-between pt-4">
                  <span className="text-[11px] text-[#86868b]">{c.profesionales} profesionales</span>
                  <button
                    className="flex items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-semibold text-white transition hover:opacity-90"
                    style={{ background: "#00C853" }}
                  >
                    Ver más <ChevronRight size={11} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Ubicaciones de profesionales y consultas ──────────────────────── */
function NearbyMap() {
  const availableLocations = PROFESSIONALS.filter((p) => p.url_mapa || (p.lat && p.lng));
  const [selectedId, setSelectedId] = useState(availableLocations[0]?.id);
  const selected = availableLocations.find((p) => p.id === selectedId) || availableLocations[0];
  const mapUrl = selected?.url_mapa || `https://maps.google.com/maps?q=${selected?.lat},${selected?.lng}&z=15&output=embed`;

  return (
    <section className="border-t border-[#d2d2d7] bg-[#f5f5f7]">
      <div className="mx-auto max-w-[1100px] px-5 py-10 sm:px-8">
        <div className="overflow-hidden rounded-2xl border border-[#d2d2d7] bg-white lg:grid lg:grid-cols-[300px_1fr]">

          {/* Panel izquierdo */}
          <div className="border-b border-[#d2d2d7] p-7 lg:border-b-0 lg:border-r">
            <h2 className="font-semibold text-[#1d1d1f]" style={{ fontSize: "18px", letterSpacing: "-0.02em" }}>
              Ubicaciones disponibles
            </h2>
            <p className="mt-2 text-[12px] leading-5 text-[#6e6e73]">
              Selecciona un profesional o consulta para revisar su ubicación antes de agendar.
            </p>

            {/* Lista de profesionales */}
            <div className="mt-6 space-y-2">
              {availableLocations.slice(0, 4).map((p) => (
                <button
                  type="button"
                  key={p.id}
                  onClick={() => setSelectedId(p.id)}
                  className={`flex w-full items-center gap-3 rounded-xl p-2.5 text-left transition ${selected?.id === p.id ? "bg-[#eefaf2] ring-1 ring-[#b8e8ca]" : "hover:bg-[#f5f5f7]"}`}
                >
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full" style={{ border: "2.5px solid #00C853" }}>
                    <Image src={p.imagen_url} alt={p.nombre} fill sizes="40px" className="object-cover object-top" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[12px] font-semibold text-[#1d1d1f]">{p.nombre}</p>
                    <p className="text-[11px] text-[#86868b]">{p.especialidad_principal} · {p.ubicacion}</p>
                  </div>
                  <ChevronRight size={15} className={selected?.id === p.id ? "text-[#00a846]" : "text-[#a1a1a6]"} />
                </button>
              ))}
            </div>
          </div>

          {/* Mapa */}
          <div className="relative min-h-[390px] bg-[#e8ece9] lg:min-h-0">
            {selected && (
              <iframe
                key={selected.id}
                src={mapUrl}
                title={`Ubicación de ${selected.nombre}`}
                className="absolute inset-0 h-full w-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
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

            {/* Botones */}
            <div className="flex shrink-0 items-center gap-3">
              <Link
                href="/unirse"
                className="rounded-xl px-6 py-2.5 text-[13px] font-semibold text-white transition hover:opacity-90"
                style={{ background: "#00C853" }}
              >
                Registrarme
              </Link>
              <Link
                href="/precios"
                className="text-[12px] font-semibold text-white/45 underline underline-offset-2 transition hover:text-white/70"
              >
                Ver planes
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
  const [modality, setModality] = useState("Todas");
  const [specialty, setSpecialty] = useState("Todas");

  const filtered = PROFESSIONALS.filter((p) => {
    const q = search.toLowerCase();
    return (
      (!q || p.nombre.toLowerCase().includes(q) || p.especialidad_principal.toLowerCase().includes(q)) &&
      (city === "Todas las ciudades" || p.ubicacion === city) &&
      (modality === "Todas" || p.modalidad_atencion === modality || p.modalidad_atencion === "Ambas") &&
      (specialty === "Todas" || p.especialidad_principal === specialty)
    );
  });

  function handleSpecialtyClick(nombre) {
    setSpecialty(nombre);
    setTimeout(() => document.getElementById("profesionales")?.scrollIntoView({ behavior: "smooth" }), 50);
  }

  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <SearchBar
        search={search} setSearch={setSearch}
        city={city} setCity={setCity}
        modality={modality} setModality={setModality}
        specialty={specialty} setSpecialty={setSpecialty}
        onBuscar={() => document.getElementById("profesionales")?.scrollIntoView({ behavior: "smooth" })}
      />
      <Benefits />
      <Specialties onSpecialtyClick={handleSpecialtyClick} />
      <div id="profesionales">
        <ProfessionalsSection professionals={filtered} />
      </div>
      <ClinicsSection />
      <NearbyMap />
      <Stats />
      <ProCta />
    </div>
  );
}
