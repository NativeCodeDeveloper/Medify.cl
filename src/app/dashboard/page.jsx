"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch, mensajeDeError } from "@/lib/api";
import { PROFESSIONALS } from "../marketplace/data/professionals";

const ACCESOS = [
  { label: "Revisar solicitudes", href: "/dashboard/solicitudes", desc: "Aprobar o rechazar registros de /unirse" },
  { label: "Profesionales", href: "/dashboard/profesionales", desc: "Editar, desactivar o eliminar cuentas" },
  { label: "Centros y clínicas", href: "/dashboard/centros", desc: "Instituciones registradas" },
  { label: "Ver marketplace", href: "/", desc: "Así lo ve el público" },
];

const fecha = (iso) => new Date(iso).toLocaleDateString("es-CL", { day: "numeric", month: "short" });

export default function DashboardOverview() {
  const [resumen, setResumen] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    apiFetch("/admin/resumen", { auth: "admin" })
      .then(setResumen)
      .catch(err => setError(mensajeDeError(err)));
  }, []);

  const n = (v) => (resumen ? v : "—");
  const stats = [
    { label: "Profesionales publicados", value: n(resumen?.profesionales.aprobadas), color: "#00C853" },
    { label: "Solicitudes pendientes", value: n((resumen?.profesionales.pendientes ?? 0) + (resumen?.centros.pendientes ?? 0)), color: "#86868b", href: "/dashboard/solicitudes" },
    { label: "Centros publicados", value: n(resumen?.centros.aprobadas), color: "#0369a1" },
    { label: "Reseñas de pacientes", value: n(resumen?.resenas.visibles), color: "#F59E0B" },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <p className="font-semibold text-[#6e6e73] uppercase mb-1" style={{ fontSize: "11px", letterSpacing: "0.08em" }}>
          Panel de administración
        </p>
        <h1 className="font-semibold text-[#1d1d1f]" style={{ fontSize: "28px", letterSpacing: "-0.02em" }}>
          Visión general
        </h1>
      </div>

      {error && <p role="alert" className="mb-6 rounded-xl bg-red-50 px-4 py-3 text-[13px] text-red-600">{error}</p>}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-3">
        {stats.map((s) => {
          const contenido = (
            <>
              <span className="mb-3 block h-2 w-2 rounded-full" style={{ background: s.color }} />
              <p className="font-semibold text-[#1d1d1f] mb-0.5" style={{ fontSize: "28px", letterSpacing: "-0.04em" }}>{s.value}</p>
              <p className="font-light text-[#6e6e73]" style={{ fontSize: "13px" }}>{s.label}</p>
            </>
          );
          return s.href ? (
            <Link key={s.label} href={s.href} className="bg-white rounded-2xl border border-[#e5e5ea] p-5 hover:border-[#00C853]/40 transition-colors">{contenido}</Link>
          ) : (
            <div key={s.label} className="bg-white rounded-2xl border border-[#e5e5ea] p-5">{contenido}</div>
          );
        })}
      </div>
      <p className="mb-8 text-[12px] text-[#86868b]">
        Además hay {PROFESSIONALS.length} perfiles cargados a mano en el código (marketplace/data/professionals.js), que se muestran siempre en el marketplace.
      </p>

      <div className="mb-8">
        <h2 className="font-semibold text-[#1d1d1f] mb-4" style={{ fontSize: "17px", letterSpacing: "-0.01em" }}>Accesos rápidos</h2>
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

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-[#1d1d1f]" style={{ fontSize: "17px", letterSpacing: "-0.01em" }}>Últimas solicitudes</h2>
          <Link href="/dashboard/solicitudes" className="font-medium text-[#00C853] hover:underline underline-offset-4" style={{ fontSize: "13px" }}>
            Ver todas →
          </Link>
        </div>
        <div className="bg-white rounded-2xl border border-[#e5e5ea] overflow-hidden">
          {!resumen ? (
            <p className="px-5 py-8 text-center text-[13px] text-[#6e6e73]">{error ? "No disponible" : "Cargando…"}</p>
          ) : resumen.ultimasPendientes.length === 0 ? (
            <p className="px-5 py-8 text-center text-[13px] font-light text-[#6e6e73]">No hay solicitudes pendientes.</p>
          ) : (
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid #e5e5ea", background: "#f5f5f7" }}>
                  {["Nombre", "Tipo", "Especialidad / categoría", "Comuna", "Fecha"].map((h) => (
                    <th key={h} className="text-left px-5 py-3 font-semibold text-[#6e6e73] uppercase" style={{ fontSize: "11px", letterSpacing: "0.06em" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {resumen.ultimasPendientes.map((s, i, arr) => (
                  <tr key={`${s.tipo_cuenta}-${s.id}`} style={{ borderBottom: i < arr.length - 1 ? "1px solid #f5f5f7" : "none" }}>
                    <td className="px-5 py-3.5 font-medium text-[#1d1d1f]" style={{ fontSize: "13px" }}>
                      {s.tipo_cuenta === "profesional" ? `${s.nombres} ${s.apellidos}` : s.nombre}
                    </td>
                    <td className="px-5 py-3.5 font-light text-[#424245]" style={{ fontSize: "13px" }}>{s.tipo_cuenta === "profesional" ? "Profesional" : s.tipo || "Centro"}</td>
                    <td className="px-5 py-3.5 font-light text-[#424245]" style={{ fontSize: "13px" }}>{s.especialidad ?? s.categoria}</td>
                    <td className="px-5 py-3.5 font-light text-[#424245]" style={{ fontSize: "13px" }}>{s.comuna}</td>
                    <td className="px-5 py-3.5 font-light text-[#424245]" style={{ fontSize: "13px" }}>{fecha(s.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
