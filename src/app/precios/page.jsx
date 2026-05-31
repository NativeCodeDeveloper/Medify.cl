"use client";
import { useState } from "react";
import Link from "next/link";

/* ─── Plan data ─────────────────────────────────────────────────────── */
const INDIVIDUAL = [
  {
    id: "esencial",
    name: "Esencial",
    label: "Para comenzar",
    price: "$0",
    period: "Gratis",
    featured: false,
    features: [
      "Perfil profesional en el Marketplace",
      "Botón WhatsApp directo",
      "Información de contacto y redes",
      "Ficha académica y especialidades",
      "Publicación en redes sociales de Medify",
    ],
    cta: "Comenzar gratis",
    href: "https://wa.me/56991749964?text=Quiero%20comenzar%20con%20el%20plan%20Esencial%20de%20Medify",
  },
  {
    id: "profesional",
    name: "Profesional",
    label: "Más popular",
    price: "$16.990",
    period: "CLP/mes + IVA",
    featured: true,
    features: [
      "Todo lo del Plan Esencial",
      "Agendamiento automático",
      "Calendario digital",
      "Ficha clínica general",
      "Bloques de horarios por jornada",
      "Pagos vía Mercado Pago",
      "Gestión de pacientes",
      "Estado de reservaciones",
      "Seguimiento por correo",
    ],
    note: "Emisión de boletas y facturas: +$20.000 CLP adicional.",
    cta: "Solicitar información",
    href: "https://wa.me/56991749964?text=Quiero%20cotizar%20el%20plan%20Profesional%20de%20Medify",
  },
  {
    id: "avanzado",
    name: "Avanzado",
    label: "Máximo control",
    price: "$26.990",
    period: "CLP/mes + IVA",
    featured: false,
    features: [
      "Todo lo del Plan Profesional",
      "Ficha clínica avanzada",
      "Recordatorios automáticos por correo",
      "Recordatorios por WhatsApp",
      "Control de pagos y reportes (Excel/PDF)",
      "Saludo de cumpleaños a pacientes",
    ],
    cta: "Solicitar demo",
    href: "https://wa.me/56991749964?text=Quiero%20conocer%20el%20plan%20Avanzado%20de%20Medify",
  },
];

const BUSINESS = [
  {
    id: "corporativo",
    name: "Corporativo",
    label: "Para clínicas",
    price: "$129.900",
    period: "CLP/mes + IVA",
    featured: true,
    features: [
      "+3 profesionales en una sola cuenta",
      "Flujos de trabajo por área clínica",
      "Panel administrativo y contable",
      "Reportería ejecutiva por sede y especialidad",
      "Integraciones de facturación",
    ],
    cta: "Solicitar asesoría",
    href: "https://wa.me/56991749964?text=Quiero%20cotizar%20el%20plan%20Corporativo%20de%20Medify",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    label: "A medida",
    price: "Cotización",
    period: "personalizada",
    featured: false,
    features: [
      "Implementación personalizada por etapas",
      "Soporte prioritario y ejecutivo dedicado",
      "SLA y seguridad reforzada",
      "Alta disponibilidad y cumplimiento normativo",
    ],
    cta: "Contactar a Medify",
    href: "https://wa.me/56991749964?text=Quiero%20informaci%C3%B3n%20del%20plan%20Enterprise%20de%20Medify",
  },
];

