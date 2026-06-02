"use client";
import { useState } from "react";
import Link from "next/link";
import { PROFESSIONALS as INITIAL } from "../../marketplace/data/professionals";

const ESPECIALIDADES_LISTA = [
  "Psicología Clínica", "Psicología Infantil", "Psiquiatría", "Neuropsicología", "Psicopedagogía",
  "Medicina General", "Medicina Familiar", "Pediatría", "Ginecología", "Cardiología",
  "Dermatología", "Neurología", "Traumatología", "Oftalmología", "Otorrinolaringología",
  "Urología", "Endocrinología", "Gastroenterología", "Geriatría", "Oncología",
  "Kinesiología", "Terapia Ocupacional", "Fonoaudiología", "Fisioterapia",
  "Nutrición Clínica", "Nutrición Deportiva", "Nutrición Infantil",
  "Odontología General", "Ortodoncia", "Implantología", "Endodoncia", "Periodoncia", "Odontopediatría",
  "Acupuntura", "Medicina Tradicional China", "Osteopatía", "Reiki", "Medicina Integrativa",
  "Medicina Estética", "Masoterapia", "Podología",
  "Enfermería", "Matrona / Matrón", "Tecnología Médica", "Farmacia Clínica",
  "Otra",
];

const PLANES_LISTA   = ["Esencial", "Profesional", "Avanzado", "Corporativo", "Enterprise"];
const TIPOS_LISTA    = ["Profesional de salud", "Clínica", "Centro médico"];
const MODALIDADES    = ["Online", "Presencial", "Ambas"];

const EMPTY = {
  id: "", tipo: "Profesional de salud", nombre: "", especialidad_principal: "",
  descripcion: "", biografia: "", imagen_url: "/doctores1.png",
  ubicacion: "", region: "", comuna: "",
  modalidad_atencion: "Online", anos_experiencia: "", precio_sesion: "",
  correo: "", telefono: "", numero_whatsapp: "", sitio_web: "",
  disponibilidad: "", plan: "Esencial", disponible: true, activo: true,
  instagram: "", facebook: "", linkedin: "", twitter: "",
  especialidades: [],
};

/* ─── Label helper ────────────────────────────────────────────────────── */
function L({ children, green }) {
  return (
    <label
      className="block font-semibold uppercase mb-2"
      style={{ fontSize: "10px", letterSpacing: "0.08em", color: green ? "#00C853" : "#6e6e73" }}
    >
      {children}
    </label>
  );
}

function InputField({ ...props }) {
  return (
    <input
      className="w-full rounded-xl border border-[#d2d2d7] px-4 py-2.5 text-[#1d1d1f] outline-none focus:border-[#00C853] focus:ring-2 focus:ring-[#00C853]/10 transition-all text-sm bg-white"
      {...props}
    />
  );
}

