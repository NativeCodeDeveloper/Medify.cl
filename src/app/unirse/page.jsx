"use client";
import { useState } from "react";
import Link from "next/link";

/* ─── Opciones ───────────────────────────────────────────────────── */
/* ── Especialidades por categoría ── */
const ESPECIALIDADES_GRUPOS = [
  {
    grupo: "Salud Mental",
    items: ["Psicología Clínica", "Psicología Infantil", "Psiquiatría", "Neuropsicología", "Psicopedagogía"],
  },
  {
    grupo: "Medicina",
    items: [
      "Medicina General", "Medicina Familiar", "Pediatría", "Ginecología",
      "Cardiología", "Dermatología", "Neurología", "Traumatología",
      "Oftalmología", "Otorrinolaringología", "Urología", "Endocrinología",
      "Gastroenterología", "Reumatología", "Oncología", "Cirugía General",
      "Geriatría", "Infectología",
    ],
  },
  {
    grupo: "Rehabilitación",
    items: ["Kinesiología", "Terapia Ocupacional", "Fonoaudiología", "Fisioterapia"],
  },
  {
    grupo: "Nutrición y Dietética",
    items: ["Nutrición Clínica", "Nutrición Deportiva", "Nutrición Estética", "Nutrición Infantil"],
  },
  {
    grupo: "Odontología",
    items: ["Odontología General", "Ortodoncia", "Implantología", "Endodoncia", "Periodoncia", "Odontopediatría"],
  },
  {
    grupo: "Medicina Complementaria",
    items: [
      "Acupuntura", "Medicina Tradicional China", "Osteopatía",
      "Homeopatía", "Naturopatía", "Reiki", "Quiropráctica",
      "Medicina Integrativa",
    ],
  },
  {
    grupo: "Estética y Bienestar",
    items: ["Medicina Estética", "Masoterapia", "Podología", "Nutrición Estética"],
  },
  {
    grupo: "Otras profesiones",
    items: ["Enfermería", "Matrona / Matrón", "Farmacia Clínica", "Tecnología Médica", "Óptica"],
  },
];

/* ── Regiones y comunas de Chile ── */
const REGIONES_COMUNAS = {
  "Arica y Parinacota":  ["Arica", "Camarones", "Putre", "General Lagos"],
  "Tarapacá":            ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"],
  "Antofagasta":         ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Tocopilla", "María Elena"],
  "Atacama":             ["Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro", "Vallenar", "Freirina"],
  "Coquimbo":            ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Ovalle", "Illapel", "Salamanca"],
  "Valparaíso":          ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana", "San Antonio", "Quillota", "Los Andes", "San Felipe"],
  "Metropolitana":       [
    "Santiago", "Providencia", "Las Condes", "Ñuñoa", "La Florida", "Maipú",
    "Pudahuel", "La Pintana", "El Bosque", "San Bernardo", "Puente Alto",
    "Peñalolén", "Lo Barnechea", "Vitacura", "Recoleta", "Independencia",
    "Estación Central", "Macul", "San Miguel", "La Cisterna", "Cerrillos",
    "Buin", "Talagante", "Melipilla",
  ],
  "O'Higgins":           ["Rancagua", "Machalí", "San Fernando", "Santa Cruz", "Pichilemu"],
  "Maule":               ["Talca", "Curicó", "Linares", "Constitución", "San Javier"],
  "Ñuble":               ["Chillán", "Chillán Viejo", "San Carlos", "Bulnes", "Quirihue"],
  "Biobío":              ["Concepción", "Talcahuano", "Los Ángeles", "Coronel", "Chiguayante", "San Pedro de la Paz", "Hualpén"],
  "La Araucanía":        ["Temuco", "Padre Las Casas", "Angol", "Victoria", "Villarrica", "Pucón"],
  "Los Ríos":            ["Valdivia", "La Unión", "Panguipulli", "Río Bueno"],
  "Los Lagos":           ["Puerto Montt", "Puerto Varas", "Osorno", "Castro", "Ancud", "Calbuco"],
  "Aysén":               ["Coyhaique", "Aysén", "Chile Chico", "Cochrane"],
  "Magallanes":          ["Punta Arenas", "Puerto Natales", "Puerto Williams"],
};

const MODALIDADES = ["Online", "Presencial", "Ambas"];

