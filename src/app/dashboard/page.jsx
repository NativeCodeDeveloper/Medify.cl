"use client";
import Link from "next/link";
import { PROFESSIONALS } from "../marketplace/data/professionals";

const STATS = [
  {
    label: "Profesionales activos",
    value: PROFESSIONALS.filter((p) => p.available).length,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    color: "#00C853",
  },
  {
    label: "Total profesionales",
    value: PROFESSIONALS.length,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    color: "#0071e3",
  },
  {
    label: "Planes activos",
    value: 3,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185z" />
      </svg>
    ),
    color: "#6e6e73",
  },
  {
    label: "Solicitudes pendientes",
    value: 0,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    ),
    color: "#F59E0B",
  },
];

const ACCESOS = [
  { label: "Gestionar profesionales", href: "/dashboard/profesionales", desc: "Agregar, editar o eliminar perfiles del marketplace" },
  { label: "Gestionar planes", href: "/dashboard/planes", desc: "Actualizar precios, features y links de pago" },
  { label: "Ver marketplace", href: "/marketplace", desc: "Así lo ve el público" },
  { label: "Ver formulario /unirse", href: "/unirse", desc: "Formulario que llenan los profesionales" },
];

export default function DashboardOverview() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <p className="font-semibold text-[#6e6e73] uppercase mb-1" style={{ fontSize: "11px", letterSpacing: "0.08em" }}>
          Panel de administración
        </p>
        <h1 className="font-semibold text-[#1d1d1f]" style={{ fontSize: "28px", letterSpacing: "-0.02em" }}>
          Visión general
        </h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STATS.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-[#e5e5ea] p-5">
            <div className="flex items-center justify-between mb-3">
              <span style={{ color: s.color }}>{s.icon}</span>
            </div>
            <p className="font-semibold text-[#1d1d1f] mb-0.5" style={{ fontSize: "28px", letterSpacing: "-0.04em" }}>
              {s.value}
            </p>
            <p className="font-light text-[#6e6e73]" style={{ fontSize: "13px" }}>
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Accesos rápidos */}
      <div className="mb-8">
        <h2 className="font-semibold text-[#1d1d1f] mb-4" style={{ fontSize: "17px", letterSpacing: "-0.01em" }}>
          Accesos rápidos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ACCESOS.map((a) => (
            <Link key={a.href} href={a.href}
              className="group bg-white rounded-2xl border border-[#e5e5ea] p-5 hover:border-[#00C853]/40 hover:shadow-md transition-all duration-150 flex items-center justify-between">
              <div>
                <p className="font-medium text-[#1d1d1f] mb-0.5" style={{ fontSize: "14px" }}>{a.label}</p>
                <p className="font-light text-[#6e6e73]" style={{ fontSize: "12px" }}>{a.desc}</p>
              </div>
              <svg className="w-4 h-4 text-[#6e6e73] group-hover:text-[#00C853] transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>
      </div>

      {/* Últimos profesionales */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-[#1d1d1f]" style={{ fontSize: "17px", letterSpacing: "-0.01em" }}>
            Profesionales en el marketplace
          </h2>
          <Link href="/dashboard/profesionales"
            className="font-medium text-[#00C853] hover:underline underline-offset-4 transition-all"
            style={{ fontSize: "13px" }}>
            Ver todos →
          </Link>
        </div>
        <div className="bg-white rounded-2xl border border-[#e5e5ea] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid #e5e5ea", background: "#f5f5f7" }}>
                {["Profesional", "Especialidad", "Región", "Plan", "Estado"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 font-semibold text-[#6e6e73]"
                    style={{ fontSize: "11px", letterSpacing: "0.06em" }}>
                    {h.toUpperCase()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PROFESSIONALS.map((p, i) => (
                <tr key={p.id}
                  style={{ borderBottom: i < PROFESSIONALS.length - 1 ? "1px solid #f5f5f7" : "none" }}>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-[#f5f5f7] flex-shrink-0">
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover object-top" />
                      </div>
                      <span className="font-medium text-[#1d1d1f]" style={{ fontSize: "13px" }}>{p.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 font-light text-[#424245]" style={{ fontSize: "13px" }}>{p.role}</td>
                  <td className="px-5 py-3.5 font-light text-[#424245]" style={{ fontSize: "13px" }}>{p.location}</td>
                  <td className="px-5 py-3.5">
                    <span className="rounded-full px-2.5 py-1 font-medium"
                      style={{ fontSize: "11px", background: "rgba(0,200,83,0.1)", color: "#00C853" }}>
                      Activo
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`w-2 h-2 rounded-full inline-block`}
                      style={{ background: p.available ? "#00C853" : "#d2d2d7" }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