function SelectField({ children, ...props }) {
  return (
    <div className="relative">
      <select
        className="w-full rounded-xl border border-[#d2d2d7] px-4 py-2.5 text-[#1d1d1f] outline-none focus:border-[#00C853] focus:ring-2 focus:ring-[#00C853]/10 transition-all text-sm bg-white appearance-none"
        {...props}
      >
        {children}
      </select>
      <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#86868b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
}

/* ─── Modal ───────────────────────────────────────────────────────────── */
function Modal({ pro, onSave, onClose }) {
  const [form, setForm] = useState({ ...EMPTY, ...pro });
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto px-4 py-10"
      style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
    >
      <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#e5e5ea] px-7 pb-5 pt-6">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#6e6e73]">
              {pro?.id ? "Editar registro" : "Nuevo registro"}
            </p>
            <h2 className="font-semibold text-[#1d1d1f]" style={{ fontSize: "18px", letterSpacing: "-0.015em" }}>
              {pro?.id ? "Editar profesional / centro" : "Agregar profesional o centro"}
            </h2>
          </div>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f5f5f7] hover:bg-[#e5e5ea] transition-colors">
            <svg className="h-4 w-4 text-[#6e6e73]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-5 px-7 py-6">

          {/* ── Tipo de cuenta ── */}
          <div>
            <L>Tipo de cuenta *</L>
            <div className="grid grid-cols-3 gap-3">
              {TIPOS_LISTA.map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => set("tipo", t)}
                  className="rounded-xl border-2 py-3 text-center transition-all"
                  style={{
                    borderColor: form.tipo === t ? "#00C853" : "#d2d2d7",
                    background: form.tipo === t ? "rgba(0,200,83,0.05)" : "#ffffff",
                  }}
                >
                  <span className="block text-[12px] font-semibold leading-tight" style={{ color: form.tipo === t ? "#00C853" : "#1d1d1f" }}>
                    {t}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* ── Nombre y especialidad ── */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <L>Nombre completo *</L>
              <InputField
                value={form.nombre}
                onChange={e => set("nombre", e.target.value)}
                placeholder="Ej: Dennis Beltrán"
              />
            </div>
            <div>
              <L>Especialidad principal *</L>
              <SelectField value={form.especialidad_principal} onChange={e => set("especialidad_principal", e.target.value)}>
                <option value="">Seleccionar</option>
                {ESPECIALIDADES_LISTA.map(e => <option key={e}>{e}</option>)}
              </SelectField>
            </div>
          </div>

          {/* ── Plan y modalidad ── */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <L>Plan activo</L>
              <SelectField value={form.plan || "Esencial"} onChange={e => set("plan", e.target.value)}>
                {PLANES_LISTA.map(p => <option key={p}>{p}</option>)}
              </SelectField>
            </div>
            <div>
              <L>Modalidad</L>
              <SelectField value={form.modalidad_atencion} onChange={e => set("modalidad_atencion", e.target.value)}>
                {MODALIDADES.map(m => <option key={m}>{m}</option>)}
              </SelectField>
            </div>
          </div>

          {/* ── Ubicación y precio ── */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <L>Ciudad / Ubicación</L>
              <InputField value={form.ubicacion} onChange={e => set("ubicacion", e.target.value)} placeholder="Ej: Chillán" />
            </div>
            <div>
              <L>Valor sesión (CLP)</L>
              <InputField type="number" value={form.precio_sesion || ""} onChange={e => set("precio_sesion", e.target.value)} placeholder="Ej: 25000" />
            </div>
          </div>

          {/* ── Años experiencia y disponibilidad ── */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <L>Años de experiencia</L>
              <InputField type="number" value={form.anos_experiencia || ""} onChange={e => set("anos_experiencia", e.target.value)} placeholder="Ej: 5" />
            </div>
            <div>
              <L>Disponibilidad</L>
              <InputField value={form.disponibilidad || ""} onChange={e => set("disponibilidad", e.target.value)} placeholder="Ej: Lun-Vie 9-18h" />
            </div>
          </div>

          {/* ── Link Agenda Clínica (destacado) ── */}
          <div>
            <L green>Link Agenda Clínica · botón "Agendar hora"</L>
            <input
              value={form.sitio_web || ""}
              onChange={e => set("sitio_web", e.target.value)}
              placeholder="Ej: https://dennis-beltran.agendaclinicas.cl"
              className="w-full rounded-xl px-4 py-2.5 text-[#1d1d1f] outline-none transition-all text-sm"
              style={{ border: "2px solid rgba(0,200,83,0.3)", background: "rgba(0,200,83,0.04)" }}
              onFocus={e => e.target.style.borderColor = "#00C853"}
              onBlur={e => e.target.style.borderColor = "rgba(0,200,83,0.3)"}
            />
            <p className="mt-1 text-[#6e6e73]" style={{ fontSize: "11px" }}>
              URL que aparece en el botón "Agendar hora" del perfil del marketplace.
            </p>
          </div>

          {/* ── Email y WhatsApp ── */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <L>Correo electrónico</L>
              <InputField type="email" value={form.correo} onChange={e => set("correo", e.target.value)} placeholder="correo@ejemplo.cl" />
            </div>
            <div>
              <L>WhatsApp (sin + ni espacios)</L>
              <InputField type="tel" value={form.numero_whatsapp || ""} onChange={e => set("numero_whatsapp", e.target.value)} placeholder="56912345678" />
            </div>
          </div>

          {/* ── Descripción corta ── */}
          <div>
            <L>Descripción corta (marketplace)</L>
            <InputField value={form.descripcion || ""} onChange={e => set("descripcion", e.target.value)} placeholder="Una línea sobre el profesional o centro" />
          </div>

          {/* ── Toggle disponible ── */}
          <div className="flex items-center justify-between rounded-xl border border-[#d2d2d7] px-5 py-3.5">
            <div>
              <p className="text-sm font-medium text-[#1d1d1f]">Perfil activo y visible</p>
              <p className="text-[12px] font-light text-[#6e6e73]">Aparece en el marketplace</p>
            </div>
            <button
              type="button"
              onClick={() => set("disponible", !form.disponible)}
              className="relative flex-shrink-0 transition-all duration-200"
              style={{ width: "44px", height: "26px", borderRadius: "13px", background: form.disponible ? "#00C853" : "#d2d2d7" }}
            >
              <span
                className="absolute top-[3px] transition-all duration-200"
                style={{ width: "20px", height: "20px", borderRadius: "50%", background: "#fff", left: form.disponible ? "21px" : "3px", boxShadow: "0 1px 4px rgba(0,0,0,.2)" }}
              />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-[#e5e5ea] px-7 pb-6 pt-4">
          <button onClick={onClose} className="rounded-full border border-[#d2d2d7] px-5 py-2.5 text-sm font-medium text-[#6e6e73] hover:border-[#1d1d1f] hover:text-[#1d1d1f] transition-all">
            Cancelar
          </button>
          <button onClick={() => onSave(form)} className="rounded-full px-6 py-2.5 text-sm font-medium text-white transition-all" style={{ background: "#00C853" }}>
            {pro?.id ? "Guardar cambios" : "Agregar"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Badge tipo ──────────────────────────────────────────────────────── */
function TipoBadge({ tipo }) {
  const map = {
    "Clínica":              { bg: "rgba(139,92,246,.1)", color: "#7c3aed", label: "Clínica" },
    "Centro médico":        { bg: "rgba(14,165,233,.1)", color: "#0369a1", label: "Centro" },
    "Profesional de salud": { bg: "rgba(0,200,83,.1)",   color: "#00C853", label: "Profesional" },
  };
  const s = map[tipo] || map["Profesional de salud"];
  return (
    <span className="rounded-full px-2.5 py-1 text-[11px] font-semibold" style={{ background: s.bg, color: s.color }}>
      {s.label}
    </span>
  );
}

/* ─── Page ────────────────────────────────────────────────────────────── */
export default function ProfesionalesAdmin() {
  const normalizeTipo = (t) => {
    if (!t) return "Profesional de salud";
    if (t === "clinica" || t === "Clínica") return "Clínica";
    if (t === "centro_medico" || t === "centro médico" || t === "Centro médico") return "Centro médico";
    return "Profesional de salud"; // "profesional" u otros → default
  };

  const [pros, setPros] = useState(
    INITIAL.map(p => ({ ...p, plan: p.plan || "Esencial", tipo: normalizeTipo(p.tipo) }))
  );
  const [modal, setModal] = useState(null);
  const [search, setSearch] = useState("");
  const [confirm, setConfirm] = useState(null);
  const [tipoFiltro, setTipoFiltro] = useState("Todos");

  const filtered = pros.filter(p => {
    const q = search.toLowerCase();
    const matchSearch = p.nombre?.toLowerCase().includes(q) || p.especialidad_principal?.toLowerCase().includes(q);
    const matchTipo = tipoFiltro === "Todos" || p.tipo === tipoFiltro;
    return matchSearch && matchTipo;
  });

  const handleSave = (form) => {
    if (form.id) {
      setPros(ps => ps.map(p => p.id === form.id ? { ...form } : p));
    } else {
      const newId = form.nombre?.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") || `pro-${Date.now()}`;
      setPros(ps => [...ps, { ...form, id: newId }]);
    }
    setModal(null);
  };

  const handleDelete = (id) => { setPros(ps => ps.filter(p => p.id !== id)); setConfirm(null); };
  const handleToggle = (id) => { setPros(ps => ps.map(p => p.id === id ? { ...p, disponible: !p.disponible } : p)); };

  return (
    <div className="p-8">

      {/* Header */}
      <div className="mb-7 flex items-center justify-between">
        <div>
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-[#6e6e73]">Marketplace</p>
          <h1 className="font-semibold text-[#1d1d1f]" style={{ fontSize: "26px", letterSpacing: "-0.02em" }}>
            Profesionales y Centros
          </h1>
        </div>
        <button
          onClick={() => setModal({})}
          className="inline-flex items-center gap-2 rounded-full text-white transition-all"
          style={{ fontSize: "13px", fontWeight: 500, padding: "10px 20px", background: "#00C853" }}
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Agregar
        </button>
      </div>

      {/* Filtros */}
      <div className="mb-5 flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative min-w-[240px] flex-1">
          <svg className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#86868b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Buscar por nombre o especialidad..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full rounded-xl border border-[#d2d2d7] bg-white py-2.5 pl-10 pr-4 text-[#1d1d1f] outline-none focus:border-[#00C853] focus:ring-2 focus:ring-[#00C853]/10 transition-all text-sm"
          />
        </div>
        {/* Tipo filter tabs */}
        <div className="inline-flex items-center rounded-xl border border-[#d2d2d7] bg-white p-1">
          {["Todos", "Profesional de salud", "Clínica", "Centro médico"].map(t => (
            <button
              key={t}
              onClick={() => setTipoFiltro(t)}
              className="rounded-lg px-3 py-1.5 transition-all text-[12px]"
              style={{
                fontWeight: tipoFiltro === t ? 600 : 400,
                color: tipoFiltro === t ? "#1d1d1f" : "#6e6e73",
                background: tipoFiltro === t ? "#f5f5f7" : "transparent",
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-hidden rounded-2xl border border-[#e5e5ea] bg-white">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#e5e5ea] bg-[#f5f5f7]">
              {["Profesional / Centro", "Tipo", "Especialidad", "Ubicación", "Plan", "Agenda URL", "Estado", ""].map(h => (
                <th key={h} className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#6e6e73]">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-5 py-12 text-center text-[13px] font-light text-[#6e6e73]">
                  No hay registros
                </td>
              </tr>
            ) : filtered.map((p, i) => (
              <tr
                key={p.id}
                className="hover:bg-[#f5f5f7]/50 transition-colors"
                style={{ borderBottom: i < filtered.length - 1 ? "1px solid #f5f5f7" : "none" }}
              >
                {/* Foto + nombre */}
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 flex-shrink-0 overflow-hidden rounded-full bg-[#f5f5f7]">
                      <img src={p.imagen_url} alt={p.nombre} className="h-full w-full object-cover object-top" onError={e => { e.target.style.display = "none"; }} />
                    </div>
                    <div>
                      <p className="text-[13px] font-medium text-[#1d1d1f]">{p.nombre}</p>
                      <p className="text-[11px] font-light text-[#6e6e73]">{p.correo}</p>
                    </div>
                  </div>
                </td>
                {/* Tipo */}
                <td className="px-5 py-3.5">
                  <TipoBadge tipo={p.tipo} />
                </td>
                {/* Especialidad */}
                <td className="px-5 py-3.5 text-[13px] font-light text-[#424245]">{p.especialidad_principal}</td>
                {/* Ubicación */}
                <td className="px-5 py-3.5 text-[13px] font-light text-[#424245]">{p.ubicacion}</td>
                {/* Plan */}
                <td className="px-5 py-3.5">
                  <span className="rounded-full px-2.5 py-1 text-[11px] font-medium" style={{ background: "rgba(0,200,83,.1)", color: "#00C853" }}>
                    {p.plan || "Esencial"}
                  </span>
                </td>
                {/* Agenda URL */}
                <td className="px-5 py-3.5 max-w-[150px]">
                  {p.sitio_web ? (
                    <a href={p.sitio_web} target="_blank" rel="noopener noreferrer"
                      className="block max-w-[140px] truncate text-[12px] text-[#00C853] hover:underline underline-offset-2">
                      {p.sitio_web.replace("https://", "")}
                    </a>
                  ) : (
                    <span className="text-[12px] font-light text-[#86868b]">Sin link</span>
                  )}
                </td>
                {/* Toggle estado */}
                <td className="px-5 py-3.5">
                  <button
                    onClick={() => handleToggle(p.id)}
                    className="relative flex-shrink-0 transition-all duration-200"
                    style={{ width: "36px", height: "22px", borderRadius: "11px", background: p.disponible ? "#00C853" : "#d2d2d7" }}
                  >
                    <span
                      className="absolute top-[3px] transition-all duration-200"
                      style={{ width: "16px", height: "16px", borderRadius: "50%", background: "#fff", left: p.disponible ? "17px" : "3px", boxShadow: "0 1px 3px rgba(0,0,0,.2)" }}
                    />
                  </button>
                </td>
                {/* Acciones */}
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <button onClick={() => setModal(p)} title="Editar"
                      className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#d2d2d7] hover:border-[#1d1d1f] transition-colors">
                      <svg className="h-3.5 w-3.5 text-[#6e6e73]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
                      </svg>
                    </button>
                    <Link href={`/marketplace/${p.id}`} target="_blank" title="Ver perfil"
                      className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#d2d2d7] hover:border-[#1d1d1f] transition-colors">
                      <svg className="h-3.5 w-3.5 text-[#6e6e73]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                    </Link>
                    <button onClick={() => setConfirm(p.id)} title="Eliminar"
                      className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#fecaca] hover:bg-red-50 transition-colors">
                      <svg className="h-3.5 w-3.5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Conteo */}
      <p className="mt-3 text-[12px] text-[#86868b]">
        {filtered.length} registro{filtered.length !== 1 ? "s" : ""} mostrado{filtered.length !== 1 ? "s" : ""}
        {tipoFiltro !== "Todos" ? ` · ${tipoFiltro}` : ""}
      </p>

      {/* Modal */}
      {modal !== null && <Modal pro={modal} onSave={handleSave} onClose={() => setModal(null)} />}

      {/* Confirm delete */}
      {confirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "rgba(0,0,0,.4)" }}>
          <div className="w-full max-w-sm rounded-2xl bg-white p-7 shadow-2xl">
            <p className="mb-2 font-semibold text-[#1d1d1f]" style={{ fontSize: "17px" }}>¿Eliminar este perfil?</p>
            <p className="mb-6 font-light text-[#6e6e73]" style={{ fontSize: "14px" }}>
              Esta acción no se puede deshacer. El registro desaparecerá del marketplace.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setConfirm(null)} className="flex-1 rounded-full border border-[#d2d2d7] py-2.5 text-sm font-medium text-[#6e6e73] hover:border-[#1d1d1f] transition-all">
                Cancelar
              </button>
              <button onClick={() => handleDelete(confirm)} className="flex-1 rounded-full bg-red-500 py-2.5 text-sm font-medium text-white hover:bg-red-600 transition-colors">
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
