"use client";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch, mensajeDeError, subirFoto } from "@/lib/api";
import { MapaInput, ServiciosEditor, serviciosParaApi } from "@/componentes/PerfilCampos";

/* Gestión de cuentas reales (medify-api /admin/cuentas). La usan /dashboard/profesionales (tipo="profesional")
 * y /dashboard/centros (tipo="centro"). Los perfiles cargados a mano en marketplace/data/professionals.js
 * no aparecen acá: viven en el código del frontend. */

const MODALIDADES = ["Online", "Presencial", "Ambas"];
const TIPOS_CENTRO = ["Clínica", "Centro médico"];

const ESTADOS = [
  { key: "", label: "Todas" },
  { key: "pendiente", label: "Pendientes" },
  { key: "aprobada", label: "Publicadas" },
  { key: "inactiva", label: "Inactivas" },
];

/* Etiquetas neutras con un punto de color (estilo Apple); verde solo para "publicada" */
const ESTADO_BADGE = {
  pendiente: { label: "Pendiente", dot: "#86868b" },
  aprobada: { label: "Publicada", dot: "#00C853" },
  rechazada: { label: "Inactiva", dot: "#d2d2d7" },
};

const CONFIG = {
  profesional: {
    titulo: "Profesionales",
    singular: "profesional",
    columnas: ["Profesional", "Especialidad", "Ubicación", "Plan", "Agenda", "Estado", ""],
    nombre: (c) => `${c.nombres} ${c.apellidos}`,
    rubro: (c) => c.especialidad,
    tipoPlan: "individual",
  },
  centro: {
    titulo: "Centros y Clínicas",
    singular: "centro",
    columnas: ["Centro", "Categoría", "Ubicación", "Plan", "Agenda", "Estado", ""],
    nombre: (c) => c.nombre,
    rubro: (c) => c.categoria,
    tipoPlan: "corporativo",
  },
};

/* Campos que se mandan a la API desde el modal */
const CAMPOS = {
  profesional: ["nombres", "apellidos", "email", "especialidad", "plan_id", "modalidad", "region", "comuna", "direccion", "url_mapa", "servicios",
    "anios_experiencia", "precio_sesion", "disponibilidad", "sitio_web", "whatsapp", "telefono",
    "descripcion", "biografia", "enfoques", "instagram", "facebook", "linkedin", "twitter"],
  centro: ["nombre", "tipo", "email", "categoria", "plan_id", "direccion", "url_mapa", "servicios", "enfoques", "modalidad", "region", "comuna",
    "profesionales_count", "sitio_web", "whatsapp", "telefono", "descripcion", "biografia",
    "instagram", "facebook", "linkedin", "twitter"],
};

