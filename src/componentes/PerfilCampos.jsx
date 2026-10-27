"use client";

/* Campos de perfil compartidos por /unirse, /mi-perfil y el modal del dashboard. */

const inputCls = "w-full rounded-xl border border-[#d2d2d7] bg-white px-4 py-2.5 text-[14px] text-[#1d1d1f] outline-none transition-all focus:border-[#00C853] focus:ring-2 focus:ring-[#00C853]/10";

/* Lista de servicios: [{ nombre, precio }]. El precio es opcional. */
export function ServiciosEditor({ value, onChange, max = 30 }) {
  const servicios = Array.isArray(value) ? value : [];
  const actualizar = (i, campo, v) => onChange(servicios.map((s, idx) => (idx === i ? { ...s, [campo]: v } : s)));
  const quitar = (i) => onChange(servicios.filter((_, idx) => idx !== i));
  const agregar = () => onChange([...servicios, { nombre: "", precio: "" }]);

  return (
    <div className="space-y-2">
      {servicios.map((s, i) => (
        <div key={i} className="flex items-center gap-2">
          <input className={`${inputCls} flex-1`} placeholder="Ej: Sesión de psicoterapia individual"
            value={s.nombre ?? ""} maxLength={120} onChange={e => actualizar(i, "nombre", e.target.value)} />
          <input className={`${inputCls} w-32`} type="number" min="0" placeholder="Precio (opcional)"
            value={s.precio ?? ""} onChange={e => actualizar(i, "precio", e.target.value)} />
          <button type="button" onClick={() => quitar(i)} aria-label="Quitar servicio"
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-[#d2d2d7] text-[#86868b] hover:border-[#1d1d1f] hover:text-[#1d1d1f]">
            ×
          </button>
        </div>
      ))}
      {servicios.length < max && (
        <button type="button" onClick={agregar}
          className="rounded-full border border-dashed border-[#d2d2d7] px-4 py-2 text-[13px] text-[#6e6e73] hover:border-[#1d1d1f] hover:text-[#1d1d1f]">
          + Agregar servicio
        </button>
      )}
    </div>
  );
}

/* Limpia la lista antes de mandarla a la API: sin filas vacías y con precio numérico o null */
export function serviciosParaApi(servicios) {
  return (Array.isArray(servicios) ? servicios : [])
    .filter(s => s.nombre?.trim())
    .map(s => ({ nombre: s.nombre.trim(), precio: s.precio === "" || s.precio == null ? null : Number(s.precio) }));
}

/* Saca el src si pegaron el <iframe> completo (para la vista previa; la API hace la validación real) */
function srcDeIframe(valor) {
  const v = (valor ?? "").trim();
  return (v.match(/src\s*=\s*["']([^"']+)["']/i)?.[1] ?? v).replace(/&amp;/g, "&");
}

/* Mapa de Google: se pega el código de "Insertar un mapa". Si se deja vacío, el perfil usa la dirección. */
export function MapaInput({ value, onChange, direccion }) {
  const src = srcDeIframe(value);
  const valido = /^https:\/\/(www\.)?google\.[a-z.]+\/maps\/embed/.test(src) || /^https:\/\/maps\.google\.[a-z.]+\/maps\?.*output=embed/.test(src);

  return (
    <div className="space-y-2">
      <textarea rows={2} className={`${inputCls} resize-none font-mono text-[12px]`}
        placeholder='<iframe src="https://www.google.com/maps/embed?pb=..." ...></iframe>'
        value={value ?? ""} onChange={e => onChange(e.target.value)} />
      <p className="font-light text-[#86868b]" style={{ fontSize: "11px" }}>
        En Google Maps busca tu consulta → <strong>Compartir</strong> → <strong>Insertar un mapa</strong> → Copiar HTML y pégalo aquí.
        {!value && direccion ? " Si lo dejas vacío, mostraremos el mapa según tu dirección." : ""}
      </p>
      {value && !valido && (
        <p className="text-red-500" style={{ fontSize: "12px" }}>Esto no parece un mapa de Google. Copia el código desde «Insertar un mapa».</p>
      )}
      {valido && (
        <div className="overflow-hidden rounded-xl border border-[#d2d2d7]" style={{ height: "200px" }}>
          <iframe src={src} title="Vista previa del mapa" className="h-full w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      )}
    </div>
  );
}
