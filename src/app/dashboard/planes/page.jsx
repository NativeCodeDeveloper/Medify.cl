"use client";
import { useState } from "react";

const INITIAL_PLANES = [
  {
    id: "esencial", tipo: "individual", nombre: "Esencial",
    precio: 0, periodo: "Gratis",
    descripcion: "Aparece en el marketplace. Los pacientes te encuentran y te contactan directamente.",
    features: ["Perfil público verificado", "Visibilidad en el marketplace", "Botón WhatsApp", "Publicación en redes de Medify"],
    flujo: "wsp", activo: true,
    pagoUrl: "",
  },
  {
    id: "profesional", tipo: "individual", nombre: "Profesional",
    precio: 16990, periodo: "/mes + IVA",
    descripcion: "Marketplace más agenda clínica, pagos online y gestión de pacientes.",
    features: ["Todo lo del Plan Esencial", "Agenda clínica y calendario digital", "Pagos vía Mercado Pago", "Ficha clínica y gestión de pacientes", "Recordatorios automáticos"],
    flujo: "pago", activo: true,
    pagoUrl: "https://www.mercadopago.cl/subscriptions/checkout?preapproval_plan_id=PLAN_PROFESIONAL",
  },
  {
    id: "avanzado", tipo: "individual", nombre: "Avanzado",
    precio: 26990, periodo: "/mes + IVA",
    descripcion: "Máxima automatización: recordatorios WhatsApp, ficha avanzada y reportes.",
    features: ["Todo lo del Plan Profesional", "Recordatorios por WhatsApp", "Ficha clínica avanzada", "Reportes Excel y PDF"],
    flujo: "pago", activo: true,
    pagoUrl: "https://www.mercadopago.cl/subscriptions/checkout?preapproval_plan_id=PLAN_AVANZADO",
  },
  {
    id: "corporativo", tipo: "corporativo", nombre: "Corporativo",
    precio: 129900, periodo: "/mes + IVA",
    descripcion: "Para clínicas con 3+ profesionales. Gestión centralizada y reportería.",
    features: ["+3 profesionales", "Panel administrativo", "Reportería ejecutiva", "Integraciones de facturación"],
    flujo: "email", activo: true,
    pagoUrl: "",
  },
  {
    id: "enterprise", tipo: "corporativo", nombre: "Enterprise",
    precio: 0, periodo: "A cotizar",
    descripcion: "Personalizado para grandes instituciones.",
    features: ["Implementación personalizada", "Soporte prioritario dedicado", "SLA y seguridad reforzada"],
    flujo: "email", activo: true,
    pagoUrl: "",
  },
];

const FLUJO_LABELS = { pago: "Pago automático", wsp: "WhatsApp", email: "Por email" };
const FLUJO_COLORS = { pago: "#00C853", wsp: "#25D366", email: "#0071e3" };

