"use client";
import { useState } from "react";

/* Demo — cuando el backend esté listo viene de la API */
const DEMO_PRO = {
  nombre: "Dennis Beltrán",
  especialidad_principal: "Psicóloga",
  tipo: "Profesional de salud",
  plan: "Profesional",
  planActivo: true,
  sitio_web: "https://dennis-beltran.agendaclinicas.cl",
  disponible: true,
  correo: "dennisveltran@medify.cl",
  numero_whatsapp: "56912345678",
  ubicacion: "Chillán",
  modalidad_atencion: "Online",
  anos_experiencia: "6",
  precio_sesion: "16000",
  descripcion: "Psicóloga clínica especializada en terapia cognitivo-conductual.",
  biografia: "Soy psicóloga clínica, egresada de la Universidad del Desarrollo (UDD) – Concepción...",
  enfoques: "Ansiedad, Regulación emocional, Autoestima",
  instagram: "https://instagram.com/dennisbeltran.psicologa",
  facebook: "",
  linkedin: "https://linkedin.com/in/dennis-beltran",
  twitter: "",
};

const REDES = [
  { key: "instagram", label: "Instagram", placeholder: "@tu_usuario" },
  { key: "facebook",  label: "Facebook",  placeholder: "facebook.com/tu-página" },
  { key: "linkedin",  label: "LinkedIn",  placeholder: "linkedin.com/in/tu-perfil" },
  { key: "twitter",   label: "X (Twitter)", placeholder: "@tu_usuario" },
];

function Field({ label, children }) {
  return (
    <div>
      <label className="block font-semibold text-[#6e6e73] uppercase mb-2"
        style={{ fontSize: "10px", letterSpacing: "0.08em" }}>
        {label}
      </label>
      {children}
    </div>
  );
}
function Input({ ...props }) {
  return (
    <input className="w-full rounded-xl border border-[#d2d2d7] px-4 py-2.5 text-[#1d1d1f] outline-none focus:border-[#00C853] focus:ring-2 focus:ring-[#00C853]/10 transition-all bg-white"
      style={{ fontSize: "14px" }} {...props} />
  );
}
function Textarea({ ...props }) {
  return (
    <textarea rows={4}
      className="w-full rounded-xl border border-[#d2d2d7] px-4 py-2.5 text-[#1d1d1f] outline-none focus:border-[#00C853] focus:ring-2 focus:ring-[#00C853]/10 transition-all resize-none"
      style={{ fontSize: "14px" }} {...props} />
  );
}