/* ── Planes individuales (mismos que /precios) ── */
const PLANES_INDIVIDUAL = [
  {
    id: "esencial",
    name: "Esencial",
    label: "Para comenzar",
    price: "$2.990",
    period: "CLP/mes",
    desc: "Aparece en el marketplace. Los pacientes te encuentran y te contactan directamente.",
    features: [
      "Perfil profesional en el Marketplace",
      "Botón WhatsApp directo",
      "Información de contacto y redes",
      "Ficha académica y especialidades",
      "Publicación en redes sociales de Medify",
    ],
    flujo: "pago",
    activacion: "Tu perfil se activa automáticamente al confirmar el pago.",
    pagoUrl: "https://www.mercadopago.cl/subscriptions/checkout?preapproval_plan_id=PLAN_ESENCIAL",
  },
  {
    id: "profesional",
    name: "Profesional",
    label: "Más popular",
    price: "$19.990",
    period: "CLP/mes + IVA",
    desc: "Marketplace más agenda clínica, pagos online y gestión completa de pacientes.",
    features: [
      "Todo lo del Plan Esencial",
      "Agendamiento automático",
      "Calendario digital",
      "Ficha clínica general",
      "Bloques de horarios por jornada",
      "Gestión de pacientes",
      "Estado de reservaciones",
      "Seguimiento por correo",
    ],
    note: "Emisión de recetas y presupuestos: +$20.000 CLP adicional.",
    flujo: "pago",
    activacion: "Tu perfil y agenda se activan automáticamente al confirmar el pago.",
    pagoUrl: "https://www.mercadopago.cl/subscriptions/checkout?preapproval_plan_id=PLAN_PROFESIONAL",
    featured: true,
  },
  {
    id: "avanzado",
    name: "Avanzado",
    label: "Máximo control",
    price: "$26.990",
    period: "CLP/mes + IVA",
    desc: "Máxima automatización: recordatorios WhatsApp, ficha avanzada y reportes.",
    features: [
      "Todo lo del Plan Profesional",
      "Ficha clínica avanzada",
      "Recordatorios automáticos por correo",
      "Recordatorios por WhatsApp",
      "Control de pagos y reportes (Excel export)",
    ],
    flujo: "pago",
    activacion: "Tu perfil y agenda se activan automáticamente al confirmar el pago.",
    pagoUrl: "https://www.mercadopago.cl/subscriptions/checkout?preapproval_plan_id=PLAN_AVANZADO",
  },
];

/* ── Planes corporaciones (mismos que /precios) ── */
const PLANES_CORPORATIVO = [
  {
    id: "corporativo",
    name: "Corporativo",
    label: "Para clínicas",
    price: "$79.900",
    period: "CLP/mes + IVA",
    desc: "Para clínicas y centros con hasta 5 profesionales. Gestión centralizada y reportería.",
    features: [
      "hasta 5 profesionales en una sola cuenta",
      "Flujos de trabajo por área clínica",
      "Panel administrativo y contable",
      "Reporte reservas, servicios y pago (Excel export)",
      "Integraciones de facturación",
    ],
    flujo: "email",
    activacion: "Nuestro equipo te contacta en menos de 24 horas para coordinar la activación.",
    featured: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    label: "A medida",
    price: "129.990",
    period: "personalizada",
    desc: "Para instituciones con requerimientos de seguridad y escala.",
    features: [
      "Gestión de agenda total plataforma AgendaClínica",
      "Soporte prioritario y ejecutivo dedicado",
      "SLA y seguridad reforzada",
      "Alta disponibilidad y cumplimiento normativo",
    ],
    flujo: "email",
    activacion: "Nuestro equipo te contacta para coordinar condiciones.",
  },
];

const PASOS = ["Tu plan", "Datos básicos", "Tu práctica", "Contacto", "Confirmar"];

/* ─── UI helpers ─────────────────────────────────────────────────── */
function Label({ children, required }) {
  return (
    <label className="block font-semibold text-[#6e6e73] uppercase mb-2"
      style={{ fontSize: "11px", letterSpacing: "0.06em" }}>
      {children}{required && <span className="text-[#00C853] ml-0.5">*</span>}
    </label>
  );
}
function Input({ ...props }) {
  return (
    <input className="w-full rounded-xl border border-[#d2d2d7] px-4 py-3 text-[#1d1d1f] outline-none focus:border-[#00C853] focus:ring-2 focus:ring-[#00C853]/10 transition-all bg-white"
      style={{ fontSize: "15px" }} {...props} />
  );
}
function Select({ children, ...props }) {
  return (
    <div className="relative">
      <select className="w-full rounded-xl border border-[#d2d2d7] px-4 py-3 text-[#1d1d1f] outline-none focus:border-[#00C853] focus:ring-2 focus:ring-[#00C853]/10 transition-all bg-white appearance-none"
        style={{ fontSize: "15px" }} {...props}>
        {children}
      </select>
      <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6e6e73] pointer-events-none"
        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
}
function Textarea({ ...props }) {
  return (
    <textarea rows={4}
      className="w-full rounded-xl border border-[#d2d2d7] px-4 py-3 text-[#1d1d1f] outline-none focus:border-[#00C853] focus:ring-2 focus:ring-[#00C853]/10 transition-all resize-none"
      style={{ fontSize: "15px" }} {...props} />
  );
}