function PlanModal({ plan, onSave, onClose }) {
  const [form, setForm] = useState({ ...plan });
  const [featInput, setFeatInput] = useState("");
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const addFeat = () => {
    if (!featInput.trim()) return;
    set("features", [...(form.features || []), featInput.trim()]);
    setFeatInput("");
  };
  const removeFeat = (i) => set("features", form.features.filter((_, idx) => idx !== i));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-10 pb-10 px-4"
      style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}>
      <div className="bg-white rounded-3xl w-full max-w-xl max-h-[85vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between px-7 pt-6 pb-5 border-b border-[#e5e5ea]">
          <h2 className="font-semibold text-[#1d1d1f]" style={{ fontSize: "19px", letterSpacing: "-0.015em" }}>
            Editar plan: {form.nombre}
          </h2>
          <button onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f5f5f7] flex items-center justify-center hover:bg-[#e5e5ea] transition-colors">
            <svg className="w-4 h-4 text-[#6e6e73]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-7 py-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-[#6e6e73] uppercase mb-2" style={{ fontSize: "10px", letterSpacing: "0.08em" }}>Nombre del plan</label>
              <input value={form.nombre} onChange={e => set("nombre", e.target.value)}
                className="w-full rounded-xl border border-[#d2d2d7] px-4 py-2.5 text-[#1d1d1f] outline-none focus:border-[#00C853] focus:ring-2 focus:ring-[#00C853]/10 text-sm" />
            </div>
            <div>
              <label className="block font-semibold text-[#6e6e73] uppercase mb-2" style={{ fontSize: "10px", letterSpacing: "0.08em" }}>Tipo</label>
              <select value={form.tipo} onChange={e => set("tipo", e.target.value)}
                className="w-full rounded-xl border border-[#d2d2d7] px-4 py-2.5 text-[#1d1d1f] outline-none focus:border-[#00C853] focus:ring-2 focus:ring-[#00C853]/10 text-sm bg-white">
                <option value="individual">Individual</option>
                <option value="corporativo">Corporativo</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-[#6e6e73] uppercase mb-2" style={{ fontSize: "10px", letterSpacing: "0.08em" }}>Precio (CLP)</label>
              <input type="number" value={form.precio} onChange={e => set("precio", Number(e.target.value))}
                className="w-full rounded-xl border border-[#d2d2d7] px-4 py-2.5 text-[#1d1d1f] outline-none focus:border-[#00C853] focus:ring-2 focus:ring-[#00C853]/10 text-sm" />
            </div>
            <div>
              <label className="block font-semibold text-[#6e6e73] uppercase mb-2" style={{ fontSize: "10px", letterSpacing: "0.08em" }}>Período</label>
              <input value={form.periodo} onChange={e => set("periodo", e.target.value)}
                placeholder="/mes + IVA"
                className="w-full rounded-xl border border-[#d2d2d7] px-4 py-2.5 text-[#1d1d1f] outline-none focus:border-[#00C853] focus:ring-2 focus:ring-[#00C853]/10 text-sm" />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-[#6e6e73] uppercase mb-2" style={{ fontSize: "10px", letterSpacing: "0.08em" }}>Flujo de pago</label>
            <div className="flex gap-3">
              {[["pago", "Pago automático (MP)"], ["wsp", "WhatsApp"], ["email", "Por email"]].map(([v, l]) => (
                <button key={v} type="button" onClick={() => set("flujo", v)}
                  className="flex-1 rounded-xl border py-2.5 text-xs font-medium transition-all"
                  style={{
                    borderColor: form.flujo === v ? "#00C853" : "#d2d2d7",
                    background: form.flujo === v ? "rgba(0,200,83,0.07)" : "#fff",
                    color: form.flujo === v ? "#00C853" : "#6e6e73",
                  }}>
                  {l}
                </button>
              ))}
            </div>
          </div>

          {form.flujo === "pago" && (
            <div>
              <label className="block font-semibold uppercase mb-2 flex items-center gap-1.5"
                style={{ fontSize: "10px", letterSpacing: "0.08em", color: "#00C853" }}>
                Link Mercado Pago
              </label>
              <input value={form.pagoUrl} onChange={e => set("pagoUrl", e.target.value)}
                placeholder="https://www.mercadopago.cl/subscriptions/checkout?..."
                className="w-full rounded-xl px-4 py-2.5 text-[#1d1d1f] outline-none text-sm"
                style={{ border: "2px solid rgba(0,200,83,0.3)", background: "rgba(0,200,83,0.04)" }} />
            </div>
          )}

          <div>
            <label className="block font-semibold text-[#6e6e73] uppercase mb-2" style={{ fontSize: "10px", letterSpacing: "0.08em" }}>Descripción</label>
            <textarea value={form.descripcion} onChange={e => set("descripcion", e.target.value)} rows={2}
              className="w-full rounded-xl border border-[#d2d2d7] px-4 py-2.5 text-[#1d1d1f] outline-none focus:border-[#00C853] focus:ring-2 focus:ring-[#00C853]/10 text-sm resize-none" />
          </div>

          <div>
            <label className="block font-semibold text-[#6e6e73] uppercase mb-2" style={{ fontSize: "10px", letterSpacing: "0.08em" }}>Features</label>
            <div className="space-y-2 mb-3">
              {form.features?.map((f, i) => (
                <div key={i} className="flex items-center gap-2 bg-[#f5f5f7] rounded-xl px-4 py-2.5">
                  <svg className="w-3.5 h-3.5 text-[#00C853] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span className="flex-1 text-[#424245] text-sm">{f}</span>
                  <button onClick={() => removeFeat(i)} className="text-[#86868b] hover:text-red-500 transition-colors">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input value={featInput} onChange={e => setFeatInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && addFeat()}
                placeholder="Agregar feature..."
                className="flex-1 rounded-xl border border-[#d2d2d7] px-4 py-2.5 text-[#1d1d1f] outline-none focus:border-[#00C853] focus:ring-2 focus:ring-[#00C853]/10 text-sm" />
              <button onClick={addFeat}
                className="rounded-xl px-4 py-2.5 text-white text-sm font-medium transition-colors"
                style={{ background: "#00C853" }}>
                + Agregar
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between px-7 pb-6 pt-4 border-t border-[#e5e5ea]">
          <button onClick={onClose}
            className="rounded-full border border-[#d2d2d7] px-5 py-2.5 text-sm font-medium text-[#6e6e73] hover:border-[#1d1d1f] hover:text-[#1d1d1f] transition-all">
            Cancelar
          </button>
          <button onClick={() => onSave(form)}
            className="rounded-full text-white px-6 py-2.5 text-sm font-medium"
            style={{ background: "#00C853" }}>
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PlanesAdmin() {
  const [planes, setPlanes] = useState(INITIAL_PLANES);
  const [modal, setModal] = useState(null);
  const [tab, setTab] = useState("individual");

  const filtered = planes.filter(p => p.tipo === tab);

  const handleSave = (form) => {
    setPlanes(ps => ps.map(p => p.id === form.id ? form : p));
    setModal(null);
  };

  return (
    <div className="p-8">
      <div className="mb-7">
        <p className="font-semibold text-[#6e6e73] uppercase mb-1" style={{ fontSize: "11px", letterSpacing: "0.08em" }}>
          Administración
        </p>
        <h1 className="font-semibold text-[#1d1d1f]" style={{ fontSize: "28px", letterSpacing: "-0.02em" }}>
          Planes y Precios
        </h1>
      </div>

      {/* Toggle */}
      <div className="flex items-center mb-6">
        <div className="inline-flex items-center rounded-xl bg-white border border-[#d2d2d7] p-1">
          {[["individual", "Profesionales"], ["corporativo", "Corporaciones y clínicas"]].map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)}
              className="rounded-lg px-4 py-2 transition-all duration-150"
              style={{
                fontSize: "13px",
                fontWeight: tab === key ? 500 : 400,
                color: tab === key ? "#1d1d1f" : "#6e6e73",
                background: tab === key ? "#f5f5f7" : "transparent",
              }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Tabla de planes */}
      <div className="bg-white rounded-2xl border border-[#e5e5ea] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: "1px solid #e5e5ea", background: "#f5f5f7" }}>
              {["Plan", "Precio", "Flujo de pago", "Link MP", "Estado", "Acciones"].map(h => (
                <th key={h} className="text-left px-5 py-3 font-semibold text-[#6e6e73]"
                  style={{ fontSize: "10px", letterSpacing: "0.06em" }}>
                  {h.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => (
              <tr key={p.id} style={{ borderBottom: i < filtered.length - 1 ? "1px solid #f5f5f7" : "none" }}>
                <td className="px-5 py-4">
                  <p className="font-semibold text-[#1d1d1f]" style={{ fontSize: "14px" }}>{p.nombre}</p>
                  <p className="font-light text-[#6e6e73] mt-0.5" style={{ fontSize: "12px" }}>{p.descripcion.slice(0, 60)}…</p>
                </td>
                <td className="px-5 py-4">
                  <p className="font-semibold text-[#1d1d1f]" style={{ fontSize: "16px", letterSpacing: "-0.02em" }}>
                    {p.precio > 0 ? `$${p.precio.toLocaleString("es-CL")}` : "Gratis"}
                  </p>
                  <p className="font-light text-[#6e6e73]" style={{ fontSize: "11px" }}>{p.periodo}</p>
                </td>
                <td className="px-5 py-4">
                  <span className="rounded-full px-2.5 py-1 font-medium"
                    style={{ fontSize: "11px", background: `${FLUJO_COLORS[p.flujo]}18`, color: FLUJO_COLORS[p.flujo] }}>
                    {FLUJO_LABELS[p.flujo]}
                  </span>
                </td>
                <td className="px-5 py-4 max-w-[180px]">
                  {p.pagoUrl ? (
                    <a href={p.pagoUrl} target="_blank" rel="noopener noreferrer"
                      className="text-[#00C853] hover:underline underline-offset-4 truncate block"
                      style={{ fontSize: "12px", maxWidth: "160px" }}>
                      {p.pagoUrl.length > 30 ? p.pagoUrl.slice(0, 30) + "…" : p.pagoUrl}
                    </a>
                  ) : (
                    <span className="font-light text-[#86868b]" style={{ fontSize: "12px" }}>—</span>
                  )}
                </td>
                <td className="px-5 py-4">
                  <span className="w-2 h-2 rounded-full inline-block" style={{ background: p.activo ? "#00C853" : "#d2d2d7" }} />
                </td>
                <td className="px-5 py-4">
                  <button onClick={() => setModal(p)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-[#d2d2d7] px-3 py-2 text-xs font-medium text-[#6e6e73] hover:border-[#1d1d1f] hover:text-[#1d1d1f] transition-all">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
                    </svg>
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 font-light text-[#6e6e73]" style={{ fontSize: "12px" }}>
        Los cambios de precio y link de pago deben actualizarse también en Mercado Pago y en el código de <code className="bg-[#f5f5f7] px-1.5 py-0.5 rounded text-[#1d1d1f]">/unirse</code> hasta que el backend esté conectado.
      </p>

      {modal && <PlanModal plan={modal} onSave={handleSave} onClose={() => setModal(null)} />}
    </div>
  );
}
