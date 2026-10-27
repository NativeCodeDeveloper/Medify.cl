"use client";
import { useEffect, useState } from "react";
import { apiFetch, mensajeDeError } from "@/lib/api";

/* Cuentas creadas desde /unirse que esperan revisión.
 * Aprobar → aparece en el marketplace. Rechazar → la cuenta queda desactivada (no puede entrar). */

const fecha = (iso) => new Date(iso).toLocaleDateString("es-CL", { day: "numeric", month: "short", year: "numeric" });

function Dato({ label, value }) {
  if (!value && value !== 0) return null;
  return (
    <div>
      <dt className="text-[#6e6e73]" style={{ fontSize: "11px" }}>{label}</dt>
      <dd className="text-[#1d1d1f] break-words" style={{ fontSize: "13px" }}>{value}</dd>
    </div>
  );
}

export default function Solicitudes() {
  const [solicitudes, setSolicitudes] = useState(null);
  const [error, setError] = useState("");
  const [procesando, setProcesando] = useState(null); // "profesional-12"

  const cargar = () => {
    setError("");
    apiFetch("/admin/solicitudes", { auth: "admin" })
      .then(setSolicitudes)
      .catch(err => setError(mensajeDeError(err)));
  };

  useEffect(cargar, []);

  const resolver = async (s, accion) => {
    const key = `${s.tipo_cuenta}-${s.id}`;
    setProcesando(key);
    setError("");
    try {
      await apiFetch(`/admin/solicitudes/${s.tipo_cuenta}/${s.id}/${accion}`, { method: "PATCH", auth: "admin" });
      setSolicitudes(prev => prev.filter(x => `${x.tipo_cuenta}-${x.id}` !== key));
    } catch (err) {
      setError(mensajeDeError(err));
    } finally {
      setProcesando(null);
    }
  };

  return (
    <div className="p-5 sm:p-8">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-semibold text-[#6e6e73] uppercase mb-1" style={{ fontSize: "11px", letterSpacing: "0.08em" }}>
            Registro desde /unirse
          </p>
          <h1 className="font-semibold text-[#1d1d1f]" style={{ fontSize: "28px", letterSpacing: "-0.02em" }}>
            Solicitudes de ingreso
          </h1>
        </div>
        <button onClick={cargar}
          className="rounded-full border border-[#d2d2d7] px-4 py-2 text-[#1d1d1f] hover:border-[#1d1d1f] transition-colors"
          style={{ fontSize: "13px" }}>
          Actualizar
        </button>
      </div>

      {error && (
        <p role="alert" className="mb-5 rounded-xl bg-red-50 px-4 py-3 text-red-600" style={{ fontSize: "13px" }}>{error}</p>
      )}

      {solicitudes === null && !error && (
        <p className="text-[#6e6e73]" style={{ fontSize: "14px" }}>Cargando solicitudes…</p>
      )}

      {solicitudes?.length === 0 && (
        <div className="bg-white rounded-2xl border border-[#e5e5ea] p-12 text-center">
          <p className="font-semibold text-[#1d1d1f] mb-2" style={{ fontSize: "17px" }}>No hay solicitudes pendientes</p>
          <p className="font-light text-[#6e6e73] max-w-sm mx-auto" style={{ fontSize: "14px" }}>
            Cuando un profesional o clínica cree su cuenta en <code>/unirse</code>, aparecerá aquí para revisarla.
          </p>
        </div>
      )}

      <div className="space-y-4">
        {solicitudes?.map(s => {
          const key = `${s.tipo_cuenta}-${s.id}`;
          const esProfesional = s.tipo_cuenta === "profesional";
          const ocupado = procesando === key;
          return (
            <article key={key} className="bg-white rounded-2xl border border-[#e5e5ea] p-6">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <span className="inline-block rounded-full px-2.5 py-0.5 mb-2 font-medium"
                    style={{ fontSize: "11px", background: esProfesional ? "rgba(0,200,83,0.1)" : "#f5f5f7", color: esProfesional ? "#00a344" : "#1d1d1f" }}>
                    {esProfesional ? "Profesional" : s.tipo || "Centro"}
                  </span>
                  <h2 className="font-semibold text-[#1d1d1f]" style={{ fontSize: "17px" }}>
                    {esProfesional ? `${s.nombres} ${s.apellidos}` : s.nombre}
                  </h2>
                  <p className="text-[#6e6e73]" style={{ fontSize: "13px" }}>
                    {esProfesional ? s.especialidad : s.categoria} · {s.comuna}, {s.region} · {fecha(s.created_at)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => resolver(s, "rechazar")} disabled={ocupado}
                    className="rounded-full border border-[#d2d2d7] px-4 py-2 text-[#6e6e73] hover:border-red-400 hover:text-red-500 transition-colors disabled:opacity-50"
                    style={{ fontSize: "13px" }}>
                    Rechazar
                  </button>
                  <button onClick={() => resolver(s, "aprobar")} disabled={ocupado}
                    className="rounded-full px-4 py-2 text-white disabled:opacity-50"
                    style={{ fontSize: "13px", background: "#00C853" }}>
                    {ocupado ? "Guardando…" : "Aprobar"}
                  </button>
                </div>
              </div>

              <dl className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3 border-t border-[#f0f0f2] pt-4">
                <Dato label="RUT" value={s.rut} />
                <Dato label="Correo" value={s.email} />
                <Dato label="WhatsApp" value={s.whatsapp} />
                <Dato label="Plan" value={s.plan_id} />
                <Dato label="Modalidad" value={s.modalidad} />
                <Dato label="Dirección" value={s.direccion} />
                <Dato label="Experiencia" value={s.anios_experiencia ? `${s.anios_experiencia} años` : null} />
                <Dato label="Valor sesión" value={s.precio_sesion ? `$${Number(s.precio_sesion).toLocaleString("es-CL")}` : null} />
                <Dato label="Agenda / web" value={s.sitio_web} />
              </dl>
              {s.descripcion && (
                <p className="mt-4 text-[#1d1d1f] font-light" style={{ fontSize: "13px" }}>{s.descripcion}</p>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