/* ─── UI helpers (mismo estilo que el resto del dashboard) ─── */
function L({ children }) {
  return <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-[#6e6e73]">{children}</label>;
}
const inputCls = "w-full rounded-xl border border-[#d2d2d7] bg-white px-4 py-2.5 text-sm text-[#1d1d1f] outline-none transition-all focus:border-[#00C853] focus:ring-2 focus:ring-[#00C853]/10 disabled:bg-[#f5f5f7] disabled:text-[#86868b]";
function Campo({ label, children, full }) {
  return <div className={full ? "sm:col-span-2" : ""}><L>{label}</L>{children}</div>;
}

function Icono({ d, className = "h-3.5 w-3.5 text-[#6e6e73]" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  );
}
const ICONOS = {
  editar: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z",
  ver: "M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25",
  borrar: "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0",
};

/* Foto de perfil (profesional) o logo (centro); si no tiene, la inicial */
function Avatar({ cuenta, nombre, size = 36 }) {
  const url = cuenta.foto_url || cuenta.logo_url;
  return (
    <div className="flex flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#f5f5f7] text-[#6e6e73]"
      style={{ width: size, height: size, fontSize: size * 0.4, fontWeight: 600 }}>
      {url ? <img src={url} alt="" className="h-full w-full object-cover object-top" /> : (nombre || "?").charAt(0)}
    </div>
  );
}

/* ─── Modal crear / editar ─── */
function Modal({ tipo, cuenta, catalogo, planes, onClose, onSaved }) {
  const esNueva = !cuenta.id;
  const esProfesional = tipo === "profesional";
  const [form, setForm] = useState(() => {
    const base = Object.fromEntries(CAMPOS[tipo].map(k => [k, k === "servicios" ? (cuenta.servicios ?? []) : (cuenta[k] ?? "")]));
    return { ...base, rut: cuenta.rut ?? "" };
  });
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");
  const [conFoto, setConFoto] = useState(cuenta); // se refresca al subir una foto nueva
  const [subiendo, setSubiendo] = useState(false);
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const cambiarFoto = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setSubiendo(true);
    setError("");
    try {
      setConFoto(await subirFoto(`/admin/cuentas/${tipo}/${cuenta.id}/foto`, file, "admin"));
    } catch (err) {
      setError(mensajeDeError(err));
    } finally {
      setSubiendo(false);
    }
  };

  const guardar = async () => {
    setGuardando(true);
    setError("");
    try {
      const body = Object.fromEntries(CAMPOS[tipo].map(k => [k, form[k]]));
      body.servicios = serviciosParaApi(form.servicios);
      if (!body.email) delete body.email; // vacío = no tocar el correo
      const data = esNueva
        ? await apiFetch(`/admin/cuentas/${tipo}`, { method: "POST", body: { ...body, rut: form.rut }, auth: "admin" })
        : await apiFetch(`/admin/cuentas/${tipo}/${cuenta.id}`, { method: "PUT", body, auth: "admin" });
      onSaved(data);
    } catch (err) {
      setError(mensajeDeError(err));
    } finally {
      setGuardando(false);
    }
  };

  const input = (k, props = {}) => (
    <input className={inputCls} value={form[k] ?? ""} onChange={e => set(k, e.target.value)} {...props} />
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto px-4 py-10"
      style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}>
      <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#e5e5ea] px-7 pb-5 pt-6">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#6e6e73]">
              {esNueva ? "Nuevo registro" : "Editar registro"}
            </p>
            <h2 className="font-semibold text-[#1d1d1f]" style={{ fontSize: "18px", letterSpacing: "-0.015em" }}>
              {esNueva ? `Agregar ${CONFIG[tipo].singular}` : CONFIG[tipo].nombre(cuenta)}
            </h2>
          </div>
          <button onClick={onClose} aria-label="Cerrar"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f5f5f7] hover:bg-[#e5e5ea] transition-colors">
            <Icono d="M6 18L18 6M6 6l12 12" className="h-4 w-4 text-[#6e6e73]" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 px-7 py-6 sm:grid-cols-2">
          {!esNueva && (
            <div className="sm:col-span-2 flex items-center gap-4">
              <Avatar cuenta={conFoto} nombre={CONFIG[tipo].nombre(cuenta)} size={56} />
              <label className={`cursor-pointer rounded-full border border-[#d2d2d7] px-4 py-2 text-[12px] font-medium text-[#1d1d1f] transition-colors hover:border-[#1d1d1f] ${subiendo ? "opacity-60" : ""}`}>
                {subiendo ? "Subiendo…" : (conFoto.foto_url || conFoto.logo_url) ? `Cambiar ${esProfesional ? "foto" : "logo"}` : `Subir ${esProfesional ? "foto" : "logo"}`}
                <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={cambiarFoto} disabled={subiendo} />
              </label>
              <span className="text-[11px] text-[#86868b]">Se ve en el marketplace y en su perfil.</span>
            </div>
          )}
          {esNueva && (
            <p className="sm:col-span-2 rounded-xl bg-[#f5f5f7] px-4 py-3 text-[12px] text-[#6e6e73]">
              Un perfil creado desde aquí se publica en el marketplace pero <strong>no tiene acceso</strong> a /mi-perfil.
              Si la persona quiere administrar su perfil, que se registre en /unirse.
            </p>
          )}

          {esProfesional ? (
            <>
              <Campo label="Nombres *">{input("nombres")}</Campo>
              <Campo label="Apellidos *">{input("apellidos")}</Campo>
              <Campo label="Especialidad *">
                <select className={inputCls} value={form.especialidad} onChange={e => set("especialidad", e.target.value)}>
                  <option value="">Seleccionar</option>
                  {catalogo.map(e => <option key={e.id} value={e.nombre}>{e.nombre}</option>)}
                  {form.especialidad && !catalogo.some(e => e.nombre === form.especialidad) && (
                    <option value={form.especialidad}>{form.especialidad}</option>
                  )}
                </select>
              </Campo>
            </>
          ) : (
            <>
              <Campo label="Nombre del centro *">{input("nombre")}</Campo>
              <Campo label="Tipo">
                <select className={inputCls} value={form.tipo} onChange={e => set("tipo", e.target.value)}>
                  <option value="">Seleccionar</option>
                  {TIPOS_CENTRO.map(t => <option key={t}>{t}</option>)}
                </select>
              </Campo>
              <Campo label="Categoría *">
                <select className={inputCls} value={form.categoria} onChange={e => set("categoria", e.target.value)}>
                  <option value="">Seleccionar</option>
                  {catalogo.map(c => <option key={c.id} value={c.nombre}>{c.nombre}</option>)}
                  {form.categoria && !catalogo.some(c => c.nombre === form.categoria) && (
                    <option value={form.categoria}>{form.categoria}</option>
                  )}
                </select>
              </Campo>
              <Campo label="Dirección *">{input("direccion")}</Campo>
            </>
          )}

          <Campo label="RUT *">{input("rut", { disabled: !esNueva, placeholder: "12.345.678-9" })}</Campo>
          <Campo label="Correo *">{input("email", { type: "email" })}</Campo>
          <Campo label="Plan">
            <select className={inputCls} value={form.plan_id} onChange={e => set("plan_id", e.target.value)}>
              <option value="">Sin plan</option>
              {planes.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
            </select>
          </Campo>
          <Campo label="Modalidad">
            <select className={inputCls} value={form.modalidad} onChange={e => set("modalidad", e.target.value)}>
              <option value="">Seleccionar</option>
              {MODALIDADES.map(m => <option key={m}>{m}</option>)}
            </select>
          </Campo>
          <Campo label="Región">{input("region")}</Campo>
          <Campo label="Comuna">{input("comuna")}</Campo>
          {esProfesional && <Campo label="Dirección de la consulta" full>{input("direccion", { placeholder: "Ej: Av. Libertad 765, oficina 302" })}</Campo>}
          <Campo label="Mapa de Google (opcional)" full>
            <MapaInput value={form.url_mapa} onChange={v => set("url_mapa", v)} direccion={form.direccion} />
          </Campo>
          <Campo label="Servicios" full>
            <ServiciosEditor value={form.servicios} onChange={v => set("servicios", v)} />
          </Campo>

          {esProfesional ? (
            <>
              <Campo label="Años de experiencia">{input("anios_experiencia", { type: "number", min: 0 })}</Campo>
              <Campo label="Valor sesión (CLP)">{input("precio_sesion", { type: "number", min: 0 })}</Campo>
              <Campo label="Disponibilidad" full>{input("disponibilidad", { placeholder: "Ej: Lun a Vie, 9:00 a 18:00" })}</Campo>
            </>
          ) : (
            <Campo label="N° de profesionales">{input("profesionales_count", { type: "number", min: 0 })}</Campo>
          )}

          <Campo label="Link de agenda (botón «Agendar hora»)" full>{input("sitio_web", { placeholder: "https://nombre.agendaclinicas.cl" })}</Campo>
          <Campo label="WhatsApp">{input("whatsapp", { placeholder: "56912345678" })}</Campo>
          <Campo label="Teléfono">{input("telefono")}</Campo>
          <Campo label="Descripción corta (marketplace)" full>{input("descripcion")}</Campo>
          <Campo label="Bio completa (perfil)" full>
            <textarea rows={3} className={`${inputCls} resize-none`} value={form.biografia ?? ""} onChange={e => set("biografia", e.target.value)} />
          </Campo>
          <Campo label={esProfesional ? "Enfoques (separados por coma)" : "Especialidades ofrecidas (separadas por coma)"} full>{input("enfoques")}</Campo>
          {["instagram", "facebook", "linkedin", "twitter"].map(r => (
            <Campo key={r} label={r === "twitter" ? "X (Twitter)" : r[0].toUpperCase() + r.slice(1)}>{input(r)}</Campo>
          ))}
        </div>

        {error && <p role="alert" className="mx-7 mb-4 rounded-xl bg-red-50 px-4 py-3 text-[13px] text-red-600">{error}</p>}

        <div className="flex justify-end gap-3 border-t border-[#e5e5ea] px-7 py-5">
          <button onClick={onClose}
            className="rounded-full border border-[#d2d2d7] px-5 py-2.5 text-sm font-medium text-[#6e6e73] hover:border-[#1d1d1f] hover:text-[#1d1d1f] transition-all">
            Cancelar
          </button>
          <button onClick={guardar} disabled={guardando}
            className="rounded-full px-6 py-2.5 text-sm font-medium text-white disabled:opacity-60" style={{ background: "#00C853" }}>
            {guardando ? "Guardando…" : esNueva ? "Crear y publicar" : "Guardar cambios"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Página ─── */
export default function CuentasAdmin({ tipo }) {
  const cfg = CONFIG[tipo];
  const [cuentas, setCuentas] = useState(null);
  const [estado, setEstado] = useState("");
  const [search, setSearch] = useState("");
  const [catalogo, setCatalogo] = useState([]);
  const [planes, setPlanes] = useState([]);
  const [modal, setModal] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [ocupado, setOcupado] = useState(null);
  const [error, setError] = useState("");

  const cargar = useCallback(() => {
    const qs = new URLSearchParams({ tipo, ...(estado && { estado }) });
    apiFetch(`/admin/cuentas?${qs}`, { auth: "admin" })
      .then(setCuentas)
      .catch(err => setError(mensajeDeError(err)));
  }, [tipo, estado]);

  useEffect(cargar, [cargar]);

  useEffect(() => {
    apiFetch(`/${tipo === "profesional" ? "especialidades" : "categorias"}?limit=500`)
      .then(r => setCatalogo(r.data))
      .catch(() => {});
    apiFetch("/admin/planes", { auth: "admin" })
      .then(ps => setPlanes(ps.filter(p => p.tipo === cfg.tipoPlan)))
      .catch(() => {});
  }, [tipo, cfg.tipoPlan]);

  const accion = async (c, verbo) => {
    setOcupado(c.id);
    setError("");
    try {
      await apiFetch(`/admin/cuentas/${tipo}/${c.id}/${verbo}`, { method: "PATCH", auth: "admin" });
      cargar();
    } catch (err) {
      setError(mensajeDeError(err));
    } finally {
      setOcupado(null);
    }
  };

  const eliminar = async (c) => {
    setOcupado(c.id);
    setError("");
    try {
      await apiFetch(`/admin/cuentas/${tipo}/${c.id}`, { method: "DELETE", auth: "admin" });
      setConfirm(null);
      cargar();
    } catch (err) {
      setError(mensajeDeError(err));
    } finally {
      setOcupado(null);
    }
  };

  const q = search.trim().toLowerCase();
  const filtradas = (cuentas ?? []).filter(c =>
    !q || [cfg.nombre(c), c.email, c.rut, cfg.rubro(c)].some(v => v?.toLowerCase().includes(q)));

  return (
    <div className="p-5 sm:p-8">
      <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-[#6e6e73]">Marketplace</p>
          <h1 className="font-semibold text-[#1d1d1f]" style={{ fontSize: "26px", letterSpacing: "-0.02em" }}>{cfg.titulo}</h1>
        </div>
        <button onClick={() => setModal({})}
          className="inline-flex items-center gap-2 rounded-full text-white transition-all"
          style={{ fontSize: "13px", fontWeight: 500, padding: "10px 20px", background: "#00C853" }}>
          <Icono d="M12 4.5v15m7.5-7.5h-15" className="h-4 w-4" />
          Agregar
        </button>
      </div>

      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div className="relative min-w-[240px] flex-1">
          <Icono d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#86868b]" />
          <input type="text" placeholder="Buscar por nombre, correo, RUT…" value={search} onChange={e => setSearch(e.target.value)}
            className="w-full rounded-xl border border-[#d2d2d7] bg-white py-2.5 pl-10 pr-4 text-sm text-[#1d1d1f] outline-none transition-all focus:border-[#00C853] focus:ring-2 focus:ring-[#00C853]/10" />
        </div>
        <div className="inline-flex items-center rounded-xl border border-[#d2d2d7] bg-white p-1">
          {ESTADOS.map(e => (
            <button key={e.key} onClick={() => setEstado(e.key)}
              className="rounded-lg px-3 py-1.5 text-[12px] transition-all"
              style={{ fontWeight: estado === e.key ? 600 : 400, color: estado === e.key ? "#1d1d1f" : "#6e6e73", background: estado === e.key ? "#f5f5f7" : "transparent" }}>
              {e.label}
            </button>
          ))}
        </div>
      </div>

      {error && <p role="alert" className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-[13px] text-red-600">{error}</p>}

      <div className="overflow-x-auto rounded-2xl border border-[#e5e5ea] bg-white">
        <table className="w-full min-w-[820px]">
          <thead>
            <tr className="border-b border-[#e5e5ea] bg-[#f5f5f7]">
              {cfg.columnas.map(h => (
                <th key={h} className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#6e6e73]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cuentas === null ? (
              <tr><td colSpan={7} className="px-5 py-12 text-center text-[13px] text-[#6e6e73]">Cargando…</td></tr>
            ) : filtradas.length === 0 ? (
              <tr><td colSpan={7} className="px-5 py-12 text-center text-[13px] font-light text-[#6e6e73]">No hay registros</td></tr>
            ) : filtradas.map((c, i) => {
              const badge = ESTADO_BADGE[c.estado] ?? ESTADO_BADGE.pendiente;
              const trabajando = ocupado === c.id;
              return (
                <tr key={c.id} className="transition-colors hover:bg-[#f5f5f7]/50"
                  style={{ borderBottom: i < filtradas.length - 1 ? "1px solid #f5f5f7" : "none" }}>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <Avatar cuenta={c} nombre={cfg.nombre(c)} />
                      <div>
                        <p className="text-[13px] font-medium text-[#1d1d1f]">{cfg.nombre(c)}</p>
                        <p className="text-[11px] font-light text-[#6e6e73]">{c.email} · {c.rut}</p>
                        {!c.tiene_acceso && <p className="text-[10px] text-[#86868b]">Creado por el equipo · sin acceso</p>}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-[13px] font-light text-[#424245]">{cfg.rubro(c)}</td>
                  <td className="px-5 py-3.5 text-[13px] font-light text-[#424245]">{[c.comuna, c.region].filter(Boolean).join(", ")}</td>
                  <td className="px-5 py-3.5 text-[12px] text-[#424245]">{planes.find(p => p.id === c.plan_id)?.nombre ?? "—"}</td>
                  <td className="max-w-[150px] px-5 py-3.5">
                    {c.sitio_web ? (
                      <a href={c.sitio_web} target="_blank" rel="noopener noreferrer"
                        className="block max-w-[140px] truncate text-[12px] text-[#00C853] underline-offset-2 hover:underline">
                        {c.sitio_web.replace(/^https?:\/\//, "")}
                      </a>
                    ) : <span className="text-[12px] font-light text-[#86868b]">{c.whatsapp ? "WhatsApp" : "Sin link"}</span>}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f5f5f7] px-2.5 py-1 text-[11px] font-medium text-[#1d1d1f]">
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: badge.dot }} />
                      {badge.label}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      {c.estado === "pendiente" && (
                        <button onClick={() => accion(c, "aprobar")} disabled={trabajando}
                          className="rounded-full px-3 py-1.5 text-[11px] font-medium text-white disabled:opacity-50" style={{ background: "#00C853" }}>
                          Aprobar
                        </button>
                      )}
                      {c.estado === "rechazada" ? (
                        <button onClick={() => accion(c, "activar")} disabled={trabajando}
                          className="rounded-full border border-[#d2d2d7] px-3 py-1.5 text-[11px] text-[#1d1d1f] hover:border-[#1d1d1f] disabled:opacity-50">
                          Activar
                        </button>
                      ) : (
                        <button onClick={() => accion(c, "desactivar")} disabled={trabajando}
                          className="rounded-full border border-[#d2d2d7] px-3 py-1.5 text-[11px] text-[#6e6e73] hover:border-[#1d1d1f] disabled:opacity-50">
                          Desactivar
                        </button>
                      )}
                      <button onClick={() => setModal(c)} title="Editar"
                        className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#d2d2d7] transition-colors hover:border-[#1d1d1f]">
                        <Icono d={ICONOS.editar} />
                      </button>
                      {c.estado === "aprobada" && c.slug && (
                        <Link href={`/marketplace/${c.slug}`} target="_blank" title="Ver perfil público"
                          className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#d2d2d7] transition-colors hover:border-[#1d1d1f]">
                          <Icono d={ICONOS.ver} />
                        </Link>
                      )}
                      <button onClick={() => setConfirm(c)} title="Eliminar"
                        className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#fecaca] transition-colors hover:bg-red-50">
                        <Icono d={ICONOS.borrar} className="h-3.5 w-3.5 text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-[12px] text-[#86868b]">
        {filtradas.length} registro{filtradas.length !== 1 ? "s" : ""}
        {tipo === "profesional" && " · Los perfiles cargados a mano en el código (professionals.js) no aparecen aquí."}
      </p>

      {modal !== null && (
        <Modal tipo={tipo} cuenta={modal} catalogo={catalogo} planes={planes}
          onClose={() => { setModal(null); cargar(); }}
          onSaved={() => { setModal(null); cargar(); }} />
      )}

      {confirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "rgba(0,0,0,.4)" }}>
          <div className="w-full max-w-sm rounded-2xl bg-white p-7 shadow-2xl">
            <p className="mb-2 font-semibold text-[#1d1d1f]" style={{ fontSize: "17px" }}>¿Eliminar a {cfg.nombre(confirm)}?</p>
            <p className="mb-6 font-light text-[#6e6e73]" style={{ fontSize: "14px" }}>
              Se borra la cuenta y su acceso: desaparece del marketplace y ya no podrá iniciar sesión. No se puede deshacer.
              Si solo quieres ocultarla, usa <strong>Desactivar</strong>.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setConfirm(null)}
                className="flex-1 rounded-full border border-[#d2d2d7] py-2.5 text-sm font-medium text-[#6e6e73] transition-all hover:border-[#1d1d1f]">
                Cancelar
              </button>
              <button onClick={() => eliminar(confirm)} disabled={ocupado === confirm.id}
                className="flex-1 rounded-full bg-red-500 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-600 disabled:opacity-60">
                {ocupado === confirm.id ? "Eliminando…" : "Eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