/* ─── Checkmark icon ─────────────────────────────────────────────────── */
function Check() {
  return (
    <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="#00C853" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

/* ─── Single plan card ───────────────────────────────────────────────── */
function PlanCard({ plan }) {
  return (
    <div
      className="relative flex flex-col rounded-2xl overflow-hidden"
      style={{
        border: plan.featured ? "2px solid #00C853" : "1px solid #d2d2d7",
        background: "#ffffff",
      }}
    >
      {plan.featured && (
        <div className="bg-[#00C853] text-white text-center py-2" style={{ fontSize: "12px", fontWeight: 500, letterSpacing: "0.05em" }}>
          {plan.label}
        </div>
      )}

      <div className="p-7 flex flex-col flex-1">
        {!plan.featured && (
          <p className="font-medium text-[#6e6e73] mb-2" style={{ fontSize: "12px", letterSpacing: "0.05em" }}>
            {plan.label}
          </p>
        )}

        <h3 className="font-semibold text-[#1d1d1f] mb-4" style={{ fontSize: "21px", letterSpacing: "-0.015em" }}>
          {plan.name}
        </h3>

        <div className="mb-6 pb-6" style={{ borderBottom: "1px solid #e5e5ea" }}>
          <p className="font-semibold text-[#1d1d1f] leading-none mb-1" style={{ fontSize: "clamp(1.8rem,4vw,2.4rem)", letterSpacing: "-0.04em" }}>
            {plan.price}
          </p>
          <p className="font-light text-[#6e6e73]" style={{ fontSize: "13px" }}>
            {plan.period}
          </p>
        </div>

        <ul className="space-y-3 flex-1 mb-6">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-3">
              <Check />
              <span className="font-light text-[#424245] leading-relaxed" style={{ fontSize: "14px" }}>
                {f}
              </span>
            </li>
          ))}
        </ul>

        {plan.note && (
          <p className="text-[#6e6e73] mb-5 px-3 py-2.5 rounded-xl bg-[#f5f5f7]" style={{ fontSize: "12px" }}>
            {plan.note}
          </p>
        )}

        <a
          href={plan.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full text-white transition-colors duration-150"
          style={{
            fontSize: "15px",
            fontWeight: 400,
            padding: "12px 20px",
            background: plan.featured ? "#00C853" : "#1d1d1f",
          }}
        >
          {plan.cta}
        </a>
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────── */
export default function PreciosPage() {
  const [tab, setTab] = useState("individual");
  const plans = tab === "individual" ? INDIVIDUAL : BUSINESS;

  return (
    <div className="min-h-screen bg-white">

      {/* Header */}
      <div className="bg-[#000000] px-6 pt-16 pb-14">
        <div className="max-w-[740px] mx-auto text-center">
          <p className="font-semibold text-[#6e6e73] uppercase mb-4" style={{ fontSize: "12px", letterSpacing: "0.08em" }}>
            Planes y precios
          </p>
          <h1 className="font-semibold text-white leading-[1.08] mb-5" style={{ fontSize: "clamp(1.8rem,5vw,3.2rem)", letterSpacing: "-0.03em" }}>
            Elige el plan que hace crecer tu consulta.
          </h1>
          <p className="font-light leading-relaxed" style={{ fontSize: "17px", color: "rgba(255,255,255,0.45)" }}>
            Empieza gratis. Suscríbete cuando estés listo para ser visible en todo Chile.
          </p>
        </div>
      </div>

      {/* Tab toggle */}
      <div className="bg-[#f5f5f7] border-b border-[#d2d2d7] px-6 py-4">
        <div className="max-w-[980px] mx-auto flex justify-center">
          <div className="inline-flex items-center rounded-xl bg-white border border-[#d2d2d7] p-1">
            {[
              { key: "individual", label: "Para profesionales" },
              { key: "business", label: "Corporaciones y clínicas" },
            ].map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className="rounded-lg px-5 py-2 transition-all duration-150"
                style={{
                  fontSize: "14px",
                  fontWeight: tab === t.key ? 500 : 400,
                  color: tab === t.key ? "#1d1d1f" : "#6e6e73",
                  background: tab === t.key ? "#f5f5f7" : "transparent",
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Plans grid */}
      <div className="px-6 py-16">
        <div
          className="mx-auto"
          style={{
            maxWidth: tab === "individual" ? "980px" : "680px",
            display: "grid",
            gridTemplateColumns: tab === "individual" ? "repeat(auto-fit, minmax(260px, 1fr))" : "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "16px",
          }}
        >
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        {/* Trust row */}
        <div className="max-w-[980px] mx-auto mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3">
          {["100% legal · Chile", "Datos protegidos", "Respaldo en la nube", "Sin contratos largos"].map((t) => (
            <span key={t} className="flex items-center gap-2 text-[#6e6e73]" style={{ fontSize: "13px" }}>
              <svg className="w-3.5 h-3.5 text-[#00C853]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* FAQ / CTA bottom */}
      <div className="bg-[#f5f5f7] border-t border-[#d2d2d7] px-6 py-16">
        <div className="max-w-[600px] mx-auto text-center">
          <h2 className="font-semibold text-[#1d1d1f] mb-4" style={{ fontSize: "clamp(1.4rem,3vw,2rem)", letterSpacing: "-0.025em" }}>
            ¿Tienes dudas sobre qué plan elegir?
          </h2>
          <p className="font-light text-[#6e6e73] leading-relaxed mb-8" style={{ fontSize: "17px" }}>
            Nuestro equipo te ayuda a encontrar el plan ideal para tu práctica. Sin compromiso.
          </p>
          <a
            href="https://wa.me/56991749964?text=Hola,%20necesito%20ayuda%20para%20elegir%20un%20plan%20de%20Medify"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full text-white transition-colors duration-150"
            style={{ fontSize: "17px", fontWeight: 400, padding: "13px 28px", background: "#00C853" }}
          >
            Hablar con un asesor
          </a>
        </div>
      </div>
    </div>
  );
}