export default function MiPerfilPage() {
  const [perfil, setPerfil] = useState(DEMO_PRO);
  const [saved, setSaved] = useState(false);
  const [fotoPreview, setFotoPreview] = useState(null);
  const set = (k, v) => setPerfil(p => ({ ...p, [k]: v }));

  const handleFoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFotoPreview(URL.createObjectURL(file));
    // TODO: upload a Cloudflare Images via POST /api/upload/image
    // → guardar URL en perfil.imagen
  };
  const hasAgenda = !!perfil.sitio_web?.includes("agendaclinicas.cl");

  const handleSave = () => {
    // TODO: PUT /api/professionals/me
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-8">

      {/* ── Header ── */}
      <div className="mb-8 flex items-center justify-between gap-6">
        <div className="flex items-center gap-5">

          {/* Foto de perfil editable */}
          <div className="relative group flex-shrink-0">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-[#f5f5f7] flex items-center justify-center"
              style={{ border: "2px solid #e5e5ea" }}>
              {fotoPreview ? (
                <img src={fotoPreview} alt="Foto perfil" className="w-full h-full object-cover" />
              ) : (
                <span className="font-bold text-[#6e6e73]" style={{ fontSize: "22px" }}>
                  {perfil.nombre.charAt(0)}
                </span>
              )}
            </div>
            {/* Overlay hover para editar */}
            <label className="absolute inset-0 rounded-full flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: "rgba(0,0,0,0.45)" }}>
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
              <input type="file" accept="image/*" className="hidden" onChange={handleFoto} />
            </label>
            {/* Badge pequeño siempre visible */}
            <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-white border border-[#e5e5ea] flex items-center justify-center">
              <svg className="w-3 h-3 text-[#6e6e73]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
              </svg>
            </div>
          </div>

          <div>
            <p className="font-semibold text-[#6e6e73] uppercase mb-1" style={{ fontSize: "11px", letterSpacing: "0.08em" }}>
              Red Medify
            </p>
            <h1 className="font-semibold text-[#1d1d1f]" style={{ fontSize: "24px", letterSpacing: "-0.02em" }}>
              Bienvenida, {perfil.nombre.split(" ")[0]}
            </h1>
            <p className="font-light text-[#6e6e73] mt-0.5" style={{ fontSize: "12px" }}>
              Pasa el cursor sobre tu foto para cambiarla
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {saved && (
            <span className="flex items-center gap-1.5 text-[#00C853] font-medium" style={{ fontSize: "13px" }}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              Cambios guardados
            </span>
          )}
          <button onClick={handleSave}
            className="inline-flex items-center justify-center rounded-full text-white transition-all"
            style={{ fontSize: "13px", fontWeight: 400, padding: "10px 22px", background: "#00C853" }}>
            Guardar cambios
          </button>
        </div>
      </div>

      {/* ── Stats rápidos ── */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Estado del perfil", value: perfil.disponible ? "Activo" : "Inactivo", color: perfil.disponible ? "#00C853" : "#6e6e73", dot: true },
          { label: "Plan activo", value: perfil.plan, color: "#1d1d1f" },
          { label: "Modalidad", value: perfil.modalidad, color: "#1d1d1f" },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-[#e5e5ea] px-5 py-4">
            <p className="font-semibold text-[#6e6e73] uppercase mb-2" style={{ fontSize: "10px", letterSpacing: "0.08em" }}>{s.label}</p>
            <div className="flex items-center gap-2">
              {s.dot && <span className="w-2 h-2 rounded-full" style={{ background: s.color }} />}
              <p className="font-semibold" style={{ fontSize: "15px", color: s.color, letterSpacing: "-0.01em" }}>{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Widget Agenda Clínica ── */}
      <div className="mb-8">
        {hasAgenda ? (
          /* ACTIVA */
          <div className="rounded-2xl p-6 flex items-center justify-between gap-6"
            style={{ background: "#f5f5f7", border: "1px solid #e5e5ea" }}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(0,200,83,0.15)", border: "1px solid rgba(0,200,83,0.3)" }}>
                <svg className="w-6 h-6 text-[#00C853]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="font-semibold text-[#1d1d1f]" style={{ fontSize: "15px", letterSpacing: "-0.01em" }}>Agenda Clínica</p>
                  <span className="rounded-full px-2 py-0.5 font-medium text-[#00C853]"
                    style={{ fontSize: "10px", background: "rgba(0,200,83,0.12)", border: "1px solid rgba(0,200,83,0.25)" }}>
                    Activa
                  </span>
                </div>
                <p style={{ fontSize: "13px", color: "#6e6e73" }}>
                  {perfil.sitio_web}
                </p>
              </div>
            </div>
            <a href={perfil.sitio_web} target="_blank" rel="noopener noreferrer"
              className="flex-shrink-0 inline-flex items-center gap-2 rounded-full text-white transition-all hover:scale-[1.02]"
              style={{ fontSize: "13px", fontWeight: 400, padding: "10px 20px", background: "#00C853" }}>
              Ir a mi agenda
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          </div>
        ) : (
          /* BLOQUEADA */
          <div className="rounded-2xl p-6 flex items-center justify-between gap-6"
            style={{ background: "#f5f5f7", border: "1px dashed #d2d2d7" }}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#e5e5ea] flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-[#6e6e73]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-[#1d1d1f] mb-0.5" style={{ fontSize: "15px", letterSpacing: "-0.01em" }}>
                  Agenda Clínica
                </p>
                <p style={{ fontSize: "13px", color: "#6e6e73" }}>
                  Gestiona tus citas, cobros y pacientes — todo en un solo lugar.
                </p>
              </div>
            </div>
            <a href="https://agendaclinicas.cl" target="_blank" rel="noopener noreferrer"
              className="flex-shrink-0 inline-flex items-center gap-2 rounded-full border border-[#d2d2d7] hover:border-[#1d1d1f] transition-all"
              style={{ fontSize: "13px", fontWeight: 400, padding: "10px 20px", color: "#1d1d1f" }}>
              Obtener Agenda Clínica →
            </a>
          </div>
        )}
      </div>

      {/* ── Formulario de edición ── */}
      <div className="space-y-5 max-w-[720px]">

        {/* Datos básicos */}
        <div className="bg-white rounded-2xl border border-[#e5e5ea] p-6">
          <h2 className="font-semibold text-[#1d1d1f] mb-5" style={{ fontSize: "14px", letterSpacing: "-0.01em" }}>
            Datos básicos
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Tipo de cuenta">
              <select
                value={perfil.tipo || ""}
                onChange={e => set("tipo", e.target.value)}
                className="w-full rounded-xl border border-[#d2d2d7] px-4 py-2.5 text-[#1d1d1f] outline-none focus:border-[#00C853] focus:ring-2 focus:ring-[#00C853]/10 transition-all bg-white"
                style={{ fontSize: "14px" }}
              >
                <option value="">Seleccionar tipo</option>
                {["Profesional de salud", "Clínica", "Centro médico"].map(t => <option key={t}>{t}</option>)}
              </select>
            </Field>
            <Field label="Nombre completo">
              <Input value={perfil.nombre} onChange={e => set("nombre", e.target.value)} />
            </Field>
            <Field label="Especialidad">
              <Input value={perfil.especialidad_principal} onChange={e => set("especialidad_principal", e.target.value)} />
            </Field>
            <Field label="Ciudad / Ubicación">
              <Input value={perfil.ubicacion || ""} onChange={e => set("ubicacion", e.target.value)} />
            </Field>
            <Field label="Modalidad">
              <select value={perfil.modalidad_atencion} onChange={e => set("modalidad_atencion", e.target.value)}
                className="w-full rounded-xl border border-[#d2d2d7] px-4 py-2.5 text-[#1d1d1f] outline-none focus:border-[#00C853] focus:ring-2 focus:ring-[#00C853]/10 transition-all bg-white"
                style={{ fontSize: "14px" }}>
                {["Online", "Presencial", "Ambas"].map(m => <option key={m}>{m}</option>)}
              </select>
            </Field>
            <Field label="Años de experiencia">
              <Input type="number" min="0" value={perfil.experiencia} onChange={e => set("anos_experiencia", e.target.value)} />
            </Field>
            <Field label="Valor sesión (CLP)">
              <Input type="number" min="0" value={perfil.precio} onChange={e => set("precio_sesion", e.target.value)} />
            </Field>
          </div>
        </div>

        {/* Presentación */}
        <div className="bg-white rounded-2xl border border-[#e5e5ea] p-6">
          <h2 className="font-semibold text-[#1d1d1f] mb-5" style={{ fontSize: "14px", letterSpacing: "-0.01em" }}>
            Presentación
          </h2>
          <div className="space-y-4">
            <Field label="Descripción corta (marketplace)">
              <Input value={perfil.descripcion} onChange={e => set("descripcion", e.target.value)} />
            </Field>
            <Field label="Bio completo (perfil)">
              <Textarea value={perfil.bio} onChange={e => set("biografia", e.target.value)} />
            </Field>
            <Field label="Enfoques / Especialidades (separados por coma)">
              <Input value={perfil.enfoques} onChange={e => set("enfoques", e.target.value)} />
            </Field>
          </div>
        </div>

        {/* Contacto y ubicación */}
        <div className="bg-white rounded-2xl border border-[#e5e5ea] p-6">
          <h2 className="font-semibold text-[#1d1d1f] mb-5" style={{ fontSize: "14px", letterSpacing: "-0.01em" }}>
            Contacto y ubicación
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Email">
              <Input type="email" value={perfil.email} onChange={e => set("correo", e.target.value)} />
            </Field>
            <Field label="WhatsApp">
              <Input type="tel" value={perfil.whatsapp} onChange={e => set("numero_whatsapp", e.target.value)} />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Dirección (aparece en el mapa)">
                <Input placeholder="Ej: Av. Libertad 765, Chillán" value={perfil.direccion || ""}
                  onChange={e => set("direccion", e.target.value)} />
              </Field>
            </div>
            <div className="sm:col-span-2">
              <Field label="Link Google Maps (embed)">
                <Input type="url"
                  placeholder="https://maps.google.com/maps?q=tu+dirección&output=embed"
                  value={perfil.url_mapa || ""}
                  onChange={e => set("url_mapa", e.target.value)} />
                <p className="mt-1.5 font-light text-[#6e6e73]" style={{ fontSize: "11px" }}>
                  En Google Maps → Compartir → Insertar mapa → copia la URL del src del iframe.
                </p>
              </Field>
              {/* Preview del mapa si hay URL */}
              {perfil.url_mapa && (
                <div className="mt-3 rounded-xl overflow-hidden border border-[#d2d2d7]" style={{ height: "200px" }}>
                  <iframe src={perfil.url_mapa} width="100%" height="100%"
                    style={{ border: 0 }} loading="lazy" title="Preview mapa" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Redes sociales */}
        <div className="bg-white rounded-2xl border border-[#e5e5ea] p-6">
          <h2 className="font-semibold text-[#1d1d1f] mb-1" style={{ fontSize: "14px", letterSpacing: "-0.01em" }}>
            Redes sociales
          </h2>
          <p className="font-light text-[#6e6e73] mb-5" style={{ fontSize: "12px" }}>
            Solo aparecen en tu perfil si están completas.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {REDES.map(({ key, label, placeholder }) => (
              <Field key={key} label={label}>
                <Input placeholder={placeholder} value={perfil[key] || ""} onChange={e => set(key, e.target.value)} />
              </Field>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
