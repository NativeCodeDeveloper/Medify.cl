"use client";
import { useCallback, useEffect, useState } from "react";
import { apiFetch, mensajeDeError } from "@/lib/api";

/*
 * Catálogos guardados en medify-api: /api/especialidades y /api/categorias
 * (lectura pública, escritura solo admin). /unirse los crea solos si alguien elige "Otra"
 * (quedan inactivos hasta que se revisen acá).
 */

const GRUPOS_ESP = ["Salud Mental", "Medicina", "Rehabilitación", "Nutrición y Dietética", "Odontología", "Medicina Complementaria", "Estética y Bienestar", "Otras profesiones"];

const TIPOS_CENTRO_CAT = ["Clínica", "Centro Médico", "Centro de Rehabilitación", "Centro Psicológico", "Otro"];

/* ─── Helpers ─────────────────────────────────────────────────────────── */
function slugify(str) {
  return str.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

function Badge({ children, color = "#00C853" }) {
  return (
    <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
      style={{ background: `${color}18`, color }}>
      {children}
    </span>
  );
}

/* ─── Modal genérico para crear/editar ────────────────────────────────── */
function ModalEspecialidad({ item, grupos, onSave, onClose }) {
  const [form, setForm] = useState(item || { nombre: "", grupo: grupos[0], activo: true });
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}>
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#e5e5ea] px-6 py-4">
          <h3 className="font-semibold text-[#1d1d1f]" style={{ fontSize: "16px" }}>
            {item ? "Editar especialidad" : "Nueva especialidad"}
          </h3>
          <button onClick={onClose} className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f5f5f7] hover:bg-[#e5e5ea]">
            <svg className="h-3.5 w-3.5 text-[#6e6e73]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="space-y-4 px-6 py-5">
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#6e6e73] mb-1.5">Nombre *</label>
            <input value={form.nombre} onChange={e => set("nombre", e.target.value)}
              placeholder="Ej: Cardiología Pediátrica"
              className="w-full rounded-xl border border-[#d2d2d7] px-4 py-2.5 text-[14px] text-[#1d1d1f] outline-none focus:border-[#00C853] focus:ring-2 focus:ring-[#00C853]/10" />
          </div>
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#6e6e73] mb-1.5">Grupo / Categoría *</label>
            <select value={form.grupo} onChange={e => set("grupo", e.target.value)}
              className="w-full rounded-xl border border-[#d2d2d7] px-4 py-2.5 text-[14px] text-[#1d1d1f] outline-none focus:border-[#00C853] bg-white">
              {grupos.map(g => <option key={g}>{g}</option>)}
            </select>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-[#d2d2d7] px-4 py-3">
            <span className="text-[13px] text-[#1d1d1f]">Activa y visible</span>
            <button type="button" onClick={() => set("activo", !form.activo)}
              className="relative transition-all duration-200"
              style={{ width: "36px", height: "22px", borderRadius: "11px", background: form.activo ? "#00C853" : "#d2d2d7" }}>
              <span className="absolute top-[3px] transition-all duration-200"
                style={{ width: "16px", height: "16px", borderRadius: "50%", background: "#fff",
                  left: form.activo ? "17px" : "3px", boxShadow: "0 1px 3px rgba(0,0,0,.2)" }} />
            </button>
          </div>
        </div>
        <div className="flex justify-between border-t border-[#e5e5ea] px-6 pb-5 pt-4">
          <button onClick={onClose} className="rounded-full border border-[#d2d2d7] px-5 py-2 text-sm text-[#6e6e73] hover:border-[#1d1d1f]">Cancelar</button>
          <button
            onClick={() => onSave({ ...form, id: form.id || slugify(form.nombre) })}
            disabled={!form.nombre.trim()}
            className="rounded-full px-6 py-2 text-sm font-semibold text-white disabled:opacity-40"
            style={{ background: "#00C853" }}>
            {item ? "Guardar" : "Crear"}
          </button>
        </div>
      </div>
    </div>
  );
}