/* ─── Indicador de pasos ─────────────────────────────────────────── */
function StepBar({ current }) {
  return (
    <div className="flex items-center justify-center gap-1.5 mb-10">
      {PASOS.map((label, i) => (
        <div key={label} className="flex items-center gap-1.5">
          <div className="flex flex-col items-center gap-1">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all"
              style={{
                background: i < current ? "#00C853" : i === current ? "#00C853" : "#e5e5ea",
                color: i <= current ? "#fff" : "#6e6e73",
              }}>
              {i < current
                ? <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                : i + 1}
            </div>
            <span className="hidden sm:block text-[9px] font-medium text-center"
              style={{ color: i === current ? "#1d1d1f" : "#6e6e73" }}>
              {label}
            </span>
          </div>
          {i < PASOS.length - 1 && (
            <div className="w-6 h-px mb-4 transition-all"
              style={{ background: i < current ? "#00C853" : "#e5e5ea" }} />
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────── */
export default function UnirsePage() {
  const [step, setStep] = useState(0);
  const [planId, setPlanId] = useState("");
  const [tipoPlan, setTipoPlan] = useState("individual");
  const [showToast, setShowToast] = useState(false);
  const [form, setForm] = useState({
    foto: null, fotoPreview: null,
    nombre: "", especialidad: "", especialidadOtra: "",
    region: "", comuna: "", modalidad: "",
    experiencia: "", precio: "", disponibilidad: "",
    descripcion: "", bio: "", enfoques: "",
    email: "", whatsapp: "", sitioWeb: "",
    rut: "", password: "", confirmPassword: "",
    instagram: "", facebook: "", linkedin: "", twitter: "",
  });

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const especialidadFinal = form.especialidad === "Otra" ? form.especialidadOtra : form.especialidad;
  const planesActivos = tipoPlan === "individual" ? PLANES_INDIVIDUAL : PLANES_CORPORATIVO;
  const plan = planesActivos.find(p => p.id === planId);

  /* ── RUT chileno: auto-formato y validación ── */
  const formatRUT = (val) => {
    const clean = val.replace(/[^0-9kK]/g, "").toUpperCase();
    if (!clean) return "";
    if (clean.length === 1) return clean;
    const body = clean.slice(0, -1);
    const dv = clean.slice(-1);
    let formatted = "";
    for (let i = body.length - 1, c = 0; i >= 0; i--, c++) {
      if (c > 0 && c % 3 === 0) formatted = "." + formatted;
      formatted = body[i] + formatted;
    }
    return `${formatted}-${dv}`;
  };

  const validateRUT = (rut) => {
    const clean = rut.replace(/[^0-9kK]/g, "").toUpperCase();
    if (clean.length < 8 || clean.length > 9) return false;
    const body = clean.slice(0, -1);
    const dv = clean.slice(-1);
    let sum = 0, multiplier = 2;
    for (let i = body.length - 1; i >= 0; i--) {
      sum += parseInt(body[i]) * multiplier;
      multiplier = multiplier === 7 ? 2 : multiplier + 1;
    }
    const rem = 11 - (sum % 11);
    const expected = rem === 11 ? "0" : rem === 10 ? "K" : String(rem);
    return expected === dv;
  };

  const rutValido = form.rut.length > 3 ? validateRUT(form.rut) : null;
  const passwordMatch = form.password && form.confirmPassword && form.password === form.confirmPassword;
  const passwordMismatch = form.confirmPassword && form.password !== form.confirmPassword;

  /* Valida que la URL sea del dominio agendaclinicas.cl */
  const isValidAgendaUrl = (url) => {
    if (!url) return false;
    try {
      const u = new URL(url.startsWith("http") ? url : `https://${url}`);
      return u.hostname === "agendaclinicas.cl" || u.hostname.endsWith(".agendaclinicas.cl");
    } catch {
      return false;
    }
  };

  const agendaValida = isValidAgendaUrl(form.sitioWeb);
  const agendaIngresada = form.sitioWeb.trim().length > 0;

  const canNext = () => {
    if (step === 0) return !!planId;
    if (step === 1) return form.nombre && form.especialidad && form.region && form.comuna && form.modalidad;
    if (step === 2) return true;
    if (step === 3) return !!form.email && rutValido && passwordMatch;
    return true;
  };

  const next = () => {
    if (!canNext()) return;
    /* Al ir de paso 3 → 4, si no tiene URL válida de agendaclinicas.cl muestra toast */
    if (step === 3 && !agendaValida) {
      setShowToast(true);
      return;
    }
    setStep(s => Math.min(s + 1, 4));
  };

  const back = () => setStep(s => Math.max(s - 1, 0));

  const buildWsp = () => {
    const msg =
      `Hola Medify, quiero unirme como profesional 👋\n\n` +
      `*Plan elegido:* ${plan?.name} (${plan?.price}${plan?.period})\n\n` +
      `*Datos básicos*\n` +
      `• Nombre: ${form.nombre}\n• Especialidad: ${especialidadFinal}\n• Región: ${form.region}\n• Comuna: ${form.comuna}\n• Modalidad: ${form.modalidad}\n\n` +
      `*Práctica*\n` +
      `• Experiencia: ${form.experiencia} años\n• Valor sesión: $${form.precio} CLP\n• Disponibilidad: ${form.disponibilidad}\n• Enfoques: ${form.enfoques}\n\n` +
      `*Contacto*\n` +
      `• Email: ${form.email}\n• WhatsApp: ${form.whatsapp}\n• Agenda/Web: ${form.sitioWeb}`;
    return `https://wa.me/56991749964?text=${encodeURIComponent(msg)}`;
  };

  /* ── Paso 0: Selección de plan ── */
  const renderPlan = () => (
    <div>
      {/* Toggle individual / corporativo */}
      <div className="flex items-center justify-center mb-6">
        <div className="inline-flex items-center rounded-xl bg-white border border-[#d2d2d7] p-1">
          {[
            { key: "individual", label: "Profesionales" },
            { key: "corporativo", label: "Corporaciones y clínicas" },
          ].map(t => (
            <button key={t.key} type="button"
              onClick={() => { setTipoPlan(t.key); setPlanId(""); }}
              className="rounded-lg px-4 py-2 transition-all duration-150"
              style={{
                fontSize: "13px",
                fontWeight: tipoPlan === t.key ? 500 : 400,
                color: tipoPlan === t.key ? "#1d1d1f" : "#6e6e73",
                background: tipoPlan === t.key ? "#f5f5f7" : "transparent",
              }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
      {planesActivos.map(p => (
        <button key={p.id} type="button" onClick={() => setPlanId(p.id)}
          className="text-left rounded-2xl border-2 p-5 transition-all duration-150 relative"
          style={{
            borderColor: planId === p.id ? "#00C853" : "#d2d2d7",
            background: planId === p.id ? "rgba(0,200,83,0.04)" : "#ffffff",
          }}>
          {p.featured && (
            <span className="absolute top-4 right-4 rounded-full px-2.5 py-1 text-white font-medium"
              style={{ fontSize: "11px", background: "#00C853" }}>
              Más popular
            </span>
          )}

          <div className="flex items-start justify-between mb-3 pr-20">
            <div>
              <p className="font-semibold text-[#1d1d1f]" style={{ fontSize: "17px", letterSpacing: "-0.01em" }}>
                {p.name}
              </p>
              <p className="font-light text-[#6e6e73]" style={{ fontSize: "13px" }}>
                {p.desc}
              </p>
            </div>
          </div>

          <div className="flex items-baseline gap-1 mb-3">
            <span className="font-semibold text-[#1d1d1f]" style={{ fontSize: "22px", letterSpacing: "-0.03em" }}>
              {p.price}
            </span>
            {p.period && (
              <span className="font-light text-[#6e6e73]" style={{ fontSize: "12px" }}>{p.period}</span>
            )}
          </div>

          <ul className="space-y-1.5">
            {p.features.map(f => (
              <li key={f} className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 flex-shrink-0 text-[#00C853]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="font-light text-[#424245]" style={{ fontSize: "13px" }}>{f}</span>
              </li>
            ))}
          </ul>

          <p className="mt-3 font-medium" style={{ fontSize: "12px", color: "#00C853" }}>
            {p.activacion}
          </p>

          {/* Indicador de selección */}
          {planId === p.id && (
            <div className="absolute top-4 left-4 w-5 h-5 rounded-full bg-[#00C853] flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
          )}
          {planId === p.id && <div className="absolute top-4 left-4 w-5 h-5 opacity-0" />}
        </button>
      ))}
      </div>
    </div>
  );

  /* ── Pasos 1-3: Formulario ── */
  const renderForm = () => {
    if (step === 1) return (
      <div className="space-y-5">

        {/* Foto de perfil */}
        <div>
          <Label>Foto de perfil</Label>
          <div className="flex items-center gap-5">
            {/* Preview / placeholder */}
            <div className="relative flex-shrink-0">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-[#f5f5f7] flex items-center justify-center"
                style={{ border: "2px solid #d2d2d7" }}>
                {form.fotoPreview ? (
                  <img src={form.fotoPreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <svg className="w-8 h-8 text-[#86868b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                )}
              </div>
              {/* Overlay editar */}
              {form.fotoPreview && (
                <button type="button"
                  onClick={() => set("fotoPreview", null) || set("foto", null)}
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Botón de carga */}
            <div>
              <label className="cursor-pointer inline-flex items-center gap-2 rounded-xl border border-[#d2d2d7] px-4 py-2.5 hover:border-[#1d1d1f] transition-all"
                style={{ fontSize: "13px", color: "#1d1d1f" }}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
                {form.fotoPreview ? "Cambiar foto" : "Subir foto"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={e => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    set("foto", file);
                    set("fotoPreview", URL.createObjectURL(file));
                  }}
                />
              </label>
              <p className="mt-1.5 font-light text-[#6e6e73]" style={{ fontSize: "11px" }}>
                JPG, PNG o WEBP · Máx 5 MB
                {/* TODO: upload a Cloudflare Images via POST /api/upload/image */}
              </p>
            </div>
          </div>
        </div>

        {/* Nombre */}
        <div>
          <Label required>Nombre completo</Label>
          <Input placeholder="Ej: María González" value={form.nombre}
            onChange={e => set("nombre", e.target.value)} />
        </div>

        {/* Especialidad agrupada */}
        <div>
          <Label required>Especialidad principal</Label>
          <Select value={form.especialidad}
            onChange={e => { set("especialidad", e.target.value); set("especialidadOtra", ""); }}>
            <option value="">Selecciona tu especialidad</option>
            {ESPECIALIDADES_GRUPOS.map(g => (
              <optgroup key={g.grupo} label={g.grupo}>
                {g.items.map(i => <option key={i} value={i}>{i}</option>)}
              </optgroup>
            ))}
            <option value="Otra">Otra (especificar abajo)</option>
          </Select>
        </div>

        {/* Campo libre si eligió "Otra" */}
        {form.especialidad === "Otra" && (
          <div>
            <Label required>¿Cuál es tu especialidad?</Label>
            <Input placeholder="Escribe tu especialidad..." value={form.especialidadOtra}
              onChange={e => set("especialidadOtra", e.target.value)} />
          </div>
        )}

        {/* Región */}
        <div>
          <Label required>Región</Label>
          <Select value={form.region}
            onChange={e => { set("region", e.target.value); set("comuna", ""); }}>
            <option value="">Selecciona tu región</option>
            {Object.keys(REGIONES_COMUNAS).map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </Select>
        </div>

        {/* Comuna — aparece solo si hay región */}
        {form.region && (
          <div>
            <Label required>Comuna</Label>
            <Select value={form.comuna} onChange={e => set("comuna", e.target.value)}>
              <option value="">Selecciona tu comuna</option>
              {REGIONES_COMUNAS[form.region].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
              <option value="Otra">Otra</option>
            </Select>
          </div>
        )}

        {/* Nota mapa */}
        {form.comuna && (
          <p className="text-[#6e6e73] flex items-center gap-1.5" style={{ fontSize: "12px" }}>
            <svg className="w-3.5 h-3.5 text-[#00C853] flex-shrink-0" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Tu ubicación aparecerá en el mapa del marketplace.
          </p>
        )}

        {/* Modalidad */}
        <div>
          <Label required>Modalidad de atención</Label>
          <div className="flex gap-3">
            {MODALIDADES.map(m => (
              <button key={m} type="button" onClick={() => set("modalidad", m)}
                className="flex-1 rounded-xl border py-3 text-sm font-medium transition-all"
                style={{
                  borderColor: form.modalidad === m ? "#00C853" : "#d2d2d7",
                  background: form.modalidad === m ? "rgba(0,200,83,0.07)" : "#fff",
                  color: form.modalidad === m ? "#00C853" : "#6e6e73",
                }}>
                {m}
              </button>
            ))}
          </div>
        </div>
      </div>
    );

    if (step === 2) return (
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Años de experiencia</Label>
            <Input type="number" placeholder="Ej: 5" min="0" value={form.experiencia} onChange={e => set("experiencia", e.target.value)} />
          </div>
          <div>
            <Label>Valor sesión (CLP)</Label>
            <Input type="number" placeholder="Ej: 25000" min="0" value={form.precio} onChange={e => set("precio", e.target.value)} />
          </div>
        </div>
        <div>
          <Label>Disponibilidad</Label>
          <Input placeholder="Ej: Lunes a Viernes 9:00 - 18:00" value={form.disponibilidad} onChange={e => set("disponibilidad", e.target.value)} />
        </div>
        <div>
          <Label>Descripción breve (se ve en el marketplace)</Label>
          <Input placeholder="Una línea que resume tu práctica..." value={form.descripcion} onChange={e => set("descripcion", e.target.value)} />
        </div>
        <div>
          <Label>Bio completo (en tu perfil)</Label>
          <Textarea placeholder="Tu formación, enfoque y experiencia. Habla directamente a tus futuros pacientes..." value={form.bio} onChange={e => set("bio", e.target.value)} />
        </div>
        <div>
          <Label>Enfoques o áreas (separados por coma)</Label>
          <Input placeholder="Ej: Ansiedad, Terapia cognitivo-conductual, Adultos" value={form.enfoques} onChange={e => set("enfoques", e.target.value)} />
        </div>
      </div>
    );

    if (step === 3) return (
      <div className="space-y-5">
        <div>
          <Label required>Email profesional</Label>
          <Input type="email" placeholder="tu@email.com" value={form.email} onChange={e => set("email", e.target.value)} />
        </div>
        <div>
          <Label>WhatsApp (con código de país)</Label>
          <Input type="tel" placeholder="Ej: 56912345678" value={form.whatsapp} onChange={e => set("whatsapp", e.target.value)} />
        </div>
        <div>
          <Label>Link de tu agenda clínica</Label>
          <input
            type="url"
            placeholder="Ej: https://tu-nombre.agendaclinicas.cl"
            value={form.sitioWeb}
            onChange={e => set("sitioWeb", e.target.value)}
            className="w-full rounded-xl px-4 py-3 text-[#1d1d1f] outline-none transition-all"
            style={{
              fontSize: "15px",
              border: agendaIngresada
                ? agendaValida
                  ? "2px solid #00C853"
                  : "2px solid #ef4444"
                : "1px solid #d2d2d7",
              background: agendaIngresada && agendaValida ? "rgba(0,200,83,0.04)" : "#ffffff",
            }}
          />

          {/* Feedback dinámico */}
          {agendaIngresada && !agendaValida && (
            <p className="mt-2 flex items-center gap-1.5 text-red-500" style={{ fontSize: "12px" }}>
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
              Solo se aceptan links con dominio <strong>agendaclinicas.cl</strong>
            </p>
          )}
          {agendaValida && (
            <p className="mt-2 flex items-center gap-1.5 text-[#00C853]" style={{ fontSize: "12px" }}>
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              Link de Agenda Clínica válido
            </p>
          )}
          {!agendaIngresada && (
            <p className="mt-2 font-light text-[#6e6e73]" style={{ fontSize: "12px" }}>
              Debe ser un link de <strong>agendaclinicas.cl</strong>. Si aún no tienes, puedes continuar sin él.
            </p>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-[#e5e5ea] pt-5">
          <p className="font-semibold text-[#1d1d1f] mb-4" style={{ fontSize: "13px", letterSpacing: "-0.01em" }}>
            Datos de acceso a tu perfil
          </p>
          <p className="font-light text-[#6e6e73] mb-5" style={{ fontSize: "12px" }}>
            Con estas credenciales podrás ingresar a tu panel y editar tu perfil cuando quieras.
          </p>

          {/* RUT */}
          <div className="mb-4">
            <Label required>RUT</Label>
            <div className="relative">
              <input
                type="text"
                placeholder="Ej: 12.345.678-9"
                value={form.rut}
                onChange={e => set("rut", formatRUT(e.target.value))}
                maxLength={12}
                className="w-full rounded-xl px-4 py-3 text-[#1d1d1f] outline-none transition-all"
                style={{
                  fontSize: "15px",
                  border: rutValido === null ? "1px solid #d2d2d7"
                    : rutValido ? "2px solid #00C853"
                    : "2px solid #ef4444",
                }}
              />
              {rutValido === true && (
                <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00C853]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              )}
            </div>
            {rutValido === false && (
              <p className="mt-1.5 text-red-500" style={{ fontSize: "12px" }}>RUT inválido. Verifica el formato.</p>
            )}
          </div>

          {/* Contraseña */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label required>Contraseña</Label>
              <Input type="password" placeholder="Mínimo 8 caracteres" value={form.password}
                onChange={e => set("password", e.target.value)} />
            </div>
            <div>
              <Label required>Confirmar contraseña</Label>
              <input
                type="password"
                placeholder="Repite tu contraseña"
                value={form.confirmPassword}
                onChange={e => set("confirmPassword", e.target.value)}
                className="w-full rounded-xl px-4 py-3 text-[#1d1d1f] outline-none transition-all"
                style={{
                  fontSize: "15px",
                  border: !form.confirmPassword ? "1px solid #d2d2d7"
                    : passwordMatch ? "2px solid #00C853"
                    : "2px solid #ef4444",
                }}
              />
              {passwordMismatch && (
                <p className="mt-1.5 text-red-500" style={{ fontSize: "12px" }}>Las contraseñas no coinciden.</p>
              )}
            </div>
          </div>
        </div>

        {/* Redes sociales */}
        <div className="border-t border-[#e5e5ea] pt-5">
          <p className="font-semibold text-[#1d1d1f] mb-4" style={{ fontSize: "13px", letterSpacing: "-0.01em" }}>
            Redes sociales <span className="font-light text-[#6e6e73]" style={{ fontSize: "11px" }}>(opcional)</span>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { key: "instagram", label: "Instagram", placeholder: "@tu_usuario" },
              { key: "facebook", label: "Facebook", placeholder: "facebook.com/tu-página" },
              { key: "linkedin", label: "LinkedIn", placeholder: "linkedin.com/in/tu-perfil" },
              { key: "twitter", label: "X (Twitter)", placeholder: "@tu_usuario" },
            ].map(({ key, label, placeholder }) => (
              <div key={key}>
                <Label>{label}</Label>
                <Input placeholder={placeholder} value={form[key]} onChange={e => set(key, e.target.value)} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );

    return null;
  };

  /* ── Paso 4: Confirmación ── */
  const renderConfirm = () => {
    const rows = [
      ["Plan", `${plan?.name} — ${plan?.price}${plan?.period}`],
      ["Nombre", form.nombre],
      ["Especialidad", especialidadFinal],
      ["Región", form.region],
      ["Comuna", form.comuna],
      ["Modalidad", form.modalidad],
      ["Experiencia", form.experiencia ? `${form.experiencia} años` : "—"],
      ["Valor sesión", form.precio ? `$${Number(form.precio).toLocaleString("es-CL")} CLP` : "—"],
      ["Email", form.email],
      ["WhatsApp", form.whatsapp || "—"],
    ];

    return (
      <div className="space-y-6">
        {/* Resumen */}
        <div className="rounded-2xl border border-[#d2d2d7] overflow-hidden">
          {rows.map(([label, value], i) => (
            <div key={label} className="flex items-center justify-between px-5 py-3.5"
              style={{ borderBottom: i < rows.length - 1 ? "1px solid #e5e5ea" : "none",
                background: label === "Plan" ? "rgba(0,200,83,0.04)" : "#fff" }}>
              <span className="font-semibold text-[#6e6e73]" style={{ fontSize: "13px" }}>{label}</span>
              <span className="font-medium text-[#1d1d1f] text-right max-w-[60%]"
                style={{ fontSize: "13px", color: label === "Plan" ? "#00C853" : "#1d1d1f" }}>
                {value || "—"}
              </span>
            </div>
          ))}
        </div>

        {/* Activación según plan */}
        <div className="rounded-2xl border border-[#d2d2d7] px-5 py-4">
          <p className="font-semibold text-[#1d1d1f] mb-1" style={{ fontSize: "15px" }}>
            ¿Qué pasa después?
          </p>
          <p className="font-light text-[#6e6e73] leading-relaxed" style={{ fontSize: "13px" }}>
            {plan?.flujo === "pago"
              ? "Confirmas el pago vía Mercado Pago y tu perfil se activa automáticamente. Sin esperas, sin gestiones manuales."
              : "Enviamos tu solicitud al equipo de Medify. Te contactamos en menos de 24 horas para coordinar condiciones, precio y activación de tu perfil de clínica."}
          </p>
        </div>

        {/* CTA — flujo automático o por email según el plan */}
        <div className="rounded-2xl bg-[#000000] p-6 text-center">
          {plan?.flujo === "pago" ? (
            <>
              <p className="font-semibold text-white mb-1" style={{ fontSize: "17px", letterSpacing: "-0.01em" }}>
                Un solo paso más.
              </p>
              <p className="font-light mb-6" style={{ fontSize: "14px", color: "rgba(255,255,255,0.45)" }}>
                Al confirmar el pago tu perfil se activa automáticamente en el marketplace. Sin esperas.
              </p>
              <a
                href={plan.pagoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full rounded-full text-white transition-colors duration-150"
                style={{ fontSize: "17px", fontWeight: 400, padding: "14px", background: "#00C853" }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Proceder al pago — {plan.price}{plan.period}
              </a>
              <p className="mt-3 font-light" style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>
                Pago seguro vía Mercado Pago · Tu perfil se activa al instante
              </p>
            </>
          ) : (
            <>
              <p className="font-semibold text-white mb-1" style={{ fontSize: "17px", letterSpacing: "-0.01em" }}>
                Solicitud para clínica o centro médico.
              </p>
              <p className="font-light mb-6" style={{ fontSize: "14px", color: "rgba(255,255,255,0.45)" }}>
                Enviamos tu solicitud a nuestro equipo. Te contactamos en menos de 24 horas para coordinar la activación y condiciones.
              </p>
              <a
                href={`mailto:ventas@medify.cl?subject=${encodeURIComponent("Solicitud Plan Clínica — " + form.nombre)}&body=${encodeURIComponent(
                  `Nombre: ${form.nombre}\nEspecialidad: ${especialidadFinal}\nRegión: ${form.region}\nComuna: ${form.comuna}\nModalidad: ${form.modalidad}\nEmail: ${form.email}\nWhatsApp: ${form.whatsapp}\nWeb/Agenda: ${form.sitioWeb}`
                )}`}
                className="flex items-center justify-center gap-2 w-full rounded-full text-white transition-colors duration-150"
                style={{ fontSize: "17px", fontWeight: 400, padding: "14px", background: "#00C853" }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Enviar solicitud por email
              </a>
              <p className="mt-3 font-light" style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>
                O escríbenos directo a{" "}
                <span style={{ color: "#00C853" }}>ventas@medify.cl</span>
              </p>
            </>
          )}
        </div>
      </div>
    );
  };

  const stepTitle = ["Elige tu plan", "Datos básicos", "Tu práctica", "Contacto", "Confirmar solicitud"];
  const stepDesc = [
    "Selecciona el plan con el que quieres aparecer en Medify.",
    "La información que verán los pacientes en tu perfil.",
    "Cuéntales a tus pacientes quién eres y cómo trabajas.",
    "Cómo te contactamos y cómo te contactan los pacientes.",
    "Revisa tu información antes de enviar.",
  ];

  return (
    
    <div className="min-h-screen bg-white">

      {/* Header */}
      <div className="bg-[#000000] px-6 pt-16 pb-14">
        <div className="max-w-[680px] mx-auto text-center">
          <p className="font-semibold text-[#6e6e73] uppercase mb-4"
            style={{ fontSize: "12px", letterSpacing: "0.08em" }}>
            Para profesionales de la salud
          </p>
          <h1 className="font-semibold text-white leading-[1.06] mb-5"
            style={{ fontSize: "clamp(1.8rem,4.5vw,3rem)", letterSpacing: "-0.03em" }}>
            Forma parte de Medify.
            <br />
            <span style={{
              background: "linear-gradient(135deg,#00e676,#00C853)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"
            }}>
              Llega a más pacientes.
            </span>
          </h1>
          <p className="font-light leading-relaxed"
            style={{ fontSize: "17px", color: "rgba(255,255,255,0.4)" }}>
            Profesionales verificados en todo Chile. Elige tu plan, completa tu perfil y empieza a recibir pacientes.
          </p>

          {/* 3 bullets */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mt-6">
            {["Perfil activo en minutos", "Pacientes en todo Chile", "Sin contratos largos"].map(b => (
              <span key={b} className="flex items-center gap-2" style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00C853]" />
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Formulario */}
      <div className="max-w-[560px] mx-auto px-6 py-14">
        <StepBar current={step} />

        {/* Título del paso */}
        <div className="mb-8">
          <h2 className="font-semibold text-[#1d1d1f]"
            style={{ fontSize: "21px", letterSpacing: "-0.015em" }}>
            {stepTitle[step]}
          </h2>
          <p className="font-light text-[#6e6e73] mt-1" style={{ fontSize: "15px" }}>
            {stepDesc[step]}
          </p>
        </div>

        {step === 0 && renderPlan()}
        {step > 0 && step < 4 && renderForm()}
        {step === 4 && renderConfirm()}

        {/* Navegación */}
        {step < 4 && (
          <div className="flex items-center justify-between mt-8">
            {step > 0 ? (
              <button onClick={back}
                className="font-medium text-[#6e6e73] hover:text-[#1d1d1f] transition-colors"
                style={{ fontSize: "15px" }}>
                ← Atrás
              </button>
            ) : (
              <Link href="/precios"
                className="font-medium text-[#6e6e73] hover:text-[#1d1d1f] transition-colors"
                style={{ fontSize: "15px" }}>
                Comparar planes
              </Link>
            )}
            <button onClick={next} disabled={!canNext()}
              className="inline-flex items-center justify-center rounded-full text-white transition-all disabled:opacity-35 disabled:cursor-not-allowed"
              style={{ fontSize: "15px", fontWeight: 400, padding: "12px 28px", background: "#00C853" }}>
              {step === 3 ? "Revisar →" : "Continuar →"}
            </button>
          </div>
        )}

        {step === 4 && (
          <button onClick={back}
            className="mt-4 w-full text-center font-medium text-[#6e6e73] hover:text-[#1d1d1f] transition-colors"
            style={{ fontSize: "15px" }}>
            ← Volver y editar
          </button>
        )}
      </div>

      {/* ── Toast: ¿Aún no tienes Agenda Clínica? ── */}
      {showToast && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-4 pb-6 sm:pb-0"
          style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}>
          <div className="w-full max-w-sm rounded-3xl p-7 shadow-2xl" style={{ background: "#ffffff" }}>
            <p className="font-semibold text-[#1d1d1f] mb-2" style={{ fontSize: "17px", letterSpacing: "-0.01em" }}>
              ¿Aún no tienes Agenda Clínica?
            </p>
            <p className="font-light text-[#6e6e73] leading-relaxed mb-6" style={{ fontSize: "14px" }}>
              Con Agenda Clínica tus pacientes pueden reservar y pagar directamente desde tu perfil en Red Medify. Puedes obtenerla ahora o configurarla después.
            </p>
            <div className="space-y-3">
              <a href="https://agendaclinicas.cl" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full rounded-full text-white transition-colors duration-150"
                style={{ fontSize: "15px", fontWeight: 400, padding: "13px", background: "#00C853" }}>
                Ver Agenda Clínica
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>
              <button
                onClick={() => { setShowToast(false); setStep(s => Math.min(s + 1, 4)); }}
                className="w-full rounded-full border border-[#d2d2d7] text-[#6e6e73] hover:border-[#1d1d1f] hover:text-[#1d1d1f] transition-all duration-150"
                style={{ fontSize: "15px", fontWeight: 400, padding: "12px" }}>
                Ver después
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
