"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PROFESSIONALS as INITIAL } from "../../marketplace/data/professionals";

const ESPECIALIDADES_LISTA = [
  "Psicología Clínica", "Kinesiología", "Nutrición Clínica", "Medicina General",
  "Odontología General", "Dermatología", "Pediatría", "Cardiología",
  "Fonoaudiología", "Terapia Ocupacional", "Oftalmología", "Geriatría",
  "Medicina Complementaria", "Tecnología Médica", "Enfermería", "Otra",
];

const PLANES_LISTA = ["Esencial", "Profesional", "Avanzado", "Corporativo", "Enterprise"];

const EMPTY = {
  id: "", name: "", role: "", description: "", fullBio: "",
  image: "/personalsalud.png", location: "", region: "", modalidad: "Online",
  email: "", phone: "", whatsapp: "", personalWebsite: "", agendaUrl: "",
  availability: "", yearsExperience: "", price: "", plan: "Esencial",
  available: true, specialties: [],
};

/* ─── Modal ─────────────────────────────────────────────────────────── */
function Modal({ pro, onSave, onClose }) {
  const [form, setForm] = useState({ ...EMPTY, ...pro });
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-10 pb-10 px-4"
      style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}>
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl">

        {/* Header modal */}
        <div className="flex items-center justify-between px-7 pt-6 pb-5 border-b border-[#e5e5ea]">
          <h2 className="font-semibold text-[#1d1d1f]" style={{ fontSize: "19px", letterSpacing: "-0.015em" }}>
            {pro?.id ? "Editar profesional" : "Agregar profesional"}
          </h2>
          <button onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f5f5f7] flex items-center justify-center hover:bg-[#e5e5ea] transition-colors">
            <svg className="w-4 h-4 text-[#6e6e73]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-7 py-6 space-y-5">
          {/* Nombre y rol */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-[#6e6e73] uppercase mb-2" style={{ fontSize: "10px", letterSpacing: "0.08em" }}>Nombre completo *</label>
              <input value={form.name} onChange={e => set("name", e.target.value)}
                className="w-full rounded-xl border border-[#d2d2d7] px-4 py-2.5 text-[#1d1d1f] outline-none focus:border-[#00C853] focus:ring-2 focus:ring-[#00C853]/10 transition-all text-sm" />
            </div>
            <div>
              <label className="block font-semibold text-[#6e6e73] uppercase mb-2" style={{ fontSize: "10px", letterSpacing: "0.08em" }}>Especialidad *</label>
              <select value={form.role} onChange={e => set("role", e.target.value)}
                className="w-full rounded-xl border border-[#d2d2d7] px-4 py-2.5 text-[#1d1d1f] outline-none focus:border-[#00C853] focus:ring-2 focus:ring-[#00C853]/10 transition-all text-sm bg-white">
                {ESPECIALIDADES_LISTA.map(e => <option key={e}>{e}</option>)}
              </select>
            </div>
          </div>

          {/* Plan y modalidad */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-[#6e6e73] uppercase mb-2" style={{ fontSize: "10px", letterSpacing: "0.08em" }}>Plan activo</label>
              <select value={form.plan || "Esencial"} onChange={e => set("plan", e.target.value)}
                className="w-full rounded-xl border border-[#d2d2d7] px-4 py-2.5 text-[#1d1d1f] outline-none focus:border-[#00C853] focus:ring-2 focus:ring-[#00C853]/10 transition-all text-sm bg-white">
                {PLANES_LISTA.map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="block font-semibold text-[#6e6e73] uppercase mb-2" style={{ fontSize: "10px", letterSpacing: "0.08em" }}>Modalidad</label>
              <select value={form.modalidad || "Online"} onChange={e => set("modalidad", e.target.value)}
                className="w-full rounded-xl border border-[#d2d2d7] px-4 py-2.5 text-[#1d1d1f] outline-none focus:border-[#00C853] focus:ring-2 focus:ring-[#00C853]/10 transition-all text-sm bg-white">
                {["Online", "Presencial", "Ambas"].map(m => <option key={m}>{m}</option>)}
              </select>
            </div>
          </div>

          {/* Ubicación */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-[#6e6e73] uppercase mb-2" style={{ fontSize: "10px", letterSpacing: "0.08em" }}>Ciudad / Ubicación</label>
              <input value={form.location} onChange={e => set("location", e.target.value)}
                placeholder="Ej: Chillán"
                className="w-full rounded-xl border border-[#d2d2d7] px-4 py-2.5 text-[#1d1d1f] outline-none focus:border-[#00C853] focus:ring-2 focus:ring-[#00C853]/10 transition-all text-sm" />
            </div>
            <div>
              <label className="block font-semibold text-[#6e6e73] uppercase mb-2" style={{ fontSize: "10px", letterSpacing: "0.08em" }}>Valor sesión (CLP)</label>
              <input type="number" value={form.price} onChange={e => set("price", e.target.value)}
                placeholder="Ej: 25000"
                className="w-full rounded-xl border border-[#d2d2d7] px-4 py-2.5 text-[#1d1d1f] outline-none focus:border-[#00C853] focus:ring-2 focus:ring-[#00C853]/10 transition-all text-sm" />
            </div>
          </div>

          {/* ⭐ Link Agenda Clínica */}
          <div>
            <label className="block font-semibold uppercase mb-2 flex items-center gap-1.5"
              style={{ fontSize: "10px", letterSpacing: "0.08em", color: "#00C853" }}>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Link Agenda Clínica (botón "Agendar hora")
            </label>
            <input value={form.agendaUrl || form.personalWebsite || ""} onChange={e => set("agendaUrl", e.target.value)}
              placeholder="Ej: https://dennis-beltran.medifyclinic.cl"
              className="w-full rounded-xl px-4 py-2.5 text-[#1d1d1f] outline-none transition-all text-sm"
              style={{ border: "2px solid rgba(0,200,83,0.3)", background: "rgba(0,200,83,0.04)" }}
              onFocus={e => e.target.style.borderColor = "#00C853"}
              onBlur={e => e.target.style.borderColor = "rgba(0,200,83,0.3)"} />
            <p className="mt-1.5 text-[#6e6e73]" style={{ fontSize: "11px" }}>
              Esta URL se usa en el botón "Agendar hora" del perfil del profesional en el marketplace.
            </p>
          </div>

          {/* Email y WhatsApp */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-[#6e6e73] uppercase mb-2" style={{ fontSize: "10px", letterSpacing: "0.08em" }}>Email</label>
              <input type="email" value={form.email} onChange={e => set("email", e.target.value)}
                className="w-full rounded-xl border border-[#d2d2d7] px-4 py-2.5 text-[#1d1d1f] outline-none focus:border-[#00C853] focus:ring-2 focus:ring-[#00C853]/10 transition-all text-sm" />
            </div>
            <div>
              <label className="block font-semibold text-[#6e6e73] uppercase mb-2" style={{ fontSize: "10px", letterSpacing: "0.08em" }}>WhatsApp</label>
              <input type="tel" value={form.whatsapp || form.whatsappNumber || ""} onChange={e => set("whatsapp", e.target.value)}
                placeholder="56912345678"
                className="w-full rounded-xl border border-[#d2d2d7] px-4 py-2.5 text-[#1d1d1f] outline-none focus:border-[#00C853] focus:ring-2 focus:ring-[#00C853]/10 transition-all text-sm" />
            </div>
          </div>

          {/* Descripción */}
          <div>
            <label className="block font-semibold text-[#6e6e73] uppercase mb-2" style={{ fontSize: "10px", letterSpacing: "0.08em" }}>Descripción corta</label>
            <input value={form.description} onChange={e => set("description", e.target.value)}
              className="w-full rounded-xl border border-[#d2d2d7] px-4 py-2.5 text-[#1d1d1f] outline-none focus:border-[#00C853] focus:ring-2 focus:ring-[#00C853]/10 transition-all text-sm" />
          </div>

          {/* Disponible toggle */}
          <div className="flex items-center justify-between rounded-xl border border-[#d2d2d7] px-5 py-3.5">
            <div>
              <p className="font-medium text-[#1d1d1f] text-sm">Perfil activo y visible</p>
              <p className="font-light text-[#6e6e73]" style={{ fontSize: "12px" }}>Aparece en el marketplace</p>
            </div>
            <button type="button" onClick={() => set("available", !form.available)}
              className="relative flex-shrink-0 transition-all duration-200"
              style={{ width: "44px", height: "26px", borderRadius: "13px", background: form.available ? "#00C853" : "#d2d2d7" }}>
              <span className="absolute top-[3px] transition-all duration-200"
                style={{ width: "20px", height: "20px", borderRadius: "50%", background: "#fff",
                  left: form.available ? "21px" : "3px", boxShadow: "0 1px 4px rgba(0,0,0,0.2)" }} />
            </button>
          </div>
        </div>

        {/* Footer modal */}
        <div className="flex items-center justify-between px-7 pb-6 pt-4 border-t border-[#e5e5ea]">
          <button onClick={onClose}
            className="rounded-full border border-[#d2d2d7] px-5 py-2.5 text-sm font-medium text-[#6e6e73] hover:border-[#1d1d1f] hover:text-[#1d1d1f] transition-all">
            Cancelar
          </button>
          <button onClick={() => onSave(form)}
            className="rounded-full text-white px-6 py-2.5 text-sm font-medium transition-all"
            style={{ background: "#00C853" }}>
            {pro?.id ? "Guardar cambios" : "Agregar profesional"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────── */
export default function ProfesionalesAdmin() {
  const [pros, setPros] = useState(INITIAL.map(p => ({ ...p, plan: "Activo", agendaUrl: p.personalWebsite })));
  const [modal, setModal] = useState(null); // null | {} | {pro}
  const [search, setSearch] = useState("");
  const [confirm, setConfirm] = useState(null);

  const filtered = pros.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.role.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = (form) => {
    if (form.id) {
      setPros(ps => ps.map(p => p.id === form.id ? { ...form } : p));
    } else {
      const newId = form.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
      setPros(ps => [...ps, { ...form, id: newId }]);
    }
    setModal(null);
  };

  const handleDelete = (id) => {
    setPros(ps => ps.filter(p => p.id !== id));
    setConfirm(null);
  };

  const handleToggle = (id) => {
    setPros(ps => ps.map(p => p.id === id ? { ...p, available: !p.available } : p));
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-7">
        <div>
          <p className="font-semibold text-[#6e6e73] uppercase mb-1" style={{ fontSize: "11px", letterSpacing: "0.08em" }}>
            Marketplace
          </p>
          <h1 className="font-semibold text-[#1d1d1f]" style={{ fontSize: "28px", letterSpacing: "-0.02em" }}>
            Profesionales
          </h1>
        </div>
        <button onClick={() => setModal({})}
          className="inline-flex items-center gap-2 rounded-full text-white transition-all"
          style={{ fontSize: "14px", fontWeight: 400, padding: "10px 20px", background: "#00C853" }}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Agregar profesional
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-5 max-w-sm">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#86868b]"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input type="text" placeholder="Buscar por nombre o especialidad..."
          value={search} onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#d2d2d7] bg-white text-[#1d1d1f] outline-none focus:border-[#00C853] focus:ring-2 focus:ring-[#00C853]/10 transition-all text-sm" />
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-2xl border border-[#e5e5ea] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: "1px solid #e5e5ea", background: "#f5f5f7" }}>
              {["Profesional", "Especialidad", "Ubicación", "Plan", "Agenda URL", "Estado", "Acciones"].map(h => (
                <th key={h} className="text-left px-5 py-3 font-semibold text-[#6e6e73]"
                  style={{ fontSize: "10px", letterSpacing: "0.06em" }}>
                  {h.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-5 py-10 text-center font-light text-[#6e6e73]" style={{ fontSize: "14px" }}>
                  No hay profesionales
                </td>
              </tr>
            ) : filtered.map((p, i) => (
              <tr key={p.id} style={{ borderBottom: i < filtered.length - 1 ? "1px solid #f5f5f7" : "none" }}
                className="hover:bg-[#f5f5f7]/50 transition-colors">
                {/* Foto + nombre */}
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full overflow-hidden bg-[#f5f5f7] flex-shrink-0">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover object-top" />
                    </div>
                    <div>
                      <p className="font-medium text-[#1d1d1f]" style={{ fontSize: "13px" }}>{p.name}</p>
                      <p className="font-light text-[#6e6e73]" style={{ fontSize: "11px" }}>{p.email}</p>
                    </div>
                  </div>
                </td>
                {/* Especialidad */}
                <td className="px-5 py-3.5 font-light text-[#424245]" style={{ fontSize: "13px" }}>{p.role}</td>
                {/* Ubicación */}
                <td className="px-5 py-3.5 font-light text-[#424245]" style={{ fontSize: "13px" }}>{p.location}</td>
                {/* Plan */}
                <td className="px-5 py-3.5">
                  <span className="rounded-full px-2.5 py-1 font-medium"
                    style={{ fontSize: "11px", background: "rgba(0,200,83,0.1)", color: "#00C853" }}>
                    {p.plan || "Activo"}
                  </span>
                </td>
                {/* Agenda URL */}
                <td className="px-5 py-3.5 max-w-[160px]">
                  {p.agendaUrl ? (
                    <a href={p.agendaUrl} target="_blank" rel="noopener noreferrer"
                      className="text-[#00C853] hover:underline underline-offset-4 truncate block"
                      style={{ fontSize: "12px", maxWidth: "150px" }}>
                      {p.agendaUrl.replace("https://", "")}
                    </a>
                  ) : (
                    <span className="font-light text-[#86868b]" style={{ fontSize: "12px" }}>Sin link</span>
                  )}
                </td>
                {/* Estado toggle */}
                <td className="px-5 py-3.5">
                  <button onClick={() => handleToggle(p.id)}
                    className="relative flex-shrink-0 transition-all duration-200"
                    style={{ width: "36px", height: "22px", borderRadius: "11px", background: p.available ? "#00C853" : "#d2d2d7" }}>
                    <span className="absolute top-[3px] transition-all duration-200"
                      style={{ width: "16px", height: "16px", borderRadius: "50%", background: "#fff",
                        left: p.available ? "17px" : "3px", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
                  </button>
                </td>
                {/* Acciones */}
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <button onClick={() => setModal(p)}
                      className="w-8 h-8 rounded-xl border border-[#d2d2d7] flex items-center justify-center hover:border-[#1d1d1f] transition-colors"
                      title="Editar">
                      <svg className="w-3.5 h-3.5 text-[#6e6e73]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
                      </svg>
                    </button>
                    <Link href={`/marketplace/${p.id}`} target="_blank"
                      className="w-8 h-8 rounded-xl border border-[#d2d2d7] flex items-center justify-center hover:border-[#1d1d1f] transition-colors"
                      title="Ver perfil">
                      <svg className="w-3.5 h-3.5 text-[#6e6e73]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                    </Link>
                    <button onClick={() => setConfirm(p.id)}
                      className="w-8 h-8 rounded-xl border border-[#fecaca] flex items-center justify-center hover:bg-red-50 transition-colors"
                      title="Eliminar">
                      <svg className="w-3.5 h-3.5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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

      {/* Modal editar/agregar */}
      {modal !== null && (
        <Modal pro={modal} onSave={handleSave} onClose={() => setModal(null)} />
      )}

      {/* Confirm delete */}
      {confirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ background: "rgba(0,0,0,0.4)" }}>
          <div className="bg-white rounded-2xl p-7 max-w-sm w-full shadow-2xl">
            <p className="font-semibold text-[#1d1d1f] mb-2" style={{ fontSize: "17px" }}>¿Eliminar este perfil?</p>
            <p className="font-light text-[#6e6e73] mb-6" style={{ fontSize: "14px" }}>
              Esta acción no se puede deshacer. El profesional desaparecerá del marketplace.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setConfirm(null)}
                className="flex-1 rounded-full border border-[#d2d2d7] py-2.5 text-sm font-medium text-[#6e6e73] hover:border-[#1d1d1f] transition-all">
                Cancelar
              </button>
              <button onClick={() => handleDelete(confirm)}
                className="flex-1 rounded-full py-2.5 text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition-colors">
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