function ModalCategoria({ item, onSave, onClose }) {
  const [form, setForm] = useState(item || { nombre: "", tipo_centro: TIPOS_CENTRO_CAT[0], activo: true });
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}>
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#e5e5ea] px-6 py-4">
          <h3 className="font-semibold text-[#1d1d1f]" style={{ fontSize: "16px" }}>
            {item ? "Editar categoría" : "Nueva categoría de centro"}
          </h3>
          <button onClick={onClose} className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f5f5f7] hover:bg-[#e5e5ea]">
            <svg className="h-3.5 w-3.5 text-[#6e6e73]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="space-y-4 px-6 py-5">
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#6e6e73] mb-1.5">Nombre *</label>
            <input value={form.nombre} onChange={e => set("nombre", e.target.value)}
              placeholder="Ej: Clínica Cardiovascular"
              className="w-full rounded-xl border border-[#d2d2d7] px-4 py-2.5 text-[14px] text-[#1d1d1f] outline-none focus:border-[#00C853] focus:ring-2 focus:ring-[#00C853]/10" />
          </div>
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#6e6e73] mb-1.5">Tipo de centro *</label>
            <select value={form.tipo_centro} onChange={e => set("tipo_centro", e.target.value)}
              className="w-full rounded-xl border border-[#d2d2d7] px-4 py-2.5 text-[14px] text-[#1d1d1f] outline-none focus:border-[#00C853] bg-white">
              {TIPOS_CENTRO_CAT.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-[#d2d2d7] px-4 py-3">
            <span className="text-[13px] text-[#1d1d1f]">Activa y visible</span>
            <button type="button" onClick={() => set("activo", !form.activo)}
              className="relative transition-all duration-200"
              style={{ width: "36px", height: "22px", borderRadius: "11px", background: form.activo ? "#00C853" : "#d2d2d7" }}>
              <span className="absolute top-[3px] transition-all duration-200"
                style={{ width: "16px", height: "16px", borderRadius: "50%", background: "#fff",
                  left: form.activo ? "17px" : "3px", boxShadow: "0 1px 3px rgba(0,0,0,.2)" }} />
            </button>
          </div>
        </div>
        <div className="flex justify-between border-t border-[#e5e5ea] px-6 pb-5 pt-4">
          <button onClick={onClose} className="rounded-full border border-[#d2d2d7] px-5 py-2 text-sm text-[#6e6e73] hover:border-[#1d1d1f]">Cancelar</button>
          <button
            onClick={() => onSave({ ...form, id: form.id || slugify(form.nombre) })}
            disabled={!form.nombre.trim()}
            className="rounded-full px-6 py-2 text-sm font-semibold text-white disabled:opacity-40"
            style={{ background: "#00C853" }}>
            {item ? "Guardar" : "Crear"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Tab: Especialidades ─────────────────────────────────────────────── */
/* CRUD de un catálogo contra la API. Los ítems de la BD tienen id numérico; los nuevos traen un slug
 * temporal desde el modal (onSave agrega id: slugify(nombre)), así se distingue crear de editar. */
function useCatalogo(recurso) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  const cargar = useCallback(() => {
    apiFetch(`/${recurso}?limit=500`)
      .then(r => setItems(r.data.map(i => ({ ...i, activo: !!i.activo }))))
      .catch(err => setError(mensajeDeError(err)));
  }, [recurso]);

  useEffect(cargar, [cargar]);

  const ejecutar = async (fn) => {
    setError("");
    try { await fn(); cargar(); return true; } catch (err) { setError(mensajeDeError(err)); return false; }
  };

  const guardar = (form, campoExtra) => ejecutar(async () => {
    const body = { nombre: form.nombre, descripcion: form.descripcion || null, [campoExtra]: form[campoExtra] || null };
    const existente = typeof form.id === "number";
    const guardado = existente
      ? await apiFetch(`/${recurso}/${form.id}`, { method: "PUT", body, auth: "admin" })
      : await apiFetch(`/${recurso}`, { method: "POST", body, auth: "admin" });
    if (!!guardado.activo !== !!form.activo) {
      await apiFetch(`/${recurso}/${guardado.id}/${form.activo ? "activar" : "desactivar"}`, { method: "PATCH", auth: "admin" });
    }
  });

  const alternar = (item) => ejecutar(() =>
    apiFetch(`/${recurso}/${item.id}/${item.activo ? "desactivar" : "activar"}`, { method: "PATCH", auth: "admin" }));

  const eliminar = (id) => ejecutar(() => apiFetch(`/${recurso}/${id}`, { method: "DELETE", auth: "admin" }));

  return { items, error, guardar, alternar, eliminar };
}

function AvisoError({ error }) {
  return error ? <p role="alert" className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-[13px] text-red-600">{error}</p> : null;
}

function TabEspecialidades() {
  const { items, error, guardar, alternar, eliminar } = useCatalogo("especialidades");
  const [modal, setModal]   = useState(null);
  const [search, setSearch] = useState("");
  const [grupo, setGrupo]   = useState("Todos");
  const [confirm, setConfirm] = useState(null);

  const grupos = ["Todos", ...new Set(items.map(i => i.grupo))];

  const filtered = items.filter(i => {
    const q = search.toLowerCase();
    return (
      (!q || i.nombre.toLowerCase().includes(q)) &&
      (grupo === "Todos" || i.grupo === grupo)
    );
  });

  const handleSave = async (form) => { if (await guardar(form, "grupo")) setModal(null); };
  const handleDelete = async (id) => { await eliminar(id); setConfirm(null); };
  const handleToggle = (id) => alternar(items.find(i => i.id === id));

  return (
    <div>
      <AvisoError error={error} />
      {/* Barra de filtros */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <svg className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#86868b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input type="text" placeholder="Buscar especialidad..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full rounded-xl border border-[#d2d2d7] bg-white py-2.5 pl-10 pr-4 text-sm text-[#1d1d1f] outline-none focus:border-[#00C853] focus:ring-2 focus:ring-[#00C853]/10" />
        </div>
        <select value={grupo} onChange={e => setGrupo(e.target.value)}
          className="rounded-xl border border-[#d2d2d7] bg-white px-4 py-2.5 text-sm text-[#1d1d1f] outline-none focus:border-[#00C853] appearance-none cursor-pointer">
          {grupos.map(g => <option key={g}>{g}</option>)}
        </select>
        <button onClick={() => setModal({})}
          className="ml-auto flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white"
          style={{ background: "#00C853" }}>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Nueva especialidad
        </button>
      </div>

      <p className="mb-3 text-[12px] text-[#86868b]">{filtered.length} especialidade{filtered.length !== 1 ? "s" : ""}</p>

      <div className="overflow-x-auto rounded-2xl border border-[#e5e5ea] bg-white">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="border-b border-[#e5e5ea] bg-[#f5f5f7]">
              {["Especialidad", "Grupo", "Estado", ""].map(h => (
                <th key={h} className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#6e6e73]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={4} className="px-5 py-10 text-center text-[13px] text-[#6e6e73]">Sin resultados</td></tr>
            ) : filtered.map((item, i) => (
              <tr key={item.id} className="hover:bg-[#f5f5f7]/50 transition-colors"
                style={{ borderBottom: i < filtered.length - 1 ? "1px solid #f5f5f7" : "none" }}>
                <td className="px-5 py-3.5 text-[13px] font-medium text-[#1d1d1f]">{item.nombre}</td>
                <td className="px-5 py-3.5">
                  <Badge color="#6366f1">{item.grupo}</Badge>
                </td>
                <td className="px-5 py-3.5">
                  <button onClick={() => handleToggle(item.id)}
                    className="relative transition-all duration-200"
                    style={{ width: "36px", height: "22px", borderRadius: "11px", background: item.activo ? "#00C853" : "#d2d2d7" }}>
                    <span className="absolute top-[3px] transition-all duration-200"
                      style={{ width: "16px", height: "16px", borderRadius: "50%", background: "#fff",
                        left: item.activo ? "17px" : "3px", boxShadow: "0 1px 3px rgba(0,0,0,.2)" }} />
                  </button>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <button onClick={() => setModal(item)} className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#d2d2d7] hover:border-[#1d1d1f] transition-colors">
                      <svg className="h-3.5 w-3.5 text-[#6e6e73]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
                      </svg>
                    </button>
                    <button onClick={() => setConfirm(item.id)} className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#fecaca] hover:bg-red-50 transition-colors">
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

      {modal !== null && (
        <ModalEspecialidad item={modal?.id ? modal : null} grupos={GRUPOS_ESP}
          onSave={handleSave} onClose={() => setModal(null)} />
      )}
      {confirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "rgba(0,0,0,.4)" }}>
          <div className="w-full max-w-sm rounded-2xl bg-white p-7 shadow-2xl">
            <p className="mb-2 font-semibold text-[#1d1d1f]" style={{ fontSize: "16px" }}>¿Eliminar esta especialidad?</p>
            <p className="mb-6 text-[13px] font-light text-[#6e6e73]">Los profesionales que la tenían asignada no se verán afectados, pero no podrá seleccionarse para nuevos registros.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirm(null)} className="flex-1 rounded-full border border-[#d2d2d7] py-2.5 text-sm text-[#6e6e73] hover:border-[#1d1d1f]">Cancelar</button>
              <button onClick={() => handleDelete(confirm)} className="flex-1 rounded-full bg-red-500 py-2.5 text-sm font-semibold text-white hover:bg-red-600">Eliminar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Tab: Categorías de centros ──────────────────────────────────────── */
function TabCategorias() {
  const { items, error, guardar, alternar, eliminar } = useCatalogo("categorias");
  const [modal, setModal]   = useState(null);
  const [search, setSearch] = useState("");
  const [tipo, setTipo]     = useState("Todos");
  const [confirm, setConfirm] = useState(null);

  const tipos = ["Todos", ...new Set(items.map(i => i.tipo_centro))];

  const filtered = items.filter(i => {
    const q = search.toLowerCase();
    return (
      (!q || i.nombre.toLowerCase().includes(q)) &&
      (tipo === "Todos" || i.tipo_centro === tipo)
    );
  });

  const handleSave = async (form) => { if (await guardar(form, "tipo_centro")) setModal(null); };
  const handleDelete = async (id) => { await eliminar(id); setConfirm(null); };
  const handleToggle = (id) => alternar(items.find(i => i.id === id));

  return (
    <div>
      <AvisoError error={error} />
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <svg className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#86868b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input type="text" placeholder="Buscar categoría..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full rounded-xl border border-[#d2d2d7] bg-white py-2.5 pl-10 pr-4 text-sm text-[#1d1d1f] outline-none focus:border-[#00C853] focus:ring-2 focus:ring-[#00C853]/10" />
        </div>
        <select value={tipo} onChange={e => setTipo(e.target.value)}
          className="rounded-xl border border-[#d2d2d7] bg-white px-4 py-2.5 text-sm text-[#1d1d1f] outline-none focus:border-[#00C853] appearance-none cursor-pointer">
          {tipos.map(t => <option key={t}>{t}</option>)}
        </select>
        <button onClick={() => setModal({})}
          className="ml-auto flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white"
          style={{ background: "#00C853" }}>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Nueva categoría
        </button>
      </div>

      <p className="mb-3 text-[12px] text-[#86868b]">{filtered.length} categoría{filtered.length !== 1 ? "s" : ""}</p>

      <div className="overflow-x-auto rounded-2xl border border-[#e5e5ea] bg-white">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="border-b border-[#e5e5ea] bg-[#f5f5f7]">
              {["Categoría", "Tipo de centro", "Estado", ""].map(h => (
                <th key={h} className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#6e6e73]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={4} className="px-5 py-10 text-center text-[13px] text-[#6e6e73]">Sin resultados</td></tr>
            ) : filtered.map((item, i) => (
              <tr key={item.id} className="hover:bg-[#f5f5f7]/50 transition-colors"
                style={{ borderBottom: i < filtered.length - 1 ? "1px solid #f5f5f7" : "none" }}>
                <td className="px-5 py-3.5 text-[13px] font-medium text-[#1d1d1f]">{item.nombre}</td>
                <td className="px-5 py-3.5">
                  <Badge color="#8b5cf6">{item.tipo_centro}</Badge>
                </td>
                <td className="px-5 py-3.5">
                  <button onClick={() => handleToggle(item.id)}
                    className="relative transition-all duration-200"
                    style={{ width: "36px", height: "22px", borderRadius: "11px", background: item.activo ? "#00C853" : "#d2d2d7" }}>
                    <span className="absolute top-[3px] transition-all duration-200"
                      style={{ width: "16px", height: "16px", borderRadius: "50%", background: "#fff",
                        left: item.activo ? "17px" : "3px", boxShadow: "0 1px 3px rgba(0,0,0,.2)" }} />
                  </button>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <button onClick={() => setModal(item)} className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#d2d2d7] hover:border-[#1d1d1f] transition-colors">
                      <svg className="h-3.5 w-3.5 text-[#6e6e73]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
                      </svg>
                    </button>
                    <button onClick={() => setConfirm(item.id)} className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#fecaca] hover:bg-red-50 transition-colors">
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

      {modal !== null && (
        <ModalCategoria item={modal?.id ? modal : null}
          onSave={handleSave} onClose={() => setModal(null)} />
      )}
      {confirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "rgba(0,0,0,.4)" }}>
          <div className="w-full max-w-sm rounded-2xl bg-white p-7 shadow-2xl">
            <p className="mb-2 font-semibold text-[#1d1d1f]" style={{ fontSize: "16px" }}>¿Eliminar esta categoría?</p>
            <p className="mb-6 text-[13px] font-light text-[#6e6e73]">Los centros que la tenían asignada no se verán afectados.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirm(null)} className="flex-1 rounded-full border border-[#d2d2d7] py-2.5 text-sm text-[#6e6e73] hover:border-[#1d1d1f]">Cancelar</button>
              <button onClick={() => handleDelete(confirm)} className="flex-1 rounded-full bg-red-500 py-2.5 text-sm font-semibold text-white hover:bg-red-600">Eliminar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Page principal ──────────────────────────────────────────────────── */
export default function ConfiguracionAdmin() {
  const [tab, setTab] = useState("especialidades");

  const TABS = [
    { key: "especialidades", label: "Especialidades" },
    { key: "categorias",     label: "Categorías de Centros" },
  ];

  return (
    <div className="p-5 sm:p-8">
      {/* Header */}
      <div className="mb-2">
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-[#6e6e73]">Sistema</p>
        <h1 className="font-semibold text-[#1d1d1f]" style={{ fontSize: "26px", letterSpacing: "-0.02em" }}>
          Configuración
        </h1>
      </div>

      {/* Aviso de integración pendiente */}
      <div className="mb-6 mt-4 flex items-start gap-3 rounded-xl border border-[#d2d2d7] bg-[#f5f5f7] px-4 py-3">
        <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#6e6e73]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
        </svg>
        <p className="text-[12px] text-[#6e6e73]">
          Estos catálogos alimentan el registro (<code className="rounded bg-white px-1.5 py-0.5 text-[11px] text-[#1d1d1f]">/unirse</code>)
          y los filtros del marketplace. Desactiva en vez de eliminar si algún profesional o centro ya lo usa.
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6 inline-flex items-center rounded-xl border border-[#d2d2d7] bg-white p-1">
        {TABS.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className="rounded-lg px-5 py-2 text-[13px] transition-all"
            style={{
              fontWeight: tab === t.key ? 600 : 400,
              color: tab === t.key ? "#1d1d1f" : "#6e6e73",
              background: tab === t.key ? "#f5f5f7" : "transparent",
            }}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === "especialidades" ? <TabEspecialidades /> : <TabCategorias />}
    </div>
  );
}
